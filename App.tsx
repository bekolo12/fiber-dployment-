import React from 'react';
import DashboardCharts from './components/DashboardCharts';
import HeatmapTable from './components/HeatmapTable';
import InfoSections from './components/InfoSections';

const App: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-br from-blue-900 via-blue-500 to-cyan-500 text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">FTTH Deployment Analysis Dashboard</h1>
              <p className="text-blue-100 mt-1">
                Fiber To The Home Network Deployment Monitoring <span className="text-white font-medium opacity-80">| Report Period: 6/13/2025 to 11/23/2025</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Data Source</div>
              <div className="font-semibold">FTTH Deployment Data</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Executive Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard 
              label="Actual Done FDT" 
              value="137" 
              subtext="Distribution terminals" 
              borderColor="border-blue-500" 
            />
            <KPICard 
              label="Total Actual FAT Count" 
              value="5,250" 
              subtext="Access terminals" 
              borderColor="border-green-500" 
            />
            <KPICard 
              label="FAT/FDT Range" 
              value="34 - 40" 
              subtext="FAT per FDT distribution" 
              borderColor="border-purple-500" 
            />
            <KPICard 
              label="QC Done Rate" 
              value="56.1%" 
              subtext="115 of 205 complete" 
              borderColor="border-emerald-500" 
              subtextClass="text-green-500"
            />
          </div>
        </section>

        {/* Charts and Data Visualizations */}
        <DashboardCharts />

        {/* Heatmap Table */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ring Status Overview Heatmap</h3>
            <HeatmapTable />
        </div>

        {/* Info Sections: Recommendations & Priority Rings */}
        <InfoSections />

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>FTTH Deployment Analysis Dashboard | Last Updated: <span>{currentDate}</span></p>
        </div>
      </footer>
    </div>
  );
};

const KPICard: React.FC<{
  label: string;
  value: string;
  subtext: string;
  borderColor: string;
  subtextClass?: string;
}> = ({ label, value, subtext, borderColor, subtextClass = "text-gray-400" }) => {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 border-l-4 ${borderColor}`}>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
      <div className="text-3xl font-bold text-gray-800 mt-1">{value}</div>
      <div className={`text-xs mt-1 ${subtextClass}`}>{subtext}</div>
    </div>
  );
};

export default App;