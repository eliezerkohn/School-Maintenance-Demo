import React, { useMemo, useState } from 'react';
import { Camera, CheckCircle2, FileText, Send, ShieldAlert } from 'lucide-react';

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

const photoEvidence = [
    { id: 'P-901', itemId: 'C-1041', title: 'Exit Sign Repair - Before', location: 'Room 104', capturedBy: 'Ms. Torres', time: '09:20 AM', attached: true },
    { id: 'P-902', itemId: 'C-1041', title: 'Exit Sign Repair - After', location: 'Room 104', capturedBy: 'Mark Rivera', time: '10:05 AM', attached: true },
    { id: 'P-903', itemId: 'C-1038', title: 'Outlet Cover Replacement', location: 'Room 201', capturedBy: 'Mark Rivera', time: '11:10 AM', attached: false },
    { id: 'P-904', itemId: 'C-1040', title: 'Gym Leak Area Mitigation', location: 'Gymnasium', capturedBy: 'Dana Plumb', time: '01:45 PM', attached: false }
];

const statusTone = {
    Open: 'text-bg-danger',
    'In Progress': 'text-bg-warning',
    Resolved: 'text-bg-success'
};

const CompliancePage = () => {
    const [selectedPhotos, setSelectedPhotos] = useState(photoEvidence.filter((p) => p.attached).map((p) => p.id));
    const [reportGeneratedAt, setReportGeneratedAt] = useState('');

    const metrics = useMemo(() => {
        const open = correctiveItems.filter((x) => x.status === 'Open').length;
        const inProgress = correctiveItems.filter((x) => x.status === 'In Progress').length;
        return { open, inProgress };
    }, []);

    const selectedCount = selectedPhotos.length;
    const packetReady = metrics.open === 0 && selectedCount >= 3;

    const togglePhoto = (photoId) => {
        setSelectedPhotos((current) =>
            current.includes(photoId)
                ? current.filter((id) => id !== photoId)
                : [...current, photoId]
        );
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
                    <p className="text-secondary mb-0">Track required corrections, verify evidence, and prepare a clean submission packet for the building department</p>
                </div>
                <button onClick={generatePacket} className="btn btn-primary px-4">
                    <FileText size={16} className="me-2" />Generate Building Department Packet
                </button>
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
                                <span className="small">Work order links verified</span>
                                <span className="badge text-bg-success">Done</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                <span className="small">Photo evidence selected</span>
                                <span className={`badge ${selectedCount >= 3 ? 'text-bg-success' : 'text-bg-warning'}`}>{selectedCount} files</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center py-2">
                                <span className="small">Packet ready to send</span>
                                <span className={`badge ${packetReady ? 'text-bg-success' : 'text-bg-warning'}`}>{packetReady ? 'Ready' : 'Review'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 modern-card">
                        <div className="card-body">
                            <h2 className="h6 fw-bold mb-2">Building Department Submission</h2>
                            <p className="small text-secondary mb-3">Packet contains correction table, linked tickets, and selected before/after evidence photos.</p>
                            {reportGeneratedAt ? (
                                <div className="alert alert-success py-2 small mb-3">Packet generated at {reportGeneratedAt}</div>
                            ) : (
                                <div className="alert alert-secondary py-2 small mb-3">No packet generated yet.</div>
                            )}
                            <button onClick={generatePacket} className="btn btn-success w-100">
                                <Send size={16} className="me-2" />Generate and Prepare to Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 modern-card mb-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="h5 fw-bold mb-0">Photo Evidence Library</h2>
                        <button className="btn btn-outline-secondary btn-sm">
                            <Camera size={14} className="me-1" />Upload New Proof Photo
                        </button>
                    </div>

                    <div className="row g-3">
                        {photoEvidence.map((photo) => (
                            <div key={photo.id} className="col-12 col-md-6 col-xl-3">
                                <div className="card h-100 border-0 bg-light-subtle">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <span className="badge text-bg-secondary">{photo.itemId}</span>
                                            <div className="form-check m-0">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={selectedPhotos.includes(photo.id)}
                                                    onChange={() => togglePhoto(photo.id)}
                                                    id={photo.id}
                                                />
                                            </div>
                                        </div>
                                        <div className="fw-semibold">{photo.title}</div>
                                        <small className="text-secondary d-block mb-2">{photo.location}</small>
                                        <div className="small text-secondary">
                                            Captured by {photo.capturedBy}
                                        </div>
                                        <div className="small text-secondary">{photo.time}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompliancePage;
