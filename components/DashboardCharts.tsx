
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  COLORS, PALETTE, plannedFDTData, actualFdtData, combinedFdtData, fatSumData,
  qcStatusData, cwFeederDetailedData, fiberVsDrillingData, grStatusData, distributionLayingData,
  durationData, fdtPendingProgressData
} from '../constants';

const DashboardCharts: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Row 1: Planned FDT & Actual FDT Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Planned FDTs per Ring">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={plannedFDTData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 10}} interval={0} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {plannedFDTData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Actual FDT Status (Done Count)">
          <div className="h-full flex flex-col">
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={actualFdtData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 10}} interval={0} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip
                     cursor={{ fill: '#f9fafb' }}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {actualFdtData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
               <Badge color="bg-green-100 text-green-700">Top: SMR R2, Sht R2</Badge>
               <Badge color="bg-amber-100 text-amber-700">Low: CC, Dora R2</Badge>
               <Badge color="bg-blue-100 text-blue-700">16 Rings Analyzed</Badge>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Row 2: Combined Planned vs Actual */}
      <ChartCard title="Planned vs Actual FDT Comparison per Ring" height="h-[400px]">
         <div className="h-full flex flex-col">
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={combinedFdtData} barGap={0}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 10}} interval={0} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip 
                     cursor={{ fill: '#f9fafb' }}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="planned" name="Planned FDTs" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Actual Done FDTs" fill={COLORS.success} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge color="bg-green-100 text-green-700">100% Complete: SMR R2, SMR R1, Tik R1, Biji R1</Badge>
              <Badge color="bg-amber-100 text-amber-700">Needs Attention: Sht R3, Sht R4, Sht R5</Badge>
            </div>
         </div>
      </ChartCard>

      {/* Row 3: FDT Pending & In Progress */}
      <ChartCard title="FDT Pending & In Progress Status per Ring" height="h-[400px]">
         <div className="h-full flex flex-col">
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fdtPendingProgressData} stackOffset="sign">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 10}} interval={0} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip 
                     cursor={{ fill: '#f9fafb' }}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="pending" name="Pending" fill={COLORS.warning} stackId="a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="in_progress" name="In Progress" fill={COLORS.primary} stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <MiniStatsCard title="Total Pending" value="51" subtext="Across all rings" colorClass="text-amber-600 bg-amber-50 border-amber-200" />
                <MiniStatsCard title="Total In Progress" value="4" subtext="SMR R3 (2), Sht R2 (2)" colorClass="text-blue-600 bg-blue-50 border-blue-200" />
                <MiniStatsCard title="Overall Total" value="55" subtext="Pending + In Progress" colorClass="text-gray-600 bg-gray-50 border-gray-200" />
            </div>
            <div className="flex flex-wrap gap-3">
               <Badge color="bg-red-100 text-red-700">Top Pending: Sht R3 (13), GZL R2 (9), Biji R2 (8)</Badge>
               <Badge color="bg-blue-100 text-blue-700">In Progress: SMR R3, Sht R2</Badge>
            </div>
         </div>
      </ChartCard>

      {/* Row 4: FAT Sum & Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Actual FAT Sum per Ring">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fatSumData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 10}} interval={0} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="value" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
           <h3 className="text-lg font-semibold text-gray-800 mb-4">FDT Performance Summary</h3>
           <div className="grid grid-cols-2 gap-4 h-full">
              <SummaryCard 
                title="Top Performers" 
                colorClass="bg-green-50 border-green-200 text-green-800" 
                iconPath="M5 13l4 4L19 7"
              >
                <div className="flex flex-wrap gap-1">
                   <MiniBadge>SMR R2</MiniBadge>
                   <MiniBadge>Sht R2</MiniBadge>
                </div>
              </SummaryCard>
              <SummaryCard 
                title="Strong Completion" 
                colorClass="bg-blue-50 border-blue-200 text-blue-800"
                iconPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              >
                 <div className="flex flex-wrap gap-1">
                   <MiniBadge color="bg-blue-100 text-blue-700">Biji R1</MiniBadge>
                   <MiniBadge color="bg-blue-100 text-blue-700">SMR R1</MiniBadge>
                   <MiniBadge color="bg-blue-100 text-blue-700">Tik R1</MiniBadge>
                   <MiniBadge color="bg-blue-100 text-blue-700">Tik R2</MiniBadge>
                   <MiniBadge color="bg-blue-100 text-blue-700">Sht R1</MiniBadge>
                   <MiniBadge color="bg-blue-100 text-blue-700">Biji R2</MiniBadge>
                 </div>
              </SummaryCard>
              <SummaryCard 
                title="Low Completion" 
                colorClass="bg-amber-50 border-amber-200 text-amber-800"
                iconPath="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              >
                 <div className="flex flex-wrap gap-1">
                   <MiniBadge color="bg-amber-100 text-amber-700">CC (1)</MiniBadge>
                   <MiniBadge color="bg-amber-100 text-amber-700">Dora R2 (1)</MiniBadge>
                 </div>
              </SummaryCard>
              <SummaryCard 
                title="Statistics" 
                colorClass="bg-gray-50 border-gray-200 text-gray-800"
                iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              >
                 <div className="text-xs text-gray-600">
                    <p>Total Rings: <span className="font-semibold">16</span></p>
                    <p>Total Done: <span className="font-semibold text-green-600">145</span></p>
                 </div>
              </SummaryCard>
           </div>
        </div>
      </div>

      {/* Row 5: QC Status Pie & CW Feeder Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <ChartCard title="QC Status Distribution">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie 
                    data={qcStatusData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={0} 
                    outerRadius={100} 
                    paddingAngle={0} 
                    dataKey="value"
                  >
                    {qcStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
               </PieChart>
            </ResponsiveContainer>
         </ChartCard>

         <ChartCard title="CW Feeder Status Overview per Project">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={cwFeederDetailedData} stackOffset="sign">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 10}} interval={0} />
                  <YAxis type="number" hide domain={[0, 1]} />
                  <Tooltip 
                     cursor={{ fill: '#f9fafb' }}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                     formatter={(value, name, props) => {
                         if (value > 0) return [props.payload.status, "Status"];
                         return [0, "Hidden"];
                     }}
                     // Hide tooltip item if value is 0 (hacky way, mostly reliant on custom formatter above or filtering)
                     filterNull={true}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="done" name="Done" fill={COLORS.success} stackId="a" radius={[4, 4, 4, 4]} />
                  <Bar dataKey="pending" name="Pending" fill={COLORS.warning} stackId="a" radius={[4, 4, 4, 4]} />
                  <Bar dataKey="in_progress" name="In Progress" fill={COLORS.primary} stackId="a" radius={[4, 4, 4, 4]} />
               </BarChart>
            </ResponsiveContainer>
         </ChartCard>
      </div>

      {/* Row 6: Fiber vs Drilling */}
      <ChartCard title="Fiber vs Drilling Length per Ring (meters)" height="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={fiberVsDrillingData} barGap={0}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 10}} interval={0} />
            <YAxis tick={{fontSize: 12}} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} />
            <Tooltip 
               cursor={{ fill: '#f9fafb' }}
               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend verticalAlign="top" height={36}/>
            <Bar dataKey="fiber" name="Total Fiber (m)" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
            <Bar dataKey="drilling" name="Drilling Length (m)" fill={COLORS.warning} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Row 7: Stacked Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="GR Status per Ring (Done vs Pending)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={grStatusData} stackOffset="sign">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 10}} interval={0} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip 
                 cursor={{ fill: '#f9fafb' }}
                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="done" name="Done" fill={COLORS.success} stackId="a" radius={[0, 0, 4, 4]} />
              <Bar dataKey="pending" name="Pending" fill={COLORS.warning} stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribution Laying Status Details">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distributionLayingData} stackOffset="sign">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 10}} interval={0} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip 
                 cursor={{ fill: '#f9fafb' }}
                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="done" name="Done" fill={COLORS.success} stackId="a" />
              <Bar dataKey="in_progress" name="In Progress" fill={COLORS.primary} stackId="a" />
              <Bar dataKey="no_status" name="No Status" fill={COLORS.gray} stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

       {/* Row 8: Duration */}
      <ChartCard title="Total Project Duration per Ring (Days)" height="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={durationData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
            <XAxis type="number" tick={{fontSize: 12}} />
            <YAxis dataKey="name" type="category" width={60} tick={{fontSize: 11}} />
            <Tooltip 
               cursor={{ fill: '#f9fafb' }}
               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
             <Bar dataKey="days" name="Duration (Days)" radius={[0, 4, 4, 0]}>
                {durationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
             </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
};

