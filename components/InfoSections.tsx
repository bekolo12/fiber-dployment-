import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import {
  actualFdtData,
  fdtPendingProgressData,
  finaleQcData,
  cwFeederDetailedData,
  grStatusData,
  durationData
} from '../constants';

const InfoSections: React.FC = () => {
  const [immediateActions, setImmediateActions] = useState<string[]>([
    "Investigate missing FAT and FDT values to ensure data integrity",
    "Verify if the missing values are systematic or random",
    "Monitor Sht R2 FDT with Ongoing QC status",
    "Investigate zero-fiber and zero-drilling rings",
    "Prioritize pending GR status rings: Sht R3, Sht R4, Sht R5"
  ]);

  const [improvements, setImprovements] = useState<string[]>([
    "Implement data validation checks during data entry",
    "Standardize column naming conventions",
    "Add data quality metrics to regular reporting",
    "Add more detailed status categories for better tracking"
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const contextData = {
        actualFdtStatus: actualFdtData,
        pendingWork: fdtPendingProgressData,
        qcAnalysis: finaleQcData,
        cwFeederStatus: cwFeederDetailedData,
        grStatus: grStatusData,
        projectDurations: durationData
      };

      const prompt = `
        You are an expert FTTH (Fiber to the Home) Project Manager. Analyze the provided dashboard data JSON.
        
        Identify critical bottlenecks, high pending counts, quality control issues (QC), and rings with long durations.
        
        Based on this analysis:
        1. Generate 5 specific "Immediate Actions Required" to fix urgent issues (e.g., specific rings to investigate, specific QC steps).
        2. Generate 4 "Recommended Improvements" for long-term process optimization (e.g., better tracking, standardization).
        
        Keep the tone professional, direct, and actionable.
        
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
              immediate_actions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              recommended_improvements: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      });

      if (response.text) {
        const result = JSON.parse(response.text);
        if (result.immediate_actions && Array.isArray(result.immediate_actions)) {
          setImmediateActions(result.immediate_actions);
        }
        if (result.recommended_improvements && Array.isArray(result.recommended_improvements)) {
          setImprovements(result.recommended_improvements);
        }
      }

    } catch (error) {
      console.error("Failed to generate insights:", error);
      alert("Failed to generate AI insights. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">AI-Powered Analysis</h2>
        <button 
          onClick={generateInsights}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all shadow-md
            ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-95'}
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Data...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate AI Insights
            </>
          )}
        </button>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Immediate Actions */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative overflow-hidden">
           {isLoading && <div className="absolute inset-0 bg-white/50 z-10 animate-pulse"></div>}
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Immediate Actions Required
          </h3>
          <ul className="space-y-3">
            {immediateActions.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative overflow-hidden">
          {isLoading && <div className="absolute inset-0 bg-white/50 z-10 animate-pulse"></div>}
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recommended Improvements
          </h3>
          <ul className="space-y-3">
            {improvements.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default InfoSections;