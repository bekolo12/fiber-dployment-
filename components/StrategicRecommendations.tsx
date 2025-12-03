import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import {
  fdtPendingProgressData,
  cwFeederDetailedData,
  durationData,
  finaleQcData
} from '../constants';

interface RecommendationItemProps {
    issue: string;
    solution: string;
    outcome: string;
}

interface RecommendationGroupProps {
    title: string;
    color: 'amber' | 'blue';
    items: RecommendationItemProps[];
}

const StrategicRecommendations: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationGroupProps[]>([
      {
          title: "For Pending Status",
          color: "amber",
          items: [
            { issue: "Resource constraints", solution: "Dynamic resource allocation system", outcome: "Reduce constraints by 25%" },
            { issue: "Technical challenges", solution: "Regional technical training centers", outcome: "Improve efficiency by 30%" },
            { issue: "Approval delays", solution: "Digital approval portals", outcome: "Reduce delays to <15 days" },
            { issue: "Material shortages", solution: "Strategic material stockpiles", outcome: "Ensure timely deliveries" },
            { issue: "Weather conditions", solution: "Contingency planning", outcome: "Improve mitigation to 40%" }
          ]
      },
      {
          title: "For In Progress Status",
          color: "blue",
          items: [
            { issue: "Ongoing installations", solution: "IoT-based project management tools", outcome: "Real-time progress tracking" },
            { issue: "Quality assurance", solution: "AI-driven QA systems", outcome: "Reduce inspection times by 30%" },
            { issue: "Coordination challenges", solution: "Stakeholder communication platforms", outcome: "Smoother coordination with authorities" },
            { issue: "Maintenance downtime", solution: "Predictive maintenance schedules", outcome: "Minimize downtime during installations" }
          ]
      }
  ]);

  const generateStrategies = async () => {
      setIsLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const contextData = {
          pendingData: fdtPendingProgressData,
          feederStatus: cwFeederDetailedData,
          longDurations: durationData.filter(d => d.days > 60),
          qcIssues: finaleQcData.critical_findings
        };
  
        const prompt = `
          You are a Strategic Deployment Consultant for FTTH networks.
          Analyze the data to provide strategic recommendations.
          
          Separate your advice into two categories:
          1. "For Pending Status" (Focus on unblocking, planning, pre-reqs)
          2. "For In Progress Status" (Focus on efficiency, quality, speed)
  
          For each category, provide 4-5 items with:
          - issue (The root cause derived from data)
          - solution (Strategic fix)
          - outcome (Quantifiable expected benefit)
          
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
                pending_recommendations: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      issue: { type: Type.STRING },
                      solution: { type: Type.STRING },
                      outcome: { type: Type.STRING }
                    }
                  }
                },
                in_progress_recommendations: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      issue: { type: Type.STRING },
                      solution: { type: Type.STRING },
                      outcome: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        });
  
        if (response.text) {
          const result = JSON.parse(response.text);
          const newRecs: RecommendationGroupProps[] = [];
          
          if (result.pending_recommendations) {
              newRecs.push({
                  title: "For Pending Status",
                  color: "amber",
                  items: result.pending_recommendations
              });
          }
          if (result.in_progress_recommendations) {
              newRecs.push({
                  title: "For In Progress Status",
                  color: "blue",
                  items: result.in_progress_recommendations
              });
          }
          
          if (newRecs.length > 0) {
              setRecommendations(newRecs);
          }
        }
      } catch (error) {
          console.error("Strategy generation failed", error);
          alert("Failed to generate strategies. Please try again.");
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
                Strategic Recommendations
            </h4>
            <button 
                onClick={generateStrategies}
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
                    Generating...
                    </>
                ) : (
                    <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Generate with AI
                    </>
                )}
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
            {isLoading && <div className="absolute inset-0 bg-white/60 z-10 animate-pulse rounded-xl"></div>}
            
            {recommendations.map((group, index) => (
                <RecommendationGroup 
                    key={index}
                    title={group.title}
                    color={group.color}
                >
                    {group.items.map((item, idx) => (
                        <RecommendationItem 
                            key={idx}
                            issue={item.issue}
                            solution={item.solution}
                            outcome={item.outcome}
                            color={group.color}
                        />
                    ))}
                </RecommendationGroup>
            ))}
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
    const outcomeColor = color === 'amber' ? 'text-blue-600' : 'text-purple-600';

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