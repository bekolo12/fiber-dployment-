import React from 'react';

const KPIAnalysis: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            KPI Analysis Dashboard
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <KPIMetricCard 
                title="Deployment Completion Rate"
                status="Done" statusColor="bg-green-100 text-green-700"
                value="69.9" unit="%"
                progressColor="bg-green-500" progressWidth="69.9%"
                bgColor="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                textColor="text-green-600"
                desc="Measures overall deployment effectiveness"
                badges={["Optimize allocation", "Streamline approvals"]}
            />
             <KPIMetricCard 
                title="Avg Installation Time"
                status="In Progress" statusColor="bg-blue-100 text-blue-700"
                value="3.98" unit="days"
                progressColor="bg-blue-500" progressWidth="40%"
                bgColor="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                textColor="text-blue-600"
                desc="Tracks operational efficiency and resource utilization"
                badges={["PM tools", "Predictive maintenance"]}
            />
             <KPIMetricCard 
                title="Resource Utilization Rate"
                status="Pending" statusColor="bg-amber-100 text-amber-700"
                value="80.0" unit="%"
                progressColor="bg-purple-500" progressWidth="80%"
                bgColor="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200"
                textColor="text-purple-600"
                desc="Measures resource deployment effectiveness"
                badges={["Training programs", "Optimized allocation"]}
            />
             <KPIMetricCard 
                title="Approval Process Efficiency"
                status="Pending" statusColor="bg-amber-100 text-amber-700"
                value="55.0" unit="%"
                progressColor="bg-amber-500" progressWidth="55%"
                bgColor="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200"
                textColor="text-amber-600"
                desc="Tracks administrative efficiency in deployment"
                badges={["Digital approvals", "Stakeholder comm"]}
            />
             <KPIMetricCard 
                title="Material Delivery Timeliness"
                status="Pending" statusColor="bg-amber-100 text-amber-700"
                value="38.0" unit="%"
                progressColor="bg-red-500" progressWidth="38%"
                bgColor="bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
                textColor="text-red-600"
                desc="Measures supply chain effectiveness"
                badges={["Supply chain mgmt"]}
            />
             <KPIMetricCard 
                title="Weather Impact Mitigation"
                status="Pending" statusColor="bg-amber-100 text-amber-700"
                value="26.0" unit="%"
                progressColor="bg-cyan-500" progressWidth="26%"
                bgColor="bg-gradient-to-br from-cyan-50 to-sky-50 border-cyan-200"
                textColor="text-cyan-600"
                desc="Tracks ability to maintain schedule despite weather"
                badges={["Contingency planning", "Predictive maint."]}
            />
        </div>
    </div>
  );
};

const KPIMetricCard: React.FC<{
    title: string; status: string; statusColor: string;
    value: string; unit: string;
    progressColor: string; progressWidth: string;
    bgColor: string; textColor: string;
    desc: string; badges: string[];
}> = ({ title, status, statusColor, value, unit, progressColor, progressWidth, bgColor, textColor, desc, badges }) => {
    return (
        <div className={`${bgColor} border rounded-xl p-5`}>
            <div className="flex items-center justify-between mb-3">
                <h4 className={`font-semibold ${textColor.replace('600', '800')} text-sm`}>{title}</h4>
                <span className={`px-2 py-1 ${statusColor} text-xs rounded-full font-medium`}>{status}</span>
            </div>
            <div className="flex items-end gap-2 mb-3">
                <span className={`text-4xl font-bold ${textColor}`}>{value}</span>
                <span className={`${textColor} text-lg font-medium mb-1`}>{unit}</span>
            </div>
            <div className={`w-full bg-gray-200 bg-opacity-30 rounded-full h-2 mb-3`}>
                <div className={`${progressColor} h-2 rounded-full`} style={{ width: progressWidth }}></div>
            </div>
            <p className={`text-xs ${textColor.replace('600', '700')} mb-2`}>{desc}</p>
            <div className="flex flex-wrap gap-1">
                {badges.map((b, i) => (
                    <span key={i} className={`px-2 py-0.5 bg-white bg-opacity-50 ${textColor} text-xs rounded`}>{b}</span>
                ))}
            </div>
        </div>
    )
}

export default KPIAnalysis;
