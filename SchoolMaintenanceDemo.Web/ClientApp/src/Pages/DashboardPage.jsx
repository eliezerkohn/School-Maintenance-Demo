import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    ClipboardList,
    FileText,
    GraduationCap,
    Shield,
    ShieldAlert,
    Sparkles,
    UserCog,
    Wrench
} from 'lucide-react';

const stats = [
    { label: 'Issues Reported (30 Days)', value: '24', sub: 'All submitted issues in the last month', tone: 'primary', Icon: ClipboardList },
    { label: 'Currently Open', value: '16', sub: 'Still unresolved right now', tone: 'info', Icon: AlertTriangle },
    { label: 'Urgent / Safety', value: '3', sub: 'Requires immediate action', tone: 'danger', Icon: AlertTriangle },
    { label: 'Resolved This Month', value: '41', sub: '12% vs last month', tone: 'success', Icon: CheckCircle2 },
    { label: 'Compliance Score', value: '87%', sub: 'Inspection ready', tone: 'warning', Icon: ShieldAlert }
];

const urgentIssues = [
    { title: 'Fire Exit Sign Broken', room: 'Room 104', reported: '2h ago by Ms. Torres' },
    { title: 'Water Leak - Ceiling', room: 'Gym', reported: '5h ago by Coach Kim' },
    { title: 'Exposed Electrical Outlet', room: 'Room 201', reported: 'Yesterday by Mr. Lee' }
];

const activity = [
    { title: 'HVAC Filter Replaced - Room 110', time: 'Today, 9:15 AM', msg: 'Technician Mark completed the job', tone: 'success' },
    { title: 'New Report: Broken Window Lock', time: 'Today, 8:42 AM', msg: 'Room 305 submitted by Ms. Patel', tone: 'primary' },
    { title: 'Plumber Assigned - Gym Leak', time: 'Yesterday, 3:30 PM', msg: 'ETA tomorrow morning', tone: 'warning' },
    { title: 'Compliance Report Generated', time: 'Mar 14, 2026', msg: 'Sent automatically to the Building Department', tone: 'secondary' }
];

const openIssues = [
    { id: '#1041', room: 'Room 104', issue: 'Fire Exit Sign Broken', category: 'Safety', by: 'Ms. Torres', date: 'Today', status: 'open', urgency: 4, source: 'Teacher Report' },
    { id: '#1040', room: 'Gym', issue: 'Ceiling Water Leak', category: 'Plumbing', by: 'Coach Kim', date: 'Today', status: 'in_progress', urgency: 3, source: 'Teacher Report' },
    { id: '#1038', room: 'Room 201', issue: 'Exposed Electrical Outlet', category: 'Electrical', by: 'Mr. Lee', date: 'Yesterday', status: 'assigned', urgency: 4, source: 'Secretary Walkthrough' },
    { id: '#1035', room: 'Room 305', issue: 'Window Lock Broken', category: 'Structure', by: 'Ms. Patel', date: 'Mar 15', status: 'triaged', urgency: 2, source: 'Teacher Report' },
    { id: '#1033', room: 'Cafeteria', issue: 'Floor Tile Cracked', category: 'Structural', by: 'Ms. Wong', date: 'Mar 14', status: 'open', urgency: 1, source: 'Secretary Walkthrough' }
];

const walkthroughChecks = [
    { area: 'Main exits and egress signs', status: 'Done', note: 'No blocked exits' },
    { area: 'Electrical outlets and exposed wiring', status: 'Action Needed', note: 'Room 201 outlet cover missing' },
    { area: 'Restrooms and plumbing leaks', status: 'Done', note: 'No active leaks found' },
    { area: 'Gym and assembly areas', status: 'Action Needed', note: 'Ceiling leak under review' }
];

const statusClass = {
    open: 'text-bg-danger',
    triaged: 'text-bg-warning',
    assigned: 'text-bg-info',
    in_progress: 'text-bg-primary'
};

