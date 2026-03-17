import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="app-shell">
            <header className="sticky-top">
                <nav className="navbar navbar-expand-lg navbar-dark top-nav">
                    <div className="container">
                        <Link to="/" className="navbar-brand fw-bold text-light fs-4 brand-mark">
                            School <span className="brand-accent">Facilities</span>
                        </Link>
                        <button
                            className="navbar-toggler border-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#schoolcareNav"
                            aria-controls="schoolcareNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="schoolcareNav">
                            <ul className="navbar-nav me-auto mb-3 mb-lg-0 gap-lg-1">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link px-3 nav-pill">Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/report-issue" className="nav-link px-3 nav-pill">Report Issue</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/work-orders" className="nav-link px-3 nav-pill">Work Orders</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/compliance" className="nav-link px-3 nav-pill">Compliance</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/regulation-codes" className="nav-link px-3 nav-pill">Regulation Codes</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin-insights" className="nav-link px-3 nav-pill">Admin Insights</NavLink>
                                </li>
                            </ul>
                            <div className="d-flex align-items-center text-light user-chip px-3 py-2 rounded-pill">
                                <div className="avatar-circle me-2">JD</div>
                                <div>
                                    <div className="small fw-semibold lh-1">J. Davis</div>
                                    <div className="x-small opacity-75">Facilities Manager</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="container py-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;