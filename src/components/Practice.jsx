import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Practice({ questions, onAttempt }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {questions.map((q) => (
        <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-all shadow-sm">
          <div>
            <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1 inline-block ${q.isUnseen ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
              {q.isUnseen ? 'Unseen' : 'Practice'}
            </div>
            <h4 className="font-bold text-slate-800">{q.title}</h4>
            <p className="text-xs text-slate-400">{q.topic}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onAttempt(q.id, true)} className="p-2 hover:bg-green-50 text-slate-300 hover:text-green-600 rounded-xl transition-colors">
              <CheckCircle size={24} />
            </button>
            <button onClick={() => onAttempt(q.id, false)} className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-600 rounded-xl transition-colors">
              <XCircle size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}