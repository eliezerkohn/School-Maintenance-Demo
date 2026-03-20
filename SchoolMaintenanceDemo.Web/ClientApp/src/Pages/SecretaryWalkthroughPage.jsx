import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ClipboardCheck, ShieldAlert } from 'lucide-react';
import axios from 'axios';

const checklistTemplate = [
    { id: 'egress_signs', area: 'Exit signs and emergency lights', note: 'All signs visible, lit, and unobstructed.', critical: true },
    { id: 'egress_paths', area: 'Hallways and egress paths', note: 'No blocked doors, pathways, or fire exits.', critical: true },
    { id: 'electrical', area: 'Electrical outlets and exposed wiring', note: 'Outlet covers intact; no exposed conductors.', critical: true },
    { id: 'plumbing', area: 'Restrooms, sinks, and visible leaks', note: 'No active leaks or standing water.', critical: false },
    { id: 'ceiling', area: 'Ceiling tiles and water damage', note: 'No sagging tiles or visible water intrusion.', critical: false },
    { id: 'doors', area: 'Door locks, closers, and hinges', note: 'Doors latch safely and close correctly.', critical: false },
    { id: 'playground', area: 'Playground and exterior hazards', note: 'No broken equipment or tripping hazards.', critical: false },
    { id: 'cleaning', area: 'Sanitation and slip risks', note: 'No unsafe floor conditions or unresolved cleaning hazards.', critical: false }
];

