import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, CheckCircle2, FileText, ShieldAlert } from 'lucide-react';

const correctiveItems = [
    {
        id: 'C-1041',
        requirement: 'Fire exit signage illuminated and visible',
        code: 'NFPA 101 7.10',
        location: 'Room 104',
        linkedTicket: '#1041',
        status: 'Open',
        dueBy: 'Today'
    },
    {
        id: 'C-1038',
        requirement: 'Electrical outlets covered and safe',
        code: 'NEC 406.4',
        location: 'Room 201',
        linkedTicket: '#1038',
        status: 'In Progress',
        dueBy: 'Tomorrow'
    },
    {
        id: 'C-1040',
        requirement: 'No active water intrusion in occupied spaces',
        code: 'IBC 1403',
        location: 'Gymnasium',
        linkedTicket: '#1040',
        status: 'Open',
        dueBy: 'Tomorrow'
    }
];

const initialEvidence = [
    {
        id: 'E-901',
        itemId: 'C-1041',
        beforePhoto: 'exit-sign-before.jpg',
        afterPhoto: 'exit-sign-after.jpg',
        capturedBy: 'Mark Rivera',
        submittedAt: 'Today, 10:05 AM',
        notes: 'Fixture replaced and tested during walkthrough.'
    }
];

const statusTone = {
    Open: 'text-bg-danger',
    'In Progress': 'text-bg-warning',
    Resolved: 'text-bg-success'
};