const urgencyClass = {
    4: 'text-bg-danger',
    3: 'text-bg-warning',
    2: 'text-bg-info',
    1: 'text-bg-secondary'
};

const urgencyLabel = {
    4: 'critical',
    3: 'high',
    2: 'medium',
    1: 'low'
};

const DashboardPage = () => {
    const [issueSort, setIssueSort] = useState('urgency');

    const sortedOpenIssues = useMemo(() => {
        const items = [...openIssues];

        if (issueSort === 'urgency') {
            return items.sort((a, b) => b.urgency - a.urgency);
        }

        if (issueSort === 'location') {
            return items.sort((a, b) => a.room.localeCompare(b.room));
        }

        return items;
    }, [issueSort]);

    return (
        <div>
            <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="hero-panel mb-4"
            >
                <div className="d-flex flex-column flex-xl-row justify-content-between gap-4">
                    <div>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <span className="glass-chip"><Sparkles size={14} className="me-1" />School Operations Demo</span>
                            <span className="glass-chip">Goal: Pass inspection with fewer emergency costs</span>
                        </div>
                        <h1 className="hero-title mb-2">School Maintenance and Compliance</h1>
                        <p className="hero-subtitle mb-0">Teachers can report issues any time, the secretary completes a full facility walkthrough every 2 weeks, and managers keep the campus ready for surprise inspections.</p>
                    </div>
                    <div className="hero-metrics">
                        <div className="hero-metric"><span>Reported (30d)</span><strong>24</strong></div>
                        <div className="hero-metric"><span>Critical</span><strong>3</strong></div>
                        <div className="hero-metric"><span>Currently Open</span><strong>16</strong></div>
                        <div className="hero-metric"><span>Inspection Readiness</span><strong>87%</strong></div>
                    </div>
                </div>
            </motion.section>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h2 className="page-title mb-1">Facilities Dashboard</h2>
                    <p className="text-secondary mb-1">Lincoln Elementary School - March 2026</p>
                    <div className="d-flex flex-wrap gap-2">
                        <span className="badge text-bg-light text-dark border"><GraduationCap size={12} className="me-1" />Teacher Reports</span>
                        <span className="badge text-bg-light text-dark border"><UserCog size={12} className="me-1" />Manager Dispatch</span>
                        <span className="badge text-bg-light text-dark border"><Shield size={12} className="me-1" />Inspection Readiness</span>
                    </div>
                </div>
                <Link to="/report-issue" className="btn btn-primary btn-lg px-4">Report New Issue <ArrowRight size={16} className="ms-2" /></Link>
            </div>

            <div className="inspection-banner d-flex flex-wrap align-items-center gap-3 mb-4">
                <div className="countdown-badge">
                    13
                    <small>days</small>
                </div>
                <div className="flex-grow-1">
                    <div className="fw-bold text-danger-emphasis">Building Department Inspection — March 30, 2026</div>
                    <p className="mb-0 small text-secondary">3 open corrections require attention and evidence packets are 78% complete. Review Compliance to stay on track before inspection day.</p>
                </div>
                <Link to="/compliance" className="btn btn-danger btn-sm px-3">
                    Review Compliance <ArrowRight size={14} className="ms-1" />
                </Link>
            </div>

            <div className="row g-3 mb-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="col-12 col-sm-6 col-xl-4 col-xxl-2">
                        <div className={`card h-100 stat-card lift-card border-0 stat-accent-${stat.tone}`}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <div className="text-uppercase small fw-bold text-secondary">{stat.label}</div>
                                        <div className={`display-6 fw-bold text-${stat.tone}`}>{stat.value}</div>
                                        <p className="mb-0 text-muted small">{stat.sub}</p>
                                    </div>
                                    <div className="icon-panel">
                                        <stat.Icon size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card border-0 modern-card mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-3">
                        <div>
                            <h2 className="h5 fw-bold mb-1">Biweekly Secretary Walkthrough</h2>
                            <p className="small text-secondary mb-0">Routine full-facility sweep every 2 weeks to catch risks before an unannounced inspector visit.</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <span className="badge text-bg-light text-dark border">Last walkthrough: Mar 16, 2026</span>
                            <span className="badge text-bg-warning">Next due: Mar 30, 2026</span>
                        </div>
                    </div>
                    <div className="row g-2">
                        {walkthroughChecks.map((check) => (
                            <div key={check.area} className="col-12 col-md-6">
                                <div className="p-3 rounded border bg-light-subtle h-100">
                                    <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                                        <div className="fw-semibold small">{check.area}</div>
                                        <span className={`badge ${check.status === 'Done' ? 'text-bg-success' : 'text-bg-danger'}`}>{check.status}</span>
                                    </div>
                                    <div className="small text-secondary">{check.note}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-xl-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-1">Urgent Issues</h2>
                            <p className="small text-secondary mb-3">Items most likely to impact safety compliance if delayed.</p>
                            {urgentIssues.map((item) => (
                                <div key={item.title} className="d-flex align-items-start justify-content-between py-2 border-bottom last-no-border gap-3 smooth-row">
                                    <div className="d-flex gap-3">
                                        <div className="icon-chip bg-danger-subtle"><AlertTriangle size={15} /></div>
                                        <div>
                                            <div className="fw-semibold">{item.title}</div>
                                            <div className="small text-secondary">{item.room} - {item.reported}</div>
                                        </div>
                                    </div>
                                    <span className="badge text-bg-danger rounded-pill mt-1">URGENT</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-1">Recent Activity</h2>
                            <p className="small text-secondary mb-3">Live timeline of reporting, assignment, and completion updates.</p>
                            {activity.map((item) => (
                                <div key={item.title} className="d-flex gap-3 py-2 border-bottom last-no-border smooth-row">
                                    <div className={`icon-chip bg-${item.tone}-subtle`}>
                                        {item.tone === 'success' ? <CheckCircle2 size={15} /> : item.tone === 'warning' ? <Wrench size={15} /> : item.tone === 'primary' ? <ClipboardList size={15} /> : <FileText size={15} />}
                                    </div>
                                    <div>
                                        <div className="fw-semibold">{item.title}</div>
                                        <div className="small text-muted">{item.time}</div>
                                        <div className="small text-secondary">{item.msg}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 modern-card">
                <div className="card-body">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-2 mb-3">
                        <h2 className="h5 fw-bold mb-0">All Open Issues</h2>
                        <div className="d-flex gap-2">
                            <select className="form-select form-select-sm" value={issueSort} onChange={(e) => setIssueSort(e.target.value)}>
                                <option value="urgency">Sort by urgency</option>
                                <option value="location">Sort by room</option>
                                <option value="recent">Sort by most recent</option>
                            </select>
                            <Link to="/work-orders" className="btn btn-outline-primary btn-sm">Open Work Orders</Link>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Room</th>
                                    <th>Issue</th>
                                    <th>Category</th>
                                    <th>Reported By</th>
                                    <th>Date</th>
                                    <th>Source</th>
                                    <th>Urgency</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedOpenIssues.map((issue) => (
                                    <tr key={issue.id}>
                                        <td className="text-secondary">{issue.id}</td>
                                        <td><span className="badge text-bg-primary-subtle text-primary-emphasis rounded-pill">{issue.room}</span></td>
                                        <td>{issue.issue}</td>
                                        <td>{issue.category}</td>
                                        <td>{issue.by}</td>
                                        <td>{issue.date}</td>
                                        <td><span className="small text-secondary">{issue.source}</span></td>
                                        <td><span className={`badge rounded-pill ${urgencyClass[issue.urgency]}`}>{urgencyLabel[issue.urgency]}</span></td>
                                        <td><span className={`badge rounded-pill ${statusClass[issue.status]}`}>{issue.status}</span></td>
                                        <td><Link to="/work-orders" className="btn btn-sm btn-outline-secondary">View</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardPage;