const ChartCard: React.FC<{ title: string; children: React.ReactNode; height?: string }> = ({ title, children, height = "h-[300px]" }) => (
  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className={`relative ${height} w-full`}>
      {children}
    </div>
  </div>
);

const Badge: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
  <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
    {children}
  </span>
);

const MiniBadge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "bg-green-100 text-green-700" }) => (
  <span className={`px-2 py-0.5 text-xs rounded ${color}`}>
    {children}
  </span>
);

const SummaryCard: React.FC<{ title: string; colorClass: string; iconPath: string; children: React.ReactNode }> = ({ title, colorClass, iconPath, children }) => (
  <div className={`border rounded-lg p-4 ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]}`}>
     <h4 className={`font-semibold text-sm mb-2 flex items-center gap-2 ${colorClass.split(' ')[2]}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}/>
        </svg>
        {title}
     </h4>
     {children}
  </div>
);

const MiniStatsCard: React.FC<{ title: string; value: string; subtext: string; colorClass: string }> = ({ title, value, subtext, colorClass }) => {
    // colorClass expected like "text-amber-800 bg-amber-50 border-amber-200"
    const colors = colorClass.split(' ');
    // We can assume the order or specific classes. 
    // Let's rely on Tailwind utility classes passed in.
    return (
        <div className={`border rounded-lg p-3 ${colorClass}`}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium opacity-90">{title}</span>
                <span className="text-2xl font-bold opacity-100">{value}</span>
            </div>
            <div className="text-xs opacity-90 mt-1">{subtext}</div>
        </div>
    )
}

export default DashboardCharts;