const SecretaryWalkthroughPage = () => {
    const [secretaryName, setSecretaryName] = useState('Angela Morris');
    const [walkthroughDate, setWalkthroughDate] = useState('2026-03-17');
    const [checks, setChecks] = useState(
        checklistTemplate.reduce((acc, item) => {
            acc[item.id] = { checked: false, issueFound: false, notes: '' };
            return acc;
        }, {})
    );
    const [submitted, setSubmitted] = useState(false);
    const [classrooms, setClassrooms] = useState(() => {
        const stored = window.localStorage.getItem('schoolcare-locations');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch {
                // Fallback to demo defaults when setup data is invalid.
            }
        }

        return [
        { id: 1, name: 'Room 104', floor: '1' },
        { id: 2, name: 'Room 201', floor: '2' },
        { id: 3, name: 'Gymnasium', floor: '1' }
    ];
    });
    const [selectedClassroom, setSelectedClassroom] = useState('Room 104');
    const [walkthroughFiles, setWalkthroughFiles] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [uploading, setUploading] = useState(false);

    const completion = useMemo(() => {
        const total = checklistTemplate.length;
        const done = checklistTemplate.filter((item) => checks[item.id]?.checked).length;
        return Math.round((done / total) * 100);
    }, [checks]);

    const issueItems = useMemo(() => {
        return checklistTemplate.filter((item) => checks[item.id]?.issueFound);
    }, [checks]);

    const toggleCheck = (id) => {
        setChecks((current) => ({
            ...current,
            [id]: { ...current[id], checked: !current[id].checked }
        }));
    };

    const toggleIssueFound = (id) => {
        setChecks((current) => ({
            ...current,
            [id]: { ...current[id], issueFound: !current[id].issueFound }
        }));
    };

    const setItemNotes = (id, value) => {
        setChecks((current) => ({
            ...current,
            [id]: { ...current[id], notes: value }
        }));
    };

    const submitWalkthrough = () => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3500);
    };

    const uploadWalkthroughEvidence = async (event) => {
        event.preventDefault();
        setUploading(true);
        setUploadError('');
        setUploadMessage('');

        try {
            const payload = new FormData();
            payload.append('organizationName', 'Bright Path Education Group');
            payload.append('schoolName', 'Bright Path Academy');
            payload.append('buildingName', 'Main Academic Building');
            payload.append('documentType', 'Walkthrough Evidence');
            payload.append('permitNumber', '');
            payload.append('issuingAgency', 'Internal');
            payload.append('expiresAt', '');
            payload.append('requirementId', 'walkthrough');
            payload.append('notes', `Walkthrough evidence for ${selectedClassroom}`);

            walkthroughFiles.forEach((file) => payload.append('files', file));

            await axios.post('/api/Compliance/UploadDocument', payload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setUploadMessage('Walkthrough evidence uploaded. Compliance team can now verify this item.');
            setWalkthroughFiles([]);
        } catch (err) {
            setUploadError(err?.response?.data?.message || err.message || 'Walkthrough upload failed.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <h1 className="page-title mb-1">Secretary Facility Walkthrough</h1>
                    <p className="text-secondary mb-0">Use this checklist every 2 weeks to keep the campus ready for unannounced inspections.</p>
                </div>
                <span className="badge text-bg-warning fs-6">Required cadence: every 14 days</span>
            </div>

            {submitted && (
                <div className="alert alert-success border-0 shadow-sm" role="alert">
                    <strong>Walkthrough saved.</strong> {issueItems.length} flagged item(s) prepared for issue reporting and manager triage.
                </div>
            )}

            <div className="row g-3 mb-4">
                <div className="col-12 col-xl-8">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="row g-2 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Secretary Name</label>
                                    <input className="form-control" value={secretaryName} onChange={(e) => setSecretaryName(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Walkthrough Date</label>
                                    <input type="date" className="form-control" value={walkthroughDate} onChange={(e) => setWalkthroughDate(e.target.value)} />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2 className="h5 fw-bold mb-0 d-flex align-items-center gap-2"><ClipboardCheck size={18} />Campus Safety Checklist</h2>
                                <span className="badge text-bg-primary">{completion}% complete</span>
                            </div>

                            <div className="d-flex flex-column gap-2">
                                {checklistTemplate.map((item) => (
                                    <div key={item.id} className="check-item">
                                        <div className="d-flex flex-column flex-lg-row justify-content-between gap-2">
                                            <div>
                                                <div className="fw-semibold d-flex align-items-center gap-2">
                                                    {item.area}
                                                    {item.critical && <span className="badge text-bg-danger">Critical</span>}
                                                </div>
                                                <div className="small text-secondary">{item.note}</div>
                                            </div>
                                            <div className="d-flex flex-wrap align-items-center gap-2">
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm ${checks[item.id].checked ? 'btn-success' : 'btn-outline-success'}`}
                                                    onClick={() => toggleCheck(item.id)}
                                                >
                                                    <CheckCircle2 size={14} className="me-1" />
                                                    {checks[item.id].checked ? 'Checked' : 'Mark Checked'}
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm ${checks[item.id].issueFound ? 'btn-danger' : 'btn-outline-danger'}`}
                                                    onClick={() => toggleIssueFound(item.id)}
                                                >
                                                    <ShieldAlert size={14} className="me-1" />
                                                    {checks[item.id].issueFound ? 'Issue Flagged' : 'Flag Issue'}
                                                </button>
                                                {checks[item.id].issueFound && (
                                                    <Link to="/report-issue" className="btn btn-sm btn-outline-primary">
                                                        Click Report Issue
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                        <textarea
                                            rows="2"
                                            className="form-control mt-2"
                                            placeholder="Optional notes for this item"
                                            value={checks[item.id].notes}
                                            onChange={(e) => setItemNotes(item.id, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex gap-2 mt-3">
                                <button type="button" className="btn btn-primary px-4" onClick={submitWalkthrough}>Save Walkthrough</button>
                                <Link to="/report-issue" className="btn btn-outline-secondary px-4">Open Report Issue</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-4">
                    <div className="card border-0 modern-card mb-3">
                        <div className="card-body">
                            <h2 className="h6 fw-bold mb-3">Walkthrough Readiness</h2>
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <span className="small">Checklist completion</span>
                                <strong>{completion}%</strong>
                            </div>
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <span className="small">Flagged items</span>
                                <strong>{issueItems.length}</strong>
                            </div>
                            <div className="d-flex justify-content-between py-2">
                                <span className="small">Next walkthrough due</span>
                                <strong>Mar 31, 2026</strong>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 modern-card">
                        <div className="card-body">
                            <h2 className="h6 fw-bold mb-2">Potential Tickets from Walkthrough</h2>
                            {issueItems.length === 0 ? (
                                <p className="small text-secondary mb-0">No issues flagged yet. If a problem is found, it will appear here for quick issue reporting.</p>
                            ) : (
                                <ul className="list-group list-group-flush">
                                    {issueItems.map((item) => (
                                        <li key={item.id} className="list-group-item px-0">
                                            <div className="fw-semibold small">{item.area}</div>
                                            <div className="small text-secondary">{checks[item.id].notes || 'No notes added yet.'}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-2">Upload Walkthrough Evidence</h2>
                            <p className="small text-secondary">Upload walkthrough photos/checklists so manager and compliance can review quickly. Classroom/location setup is now managed in Setup Center.</p>

                            <form onSubmit={uploadWalkthroughEvidence}>
                                <div className="mb-2">
                                    <label className="form-label fw-semibold">Classroom / Area</label>
                                    <select className="form-select" value={selectedClassroom} onChange={(e) => setSelectedClassroom(e.target.value)}>
                                        {classrooms.map((room) => (
                                            <option key={room.id} value={room.name}>{room.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label className="form-label fw-semibold">Files</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        multiple
                                        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                                        onChange={(e) => setWalkthroughFiles(Array.from(e.target.files ?? []))}
                                        required
                                    />
                                </div>

                                {walkthroughFiles.length > 0 && (
                                    <small className="text-secondary d-block mb-2">Selected: {walkthroughFiles.map((file) => file.name).join(', ')}</small>
                                )}

                                <div className="d-flex flex-wrap gap-2">
                                    <button type="submit" className="btn btn-primary" disabled={uploading}>
                                        {uploading ? 'Uploading...' : 'Upload Walkthrough Files'}
                                    </button>
                                    <Link to="/setup-center" className="btn btn-outline-primary">Open Setup Center</Link>
                                    <Link to="/compliance" className="btn btn-outline-secondary">Open Compliance Center</Link>
                                </div>

                                {uploadMessage && <div className="alert alert-success py-2 mt-2 mb-0">{uploadMessage}</div>}
                                {uploadError && <div className="alert alert-danger py-2 mt-2 mb-0">{uploadError}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SecretaryWalkthroughPage;
