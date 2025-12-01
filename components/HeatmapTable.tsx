
import React from 'react';
import { heatmapData } from '../constants';

const HeatmapTable: React.FC = () => {
  return (
    <div>
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ring</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Civil FDT Completed</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Civil FDT Pending</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">GR Status</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">CW Feeder</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Splicing Closure</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Distribution Laying</th>
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row, index) => {
               return (
                <tr key={index} className={index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 border-b border-gray-100">{row.ring}</td>
                    <td className="px-4 py-3 text-center border-b border-gray-100">
                        <FDTCell value={row.fdtDone} type="done" />
                    </td>
                    <td className="px-4 py-3 text-center border-b border-gray-100">
                        <FDTCell value={row.fdtPending} type="pending" />
                    </td>
                    <td className="px-4 py-3 text-center border-b border-gray-100"><StatusPill status={row.gr} /></td>
                    <td className="px-4 py-3 text-center border-b border-gray-100"><StatusPill status={row.cw} /></td>
                    <td className="px-4 py-3 text-center border-b border-gray-100"><StatusPill status={row.splicing} /></td>
                    <td className="px-4 py-3 text-center border-b border-gray-100"><StatusPill status={row.distribution} /></td>
                </tr>
               )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 text-sm">
        <LegendItem color="bg-emerald-500" label="Done" />
        <LegendItem color="bg-amber-500" label="Pending" />
        <LegendItem color="bg-blue-500" label="In Progress" />
        <LegendItem color="bg-purple-500" label="Mixed" />
        <LegendItem color="bg-gray-500" label="No Data" />
      </div>
    </div>
  );
};

const FDTCell: React.FC<{ value: number; type: 'done' | 'pending' }> = ({ value, type }) => {
    if (value === 0 && type === 'pending') return <span className="text-gray-400 text-sm">-</span>;
    // Special handling for rows with no data generally, but simplifed here based on provided logic
    // We assume input values are correct.
    const bgClass = type === 'done' 
        ? 'bg-green-100 text-green-700' 
        : (value > 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500');
    
    return <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${bgClass}`}>{value}</span>;
}

const StatusPill: React.FC<{ status: string; text?: string }> = ({ status, text }) => {
    let bgClass = 'bg-gray-500';
    let label = text || 'No Data';

    if (!text) {
        switch(status) {
            case 'done': label = 'Done'; break;
            case 'pending': label = 'Pending'; break;
            case 'inprogress': label = 'In Progress'; break;
            case 'mixed': label = 'Mixed'; break;
            default: label = 'No Data';
        }
    }

    switch (status) {
        case 'done': bgClass = 'bg-emerald-500'; break;
        case 'pending': bgClass = 'bg-amber-500'; break;
        case 'inprogress': bgClass = 'bg-blue-500'; break;
        case 'mixed': bgClass = 'bg-purple-500'; break;
        default: bgClass = 'bg-gray-500';
    }

    return (
        <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${bgClass}`}>
            {label}
        </span>
    );
};

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <span className={`w-4 h-4 rounded ${color}`}></span> {label}
    </div>
);

export default HeatmapTable;
