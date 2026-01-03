import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';
import AIInsights from './components/AIInsights';
import { QUESTIONS } from './data/mockdata';
import { calculateOverfitMetrics } from './utils/Mlengine';

export default function App() {
  const [history, setHistory] = useState([]);
  const metrics = calculateOverfitMetrics(history);

  const handleAttempt = (qId, isCorrect) => {
    const q = QUESTIONS.find(q => q.id === qId);
    setHistory([...history, { ...q, correct: isCorrect }]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black gradient-text tracking-tighter">PrepFit.</h1>
          <p className="text-slate-500 font-medium">Detect and fix placement preparation overfitting.</p>
        </div>
        <button onClick={() => setHistory([])} className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors">
          Reset Training
        </button>
      </header>

      <main>
        <Dashboard metrics={metrics} />
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          Practice Engine
          <span className="text-[10px] font-black bg-slate-800 text-white px-2 py-0.5 rounded-full uppercase">Beta</span>
        </h2>
        <Practice questions={QUESTIONS} onAttempt={handleAttempt} />
        <AIInsights metrics={metrics} />
      </main>
    </div>
  );
}