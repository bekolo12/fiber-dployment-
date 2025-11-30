import React from 'react';

const InfoSections: React.FC = () => {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Immediate Actions */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Immediate Actions Required
          </h3>
          <ul className="space-y-3">
            {[
              "Investigate missing FAT and FDT values to ensure data integrity",
              "Verify if the missing values are systematic or random",
              "Monitor Sht R2 FDT with Ongoing QC status",
              "Investigate zero-fiber and zero-drilling rings",
              "Prioritize pending GR status rings: Sht R3, Sht R4, Sht R5"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recommended Improvements
          </h3>
          <ul className="space-y-3">
            {[
              "Implement data validation checks during data entry",
              "Standardize column naming conventions",
              "Add data quality metrics to regular reporting",
              "Add more detailed status categories for better tracking"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Priority Rings */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Priority Rings Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PriorityCard 
            title="Pending GR Status" 
            bgColor="bg-red-50" 
            borderColor="border-red-200" 
            textColor="text-red-800"
          >
             <Badge color="bg-red-100 text-red-700">Sht R3</Badge>
             <Badge color="bg-red-100 text-red-700">Sht R4</Badge>
             <Badge color="bg-red-100 text-red-700">Sht R5</Badge>
          </PriorityCard>

          <PriorityCard 
            title="Pending CW Feeder" 
            bgColor="bg-amber-50" 
            borderColor="border-amber-200" 
            textColor="text-amber-800"
          >
             <Badge color="bg-amber-100 text-amber-700">R2</Badge>
             <Badge color="bg-amber-100 text-amber-700">Sht R3</Badge>
             <Badge color="bg-amber-100 text-amber-700">Sht R4</Badge>
             <Badge color="bg-amber-100 text-amber-700">Sht R5</Badge>
             <Badge color="bg-amber-100 text-amber-700">Tik R3</Badge>
          </PriorityCard>

          <PriorityCard 
            title="In Progress CW Feeder" 
            bgColor="bg-blue-50" 
            borderColor="border-blue-200" 
            textColor="text-blue-800"
          >
             <Badge color="bg-blue-100 text-blue-700">SMR R3</Badge>
          </PriorityCard>

          <PriorityCard 
            title="Longest Duration Projects" 
            bgColor="bg-purple-50" 
            borderColor="border-purple-200" 
            textColor="text-purple-800"
          >
             <Badge color="bg-purple-100 text-purple-700">Tik R1 (108 days)</Badge>
             <Badge color="bg-purple-100 text-purple-700">Sht R1 (89 days)</Badge>
          </PriorityCard>

          <PriorityCard 
            title="Rapid Completions" 
            bgColor="bg-green-50" 
            borderColor="border-green-200" 
            textColor="text-green-800"
          >
             <Badge color="bg-green-100 text-green-700">Biji R2 (6 days)</Badge>
             <Badge color="bg-green-100 text-green-700">SMR R1 (29 days)</Badge>
          </PriorityCard>
        </div>
      </div>
    </>
  );
};

const PriorityCard: React.FC<{ 
  title: string; 
  bgColor: string; 
  borderColor: string; 
  textColor: string; 
  children: React.ReactNode 
}> = ({ title, bgColor, borderColor, textColor, children }) => (
  <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
    <h4 className={`font-semibold ${textColor} text-sm mb-2`}>{title}</h4>
    <div className="flex flex-wrap gap-2">
      {children}
    </div>
  </div>
);

const Badge: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
    <span className={`px-2 py-1 text-xs rounded ${color}`}>
      {children}
    </span>
  );

export default InfoSections;
