import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const initialWorkOrders = [
    {
        ticket: '#1041',
        room: 'Room 104',
        issue: 'Fire Exit Sign Broken',
        category: 'Safety',
        assignedTo: 'Unassigned',
        vendorCompany: '-',
        insuranceValidUntil: '-',
        priority: 'critical',
        status: 'open',
        due: 'Today',
        source: 'Teacher Report'
    },
    {
        ticket: '#1040',
        room: 'Gym',
        issue: 'Ceiling Water Leak',
        category: 'Plumbing',
        assignedTo: 'Dana Plumb',
        vendorCompany: 'RapidFlow Plumbing',
        insuranceValidUntil: '2026-12-31',
        priority: 'critical',
        status: 'in_progress',
        due: 'Tomorrow',
        source: 'Teacher Report'
    },
    {
        ticket: '#1038',
        room: 'Room 201',
        issue: 'Exposed Electrical',
        category: 'Electrical',
        assignedTo: 'Mark Rivera',
        vendorCompany: 'Northline Electric',
        insuranceValidUntil: '2026-09-15',
        priority: 'high',
        status: 'assigned',
        due: 'Today',
        source: 'Secretary Walkthrough'
    },
    {
        ticket: '#1035',
        room: 'Room 305',
        issue: 'Window Lock Broken',
        category: 'Security',
        assignedTo: 'Sam Torres',
        vendorCompany: 'Campus Fix Services',
        insuranceValidUntil: '2027-02-01',
        priority: 'medium',
        status: 'triaged',
        due: 'Mar 20',
        source: 'Teacher Report'
    }
];

const priorityRank = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1
};

const badgeTone = {
    critical: 'text-bg-danger',
    high: 'text-bg-warning',
    medium: 'text-bg-info',
    low: 'text-bg-secondary',
    open: 'text-bg-danger',
    triaged: 'text-bg-warning',
    assigned: 'text-bg-info',
    in_progress: 'text-bg-primary',
    resolved: 'text-bg-success',
    verified: 'text-bg-success'
};

const vendors = [
    {
        name: 'Northline Electric',
        contact: 'M. Rivera',
        phone: '(555) 219-4480',
        email: 'dispatch@northline-electric.com',
        license: 'EL-94821',
        insuranceValidUntil: '2026-09-15',
        category: 'Electrical'
    },
    {
        name: 'RapidFlow Plumbing',
        contact: 'D. Plumb',
        phone: '(555) 771-9910',
        email: 'ops@rapidflowplumbing.com',
        license: 'PL-11402',
        insuranceValidUntil: '2026-12-31',
        category: 'Plumbing'
    },
    {
        name: 'Campus Fix Services',
        contact: 'S. Torres',
        phone: '(555) 623-1022',
        email: 'support@campusfix.com',
        license: 'GC-70311',
        insuranceValidUntil: '2027-02-01',
        category: 'General'
    }
];

