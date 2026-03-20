import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    GraduationCap,
    ShieldAlert,
    TrendingUp,
    UserCog
} from 'lucide-react';

const rolePaths = [
    {
        title: 'Teacher Workflow',
        summary: 'Report issues from classrooms with photos and clear location details.',
        cta: 'Open Teacher View',
        to: '/report-issue',
        Icon: GraduationCap,
        tone: 'teacher',
        roleKey: 'teacher'
    },
    {
        title: 'Secretary Walkthrough',
        summary: 'Complete the biweekly checklist and flag items that need follow-up.',
        cta: 'Open Secretary View',
        to: '/secretary-walkthrough',
        Icon: ShieldAlert,
        tone: 'manager',
        roleKey: 'secretary'
    },
    {
        title: 'Manager Workflow',
        summary: 'Assign vendors, track SLAs, and keep work orders moving.',
        cta: 'Open Manager View',
        to: '/work-orders',
        Icon: UserCog,
        tone: 'manager',
        roleKey: 'manager'
    },
    {
        title: 'Admin Workflow',
        summary: 'Review trends, hotspot locations, and readiness status.',
        cta: 'Open Admin View',
        to: '/admin-insights',
        Icon: TrendingUp,
        tone: 'admin',
        roleKey: 'admin'
    }
];

const HomePage = () => {
    const [activeRole, setActiveRole] = useState('manager');

    useEffect(() => {
        const storedRole = window.localStorage.getItem('schoolcare-active-role');
        if (storedRole && ['teacher', 'secretary', 'manager', 'compliance', 'admin'].includes(storedRole)) {
            setActiveRole(storedRole);
        }

        const onRoleChanged = (event) => {
            if (event.detail) {
                setActiveRole(event.detail);
            }
        };

        window.addEventListener('schoolcare-role-changed', onRoleChanged);
        return () => window.removeEventListener('schoolcare-role-changed', onRoleChanged);
    }, []);

    const roleLabel = useMemo(() => {
        if (activeRole === 'teacher') return 'Teacher';
        if (activeRole === 'secretary') return 'Secretary';
        if (activeRole === 'compliance') return 'Compliance';
        if (activeRole === 'admin') return 'Admin';
        return 'Manager';
    }, [activeRole]);

    const setRoleContext = (roleKey) => {
        if (!roleKey) {
            return;
        }

        setActiveRole(roleKey);
        window.localStorage.setItem('schoolcare-active-role', roleKey);
        window.dispatchEvent(new CustomEvent('schoolcare-role-changed', { detail: roleKey }));
    };

    return (
        <div>
            <section className="landing-hero mb-4">
                <div className="landing-orb orb-a" />
                <div className="landing-orb orb-b" />
                <div className="row g-4 align-items-center">
                    <div className="col-12 col-xl-7">
                        <span className="landing-tag">Interactive Demo</span>
                        <h1 className="landing-title mt-3 mb-3">School maintenance and compliance demo</h1>
                        <p className="landing-subtitle mb-4">
                            Switch users on the left, then open the matching workflow.
                        </p>
                    </div>
                    <div className="col-12 col-xl-5">
                        <div className="landing-sidecard">
                            <h2 className="h5 fw-bold mb-3">Current demo role: {roleLabel}</h2>
                            <div className="d-flex flex-column gap-2">
                                <div className="landing-kpi"><span>Step 1</span><strong>Select a role</strong></div>
                                <div className="landing-kpi"><span>Step 2</span><strong>Open the role workflow</strong></div>
                                <div className="landing-kpi"><span>Step 3</span><strong>Use dashboard or mobile</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="card border-0 modern-card mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                        <div>
                            <h2 className="h5 fw-bold mb-1">Demo controls</h2>
                            <p className="text-secondary mb-0">Open desktop or mobile after selecting a role.</p>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            <Link to="/mobile-preview" className="btn btn-outline-primary">Mobile View</Link>
                            <Link to="/dashboard" className="btn btn-primary">Dashboard View</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="card border-0 modern-card mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-3">
                        <h2 className="h5 fw-bold mb-0">Demo scenarios by role</h2>
                        <small className="text-secondary">Each card opens a specific walkthrough path.</small>
                    </div>

                    <div className="row g-3">
                        {rolePaths.map((role) => (
                            <div key={role.title} className="col-12 col-md-6 col-xl-3">
                                <div className={`role-path-card role-${role.tone}`}>
                                    <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                                        <div className="icon-panel">
                                            <role.Icon size={18} />
                                        </div>
                                        <span className="badge text-bg-light text-dark">Scenario</span>
                                    </div>
                                    <h3 className="h6 fw-bold mb-2">{role.title}</h3>
                                    <p className="text-secondary small mb-3">{role.summary}</p>
                                    <Link to={role.to} className="btn btn-sm btn-outline-primary w-100" onClick={() => setRoleContext(role.roleKey)}>
                                        {role.cta} <ArrowRight size={12} className="ms-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
