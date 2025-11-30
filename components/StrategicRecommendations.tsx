import React from 'react';

const StrategicRecommendations: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            Strategic Recommendations
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecommendationGroup 
                title="For Pending Status"
                color="amber"
            >
                <RecommendationItem 
                    issue="Resource constraints" 
                    solution="Dynamic resource allocation system"
                    outcome="Reduce constraints by 25%"
                    color="amber"
                />
                <RecommendationItem 
                    issue="Technical challenges" 
                    solution="Regional technical training centers"
                    outcome="Improve efficiency by 30%"
                    color="amber"
                />
                <RecommendationItem 
                    issue="Approval delays" 
                    solution="Digital approval portals"
                    outcome="Reduce delays to <15 days"
                    color="amber"
                />
                <RecommendationItem 
                    issue="Material shortages" 
                    solution="Strategic material stockpiles"
                    outcome="Ensure timely deliveries"
                    color="amber"
                />
                <RecommendationItem 
                    issue="Weather conditions" 
                    solution="Contingency planning"
                    outcome="Improve mitigation to 40%"
                    color="amber"
                />
            </RecommendationGroup>

            <RecommendationGroup 
                title="For In Progress Status"
                color="blue"
            >
                <RecommendationItem 
                    issue="Ongoing installations" 
                    solution="IoT-based project management tools"
                    outcome="Real-time progress tracking"
                    color="blue"
                />
                <RecommendationItem 
                    issue="Quality assurance" 
                    solution="AI-driven QA systems"
                    outcome="Reduce inspection times by 30%"
                    color="blue"
                />
                <RecommendationItem 
                    issue="Coordination challenges" 
                    solution="Stakeholder communication platforms"
                    outcome="Smoother coordination with authorities"
                    color="blue"
                />
                <RecommendationItem 
                    issue="Maintenance downtime" 
                    solution="Predictive maintenance schedules"
                    outcome="Minimize downtime during installations"
                    color="blue"
                />
            </RecommendationGroup>
        </div>
    </div>
  );
};

const RecommendationGroup: React.FC<{ title: string; color: string; children: React.ReactNode }> = ({ title, color, children }) => {
    // color is 'amber' or 'blue'
    const borderColor = color === 'amber' ? 'border-amber-200' : 'border-blue-200';
    const bgColor = color === 'amber' ? 'bg-amber-50' : 'bg-blue-50';
    const textColor = color === 'amber' ? 'text-amber-800' : 'text-blue-800';
    const dotColor = color === 'amber' ? 'bg-amber-500' : 'bg-blue-500';

    return (
        <div className={`${bgColor} border ${borderColor} rounded-xl p-5`}>
            <h5 className={`font-semibold ${textColor} mb-4 flex items-center gap-2`}>
                <span className={`w-3 h-3 ${dotColor} rounded-full`}></span>
                {title}
            </h5>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    )
}

const RecommendationItem: React.FC<{ issue: string; solution: string; outcome: string; color: string }> = ({ issue, solution, outcome, color }) => {
    const borderColor = color === 'amber' ? 'border-amber-100' : 'border-blue-100';
    const issueColor = color === 'amber' ? 'text-amber-600' : 'text-blue-600';
    const outcomeColor = color === 'amber' ? 'text-blue-600' : 'text-purple-600'; // Match visual

    return (
        <div className={`bg-white rounded-lg p-3 border ${borderColor}`}>
            <div className="flex items-start justify-between">
                <div>
                    <span className={`text-xs font-semibold ${issueColor} uppercase`}>Issue</span>
                    <p className="text-sm font-medium text-gray-800">{issue}</p>
                </div>
            </div>
            <div className="mt-2">
                <span className="text-xs font-semibold text-green-600 uppercase">Solution</span>
                <p className="text-sm text-gray-600">{solution}</p>
            </div>
            <div className="mt-2 flex items-center gap-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                <span className={`text-xs ${outcomeColor}`}>{outcome}</span>
            </div>
        </div>
    )
}

export default StrategicRecommendations;
