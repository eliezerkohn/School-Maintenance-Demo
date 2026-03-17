import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    ClipboardList,
    FileText,
    ShieldAlert,
    Sparkles,
    Wrench
} from 'lucide-react';

const stats = [
    { label: 'Open Issues', value: '24', sub: '3 since last week', tone: 'primary', Icon: ClipboardList },
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
    { title: 'Compliance Report Generated', time: 'Mar 14, 2026', msg: 'Sent automatically to Building Dept.', tone: 'secondary' }
];

const openIssues = [
    { id: '#1041', room: 'Room 104', issue: 'Fire Exit Sign Broken', category: 'Safety', by: 'Ms. Torres', date: 'Today', status: 'Urgent' },
    { id: '#1040', room: 'Gym', issue: 'Ceiling Water Leak', category: 'Plumbing', by: 'Coach Kim', date: 'Today', status: 'In Progress' },
    { id: '#1038', room: 'Room 201', issue: 'Exposed Electrical Outlet', category: 'Electrical', by: 'Mr. Lee', date: 'Yesterday', status: 'Urgent' },
    { id: '#1035', room: 'Room 305', issue: 'Window Lock Broken', category: 'Structure', by: 'Ms. Patel', date: 'Mar 15', status: 'Pending' },
    { id: '#1033', room: 'Cafeteria', issue: 'Floor Tile Cracked', category: 'Structural', by: 'Ms. Wong', date: 'Mar 14', status: 'New' }
];

const statusClass = {
    Urgent: 'text-bg-danger',
    Pending: 'text-bg-warning',
    'In Progress': 'text-bg-primary',
    New: 'text-bg-info'
};

const DashboardPage = () => {
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
                        <p className="hero-subtitle mb-0">Teachers report issues in minutes, managers dispatch qualified vendors, and district leaders track readiness before inspection week.</p>
                    </div>
                    <div className="hero-metrics">
                        <div className="hero-metric"><span>Issues</span><strong>24</strong></div>
                        <div className="hero-metric"><span>Critical</span><strong>3</strong></div>
                        <div className="hero-metric"><span>Open</span><strong>16</strong></div>
                        <div className="hero-metric"><span>Inspection Readiness</span><strong>87%</strong></div>
                    </div>
                </div>
            </motion.section>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h2 className="page-title mb-1">Facilities Dashboard</h2>
                    <p className="text-secondary mb-0">Lincoln Elementary School - March 2026</p>
                </div>
                <Link to="/report-issue" className="btn btn-primary btn-lg px-4">Report New Issue <ArrowRight size={16} className="ms-2" /></Link>
            </div>

            <div className="row g-3 mb-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="col-12 col-sm-6 col-xl-3">
                        <div className="card h-100 stat-card lift-card border-0">
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

            <div className="row g-3 mb-4">
                <div className="col-12 col-xl-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-3">Urgent Issues</h2>
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
                            <h2 className="h5 fw-bold mb-3">Recent Activity</h2>
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
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="h5 fw-bold mb-0">All Open Issues</h2>
                        <Link to="/work-orders" className="btn btn-outline-primary btn-sm">Open Work Orders</Link>
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
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {openIssues.map((issue) => (
                                    <tr key={issue.id}>
                                        <td className="text-secondary">{issue.id}</td>
                                        <td><span className="badge text-bg-primary-subtle text-primary-emphasis rounded-pill">{issue.room}</span></td>
                                        <td>{issue.issue}</td>
                                        <td>{issue.category}</td>
                                        <td>{issue.by}</td>
                                        <td>{issue.date}</td>
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
