import React, { useMemo, useState } from 'react';
import { BookOpenCheck, Search, ShieldAlert } from 'lucide-react';
import { importanceBadge, importanceLabel, regulationCodes } from '../data/regulationCodes';

const pointsByImportance = {
    4: 12,
    3: 8,
    2: 5,
    1: 2
};

const slaByImportance = {
    4: 'Same day dispatch',
    3: 'Within 24 hours',
    2: 'Within 72 hours',
    1: 'Within 7 days'
};

const riskByImportance = {
    4: 'Violation likely',
    3: 'Elevated risk',
    2: 'Moderate risk',
    1: 'Low risk'
};

const detailsByCode = {
    'NFPA-101-7.10': {
        finding: 'Exit sign not illuminated or missing directional marker.',
        evidence: 'Before/after photo with timestamp and replacement work order.',
        agency: 'Fire Department / Building Inspector'
    },
    'IBC-1003': {
        finding: 'Egress path blocked by furniture, supplies, or equipment.',
        evidence: 'Clearance photos and walkthrough checklist sign-off.',
        agency: 'Building Department'
    },
    'NEC-406.4': {
        finding: 'Broken outlet cover or exposed wiring in occupied room.',
        evidence: 'Outlet repair photo set and licensed electrician notes.',
        agency: 'Electrical Inspector'
    },
    'UPC-309': {
        finding: 'Leaking fixture, drain issue, or standing water condition.',
        evidence: 'Repair ticket, completion photo, and leak verification note.',
        agency: 'Plumbing Inspector'
    },
    'IBC-1403': {
        finding: 'Ceiling staining or active water intrusion in interior spaces.',
        evidence: 'Moisture-source correction and post-repair verification photo.',
        agency: 'Building Department'
    },
    'ASHRAE-62.1': {
        finding: 'Ventilation below target airflow in occupied area.',
        evidence: 'HVAC service report and airflow balancing record.',
        agency: 'Health / Mechanical Inspector'
    },
    'ADA-403': {
        finding: 'Access route obstructed or non-compliant doorway clearance.',
        evidence: 'Route clearance photo and corrected layout documentation.',
        agency: 'Accessibility / Building Inspector'
    },
    'IES-8.1': {
        finding: 'Lighting level below safe range for instruction areas.',
        evidence: 'Fixture replacement log and lux-level verification check.',
        agency: 'Building Department'
    },
    'DIST-TECH-12': {
        finding: 'Mounted display bracket loose or unsafe cable routing.',
        evidence: 'Mounting inspection checklist and corrected install photos.',
        agency: 'District Safety / Facilities'
    }
};

