import React, { useMemo, useState } from 'react';
import { BookOpenCheck, Search, ShieldAlert } from 'lucide-react';
import { importanceBadge, importanceLabel, regulationCodes } from '../data/regulationCodes';

const RegulationCodesPage = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');

    const categories = useMemo(() => {
        const all = regulationCodes.flatMap((code) => code.appliesTo);
        return ['All Categories', ...Array.from(new Set(all))];
    }, []);

    const filteredCodes = useMemo(() => {
        return regulationCodes.filter((item) => {
            const inCategory = category === 'All Categories' || item.appliesTo.includes(category);
            const q = search.toLowerCase();
            const inSearch = item.code.toLowerCase().includes(q)
                || item.title.toLowerCase().includes(q)
                || item.explanation.toLowerCase().includes(q);
            return inCategory && inSearch;
        });
    }, [category, search]);

    return (
        <div>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                    <h1 className="page-title mb-1">Regulation Code Library</h1>
                    <p className="text-secondary mb-0">Look up each applicable code, understand why it matters, and measure issue importance before inspection</p>
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
                </div>
            </div>

            <div className="card border-0 modern-card mb-4">
                <div className="card-body d-flex flex-column flex-lg-row justify-content-between gap-3">
                    <div>
                        <h2 className="h5 fw-bold mb-2 d-flex align-items-center gap-2"><BookOpenCheck size={16} />How to Use in Demo</h2>
                        <p className="mb-0 text-secondary">Start with category filtering, open relevant codes, and show that severity scoring in Report Issue is automatic based on selected regulation importance.</p>
                    </div>
                    <div className="d-flex align-items-center gap-2 text-danger fw-semibold">
                        <ShieldAlert size={16} />
                        Codes with Critical importance should trigger immediate dispatch.
                    </div>
                </div>
            </div>

            <div className="row g-3">
                {filteredCodes.map((item) => (
                    <div key={item.id} className="col-12 col-xl-6">
                        <div className="card border-0 modern-card h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                                    <div>
                                        <div className="fw-bold">{item.code}</div>
                                        <div className="text-secondary">{item.title}</div>
                                    </div>
                                    <span className={`badge ${importanceBadge[item.importance]}`}>{importanceLabel[item.importance]} Importance</span>
                                </div>
                                <p className="small text-secondary mb-3">{item.explanation}</p>
                                <div className="d-flex flex-wrap gap-2">
                                    {item.appliesTo.map((cat) => (
                                        <span key={`${item.id}-${cat}`} className="badge text-bg-light text-dark border">{cat}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegulationCodesPage;
