import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import eiproLogo from '../assets/eipro-logo.svg';

const roleLinks = {
    teacher: [
        { to: '/', label: 'Home', end: true },
        { to: '/report-issue', label: 'Report Issue' }
    ],
    secretary: [
        { to: '/', label: 'Home', end: true },
        { to: '/secretary-walkthrough', label: 'Walkthrough' },
        { to: '/report-issue', label: 'Report Issue' }
    ],
    manager: [
        { to: '/', label: 'Home', end: true },
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/work-orders', label: 'Work Orders' },
        { to: '/setup-center', label: 'Setup Center' },
        { to: '/compliance-documents', label: 'Compliance Docs' },
        { to: '/report-preview', label: 'Compliance Report' }
    ],
    compliance: [
        { to: '/', label: 'Home', end: true },
        { to: '/compliance', label: 'Compliance' },
        { to: '/setup-center', label: 'Setup Center' },
        { to: '/compliance-documents', label: 'Compliance Docs' },
        { to: '/regulation-codes', label: 'Regulation Codes' },
        { to: '/report-preview', label: 'Compliance Report' }
    ],
    admin: [
        { to: '/', label: 'Home', end: true },
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/admin-insights', label: 'Admin Insights' },
        { to: '/setup-center', label: 'Setup Center' },
        { to: '/regulation-codes', label: 'Regulation Codes' },
        { to: '/report-preview', label: 'Compliance Report' }
    ]
};

