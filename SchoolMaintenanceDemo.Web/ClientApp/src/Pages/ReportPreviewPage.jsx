import React from 'react';

const correctiveActionRows = [
    {
        id: 'C-1041',
        area: 'Exit Signage - East Hall',
        code: 'NFPA 101 7.10',
        before: 'Sign failed illumination test',
        fix: 'Replaced ballast and emergency battery pack',
        evidence: '2 photos + electrician invoice',
        status: 'Verified'
    },
    {
        id: 'C-1038',
        area: 'Room 201 Outlet Safety',
        code: 'NEC 406.4',
        before: 'Outlet cover cracked and loose',
        fix: 'Installed tamper-resistant faceplate and secured box',
        evidence: '2 photos + work order WO-882',
        status: 'Verified'
    },
    {
        id: 'C-1040',
        area: 'Gym Ceiling Moisture',
        code: 'IBC 1202',
        before: 'Active moisture around expansion joint',
        fix: 'Repaired roof seam and replaced damp ceiling tiles',
        evidence: '3 photos + vendor completion note',
        status: 'Pending QA'
    },
    {
        id: 'C-1053',
        area: 'Stairwell Lighting',
        code: 'IBC 1006',
        before: 'Light level below minimum in landing area',
        fix: 'Added LED fixture and adjusted occupancy sensor timing',
        evidence: '2 photos + lux verification sheet',
        status: 'Verified'
    }
];

const evidenceCards = [
    {
        id: 'C-1041',
        location: 'East Hall Exit',
        beforeCaption: 'Before: emergency fixture dark during power-loss test',
        afterCaption: 'After: fixture illuminated and signed off by electrician',
        note: 'Correction closed in 1.2 days.'
    },
    {
        id: 'C-1038',
        location: 'Room 201',
        beforeCaption: 'Before: damaged outlet cover exposing sharp edges',
        afterCaption: 'After: new compliant cover and secure mount',
        note: 'Classroom reopened after verification.'
    },
    {
        id: 'C-1040',
        location: 'Gym West Span',
        beforeCaption: 'Before: moisture marks and active ceiling drip',
        afterCaption: 'After: patched roof seam and dry ceiling tiles',
        note: 'Final QA pending humidity re-check.'
    }
];

const ReportPreviewPage = () => {
    return (
        <div>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <h1 className="page-title mb-1">Compliance Corrective Action Report</h1>
                    <p className="text-secondary mb-0">Formal submission record documenting corrective actions, code references, and supporting before/after evidence for inspection review.</p>
                </div>
                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-secondary">Print Preview</button>
                    <button type="button" className="btn btn-primary">Download PDF</button>
                </div>
            </div>

            <section className="card border-0 modern-card report-paper mb-4">
                <div className="card-body p-4 p-lg-5">
                    <div className="report-head mb-4">
                        <div>
                            <div className="report-title">Eipro Compliance Corrective Action Report</div>
                            <div className="text-secondary small">Bright Path Academy - Main Academic Building</div>
                            <span className="report-badge mt-2">Inspection submission packet: corrective actions with supporting evidence</span>
                        </div>
                        <div className="report-meta">
                            <div><span>Report Date</span><strong>Mar 19, 2026</strong></div>
                            <div><span>Inspection Date</span><strong>Mar 30, 2026</strong></div>
                            <div><span>Prepared By</span><strong>Facilities + Compliance Team</strong></div>
                        </div>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-12 col-md-3">
                            <div className="report-kpi">
                                <span>Total Findings</span>
                                <strong>23</strong>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="report-kpi">
                                <span>Fixed This Cycle</span>
                                <strong>19</strong>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="report-kpi">
                                <span>Pending QA</span>
                                <strong>4</strong>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="report-kpi">
                                <span>Evidence Annex</span>
                                <strong>Attached</strong>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive mb-4">
                        <table className="table table-bordered align-middle report-table fix-table mb-0">
                            <thead>
                                <tr>
                                    <th>Finding ID</th>
                                    <th>Area</th>
                                    <th>Code</th>
                                    <th>Before Condition</th>
                                    <th>Fix Completed</th>
                                    <th>Evidence</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {correctiveActionRows.map((row) => (
                                    <tr key={row.id}>
                                        <td className="fw-semibold">{row.id}</td>
                                        <td className="fw-semibold">{row.area}</td>
                                        <td>{row.code}</td>
                                        <td>{row.before}</td>
                                        <td>{row.fix}</td>
                                        <td>{row.evidence}</td>
                                        <td>
                                            <span className={`status-pill ${row.status === 'Verified' ? 'ok' : 'pending'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="report-section mb-4">
                        <h2 className="h6 fw-bold">Before and After Evidence Gallery</h2>
                        <p className="small text-secondary mb-3">Each corrective action includes visual evidence captured in the field application and linked to its corresponding work order.</p>
                        <div className="evidence-grid">
                            {evidenceCards.map((card) => (
                                <article key={card.id} className="evidence-card">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <strong>{card.id}</strong>
                                        <span className="small text-secondary">{card.location}</span>
                                    </div>
                                    <div className="evidence-photo-row">
                                        <div className="evidence-photo before">
                                            <span>Before Photo</span>
                                        </div>
                                        <div className="evidence-photo after">
                                            <span>After Photo</span>
                                        </div>
                                    </div>
                                    <p className="small mb-1 mt-2 text-secondary">{card.beforeCaption}</p>
                                    <p className="small mb-1 text-secondary">{card.afterCaption}</p>
                                    <p className="small mb-0 fw-semibold text-dark">{card.note}</p>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-12 col-xl-6">
                            <div className="report-section h-100">
                                <h2 className="h6 fw-bold">What Was Fixed In This Reporting Window</h2>
                                <ul className="mb-0 text-secondary small">
                                    <li>Emergency egress signage in east corridor brought back to code.</li>
                                    <li>Room 201 outlet hazard corrected with compliant faceplates.</li>
                                    <li>Gym moisture source repaired and impacted materials replaced.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-xl-6">
                            <div className="report-section h-100">
                                <h2 className="h6 fw-bold">Remaining Actions Before Inspection</h2>
                                <ol className="mb-0 text-secondary small">
                                    <li>Close 4 pending QA items with inspector-ready photo angles.</li>
                                    <li>Upload signed moisture clearance memo for gym repair ticket.</li>
                                    <li>Run final walkthrough and attach signed secretary checklist.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="report-signoff mt-4">
                        <div>
                            <div className="small text-secondary">Facilities Manager</div>
                            <div className="report-line" />
                        </div>
                        <div>
                            <div className="small text-secondary">Compliance Manager</div>
                            <div className="report-line" />
                        </div>
                        <div>
                            <div className="small text-secondary">District Admin</div>
                            <div className="report-line" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReportPreviewPage;
