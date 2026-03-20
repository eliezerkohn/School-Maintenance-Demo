import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
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
                <p className="text-secondary mb-0">Teacher view: report classroom issues quickly, link applicable codes, and trigger accurate severity scoring for faster triage.</p>
            </div>

            {submitted && (
                <div className="alert border-0 shadow-sm py-3" style={{ background: 'linear-gradient(120deg,#dcfce7,#d1fae5)', borderLeft: '4px solid #16a34a' }} role="alert">
                    <div className="fw-bold text-success mb-1">Issue submitted — Ticket #1042 created</div>
                    <div className="text-secondary small mb-2">Facilities manager has been notified. The ticket now appears in Work Orders for vendor dispatch.</div>
                    <Link to="/work-orders" className="btn btn-success btn-sm px-3">
                        View in Work Orders <ArrowRight size={13} className="ms-1" />
                    </Link>
                </div>
            )}

            <form onSubmit={submitReport}>
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-12">
                                <h2 className="h5 fw-bold mb-2">Issue Details</h2>
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">Room / Location</label>
                                <select className="form-select">
                                    <option>Room 203 (My Classroom)</option>
                                    <option>Hallway - 2nd Floor</option>
                                    <option>Restroom - 2nd Floor</option>
                                    <option>Gymnasium</option>
                                    <option>Cafeteria</option>
                                    <option>Library</option>
                                </select>
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">Issue Category</label>
                                <select className="form-select" value={issueCategory} onChange={(e) => setIssueCategory(e.target.value)}>
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
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">Issue Title</label>
                                <input className="form-control" type="text" defaultValue="Broken Exit Sign – Room 104" />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">Detailed Description</label>
                                <textarea className="form-control" rows="4" defaultValue="The illuminated exit sign above the east hallway door has been dark for 3 days. This is a fire safety concern that impacts emergency egress visibility in the classroom." />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">First Noticed</label>
                                <input className="form-control" type="date" defaultValue="2026-03-15" />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">Impact on Class Operations</label>
                                <select className="form-select">
                                    <option>No - room remains usable</option>
                                    <option>Slightly - minor disruption</option>
                                    <option>Yes - class relocated</option>
                                </select>
                            </div>

                            <div className="col-12 d-flex justify-content-between align-items-center">
                                <label className="form-label fw-semibold mb-0">Regulation Codes</label>
                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowCodePopup(true)}>
                                    <Search size={13} className="me-1" />Lookup and Select Codes
                                </button>
                            </div>

                            <div className="col-12">
                                <div className="alert alert-secondary mb-0 small">
                                    {selectedCodes.length === 0
                                        ? 'No code selected yet.'
                                        : `${selectedCodes.length} code(s) selected.`}
                                </div>
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">Severity Level (Auto)</label>
                                <div className="d-flex align-items-center gap-2">
                                    <span className={`badge ${importanceBadge[autoSeverity.importance]}`}>{autoSeverity.level}</span>
                                </div>
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">Photo Evidence</label>
                                <button type="button" className="btn btn-outline-primary w-100 border-dashed" onClick={addPhoto}>
                                    Add Photo
                                </button>
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {photoStamps.map((stamp, index) => (
                                        <div key={`${stamp}-${index}`} className="photo-thumb">{stamp}</div>
                                    ))}
                                </div>
                            </div>

                            {selectedCodes.length > 0 && (
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Selected Code Flags</label>
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
                                </div>
                            )}

                            <div className="col-12">
                                <button type="submit" className="btn btn-primary w-100">Submit Report</button>
                            </div>
                        </div>
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
