import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your actual API key from Google AI Studio
const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");

export default function AIInsights({ metrics }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const getAIAnalysis = async () => {
    if (metrics.topicAnalysis.length === 0) return;
    
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Analyze this student's placement prep data:
        - Practiced Accuracy: ${metrics.accPracticed}%
        - Unseen (Generalization) Accuracy: ${metrics.accUnseen}%
        - Overfitting Gap: ${metrics.gap}%
        - Fragile Topics: ${metrics.fragileTopics.join(', ')}
        
        Provide a 2-sentence technical "Regularization Strategy" using ML terms like 'weights', 'overfitting', and 'dropout'.`;

      const result = await model.generateContent(prompt);
      setInsight(result.response.text());
    } catch (error) {
      setInsight("Error connecting to Gemini. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when metrics change significantly
  useEffect(() => {
    if (metrics.topicAnalysis.length > 2) getAIAnalysis();
  }, [metrics.gap]);

  return (
    <div className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden shadow-2xl border border-indigo-500/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="text-indigo-400" /> Gemini AI Diagnostics
        </h3>
        <button 
          onClick={getAIAnalysis} 
          className="text-[10px] bg-indigo-600 px-3 py-1 rounded-full font-bold uppercase hover:bg-indigo-500 transition-colors"
        >
          Refresh Analysis
        </button>
      </div>

      <div className="bg-slate-800/50 p-4 rounded-2xl italic text-sm text-slate-300 min-h-[60px] flex items-center">
        {loading ? (
          <div className="flex items-center gap-2"><Loader2 className="animate-spin" /> Thinking...</div>
        ) : (
          insight || "Complete more questions to trigger AI analysis."
        )}
      </div>
    </div>
  );
}