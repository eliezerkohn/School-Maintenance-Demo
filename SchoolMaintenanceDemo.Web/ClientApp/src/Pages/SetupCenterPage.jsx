import React, { useEffect, useState } from 'react';

const defaultUsers = [
    { id: 1, name: 'Angela Morris', role: 'secretary', email: 'angela@brightpath.edu' },
    { id: 2, name: 'Dana Plumb', role: 'manager', email: 'dana@brightpath.edu' },
    { id: 3, name: 'Lena Park', role: 'compliance', email: 'lena@brightpath.edu' }
];

const defaultLocations = [
    { id: 1, name: 'Room 104', floor: '1', building: 'Main Academic Building' },
    { id: 2, name: 'Room 201', floor: '2', building: 'Main Academic Building' },
    { id: 3, name: 'Gymnasium', floor: '1', building: 'Main Academic Building' }
];

const SetupCenterPage = () => {
    const [buildingForm, setBuildingForm] = useState({
        organizationName: 'Bright Path Education Group',
        schoolName: 'Bright Path Academy',
        buildingName: 'Main Academic Building',
        address: '1200 Learning Ave, Brooklyn, NY',
        inspectionDate: '2026-03-30'
    });

    const [users, setUsers] = useState(defaultUsers);
    const [userForm, setUserForm] = useState({ name: '', role: 'teacher', email: '' });

    const [locations, setLocations] = useState(defaultLocations);
    const [locationForm, setLocationForm] = useState({ name: '', floor: '', building: 'Main Academic Building' });
    const [savedMessage, setSavedMessage] = useState('');

    useEffect(() => {
        const storedLocations = window.localStorage.getItem('schoolcare-locations');
        if (storedLocations) {
            try {
                const parsed = JSON.parse(storedLocations);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setLocations(parsed);
                }
            } catch {
                // Ignore malformed demo data and keep defaults.
            }
        }
    }, []);

    const addUser = (event) => {
        event.preventDefault();
        if (!userForm.name.trim() || !userForm.email.trim()) {
            return;
        }

        setUsers((current) => [
            ...current,
            {
                id: Date.now(),
                name: userForm.name.trim(),
                role: userForm.role,
                email: userForm.email.trim()
            }
        ]);

        setUserForm({ name: '', role: 'teacher', email: '' });
    };

    const addLocation = (event) => {
        event.preventDefault();
        if (!locationForm.name.trim()) {
            return;
        }

        const next = [
            ...locations,
            {
                id: Date.now(),
                name: locationForm.name.trim(),
                floor: locationForm.floor.trim() || 'N/A',
                building: locationForm.building.trim() || 'Main Academic Building'
            }
        ];

        setLocations(next);
        setLocationForm({ name: '', floor: '', building: buildingForm.buildingName || 'Main Academic Building' });
        window.localStorage.setItem('schoolcare-locations', JSON.stringify(next));
    };

    const saveSetup = () => {
        window.localStorage.setItem('schoolcare-building-setup', JSON.stringify(buildingForm));
        window.localStorage.setItem('schoolcare-users', JSON.stringify(users));
        window.localStorage.setItem('schoolcare-locations', JSON.stringify(locations));
        setSavedMessage('Setup saved for manager/admin/compliance workflows.');
        setTimeout(() => setSavedMessage(''), 2500);
    };

    return (
        <div>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <h1 className="page-title mb-1">Setup Center</h1>
                    <p className="text-secondary mb-0">Central setup for users, buildings, classrooms, and locations used across manager, admin, and compliance pages.</p>
                </div>
                <button type="button" className="btn btn-primary px-4" onClick={saveSetup}>Save Setup</button>
            </div>

            {savedMessage && <div className="alert alert-success py-2">{savedMessage}</div>}

            <div className="row g-3 mb-4">
                <div className="col-12 col-xl-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-3">Organization and Building Info</h2>
                            <div className="row g-2">
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Organization</label>
                                    <input className="form-control" value={buildingForm.organizationName} onChange={(e) => setBuildingForm((c) => ({ ...c, organizationName: e.target.value }))} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">School</label>
                                    <input className="form-control" value={buildingForm.schoolName} onChange={(e) => setBuildingForm((c) => ({ ...c, schoolName: e.target.value }))} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Building</label>
                                    <input className="form-control" value={buildingForm.buildingName} onChange={(e) => setBuildingForm((c) => ({ ...c, buildingName: e.target.value }))} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Address</label>
                                    <input className="form-control" value={buildingForm.address} onChange={(e) => setBuildingForm((c) => ({ ...c, address: e.target.value }))} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Upcoming Inspection Date</label>
                                    <input type="date" className="form-control" value={buildingForm.inspectionDate} onChange={(e) => setBuildingForm((c) => ({ ...c, inspectionDate: e.target.value }))} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-6">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-3">Add Users</h2>
                            <form className="row g-2 mb-3" onSubmit={addUser}>
                                <div className="col-md-5">
                                    <label className="form-label fw-semibold">Name</label>
                                    <input className="form-control" value={userForm.name} onChange={(e) => setUserForm((c) => ({ ...c, name: e.target.value }))} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold">Role</label>
                                    <select className="form-select" value={userForm.role} onChange={(e) => setUserForm((c) => ({ ...c, role: e.target.value }))}>
                                        <option value="teacher">Teacher</option>
                                        <option value="secretary">Secretary</option>
                                        <option value="manager">Manager</option>
                                        <option value="compliance">Compliance</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input className="form-control" value={userForm.email} onChange={(e) => setUserForm((c) => ({ ...c, email: e.target.value }))} />
                                </div>
                                <div className="col-12 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-outline-primary">Add User</button>
                                </div>
                            </form>

                            <div className="table-responsive">
                                <table className="table table-sm align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.role}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 modern-card">
                <div className="card-body">
                    <h2 className="h5 fw-bold mb-3">Classrooms and Locations</h2>
                    <form className="row g-2 mb-3" onSubmit={addLocation}>
                        <div className="col-md-5">
                            <label className="form-label fw-semibold">Location Name</label>
                            <input className="form-control" value={locationForm.name} onChange={(e) => setLocationForm((c) => ({ ...c, name: e.target.value }))} placeholder="Room 312" />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label fw-semibold">Floor</label>
                            <input className="form-control" value={locationForm.floor} onChange={(e) => setLocationForm((c) => ({ ...c, floor: e.target.value }))} placeholder="3" />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Building</label>
                            <input className="form-control" value={locationForm.building} onChange={(e) => setLocationForm((c) => ({ ...c, building: e.target.value }))} />
                        </div>
                        <div className="col-md-1 d-flex align-items-end">
                            <button type="submit" className="btn btn-primary w-100">Add</button>
                        </div>
                    </form>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Location</th>
                                    <th>Floor</th>
                                    <th>Building</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locations.map((location) => (
                                    <tr key={location.id}>
                                        <td>{location.name}</td>
                                        <td>{location.floor}</td>
                                        <td>{location.building}</td>
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

export default SetupCenterPage;
