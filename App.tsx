import React from 'react';
import DashboardCharts from './components/DashboardCharts';
import HeatmapTable from './components/HeatmapTable';
import InfoSections from './components/InfoSections';
import KPIAnalysis from './components/KPIAnalysis';
import StrategicRecommendations from './components/StrategicRecommendations';
import { qcStatusData } from './constants';

const App: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate QC Stats dynamically
  const qcDoneCount = qcStatusData.find(d => d.name === 'Done')?.value || 0;
  const qcTotalCount = qcStatusData.reduce((acc, curr) => acc + curr.value, 0);
  const qcPercentage = qcTotalCount > 0 ? ((qcDoneCount / qcTotalCount) * 100).toFixed(1) : '0.0';

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Executive Summary</h2>
            <div className="flex flex-col items-end gap-2">
                <a 
                  href="https://project-status-dashboard-sand.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto justify-center"
                >
                  Project Status Dashboard
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a 
                  href="https://aistudio.google.com/apps/drive/121czq0nd1hn60O4uGM-UMcoGZ5wwkaCB?showAssistant=true&showPreview=true&resourceKey=" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-200 text-sm font-medium rounded-lg hover:bg-indigo-50 transition-colors shadow-sm w-full sm:w-auto justify-center"
                >
                  Project Status Database Edit
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </a>
            </div>
          </div>
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
              value={`${qcPercentage}%`}
              subtext={`${qcDoneCount} of ${qcTotalCount} complete`} 
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

        {/* Info Sections: AI Analysis & Improvements */}
        <InfoSections />

        {/* New KPI Analysis Dashboard */}
        <KPIAnalysis />

        {/* New Strategic Recommendations */}
        <StrategicRecommendations />

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