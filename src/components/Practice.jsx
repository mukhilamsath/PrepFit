import React from "react";
import { Folder, Check, X } from "lucide-react";

export default function Practice({ questions, onAttempt, history = [] }) {
  const groupedQuestions = questions.reduce((acc, q) => {
    if (!acc[q.topic]) acc[q.topic] = [];
    acc[q.topic].push(q);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      {/* 🔍 LEGEND */}
      <div className="flex gap-6 text-xs font-bold items-center bg-white p-4 rounded-2xl border border-slate-100 w-fit">
        <div className="flex items-center gap-2 text-emerald-600">
          <Check size={14} strokeWidth={3} /> Solved (Logic Mastered)
        </div>
        <div className="flex items-center gap-2 text-red-500">
          <X size={14} strokeWidth={3} /> Unsolved (Gap Detected)
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([topic, qs]) => (
        <div key={topic} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4 border-l-4 border-indigo-500 pl-4">
            <Folder size={18} className="text-indigo-500" />
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
              {topic} <span className="text-slate-400 font-medium ml-2 text-sm">({qs.length})</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qs.map(q => {
              const attempt = history.find(h => h.id === q.id);
              const isSolved = attempt?.correct === true;
              const isUnsolved = attempt?.correct === false;

              // ✅ ENHANCED DYNAMIC BOX STYLING
              // If isSolved is true, it uses a solid emerald-50 background and an emerald-200 border
              const cardStyles = isSolved 
                ? "bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200 shadow-emerald-100" 
                : isUnsolved 
                ? "bg-red-50 border-red-200 ring-1 ring-red-200 shadow-red-100" 
                : "bg-white border-slate-100 shadow-sm";

              return (
                <div key={q.id} className={`${cardStyles} p-5 rounded-2xl border flex justify-between items-center transition-all duration-300`}>
                  <div className="flex flex-col gap-1">
                    <div className={`text-[9px] font-black px-2 py-0.5 rounded-full w-fit uppercase ${q.isUnseen ? "bg-emerald-200 text-emerald-800" : "bg-blue-100 text-blue-700"}`}>
                      {q.isUnseen ? "Generalization" : "Pattern Practice"}
                    </div>
                    <h4 className={`font-bold transition-colors duration-300 ${isSolved ? 'text-emerald-900' : isUnsolved ? 'text-red-900' : 'text-slate-700'}`}>
                      {q.title}
                    </h4>
                    {/* Add Topic hint for clarity */}
                    <p className={`text-[10px] font-medium ${isSolved ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {q.topic} Pattern
                    </p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAttempt(q.id, true)}
                      className={`p-2 rounded-xl transition-all duration-300 ${
                        isSolved 
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-110' 
                          : 'bg-white text-slate-300 hover:text-emerald-500 border border-slate-100'
                      }`}
                    >
                      <Check size={20} strokeWidth={3} />
                    </button>
                    <button
                      onClick={() => onAttempt(q.id, false)}
                      className={`p-2 rounded-xl transition-all duration-300 ${
                        isUnsolved 
                          ? 'bg-red-500 text-white shadow-lg shadow-red-200 scale-110' 
                          : 'bg-white text-slate-300 hover:text-red-500 border border-slate-100'
                      }`}
                    >
                      <X size={20} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}