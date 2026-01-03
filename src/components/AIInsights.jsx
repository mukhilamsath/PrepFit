import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AIInsights({ metrics }) {
  const getMockFeedback = () => {
    if (metrics.gap > 20) return "Warning: You are overfitting to company-specific patterns. Your model lacks 'Generalization Power'. Try solving logic-only problems to balance your weights.";
    return "Great work! Your learning is 'Robust'. You are generalizing well across both practiced and unseen contexts.";
  };

  return (
    <div className="mt-8 p-6 bg-indigo-900 rounded-[2rem] text-white flex items-start gap-5 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} />
      </div>
      <div className="bg-indigo-500 p-3 rounded-2xl">
        <Sparkles className="text-white" />
      </div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-1 tracking-tight">Gemini AI Feedback</h3>
        <p className="text-indigo-100 leading-relaxed text-sm italic">
          "{getMockFeedback()}"
        </p>
      </div>
    </div>
  );
}