import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Upload } from 'lucide-react';
import axios from 'axios';

const ComplianceDocumentsPage = () => {
    const [uploadForm, setUploadForm] = useState({
        organizationName: 'Bright Path Education Group',
        schoolName: 'Bright Path Academy',
        buildingName: 'Main Academic Building',
        documentType: 'Elevator Certificate',
        permitNumber: '',
        issuingAgency: 'DOB',
        expiresAt: '',
        requirementId: '301',
        notes: ''
    });
    const [uploadFiles, setUploadFiles] = useState([]);
    const [recentDocuments, setRecentDocuments] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [uploading, setUploading] = useState(false);

    const loadRecentDocuments = async () => {
        const { data } = await axios.get('/api/Compliance/RecentDocuments', {
            params: { take: 20 }
        });
        setRecentDocuments(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        loadRecentDocuments();
    }, []);

    const onUploadInput = (e) => {
        const { name, value } = e.target;
        setUploadForm((prev) => ({ ...prev, [name]: value }));
    };

    const submitDocumentUpload = async (event) => {
        event.preventDefault();
        setUploading(true);
        setUploadError('');
        setUploadMessage('');

        try {
            const payload = new FormData();
            Object.entries(uploadForm).forEach(([key, value]) => payload.append(key, value));
            uploadFiles.forEach((file) => payload.append('files', file));

            await axios.post('/api/Compliance/UploadDocument', payload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setUploadMessage('Compliance document uploaded and linked to the evidence trail.');
            setUploadFiles([]);
            await loadRecentDocuments();
        } catch (err) {
            setUploadError(err?.response?.data?.message || err.message || 'Upload failed.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <h1 className="page-title mb-1">Compliance Documents</h1>
                    <p className="text-secondary mb-0">Dedicated upload area for permits, certificates, and inspection files so compliance evidence and correction workflows stay uncluttered.</p>
                </div>
                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-secondary" onClick={loadRecentDocuments}>Refresh List</button>
                    <Link to="/compliance" className="btn btn-primary px-4">
                        Back to Compliance <ArrowRight size={15} className="ms-1" />
                    </Link>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-2 text-primary mb-2"><Upload size={16} />Upload Scope</div>
                            <div className="display-6 fw-bold mb-0">Permits + Certs</div>
                            <small className="text-secondary">permits_certificates.csv mapping with school/building metadata</small>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-2 text-success mb-2"><FileText size={16} />Recent Documents</div>
                            <div className="display-6 fw-bold mb-0">{recentDocuments.length}</div>
                            <small className="text-secondary">Last 20 uploaded files from managers, secretary walkthrough, and compliance users</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 modern-card mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-2 mb-3">
                        <h2 className="h5 fw-bold mb-0">Manager/Admin Permits and Certificates Upload</h2>
                        <small className="text-secondary">Upload elevator, boiler, occupancy, and inspection evidence files.</small>
                    </div>

                    <form onSubmit={submitDocumentUpload}>
                        <div className="row g-2">
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Organization</label>
                                <input className="form-control" name="organizationName" value={uploadForm.organizationName} onChange={onUploadInput} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">School</label>
                                <input className="form-control" name="schoolName" value={uploadForm.schoolName} onChange={onUploadInput} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Building</label>
                                <input className="form-control" name="buildingName" value={uploadForm.buildingName} onChange={onUploadInput} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Document Type</label>
                                <select className="form-select" name="documentType" value={uploadForm.documentType} onChange={onUploadInput}>
                                    <option>Elevator Certificate</option>
                                    <option>Boiler Inspection Filing</option>
                                    <option>Certificate of Occupancy</option>
                                    <option>Fire Alarm Certification</option>
                                    <option>Sprinkler Inspection Report</option>
                                    <option>Inspection Report</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Permit Number</label>
                                <input className="form-control" name="permitNumber" value={uploadForm.permitNumber} onChange={onUploadInput} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Issuing Agency</label>
                                <input className="form-control" name="issuingAgency" value={uploadForm.issuingAgency} onChange={onUploadInput} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Requirement ID</label>
                                <input className="form-control" name="requirementId" value={uploadForm.requirementId} onChange={onUploadInput} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Expires At</label>
                                <input type="date" className="form-control" name="expiresAt" value={uploadForm.expiresAt} onChange={onUploadInput} />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold">Notes</label>
                                <textarea rows="2" className="form-control" name="notes" value={uploadForm.notes} onChange={onUploadInput} />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold">Upload Document Files</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    multiple
                                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                                    onChange={(e) => setUploadFiles(Array.from(e.target.files ?? []))}
                                    required
                                />
                                {uploadFiles.length > 0 && (
                                    <small className="text-secondary">Selected: {uploadFiles.map((file) => file.name).join(', ')}</small>
                                )}
                            </div>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Upload Compliance Document'}
                            </button>
                            <button type="button" className="btn btn-outline-secondary" onClick={loadRecentDocuments}>Refresh Documents</button>
                        </div>
                        {uploadMessage && <div className="alert alert-success mt-2 mb-0 py-2">{uploadMessage}</div>}
                        {uploadError && <div className="alert alert-danger mt-2 mb-0 py-2">{uploadError}</div>}
                    </form>
                </div>
            </div>

            <div className="card border-0 modern-card mb-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h2 className="h5 fw-bold mb-0">Recent Uploaded Compliance Documents</h2>
                        <small className="text-secondary">compliance_evidence.csv and permits_certificates.csv demo mapping</small>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Uploaded</th>
                                    <th>School / Building</th>
                                    <th>Type</th>
                                    <th>Agency</th>
                                    <th>Requirement</th>
                                    <th>File</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentDocuments.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center">No uploaded compliance documents yet.</td>
                                    </tr>
                                )}
                                {recentDocuments.map((doc, index) => (
                                    <tr key={`${doc.fileUrl}-${index}`}>
                                        <td>{doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleString() : 'N/A'}</td>
                                        <td>{doc.schoolName} / {doc.buildingName}</td>
                                        <td>{doc.documentType}</td>
                                        <td>{doc.issuingAgency || 'N/A'}</td>
                                        <td>{doc.requirementId || 'N/A'}</td>
                                        <td><a href={doc.fileUrl} target="_blank" rel="noreferrer">{doc.fileName || 'Open'}</a></td>
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

export default ComplianceDocumentsPage;