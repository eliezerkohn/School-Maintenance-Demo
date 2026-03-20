import React, { useEffect, useMemo, useState } from 'react';

const roleMeta = {
    teacher: { label: 'Teacher' },
    secretary: { label: 'Secretary' },
    manager: { label: 'Manager' },
    compliance: { label: 'Compliance' },
    admin: { label: 'Admin' }
};

const baseActions = {
    teacher: ['Report Issue', 'Attach Photo', 'Submit'],
    secretary: ['Run Checklist', 'Flag Risk', 'Escalate'],
    manager: ['Assign Vendor', 'Set SLA', 'Track'],
    compliance: ['Review Item', 'Add Evidence', 'Prepare Packet'],
    admin: ['Review Trend', 'Check Risks', 'Share Summary']
};

const buildPageModel = (roleKey, roleLabel, path) => {
    const common = {
        roleLabel,
        pagePath: path,
        title: `${roleLabel} Mobile`,
        subtitle: 'Current screen',
        kpis: [
            { label: 'Open', value: '16' },
            { label: 'Urgent', value: '3' },
            { label: 'Due Today', value: '5' }
        ],
        actions: baseActions[roleKey] || baseActions.manager,
        sections: []
    };

    if (path === '/report-issue') {
        return {
            ...common,
            title: `${roleLabel} Issue Intake`,
            subtitle: 'Create and submit issue reports',
            kpis: [
                { label: 'Submitted', value: '6' },
                { label: 'Urgent', value: '2' },
                { label: 'Drafts', value: '1' }
            ],
            sections: [
                {
                    heading: 'Quick Form',
                    kind: 'fields',
                    items: ['Location: Room 201', 'Category: Electrical', 'Severity: High', 'Photo: Attached']
                },
                {
                    heading: 'Recent Reports',
                    kind: 'list',
                    items: ['#1042 Broken outlet cover - Submitted 9:07 AM', '#1041 Exit sign light out - Submitted 8:41 AM']
                }
            ]
        };
    }

    if (path === '/secretary-walkthrough') {
        return {
            ...common,
            title: `${roleLabel} Walkthrough`,
            subtitle: 'Biweekly checklist and risk flagging',
            kpis: [
                { label: 'Complete', value: '84%' },
                { label: 'Flagged', value: '4' },
                { label: 'Remaining', value: '7' }
            ],
            sections: [
                {
                    heading: 'Checklist',
                    kind: 'checks',
                    items: ['Main exits clear - done', 'Room 201 outlet check - flagged', 'Gym leak follow-up - flagged', 'Stairwell lighting - done']
                },
                {
                    heading: 'Escalations',
                    kind: 'list',
                    items: ['Room 201 electrical risk sent to manager', 'Gym leak photo added to ticket #1040']
                }
            ]
        };
    }

    if (path === '/work-orders') {
        return {
            ...common,
            title: `${roleLabel} Work Orders`,
            subtitle: 'Dispatch and vendor response',
            kpis: [
                { label: 'Active', value: '8' },
                { label: 'Assigned', value: '5' },
                { label: 'SLA Risk', value: '2' }
            ],
            sections: [
                {
                    heading: 'Dispatch Queue',
                    kind: 'list',
                    items: ['#1041 Fire Exit Sign - assign today', '#1040 Ceiling Water Leak - in progress', '#1038 Exposed Outlet - awaiting verification']
                },
                {
                    heading: 'Next Actions',
                    kind: 'checks',
                    items: ['Confirm vendor insurance', 'Set 8h SLA for critical items', 'Send scope and photos']
                }
            ]
        };
    }

    if (path === '/compliance') {
        return {
            ...common,
            title: `${roleLabel} Compliance`,
            subtitle: 'Corrections and evidence control',
            kpis: [
                { label: 'Open', value: '3' },
                { label: 'Evidence', value: '78%' },
                { label: 'Ready', value: 'No' }
            ],
            sections: [
                {
                    heading: 'Correction Items',
                    kind: 'list',
                    items: ['C-1041 Exit signage not illuminated', 'C-1038 Outlet safety cover missing', 'C-1040 Moisture intrusion in gym']
                },
                {
                    heading: 'Required Evidence',
                    kind: 'fields',
                    items: ['Before photo', 'After photo', 'Work-order link', 'Verification note']
                }
            ]
        };
    }

    if (path === '/compliance-documents') {
        return {
            ...common,
            title: `${roleLabel} Document Uploads`,
            subtitle: 'Permits and certificates',
            kpis: [
                { label: 'Uploads', value: '20' },
                { label: 'Expiring', value: '2' },
                { label: 'Missing', value: '1' }
            ],
            sections: [
                {
                    heading: 'Upload Form',
                    kind: 'fields',
                    items: ['Document Type: Elevator Certificate', 'Agency: DOB', 'Requirement ID: 301', 'Files: 2 selected']
                },
                {
                    heading: 'Recent Files',
                    kind: 'list',
                    items: ['elevator-cert-2026.pdf', 'sprinkler-inspection-mar.pdf', 'cof-recertification.pdf']
                }
            ]
        };
    }

    if (path === '/regulation-codes') {
        return {
            ...common,
            title: `${roleLabel} Regulation Codes`,
            subtitle: 'Code matrix with points',
            kpis: [
                { label: 'Codes', value: '9' },
                { label: 'Critical', value: '3' },
                { label: 'Points', value: '72' }
            ],
            sections: [
                {
                    heading: 'Top Codes',
                    kind: 'list',
                    items: ['NFPA 101 7.10 - 12 points', 'NEC 406.4 - 12 points', 'IBC 1003 - 12 points']
                },
                {
                    heading: 'Filters',
                    kind: 'fields',
                    items: ['Category: Safety / Fire', 'Importance: Critical', 'Search: active']
                }
            ]
        };
    }

    if (path === '/admin-insights') {
        return {
            ...common,
            title: `${roleLabel} Insights`,
            subtitle: 'Risk trend and hotspots',
            kpis: [
                { label: 'Readiness', value: '87%' },
                { label: 'Repeats', value: '11' },
                { label: 'Hotspots', value: '4' }
            ],
            sections: [
                {
                    heading: 'Trend Snapshot',
                    kind: 'checks',
                    items: ['Electrical incidents rising', 'Plumbing trend stable', 'Safety incidents down week-over-week']
                },
                {
                    heading: 'Top Hotspots',
                    kind: 'list',
                    items: ['Room 201', 'Gymnasium', 'Room 104', 'Room 305']
                }
            ]
        };
    }

    if (path === '/report-preview') {
        return {
            ...common,
            title: `${roleLabel} Report Preview`,
            subtitle: 'Executive output view',
            kpis: [
                { label: 'Sections', value: '7' },
                { label: 'Complete', value: '100%' },
                { label: 'Signoff', value: 'Pending' }
            ],
            sections: [
                {
                    heading: 'Report Sections',
                    kind: 'list',
                    items: ['Executive Summary', 'Open Critical Items', 'Category Trends', 'Action Plan']
                },
                {
                    heading: 'Actions',
                    kind: 'checks',
                    items: ['Print preview', 'Export PDF', 'Share with board']
                }
            ]
        };
    }

    if (path === '/dashboard') {
        return {
            ...common,
            title: `${roleLabel} Dashboard`,
            subtitle: 'Operations status',
            sections: [
                {
                    heading: 'Live Feed',
                    kind: 'list',
                    items: ['#1042 Issue reported in Room 305', 'Plumber assigned to Gym leak', 'Evidence set uploaded for C-1041']
                },
                {
                    heading: 'Today',
                    kind: 'checks',
                    items: ['Close 2 critical work orders', 'Review compliance evidence', 'Confirm walkthrough schedule']
                }
            ]
        };
    }

    return {
        ...common,
        title: `${roleLabel} Home`,
        subtitle: 'Role welcome and priorities',
        sections: [
            {
                heading: 'Priority Queue',
                kind: 'list',
                items: ['3 urgent safety items', '2 permits expiring this month', '1 walkthrough overdue']
            },
            {
                heading: 'Start Here',
                kind: 'checks',
                items: ['Open assigned tasks', 'Review urgent alerts', 'Start daily workflow']
            }
        ]
    };
};

