export const regulationCodes = [
    {
        id: 'NFPA-101-7.10',
        code: 'NFPA 101 7.10',
        title: 'Exit Signage and Illumination',
        explanation: 'Exit paths must be clearly marked and illuminated at all times to support safe evacuation.',
        appliesTo: ['Safety / Fire Hazard', 'Windows / Doors', 'Structural / Ceiling / Floor'],
        importance: 4
    },
    {
        id: 'IBC-1003',
        code: 'IBC 1003',
        title: 'Means of Egress Continuity',
        explanation: 'Hallways, aisles, and exits must remain unobstructed with continuous safe passage.',
        appliesTo: ['Safety / Fire Hazard', 'Structural / Ceiling / Floor', 'Cleaning / Sanitation'],
        importance: 4
    },
    {
        id: 'NEC-406.4',
        code: 'NEC 406.4',
        title: 'Receptacle and Outlet Safety',
        explanation: 'Outlets and receptacles must be protected, securely covered, and free of exposed wiring.',
        appliesTo: ['Electrical', 'Technology / AV'],
        importance: 4
    },
    {
        id: 'UPC-309',
        code: 'UPC 309',
        title: 'Plumbing Fixture Maintenance',
        explanation: 'Leaks and faulty plumbing fixtures must be repaired to avoid hazards and structural damage.',
        appliesTo: ['Plumbing / Water', 'Cleaning / Sanitation'],
        importance: 3
    },
    {
        id: 'IBC-1403',
        code: 'IBC 1403',
        title: 'Weather Protection and Moisture Control',
        explanation: 'Buildings must be maintained to prevent active water penetration and moisture intrusion.',
        appliesTo: ['Plumbing / Water', 'Structural / Ceiling / Floor'],
        importance: 3
    },
    {
        id: 'ASHRAE-62.1',
        code: 'ASHRAE 62.1',
        title: 'Ventilation and Indoor Air Quality',
        explanation: 'HVAC systems must maintain proper ventilation and air quality in occupied areas.',
        appliesTo: ['HVAC / Temperature'],
        importance: 3
    },
    {
        id: 'ADA-403',
        code: 'ADA 403',
        title: 'Accessible Route Requirements',
        explanation: 'Routes and access points must remain usable and compliant for all occupants.',
        appliesTo: ['Windows / Doors', 'Structural / Ceiling / Floor', 'Cleaning / Sanitation'],
        importance: 3
    },
    {
        id: 'IES-8.1',
        code: 'IES 8.1',
        title: 'Lighting Levels for Learning Spaces',
        explanation: 'Instructional and circulation spaces require consistent, safe illumination levels.',
        appliesTo: ['Lighting', 'Technology / AV'],
        importance: 2
    },
    {
        id: 'DIST-TECH-12',
        code: 'District Tech 12',
        title: 'Classroom Technology Mounting Safety',
        explanation: 'Mounted displays and AV hardware must be secured and inspected for safe use.',
        appliesTo: ['Technology / AV'],
        importance: 2
    }
];

export const importanceLabel = {
    4: 'Critical',
    3: 'High',
    2: 'Medium',
    1: 'Low'
};

export const importanceBadge = {
    4: 'text-bg-danger',
    3: 'text-bg-warning',
    2: 'text-bg-primary',
    1: 'text-bg-secondary'
};

export const getCodesByCategory = (category, codes = regulationCodes) =>
    codes.filter((item) => item.appliesTo.includes(category));

export const calculateSeverityFromCodes = (selectedCodeIds, codes = regulationCodes) => {
    if (!selectedCodeIds.length) {
        return { level: 'Medium', importance: 2 };
    }

    const maxImportance = selectedCodeIds
        .map((id) => codes.find((item) => item.id === id)?.importance || 2)
        .reduce((max, current) => (current > max ? current : max), 1);

    return {
        level: importanceLabel[maxImportance] || 'Medium',
        importance: maxImportance
    };
};