const RegulationCodesPage = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [importance, setImportance] = useState('All Levels');

    const categories = useMemo(() => {
        const all = regulationCodes.flatMap((code) => code.appliesTo);
        return ['All Categories', ...Array.from(new Set(all))];
    }, []);

    const filteredWithComputed = useMemo(() => {
        return regulationCodes
            .map((item) => {
                const details = detailsByCode[item.id] || {
                    finding: 'See regulation notes for specific inspection finding pattern.',
                    evidence: 'Photo evidence and linked work-order completion note.',
                    agency: 'Building Department'
                };

                return {
                    ...item,
                    points: pointsByImportance[item.importance] || 2,
                    sla: slaByImportance[item.importance] || 'Within 7 days',
                    risk: riskByImportance[item.importance] || 'Low risk',
                    details
                };
            })
            .filter((item) => {
                const inCategory = category === 'All Categories' || item.appliesTo.includes(category);
                const inImportance = importance === 'All Levels' || String(item.importance) === importance;
                const q = search.toLowerCase();
                const inSearch = item.code.toLowerCase().includes(q)
                    || item.title.toLowerCase().includes(q)
                    || item.explanation.toLowerCase().includes(q)
                    || item.details.finding.toLowerCase().includes(q)
                    || item.details.evidence.toLowerCase().includes(q);
                return inCategory && inImportance && inSearch;
            });
    }, [category, importance, search]);

    const filteredCodes = useMemo(() => {
        return filteredWithComputed.sort((a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points;
            }
            return a.code.localeCompare(b.code);
        });
    }, [filteredWithComputed]);

    const totalPoints = useMemo(
        () => filteredCodes.reduce((sum, item) => sum + item.points, 0),
        [filteredCodes]
    );

    return (
        <div>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <h1 className="page-title mb-1">Regulation Code Library</h1>
                    <p className="text-secondary mb-0">Table-based compliance matrix with category, points, risk, SLA, and evidence details for each regulation.</p>
                </div>
                <div className="d-flex gap-2">
                    <div className="input-group">
                        <span className="input-group-text"><Search size={14} /></span>
                        <input
                            className="form-control"
                            placeholder="Search code or title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>
                    <select className="form-select" value={importance} onChange={(e) => setImportance(e.target.value)}>
                        <option>All Levels</option>
                        <option value="4">Critical</option>
                        <option value="3">High</option>
                        <option value="2">Medium</option>
                        <option value="1">Low</option>
                    </select>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="text-secondary small">Regulations in current view</div>
                            <div className="display-6 fw-bold mb-0">{filteredCodes.length}</div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="text-secondary small">Total compliance points</div>
                            <div className="display-6 fw-bold mb-0">{totalPoints}</div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card border-0 modern-card h-100">
                        <div className="card-body">
                            <div className="text-secondary small">Critical regulations in view</div>
                            <div className="display-6 fw-bold mb-0">{filteredCodes.filter((x) => x.importance === 4).length}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 modern-card mb-4">
                <div className="card-body d-flex flex-column flex-lg-row justify-content-between gap-3">
                    <div>
                        <h2 className="h5 fw-bold mb-2 d-flex align-items-center gap-2"><BookOpenCheck size={16} />How to Use in the Demo</h2>
                        <p className="mb-0 text-secondary">Use this table to explain category coverage, point impact, expected response SLA, and evidence needed to close each regulation risk.</p>
                    </div>
                    <div className="d-flex align-items-center gap-2 text-danger fw-semibold">
                        <ShieldAlert size={16} />
                        Codes with Critical importance should trigger immediate dispatch.
                    </div>
                </div>
            </div>

            <div className="card border-0 modern-card">
                <div className="card-body p-0">
                    <div className="table-responsive regulation-table-wrap">
                        <table className="table table-hover align-middle regulation-table mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Code</th>
                                    <th>Regulation</th>
                                    <th>Categories</th>
                                    <th>Importance</th>
                                    <th>Points</th>
                                    <th>Inspector Finding</th>
                                    <th>Required Evidence</th>
                                    <th>SLA</th>
                                    <th>Risk</th>
                                    <th>Agency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCodes.length === 0 && (
                                    <tr>
                                        <td colSpan="10" className="text-center py-4 text-secondary">No regulations match the current filters.</td>
                                    </tr>
                                )}
                                {filteredCodes.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="fw-bold regulation-code">{item.code}</div>
                                        </td>
                                        <td>
                                            <div className="fw-semibold">{item.title}</div>
                                            <div className="small text-secondary regulation-explain">{item.explanation}</div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-wrap gap-1">
                                                {item.appliesTo.map((cat) => (
                                                    <span key={`${item.id}-${cat}`} className="badge text-bg-light text-dark border regulation-cat-badge">{cat}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td><span className={`badge ${importanceBadge[item.importance]}`}>{importanceLabel[item.importance]}</span></td>
                                        <td><span className="fw-bold">{item.points}</span></td>
                                        <td className="small text-secondary">{item.details.finding}</td>
                                        <td className="small text-secondary">{item.details.evidence}</td>
                                        <td className="small fw-semibold">{item.sla}</td>
                                        <td className="small fw-semibold">{item.risk}</td>
                                        <td className="small text-secondary">{item.details.agency}</td>
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

export default RegulationCodesPage;