const MobilePreviewPage = () => {
    const [activeRole, setActiveRole] = useState('manager');
    const [mobilePath, setMobilePath] = useState('/');
    const [activeActionIndex, setActiveActionIndex] = useState(0);
    const [actionFeedback, setActionFeedback] = useState('Tap an action below.');

    useEffect(() => {
        const storedRole = window.localStorage.getItem('schoolcare-active-role');
        if (storedRole && roleMeta[storedRole]) {
            setActiveRole(storedRole);
        }

        const storedMobilePath = window.localStorage.getItem('schoolcare-mobile-preview-path');
        if (storedMobilePath) {
            setMobilePath(storedMobilePath);
        }

        const onStorageChanged = (event) => {
            if (event.key === 'schoolcare-active-role' && event.newValue && roleMeta[event.newValue]) {
                setActiveRole(event.newValue);
            }
            if (event.key === 'schoolcare-mobile-preview-path' && event.newValue) {
                setMobilePath(event.newValue);
            }
        };

        const onRoleChanged = (event) => {
            if (event.detail && roleMeta[event.detail]) {
                setActiveRole(event.detail);
            }
        };

        const onMobilePageChanged = (event) => {
            if (event.detail) {
                setMobilePath(event.detail);
            }
        };

        window.addEventListener('storage', onStorageChanged);
        window.addEventListener('schoolcare-role-changed', onRoleChanged);
        window.addEventListener('schoolcare-mobile-page-changed', onMobilePageChanged);

        return () => {
            window.removeEventListener('storage', onStorageChanged);
            window.removeEventListener('schoolcare-role-changed', onRoleChanged);
            window.removeEventListener('schoolcare-mobile-page-changed', onMobilePageChanged);
        };
    }, []);

    const currentRole = useMemo(() => roleMeta[activeRole] || roleMeta.manager, [activeRole]);
    const screen = useMemo(() => buildPageModel(activeRole, currentRole.label, mobilePath), [activeRole, currentRole.label, mobilePath]);

    useEffect(() => {
        setActiveActionIndex(0);
        setActionFeedback(`${screen.actions[0]} is ready for ${currentRole.label}.`);
    }, [screen.actions, currentRole.label]);

    const onActionClick = (action, index) => {
        const actionClock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setActiveActionIndex(index);
        setActionFeedback(`${action} recorded at ${actionClock} for ${screen.pagePath}.`);
    };

    return (
        <div className="mobile-preview-page">
            <section className="row g-3 align-items-stretch mobile-preview-main-row">
                <div className="col-12">
                    <article className="mobile-role-card">
                        <div className="mobile-role-head">
                            <h2>{screen.title}</h2>
                            <span className="mobile-role-tag">{screen.subtitle}</span>
                        </div>

                        <div className="mobile-context-card mb-2">
                            <div className="small text-secondary">
                                Mobile role: <strong className="text-dark">{currentRole.label}</strong>
                            </div>
                            <div className="small text-secondary mt-1">
                                Previewing page: <strong className="text-dark">{mobilePath}</strong>
                            </div>
                        </div>

                        <div className="phone-frame-shadow mx-auto">
                            <div className="phone-side-buttons" aria-hidden="true">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="phone-shell-demo">
                                <div className="phone-hardware" aria-hidden="true">
                                    <div className="phone-speaker"></div>
                                    <div className="phone-camera"></div>
                                </div>

                                <div className="phone-screen-demo">
                                    <div className="phone-statusbar mb-2">
                                        <span>9:41</span>
                                        <div className="phone-status-icons" aria-hidden="true">
                                            <span className="signal-bars"></span>
                                            <span className="wifi-dot"></span>
                                            <span className="battery-pill"><span></span></span>
                                        </div>
                                    </div>

                                    <div className="mobile-app-header">
                                        <div className="mini-mobile-brand">SchoolCare</div>
                                        <span className="mobile-page-chip">{currentRole.label}</span>
                                    </div>

                                    <div className="mobile-page-scroll">
                                        <div className="mobile-kpi-grid">
                                            {screen.kpis.map((kpi) => (
                                                <div key={kpi.label} className="mobile-kpi-card">
                                                    <small>{kpi.label}</small>
                                                    <strong>{kpi.value}</strong>
                                                </div>
                                            ))}
                                        </div>

                                        {screen.sections.map((section) => (
                                            <div key={section.heading} className="mobile-panel">
                                                <div className="mobile-panel-title">{section.heading}</div>
                                                {section.kind === 'fields' && (
                                                    <div className="mobile-field-list">
                                                        {section.items.map((item) => (
                                                            <div key={item} className="mobile-field-row">{item}</div>
                                                        ))}
                                                    </div>
                                                )}
                                                {section.kind === 'list' && (
                                                    <div className="mobile-feed-list">
                                                        {section.items.map((item) => (
                                                            <div key={item} className="mobile-feed-item">{item}</div>
                                                        ))}
                                                    </div>
                                                )}
                                                {section.kind === 'checks' && (
                                                    <div className="mobile-check-list">
                                                        {section.items.map((item) => (
                                                            <div key={item} className="mobile-check-item">{item}</div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="phone-bottom-area">
                                        <div className="mini-mobile-actions">
                                            {screen.actions.map((action, index) => (
                                                <button
                                                    key={action}
                                                    type="button"
                                                    className={`btn btn-sm mobile-action-btn ${activeActionIndex === index ? 'btn-primary' : 'btn-outline-primary'}`}
                                                    onClick={() => onActionClick(action, index)}
                                                >
                                                    {action}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="mobile-action-feedback" role="status" aria-live="polite">
                                            {actionFeedback}
                                        </div>

                                        <div className="phone-bottom-nav" aria-hidden="true">
                                            {[0, 1, 2, 3].map((slot) => (
                                                <span key={slot} className={slot === (activeActionIndex % 4) ? 'active' : ''}></span>
                                            ))}
                                        </div>
                                        <div className="home-indicator" aria-hidden="true"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </article>
                </div>
            </section>
        </div>
    );
};

export default MobilePreviewPage;
