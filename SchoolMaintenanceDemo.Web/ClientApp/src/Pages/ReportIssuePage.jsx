import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import {
    calculateSeverityFromCodes,
    getCodesByCategory,
    importanceBadge,
    importanceLabel,
    regulationCodes
} from '../data/regulationCodes';

const ReportIssuePage = () => {
    const [issueCategory, setIssueCategory] = useState('Electrical');
    const [photoCount, setPhotoCount] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [showCodePopup, setShowCodePopup] = useState(false);
    const [selectedCodes, setSelectedCodes] = useState([]);

    const suggestedCodes = useMemo(
        () => getCodesByCategory(issueCategory, regulationCodes),
        [issueCategory]
    );

    const autoSeverity = useMemo(
        () => calculateSeverityFromCodes(selectedCodes, regulationCodes),
        [selectedCodes]
    );

    const photoStamps = useMemo(() => ['P1', 'P2', 'P3', 'P4', 'P5'].slice(0, photoCount), [photoCount]);

    const toggleCode = (codeId) => {
        setSelectedCodes((current) => (
            current.includes(codeId)
                ? current.filter((id) => id !== codeId)
                : [...current, codeId]
        ));
    };

    const addPhoto = () => {
        setPhotoCount((count) => (count < 5 ? count + 1 : count));
    };

    const submitReport = (event) => {
        event.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div>
            <div className="mb-4">
                <h1 className="page-title mb-1">Report a Maintenance Issue</h1>
                <p className="text-secondary mb-0">Teacher workflow for fast triage, vendor assignment, and inspection-readiness evidence</p>
            </div>

            {submitted && (
                <div className="alert alert-success border-0 shadow-sm" role="alert">
                    <strong>Issue submitted successfully.</strong> Ticket #1042 created and Facilities Manager notified.
                </div>
            )}

            <form onSubmit={submitReport}>
                <div className="row g-3">
                    <div className="col-12 col-xl-6">
                        <div className="card border-0 shadow-sm mb-3">
                            <div className="card-body">
                                <h2 className="h5 fw-bold mb-3">Location and Category</h2>

                                <label className="form-label fw-semibold">Room / Location</label>
                                <select className="form-select mb-3">
                                    <option>Room 203 (My Classroom)</option>
                                    <option>Hallway - 2nd Floor</option>
                                    <option>Restroom - 2nd Floor</option>
                                    <option>Gymnasium</option>
                                    <option>Cafeteria</option>
                                    <option>Library</option>
                                </select>

                                <label className="form-label fw-semibold">Issue Category</label>
                                <select className="form-select mb-3" value={issueCategory} onChange={(e) => setIssueCategory(e.target.value)}>
                                    <option>Safety / Fire Hazard</option>
                                    <option>Electrical</option>
                                    <option>Plumbing / Water</option>
                                    <option>HVAC / Temperature</option>
                                    <option>Windows / Doors</option>
                                    <option>Structural / Ceiling / Floor</option>
                                    <option>Cleaning / Sanitation</option>
                                    <option>Lighting</option>
                                    <option>Technology / AV</option>
                                </select>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="form-label fw-semibold mb-0">Regulation Codes</label>
                                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowCodePopup(true)}>
                                        <Search size={13} className="me-1" />Lookup and Select Codes
                                    </button>
                                </div>

                                <div className="alert alert-secondary mb-3 small">
                                    {selectedCodes.length === 0
                                        ? 'No code selected yet. Select relevant regulation codes to score severity automatically.'
                                        : `${selectedCodes.length} code(s) selected and linked to this issue.`}
                                </div>

                                <label className="form-label fw-semibold">Severity Level (Auto)</label>
                                <div className="d-flex align-items-center gap-2">
                                    <span className={`badge ${importanceBadge[autoSeverity.importance]}`}>{autoSeverity.level}</span>
                                    <small className="text-secondary">Calculated from selected regulation importance</small>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h2 className="h5 fw-bold mb-3">Photo Evidence</h2>
                                <button type="button" className="btn btn-outline-primary w-100 py-3 border-dashed" onClick={addPhoto}>
                                    Add Photo
                                </button>
                                <div className="d-flex flex-wrap gap-2 mt-3">
                                    {photoStamps.map((stamp, index) => (
                                        <div key={`${stamp}-${index}`} className="photo-thumb">{stamp}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-xl-6">
                        <div className="card border-0 shadow-sm mb-3">
                            <div className="card-body">
                                <h2 className="h5 fw-bold mb-3">Issue Description</h2>
                                <label className="form-label fw-semibold">Issue Title</label>
                                <input className="form-control mb-3" type="text" placeholder="Broken ceiling tile near window" />

                                <label className="form-label fw-semibold">Detailed Description</label>
                                <textarea className="form-control mb-3" rows="4" placeholder="Describe what is broken and if there is a safety risk." />

                                <label className="form-label fw-semibold">First Noticed</label>
                                <input className="form-control mb-3" type="date" />

                                <label className="form-label fw-semibold">Impact on Class Operations</label>
                                <select className="form-select">
                                    <option>No - room remains usable</option>
                                    <option>Slightly - minor disruption</option>
                                    <option>Yes - class relocated</option>
                                </select>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mb-3">
                            <div className="card-body">
                                <h2 className="h5 fw-bold mb-3">Building Code Flag</h2>
                                {selectedCodes.length === 0 ? (
                                    <p className="small text-secondary mb-0">No regulation codes linked yet. Use "Lookup and Select Codes" to attach applicable standards.</p>
                                ) : (
                                    <ul className="list-group list-group-flush">
                                        {regulationCodes
                                            .filter((item) => selectedCodes.includes(item.id))
                                            .map((item) => (
                                                <li key={item.id} className="list-group-item px-0 d-flex justify-content-between align-items-start">
                                                    <div>
                                                        <div className="fw-semibold">{item.code} - {item.title}</div>
                                                        <small className="text-secondary">{item.explanation}</small>
                                                    </div>
                                                    <span className={`badge ${importanceBadge[item.importance]}`}>{importanceLabel[item.importance]}</span>
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill">Submit Report</button>
                    </div>
                </div>
            </form>

            {showCodePopup && (
                <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(19, 29, 44, 0.45)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Select Applicable Regulation Codes</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowCodePopup(false)} />
                            </div>
                            <div className="modal-body">
                                <p className="small text-secondary">Suggested for category: <strong>{issueCategory}</strong></p>
                                <div className="row g-2">
                                    {suggestedCodes.map((item) => (
                                        <div key={item.id} className="col-12">
                                            <label className="d-flex gap-2 border rounded p-3 w-100">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input mt-1"
                                                    checked={selectedCodes.includes(item.id)}
                                                    onChange={() => toggleCode(item.id)}
                                                />
                                                <div>
                                                    <div className="fw-semibold">{item.code} - {item.title}</div>
                                                    <div className="small text-secondary mb-1">{item.explanation}</div>
                                                    <span className={`badge ${importanceBadge[item.importance]}`}>{importanceLabel[item.importance]} importance</span>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="me-auto small text-secondary">Auto severity: <strong>{autoSeverity.level}</strong></div>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCodePopup(false)}>Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportIssuePage;