const CompliancePage = () => {
    const [evidenceItems, setEvidenceItems] = useState(initialEvidence);
    const [reportGeneratedAt, setReportGeneratedAt] = useState('');
    const [activeItemId, setActiveItemId] = useState('');
    const [showEvidenceModal, setShowEvidenceModal] = useState(false);
    const [evidenceForm, setEvidenceForm] = useState({
        beforePhoto: '',
        afterPhoto: '',
        capturedBy: 'Facilities Team',
        notes: ''
    });

    const metrics = useMemo(() => {
        const open = correctiveItems.filter((x) => x.status === 'Open').length;
        const inProgress = correctiveItems.filter((x) => x.status === 'In Progress').length;
        return { open, inProgress };
    }, []);

    const evidenceByItem = useMemo(() => {
        return correctiveItems.reduce((acc, item) => {
            acc[item.id] = evidenceItems.filter((e) => e.itemId === item.id);
            return acc;
        }, {});
    }, [evidenceItems]);

    const evidenceCoverage = useMemo(() => {
        const withEvidence = correctiveItems.filter((item) => (evidenceByItem[item.id] || []).length > 0).length;
        return Math.round((withEvidence / correctiveItems.length) * 100);
    }, [evidenceByItem]);

    const packetReady = metrics.open === 0 && evidenceCoverage === 100;

    const openEvidenceModal = (itemId) => {
        setActiveItemId(itemId);
        setEvidenceForm({
            beforePhoto: '',
            afterPhoto: '',
            capturedBy: 'Facilities Team',
            notes: ''
        });
        setShowEvidenceModal(true);
    };

    const submitEvidence = (event) => {
        event.preventDefault();
        if (!evidenceForm.beforePhoto || !evidenceForm.afterPhoto || !evidenceForm.capturedBy) {
            return;
        }

        const now = new Date();
        setEvidenceItems((current) => [
            {
                id: `E-${Date.now()}`,
                itemId: activeItemId,
                beforePhoto: evidenceForm.beforePhoto,
                afterPhoto: evidenceForm.afterPhoto,
                capturedBy: evidenceForm.capturedBy,
                submittedAt: now.toLocaleString(),
                notes: evidenceForm.notes
            },
            ...current
        ]);

        setShowEvidenceModal(false);
    };

    const generatePacket = () => {
        const now = new Date();
        setReportGeneratedAt(now.toLocaleString());
    };

    return (
        <div>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <h1 className="page-title mb-1">Inspection Corrections and Evidence</h1>
                    <p className="text-secondary mb-0">Compliance view: close required corrections, validate evidence quality, and submit one clear compliance report for the Building Department.</p>
                </div>
                <div className="d-flex gap-2">
                    <Link to="/compliance-documents" className="btn btn-outline-secondary px-3">
                        Manage Documents <ArrowRight size={14} className="ms-1" />
                    </Link>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-2 text-danger mb-2"><ShieldAlert size={16} />Open Corrections</div>
                            <div className="display-6 fw-bold mb-0">{metrics.open}</div>
                            <small className="text-secondary">Must be completed before inspection day</small>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-2 text-warning-emphasis mb-2"><CheckCircle2 size={16} />In Progress</div>
                            <div className="display-6 fw-bold mb-0">{metrics.inProgress}</div>
                            <small className="text-secondary">Repairs scheduled and currently active</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-xl-8">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-3">Required Corrections for Upcoming Inspection</h2>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Item ID</th>
                                            <th>Requirement</th>
                                            <th>Code</th>
                                            <th>Location</th>
                                            <th>Ticket</th>
                                            <th>Status</th>
                                            <th>Due</th>
                                            <th>Evidence</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {correctiveItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>
                                                    <div className="fw-semibold">{item.requirement}</div>
                                                    <small className="text-secondary">Corrective action required before final walkthrough</small>
                                                </td>
                                                <td>{item.code}</td>
                                                <td>{item.location}</td>
                                                <td>{item.linkedTicket}</td>
                                                <td><span className={`badge ${statusTone[item.status]}`}>{item.status}</span></td>
                                                <td>{item.dueBy}</td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="badge text-bg-light text-dark border">{(evidenceByItem[item.id] || []).length} set(s)</span>
                                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => openEvidenceModal(item.id)}>
                                                            <Camera size={13} className="me-1" />Add Photos
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-4">
                    <div className="card border-0 modern-card mb-3">
                        <div className="card-body">
                            <h2 className="h6 fw-bold mb-3">Submission Checklist</h2>
                            <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                <span className="small">Critical corrections closed</span>
                                <span className={`badge ${metrics.open === 0 ? 'text-bg-success' : 'text-bg-danger'}`}>{metrics.open === 0 ? 'Done' : 'Pending'}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                <span className="small">Work-order links verified</span>
                                <span className="badge text-bg-success">Done</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                <span className="small">Evidence coverage by item</span>
                                <span className={`badge ${evidenceCoverage === 100 ? 'text-bg-success' : 'text-bg-warning'}`}>{evidenceCoverage}%</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center py-2">
                                <span className="small">Packet ready to send</span>
                                <span className={`badge ${packetReady ? 'text-bg-success' : 'text-bg-warning'}`}>{packetReady ? 'Ready' : 'Review'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 modern-card mb-3">
                        <div className="card-body">
                            <h2 className="h6 fw-bold mb-2">Documents and Certificates</h2>
                            <p className="small text-secondary mb-3">Uploads were moved to a dedicated page to keep this compliance view focused on corrections and evidence quality.</p>
                            <Link to="/compliance-documents" className="btn btn-outline-primary w-100">
                                Open Compliance Documents <ArrowRight size={14} className="ms-1" />
                            </Link>
                        </div>
                    </div>

                    <div className="card border-0 modern-card">
                        <div className="card-body">
                            <h2 className="h6 fw-bold mb-2">Building Department Submission</h2>
                            <p className="small text-secondary mb-3">Packet includes corrective items, linked work orders, and before/after evidence.</p>
                            {reportGeneratedAt ? (
                                <div className="packet-preview mb-3">
                                    <div className="fw-semibold text-success mb-1">Packet ready - {reportGeneratedAt}</div>
                                    <div className="text-secondary" style={{ fontSize: '0.8rem' }}>{correctiveItems.length} corrective items · {evidenceItems.length} evidence set(s) · Linked work orders · Building code references</div>
                                </div>
                            ) : (
                                <div className="alert alert-secondary py-2 small mb-3">No packet generated yet.</div>
                            )}
                            <Link to="/report-preview" onClick={generatePacket} className="btn btn-primary w-100">
                                <FileText size={16} className="me-2" />Generate and Open Compliance Report
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 modern-card mb-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="h5 fw-bold mb-0">Evidence History by Corrective Item</h2>
                        <small className="text-secondary">Before/after sets are required for each corrective item.</small>
                    </div>

                    <div className="row g-3">
                        {evidenceItems.map((entry) => (
                            <div key={entry.id} className="col-12 col-md-6 col-xl-4">
                                <div className="card h-100 border-0 bg-light-subtle">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <span className="badge text-bg-secondary">{entry.itemId}</span>
                                            <span className="badge text-bg-success">Complete</span>
                                        </div>
                                        <div className="small mb-2"><strong>Before:</strong> {entry.beforePhoto}</div>
                                        <div className="small mb-2"><strong>After:</strong> {entry.afterPhoto}</div>
                                        <div className="small text-secondary">Captured by {entry.capturedBy}</div>
                                        <div className="small text-secondary">{entry.submittedAt}</div>
                                        {entry.notes && (
                                            <div className="small text-secondary mt-2">{entry.notes}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showEvidenceModal && (
                <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(19, 29, 44, 0.45)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <form onSubmit={submitEvidence}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Upload Before and After Photos</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowEvidenceModal(false)} />
                                </div>
                                <div className="modal-body">
                                    <p className="small text-secondary mb-3">Corrective item: <strong>{activeItemId}</strong></p>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Before Photo</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={(e) => setEvidenceForm((current) => ({
                                                    ...current,
                                                    beforePhoto: e.target.files?.[0]?.name || ''
                                                }))}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">After Photo</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={(e) => setEvidenceForm((current) => ({
                                                    ...current,
                                                    afterPhoto: e.target.files?.[0]?.name || ''
                                                }))}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Captured By</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={evidenceForm.capturedBy}
                                                onChange={(e) => setEvidenceForm((current) => ({ ...current, capturedBy: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Completion Notes</label>
                                            <textarea
                                                rows="3"
                                                className="form-control"
                                                placeholder="Describe what was corrected and verified."
                                                value={evidenceForm.notes}
                                                onChange={(e) => setEvidenceForm((current) => ({ ...current, notes: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowEvidenceModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save Evidence Set</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompliancePage;
