import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import {
  actualFdtData,
  fdtPendingProgressData,
  finaleQcData,
  cwFeederDetailedData,
  durationData
} from '../constants';

interface KPIMetric {
  title: string;
  status: string;
  statusColor: string;
  value: string;
  unit: string;
  progressColor: string;
  progressWidth: string;
  bgColor: string;
  textColor: string;
  desc: string;
  badges: string[];
}

const KPIAnalysis: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<KPIMetric[]>([
    {
      title: "Deployment Completion Rate",
      status: "Done",
      statusColor: "bg-green-100 text-green-700",
      value: "69.9",
      unit: "%",
      progressColor: "bg-green-500",
      progressWidth: "69.9%",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
      textColor: "text-green-600",
      desc: "Measures overall deployment effectiveness",
      badges: ["Optimize allocation", "Streamline approvals"]
    },
    {
      title: "Avg Installation Time",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-700",
      value: "3.98",
      unit: "days",
      progressColor: "bg-blue-500",
      progressWidth: "40%",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
      textColor: "text-blue-600",
      desc: "Tracks operational efficiency and resource utilization",
      badges: ["PM tools", "Predictive maintenance"]
    },
    {
      title: "Resource Utilization Rate",
      status: "Pending",
      statusColor: "bg-amber-100 text-amber-700",
      value: "80.0",
      unit: "%",
      progressColor: "bg-purple-500",
      progressWidth: "80%",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200",
      textColor: "text-purple-600",
      desc: "Measures resource deployment effectiveness",
      badges: ["Training programs", "Optimized allocation"]
    },
    {
      title: "Approval Process Efficiency",
      status: "Pending",
      statusColor: "bg-amber-100 text-amber-700",
      value: "55.0",
      unit: "%",
      progressColor: "bg-amber-500",
      progressWidth: "55%",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200",
      textColor: "text-amber-600",
      desc: "Tracks administrative efficiency in deployment",
      badges: ["Digital approvals", "Stakeholder comm"]
    },
    {
      title: "Material Delivery Timeliness",
      status: "Pending",
      statusColor: "bg-amber-100 text-amber-700",
      value: "38.0",
      unit: "%",
      progressColor: "bg-red-500",
      progressWidth: "38%",
      bgColor: "bg-gradient-to-br from-red-50 to-orange-50 border-red-200",
      textColor: "text-red-600",
      desc: "Measures supply chain effectiveness",
      badges: ["Supply chain mgmt"]
    },
    {
      title: "Weather Impact Mitigation",
      status: "Pending",
      statusColor: "bg-amber-100 text-amber-700",
      value: "26.0",
      unit: "%",
      progressColor: "bg-cyan-500",
      progressWidth: "26%",
      bgColor: "bg-gradient-to-br from-cyan-50 to-sky-50 border-cyan-200",
      textColor: "text-cyan-600",
      desc: "Tracks ability to maintain schedule despite weather",
      badges: ["Contingency planning", "Predictive maint."]
    }
  ]);

  const generateAnalysis = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const contextData = {
        actualFdtStatus: actualFdtData,
        pendingWork: fdtPendingProgressData,
        qcAnalysis: finaleQcData,
        cwFeederStatus: cwFeederDetailedData,
        projectDurations: durationData
      };

      const prompt = `
        You are an FTTH Data Analyst. Analyze the provided project data to calculate or infer 6 Key Performance Indicators (KPIs).
        
        The 6 KPIs should be:
        1. Deployment Completion Rate (based on actual vs planned)
        2. Avg Installation Time (inference based on duration data)
        3. Resource Utilization Rate (inference based on concurrent work)
        4. Approval Process Efficiency (inference based on pending status)
        5. Material Delivery Timeliness (inference based on delays)
        6. Weather Impact Mitigation (inference based on general risks)

        For each KPI, provide:
        - title
        - status (Done, In Progress, or Pending)
        - value (number)
        - unit (e.g., %, days)
        - desc (short description)
        - badges (2 short tags for improvements)
        
        Return the data in a structure that maps to the UI.
        
        Data: ${JSON.stringify(contextData)}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              metrics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    status: { type: Type.STRING, enum: ["Done", "In Progress", "Pending"] },
                    value: { type: Type.STRING },
                    unit: { type: Type.STRING },
                    desc: { type: Type.STRING },
                    badges: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              }
            }
          }
        }
      });

      if (response.text) {
        const result = JSON.parse(response.text);
        if (result.metrics && Array.isArray(result.metrics)) {
          // Map AI response to UI styles
          const newMetrics = result.metrics.map((m: any, index: number) => {
             // Preserve existing styling logic based on index or infer from status/title
             const styles = getStylesForMetric(index, m.status, m.value);
             return { ...m, ...styles };
          });
          setMetrics(newMetrics);
        }
      }
    } catch (error) {
        console.error("Analysis generation failed", error);
        alert("Failed to generate analysis. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  const getStylesForMetric = (index: number, status: string, value: string = "50") => {
      // Helper to maintain the colorful UI
      const colors = [
          { statusColor: "bg-green-100 text-green-700", progressColor: "bg-green-500", bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200", textColor: "text-green-600" },
          { statusColor: "bg-blue-100 text-blue-700", progressColor: "bg-blue-500", bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200", textColor: "text-blue-600" },
          { statusColor: "bg-purple-100 text-purple-700", progressColor: "bg-purple-500", bgColor: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200", textColor: "text-purple-600" },
          { statusColor: "bg-amber-100 text-amber-700", progressColor: "bg-amber-500", bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200", textColor: "text-amber-600" },
          { statusColor: "bg-red-100 text-red-700", progressColor: "bg-red-500", bgColor: "bg-gradient-to-br from-red-50 to-orange-50 border-red-200", textColor: "text-red-600" },
          { statusColor: "bg-cyan-100 text-cyan-700", progressColor: "bg-cyan-500", bgColor: "bg-gradient-to-br from-cyan-50 to-sky-50 border-cyan-200", textColor: "text-cyan-600" },
      ];
      
      const baseStyle = colors[index % colors.length];
      
      // Override status color if needed based on the AI's status
      let statusColor = baseStyle.statusColor;
      if (status === 'Pending') statusColor = "bg-amber-100 text-amber-700";
      if (status === 'Done') statusColor = "bg-green-100 text-green-700";
      if (status === 'In Progress') statusColor = "bg-blue-100 text-blue-700";

      let progress = 50;
      const parsedVal = parseFloat(value);
      if (!isNaN(parsedVal)) {
          progress = Math.min(100, Math.max(0, parsedVal));
      }

      return {
          ...baseStyle,
          statusColor,
          progressWidth: `${progress}%`
      };
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                KPI Analysis Dashboard
            </h3>
            <button 
                onClick={generateAnalysis}
                disabled={isLoading}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-white text-sm font-medium transition-all shadow-sm
                    ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}
                `}
            >
                {isLoading ? (
                    <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                    </>
                ) : (
                    <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Update with AI
                    </>
                )}
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {metrics.map((metric, index) => (
                <KPIMetricCard key={index} {...metric} />
            ))}
        </div>
    </div>
  );
};

const KPIMetricCard: React.FC<KPIMetric> = ({ 
    title, status, statusColor, value, unit, 
    progressColor, progressWidth, bgColor, textColor, desc, badges 
}) => {
    return (
        <div className={`${bgColor} border rounded-xl p-5 transition-all duration-300 hover:shadow-md`}>
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
            <p className={`text-xs ${textColor.replace('600', '700')} mb-2 min-h-[32px]`}>{desc}</p>
            <div className="flex flex-wrap gap-1">
                {badges.map((b, i) => (
                    <span key={i} className={`px-2 py-0.5 bg-white bg-opacity-50 ${textColor} text-xs rounded`}>{b}</span>
                ))}
            </div>
        </div>
    )
}

export default KPIAnalysis;