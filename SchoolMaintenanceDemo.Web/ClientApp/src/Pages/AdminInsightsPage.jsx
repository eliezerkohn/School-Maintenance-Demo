import React from 'react';
import { AlertTriangle, BarChart3, Building2, CalendarClock, CheckCircle2, ShieldCheck } from 'lucide-react';

const monthlyTrend = [
    { month: 'Oct 2025', reported: 31, resolved: 28, carriedOpen: 6 },
    { month: 'Nov 2025', reported: 29, resolved: 30, carriedOpen: 5 },
    { month: 'Dec 2025', reported: 37, resolved: 33, carriedOpen: 9 },
    { month: 'Jan 2026', reported: 34, resolved: 32, carriedOpen: 11 },
    { month: 'Feb 2026', reported: 26, resolved: 30, carriedOpen: 7 },
    { month: 'Mar 2026', reported: 24, resolved: 18, carriedOpen: 13 }
];

const hotspots = [
    { location: 'Room 201', incidents90d: 7, repeatRate: '43%', primaryCategory: 'Electrical', lastIncident: '2 days ago', risk: 'High' },
    { location: 'Gymnasium', incidents90d: 6, repeatRate: '33%', primaryCategory: 'Plumbing', lastIncident: 'Today', risk: 'High' },
    { location: 'Room 104', incidents90d: 5, repeatRate: '28%', primaryCategory: 'Safety', lastIncident: 'Today', risk: 'High' },
    { location: 'Room 305', incidents90d: 4, repeatRate: '20%', primaryCategory: 'Windows/Doors', lastIncident: '3 days ago', risk: 'Moderate' }
];

const categoryBreakdown = [
    { category: 'Electrical', incidents: 18, avgFixDays: 2.8, recurring: 'Yes', inspectionRisk: 'High' },
    { category: 'Plumbing', incidents: 14, avgFixDays: 3.2, recurring: 'Yes', inspectionRisk: 'High' },
    { category: 'Safety', incidents: 10, avgFixDays: 1.5, recurring: 'No', inspectionRisk: 'High' },
    { category: 'Structural', incidents: 9, avgFixDays: 4.1, recurring: 'Yes', inspectionRisk: 'Moderate' },
    { category: 'General', incidents: 12, avgFixDays: 2.3, recurring: 'No', inspectionRisk: 'Low' }
];

const riskClass = {
    High: 'text-bg-danger',
    Moderate: 'text-bg-warning',
    Low: 'text-bg-success'
};

const AdminInsightsPage = () => {
    return (
        <div>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <h1 className="page-title mb-1">Admin Insights and Readiness Intelligence</h1>
                    <p className="text-secondary mb-0">Shows where things break most often, how quickly repairs close, and whether the school is truly inspection-ready</p>
                </div>
                <button className="btn btn-primary px-4">Generate Board Summary</button>
            </div>

            <div className="card border-0 modern-card mb-4">
                <div className="card-body">
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <span className="glass-chip text-dark bg-light border">Demo Storyline</span>
                        <span className="glass-chip text-dark bg-light border">From classroom reports to predictable inspection outcomes</span>
                    </div>
                    <p className="mb-0 text-secondary">This is the executive view clients care about: incident trend, repeat-failure hotspots, vendor performance, and evidence completeness before inspection day.</p>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-md-6 col-xl-3">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="text-secondary small mb-2 d-flex align-items-center gap-2"><BarChart3 size={15} /> Incidents this month</div>
                            <div className="display-6 fw-bold mb-0">24</div>
                            <small className="text-secondary">Down 8% from last month</small>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="text-secondary small mb-2 d-flex align-items-center gap-2"><AlertTriangle size={15} /> Repeat incidents</div>
                            <div className="display-6 fw-bold mb-0">11</div>
                            <small className="text-secondary">46% of open items are repeat patterns</small>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="text-secondary small mb-2 d-flex align-items-center gap-2"><CalendarClock size={15} /> Avg closure time</div>
                            <div className="display-6 fw-bold mb-0">2.8d</div>
                            <small className="text-secondary">Target is below 3.0 days</small>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="text-secondary small mb-2 d-flex align-items-center gap-2"><ShieldCheck size={15} /> Inspection readiness</div>
                            <div className="display-6 fw-bold mb-0">87%</div>
                            <small className="text-secondary">13 days until inspection</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-xl-7">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-3">Break/Fix Frequency Trend (Last 6 Months)</h2>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Month</th>
                                            <th>Reported</th>
                                            <th>Resolved</th>
                                            <th>Carried Open</th>
                                            <th>Resolution Ratio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthlyTrend.map((row) => {
                                            const ratio = Math.round((row.resolved / row.reported) * 100);
                                            return (
                                                <tr key={row.month}>
                                                    <td>{row.month}</td>
                                                    <td>{row.reported}</td>
                                                    <td>{row.resolved}</td>
                                                    <td>{row.carriedOpen}</td>
                                                    <td>
                                                        <div className="progress" role="progressbar" aria-label="resolution ratio" aria-valuenow={ratio} aria-valuemin="0" aria-valuemax="100">
                                                            <div className="progress-bar" style={{ width: `${ratio}%` }}>{ratio}%</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-5">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-3">Inspection Readiness Runway</h2>
                            <div className="readiness-line mb-3">
                                <span>Critical corrections still open</span>
                                <strong>3</strong>
                            </div>
                            <div className="readiness-line mb-3">
                                <span>Evidence package completeness</span>
                                <strong>78%</strong>
                            </div>
                            <div className="readiness-line mb-3">
                                <span>Vendor insurance verified</span>
                                <strong>92%</strong>
                            </div>
                            <div className="readiness-line">
                                <span>Projected inspection score</span>
                                <strong>91%</strong>
                            </div>

                            <hr />
                            <h3 className="h6 fw-bold">Why clients need this</h3>
                            <ul className="mb-0 text-secondary">
                                <li>Shows recurring problems before they become violations.</li>
                                <li>Proves readiness with measurable trend and evidence data.</li>
                                <li>Helps leadership budget preventive maintenance, not emergencies.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-3">
                <div className="col-12 col-xl-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-3">Hotspots by Location (90 Days)</h2>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Location</th>
                                            <th>Incidents</th>
                                            <th>Repeat Rate</th>
                                            <th>Primary Category</th>
                                            <th>Risk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hotspots.map((row) => (
                                            <tr key={row.location}>
                                                <td>
                                                    <div className="fw-semibold d-flex align-items-center gap-2"><Building2 size={14} />{row.location}</div>
                                                    <small className="text-secondary">Last incident: {row.lastIncident}</small>
                                                </td>
                                                <td>{row.incidents90d}</td>
                                                <td>{row.repeatRate}</td>
                                                <td>{row.primaryCategory}</td>
                                                <td><span className={`badge ${riskClass[row.risk]}`}>{row.risk}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-3">Failure Pattern by Category</h2>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Category</th>
                                            <th>Incidents</th>
                                            <th>Avg Fix Time</th>
                                            <th>Recurring</th>
                                            <th>Inspection Risk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryBreakdown.map((row) => (
                                            <tr key={row.category}>
                                                <td>{row.category}</td>
                                                <td>{row.incidents}</td>
                                                <td>{row.avgFixDays} days</td>
                                                <td>{row.recurring}</td>
                                                <td><span className={`badge ${riskClass[row.inspectionRisk]}`}>{row.inspectionRisk}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminInsightsPage;