const roleTabs = [
    { key: 'teacher', label: 'Teacher' },
    { key: 'secretary', label: 'Secretary' },
    { key: 'manager', label: 'Manager' },
    { key: 'compliance', label: 'Compliance' },
    { key: 'admin', label: 'Admin' }
];

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeRole, setActiveRole] = useState('manager');
    const [mobilePreviewPath, setMobilePreviewPath] = useState('/');

    useEffect(() => {
        const storedRole = window.localStorage.getItem('schoolcare-active-role');
        if (storedRole && roleLinks[storedRole]) {
            setActiveRole(storedRole);
        }

        const storedMobilePath = window.localStorage.getItem('schoolcare-mobile-preview-path');
        if (storedMobilePath) {
            setMobilePreviewPath(storedMobilePath);
        }

        const onRoleChanged = (event) => {
            if (event.detail && roleLinks[event.detail]) {
                setActiveRole(event.detail);
            }
        };

        const onStorageChanged = (event) => {
            if (event.key === 'schoolcare-active-role' && event.newValue && roleLinks[event.newValue]) {
                setActiveRole(event.newValue);
            }

            if (event.key === 'schoolcare-mobile-preview-path' && event.newValue) {
                setMobilePreviewPath(event.newValue);
            }
        };

        window.addEventListener('schoolcare-role-changed', onRoleChanged);
        window.addEventListener('storage', onStorageChanged);

        return () => {
            window.removeEventListener('schoolcare-role-changed', onRoleChanged);
            window.removeEventListener('storage', onStorageChanged);
        };
    }, []);

    const navLinks = useMemo(() => roleLinks[activeRole] || roleLinks.manager, [activeRole]);
    const isMobilePreviewRoute = location.pathname === '/mobile-preview';

    const resolveRoleRoute = (path, roleKey) => {
        const links = roleLinks[roleKey] || roleLinks.manager;
        const hasPath = links.some((item) => item.to === path);
        if (hasPath) {
            return path;
        }

        return (links.find((item) => item.to !== '/') || links[0] || { to: '/' }).to;
    };

    const onRoleSelect = (roleKey) => {
        setActiveRole(roleKey);
        window.localStorage.setItem('schoolcare-active-role', roleKey);
        window.dispatchEvent(new CustomEvent('schoolcare-role-changed', { detail: roleKey }));

        const links = roleLinks[roleKey] || roleLinks.manager;
        const defaultLink = links.find((item) => item.to !== '/') || links[0] || { to: '/' };

        if (isMobilePreviewRoute) {
            setMobilePreviewPath(defaultLink.to);
            window.localStorage.setItem('schoolcare-mobile-preview-path', defaultLink.to);
            window.dispatchEvent(new CustomEvent('schoolcare-mobile-page-changed', { detail: defaultLink.to }));
            return;
        }

        navigate(defaultLink.to);
    };

    const onTopNavClick = (event, to) => {
        if (!isMobilePreviewRoute) {
            return;
        }

        event.preventDefault();
        setMobilePreviewPath(to);
        window.localStorage.setItem('schoolcare-mobile-preview-path', to);
        window.dispatchEvent(new CustomEvent('schoolcare-mobile-page-changed', { detail: to }));
    };

    const onSidebarLinkClick = (event, to) => {
        if (!isMobilePreviewRoute) {
            return;
        }

        event.preventDefault();
        setMobilePreviewPath(to);
        window.localStorage.setItem('schoolcare-mobile-preview-path', to);
        window.dispatchEvent(new CustomEvent('schoolcare-mobile-page-changed', { detail: to }));
    };

    const onMobileViewClick = (event) => {
        if (isMobilePreviewRoute) {
            return;
        }

        event.preventDefault();
        const nextMobilePath = resolveRoleRoute(location.pathname, activeRole);
        setMobilePreviewPath(nextMobilePath);
        window.localStorage.setItem('schoolcare-mobile-preview-path', nextMobilePath);
        window.dispatchEvent(new CustomEvent('schoolcare-mobile-page-changed', { detail: nextMobilePath }));
        navigate('/mobile-preview');
    };

    const onPcViewClick = (event) => {
        event.preventDefault();

        if (!isMobilePreviewRoute) {
            navigate(resolveRoleRoute(location.pathname, activeRole));
            return;
        }

        const targetPath = resolveRoleRoute(mobilePreviewPath, activeRole);
        navigate(targetPath);
    };

    return (
        <div className="app-shell">
            <header className="sticky-top">
                <nav className="navbar navbar-expand-lg navbar-dark top-nav">
                    <div className="container">
                        <Link to="/" className="navbar-brand fw-bold text-light fs-4 brand-mark">
                            SchoolCare Demo
                            <span className="demo-mode-badge ms-2">Demo Mode</span>
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
                                {navLinks.map((item) => (
                                    <li className="nav-item" key={item.to}>
                                        <NavLink
                                            to={item.to}
                                            className={({ isActive }) => {
                                                const activeClass = isMobilePreviewRoute
                                                    ? (mobilePreviewPath === item.to ? 'active' : '')
                                                    : (isActive ? 'active' : '');
                                                return `nav-link px-3 nav-pill nav-pill-button ${activeClass}`;
                                            }}
                                            end={item.end}
                                            onClick={(event) => onTopNavClick(event, item.to)}
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                            <span className="role-chip">Viewing as: {roleTabs.find((role) => role.key === activeRole)?.label}</span>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="layout-body container-fluid">
                <aside className="role-sidebar">
                    <div className="role-sidebar-scroll">
                        <div className="role-sidebar-title">Users</div>
                        <div className="role-sidebar-subtitle">Select user type</div>

                        <div className="role-sidebar-users" role="tablist" aria-label="Select application user type">
                            {roleTabs.map((role) => (
                                <button
                                    key={role.key}
                                    type="button"
                                    className={`role-sidebar-btn ${activeRole === role.key ? 'active' : ''}`}
                                    onClick={() => onRoleSelect(role.key)}
                                >
                                    {role.label}
                                </button>
                            ))}
                        </div>

                        <div className="role-sidebar-block">
                            <div className="role-sidebar-label">Quick Access</div>
                            <Link
                                to={isMobilePreviewRoute ? resolveRoleRoute(mobilePreviewPath, activeRole) : resolveRoleRoute(location.pathname, activeRole)}
                                className={`btn btn-sm w-100 mb-2 ${isMobilePreviewRoute ? 'btn-outline-secondary' : 'btn-primary'}`}
                                onClick={onPcViewClick}
                            >
                                PC View
                            </Link>
                            <Link
                                to="/mobile-preview"
                                className={`btn btn-sm w-100 ${isMobilePreviewRoute ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={onMobileViewClick}
                            >
                                Mobile View
                            </Link>
                        </div>

                        <div className="role-sidebar-block">
                            <div className="role-sidebar-label">Links For This User</div>
                            <div className="role-sidebar-links">
                                {navLinks.map((item) => (
                                    <NavLink
                                        key={`side-${item.to}`}
                                        to={item.to}
                                        end={item.end}
                                        className={({ isActive }) => {
                                            const activeClass = isMobilePreviewRoute
                                                ? (mobilePreviewPath === item.to ? 'active' : '')
                                                : (isActive ? 'active' : '');
                                            return `role-sidebar-link ${activeClass}`;
                                        }}
                                        onClick={(event) => onSidebarLinkClick(event, item.to)}
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="role-sidebar-brand" aria-label="Eipro logo">
                        <img src={eiproLogo} alt="Eipro Software Solutions" className="role-sidebar-brand-logo" />
                    </div>
                </aside>

                <main className="app-main-content">
                    <div className="container page-shell content-trim">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;