const WorkOrdersPage = () => {
    const [workOrders, setWorkOrders] = useState(initialWorkOrders);
    const [selectedTicket, setSelectedTicket] = useState(initialWorkOrders[0].ticket);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('urgency');
    const [vendorForm, setVendorForm] = useState({
        vendorName: '',
        contactName: '',
        phone: '',
        email: '',
        license: '',
        insuranceValidUntil: '',
        quoteAmount: '450',
        slaHours: '8',
        visitDate: '',
        notes: 'Requires photo confirmation before closure.'
    });
    const [assignMessage, setAssignMessage] = useState('');

    const selectedOrder = useMemo(
        () => workOrders.find((item) => item.ticket === selectedTicket) || workOrders[0],
        [workOrders, selectedTicket]
    );

    const matchingVendors = useMemo(
        () => vendors.filter((v) => v.category === selectedOrder.category || v.category === 'General'),
        [selectedOrder.category]
    );

    const visibleWorkOrders = useMemo(() => {
        const filtered = statusFilter === 'all'
            ? workOrders
            : workOrders.filter((item) => item.status === statusFilter || item.priority === statusFilter);

        const sorted = [...filtered];

        if (sortBy === 'urgency') {
            return sorted.sort((a, b) => (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0));
        }

        if (sortBy === 'room') {
            return sorted.sort((a, b) => a.room.localeCompare(b.room));
        }

        return sorted.sort((a, b) => a.ticket.localeCompare(b.ticket));
    }, [sortBy, statusFilter, workOrders]);

    const handleVendorSelect = (value) => {
        const vendor = vendors.find((item) => item.name === value);
        if (!vendor) {
            setVendorForm((current) => ({ ...current, vendorName: value }));
            return;
        }

        setVendorForm((current) => ({
            ...current,
            vendorName: vendor.name,
            contactName: vendor.contact,
            phone: vendor.phone,
            email: vendor.email,
            license: vendor.license,
            insuranceValidUntil: vendor.insuranceValidUntil
        }));
    };

    const assignVendor = () => {
        if (!vendorForm.vendorName || !vendorForm.contactName || !vendorForm.insuranceValidUntil) {
            setAssignMessage('Please complete vendor, contact, and insurance validity before assigning.');
            return;
        }

        setWorkOrders((current) =>
            current.map((item) =>
                item.ticket === selectedTicket
                    ? {
                        ...item,
                        assignedTo: vendorForm.contactName,
                        vendorCompany: vendorForm.vendorName,
                        insuranceValidUntil: vendorForm.insuranceValidUntil,
                        status: 'assigned'
                    }
                    : item
            )
        );

        setAssignMessage(`Vendor assigned. ${vendorForm.vendorName} will respond within ${vendorForm.slaHours} hours.`);
    };

    return (
        <div>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <h1 className="page-title mb-1">Work Orders and Vendor Dispatch</h1>
                    <p className="text-secondary mb-0">Manager view: assign insured vendors, enforce SLAs, and maintain complete records for audits and inspections.</p>
                </div>
                <div className="d-flex gap-2">
                    <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="critical">Priority: critical</option>
                        <option value="high">Priority: high</option>
                        <option value="open">Status: open</option>
                        <option value="assigned">Status: assigned</option>
                        <option value="in_progress">Status: in_progress</option>
                    </select>
                    <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="urgency">Sort by priority</option>
                        <option value="room">Sort by room</option>
                        <option value="ticket">Sort by ticket</option>
                    </select>
                    <button className="btn btn-primary px-3">Export Readiness Summary</button>
                </div>
            </div>

            <div className="card border-0 modern-card mb-4">
                <div className="card-body">
                    <h2 className="h5 fw-bold mb-2">Operational Value for School Teams</h2>
                    <p className="text-secondary mb-0">This screen shows why schools adopt the platform: teacher and secretary-identified issues are prioritized by urgency, then linked to licensed and insured vendors with response SLAs and completion evidence.</p>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-xl-7">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-3">Open Work Orders</h2>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Ticket</th>
                                            <th>Issue</th>
                                            <th>Source</th>
                                            <th>Vendor</th>
                                            <th>Priority</th>
                                            <th>Status</th>
                                            <th>Due</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleWorkOrders.map((item) => (
                                            <tr
                                                key={item.ticket}
                                                onClick={() => setSelectedTicket(item.ticket)}
                                                className={item.ticket === selectedTicket ? 'table-primary cursor-pointer' : 'cursor-pointer'}
                                            >
                                                <td>{item.ticket}</td>
                                                <td>
                                                    <div className="fw-semibold">{item.issue}</div>
                                                    <div className="small text-secondary">{item.room} · {item.category}</div>
                                                </td>
                                                <td><span className="small text-secondary">{item.source}</span></td>
                                                <td>
                                                    <div>{item.vendorCompany}</div>
                                                    <small className="text-secondary">Insurance: {item.insuranceValidUntil}</small>
                                                </td>
                                                <td><span className={`badge ${badgeTone[item.priority]}`}>{item.priority}</span></td>
                                                <td><span className={`badge ${badgeTone[item.status]}`}>{item.status}</span></td>
                                                <td>{item.due}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-5">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-1">Assign Vendor Details</h2>
                            <p className="small text-secondary mb-3">Selected ticket: {selectedOrder.ticket} · {selectedOrder.issue}</p>

                            <div className="workflow-track mb-3">
                                <div className="workflow-step done">Reported</div>
                                <div className="workflow-step done">Triaged</div>
                                <div className="workflow-step active">Assigned</div>
                                <div className="workflow-step">In Progress</div>
                                <div className="workflow-step">Resolved</div>
                                <div className="workflow-step">Verified</div>
                            </div>

                            <div className="row g-2">
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Vendor Company</label>
                                    <select
                                        className="form-select"
                                        value={vendorForm.vendorName}
                                        onChange={(e) => handleVendorSelect(e.target.value)}
                                    >
                                        <option value="">Select recommended vendor</option>
                                        {matchingVendors.map((vendor) => (
                                            <option key={vendor.name} value={vendor.name}>{vendor.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Contact Name</label>
                                    <input className="form-control" value={vendorForm.contactName} onChange={(e) => setVendorForm((c) => ({ ...c, contactName: e.target.value }))} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Phone</label>
                                    <input className="form-control" value={vendorForm.phone} onChange={(e) => setVendorForm((c) => ({ ...c, phone: e.target.value }))} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">License #</label>
                                    <input className="form-control" value={vendorForm.license} onChange={(e) => setVendorForm((c) => ({ ...c, license: e.target.value }))} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Insurance Valid Until</label>
                                    <input type="date" className="form-control" value={vendorForm.insuranceValidUntil} onChange={(e) => setVendorForm((c) => ({ ...c, insuranceValidUntil: e.target.value }))} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Estimated Quote (USD)</label>
                                    <input className="form-control" value={vendorForm.quoteAmount} onChange={(e) => setVendorForm((c) => ({ ...c, quoteAmount: e.target.value }))} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Response SLA (Hours)</label>
                                    <input className="form-control" value={vendorForm.slaHours} onChange={(e) => setVendorForm((c) => ({ ...c, slaHours: e.target.value }))} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Scheduled Visit Date</label>
                                    <input type="date" className="form-control" value={vendorForm.visitDate} onChange={(e) => setVendorForm((c) => ({ ...c, visitDate: e.target.value }))} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Assignment Notes</label>
                                    <textarea rows="3" className="form-control" value={vendorForm.notes} onChange={(e) => setVendorForm((c) => ({ ...c, notes: e.target.value }))} />
                                </div>
                            </div>

                            <div className="d-flex flex-wrap gap-2 mt-3">
                                <button onClick={assignVendor} className="btn btn-primary px-3">Assign Vendor and Notify</button>
                                <button className="btn btn-outline-secondary px-3">Send Scope and Photos</button>
                            </div>

                            {assignMessage && (
                                <div className="alert alert-info mt-3 mb-0" role="alert">
                                    {assignMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WorkOrdersPage;
