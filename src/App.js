import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';
import AIInsights from './components/AIInsights';
import { QUESTIONS } from './data/mockdata';
import { calculateOverfitMetrics } from './utils/Mlengine';

export default function App() {
  const [history, setHistory] = useState([]);
  const [stressTest, setStressTest] = useState(false); // NEW
  const metrics = calculateOverfitMetrics(history);

  const handleAttempt = (qId, isCorrect) => {
    const q = QUESTIONS.find(q => q.id === qId);
    setHistory([...history, { ...q, correct: isCorrect }]);
  };

  const filteredQuestions = stressTest 
    ? QUESTIONS.filter(q => q.isUnseen) 
    : QUESTIONS;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black gradient-text tracking-tighter">PrepFit.</h1>
          <p className="text-slate-500 font-medium italic">Detecting Feature Leakage in Student Preparation</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setStressTest(!stressTest)}
            className={`text-xs font-bold px-4 py-2 rounded-lg border transition-all ${stressTest ? 'bg-red-500 border-red-500 text-white' : 'text-slate-400 border-slate-200'}`}
          >
            {stressTest ? 'STOP STRESS TEST' : 'START STRESS TEST'}
          </button>
          <button onClick={() => setHistory([])} className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase">
            Reset Data
          </button>
        </div>
      </header>

      <main>
        <Dashboard metrics={metrics} />
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          Knowledge Validation Engine
          {stressTest && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">ADVERSARIAL MODE</span>}
        </h2>
        <Practice questions={filteredQuestions} onAttempt={handleAttempt} />
        <AIInsights metrics={metrics} />
      </main>
    </div>
  );
}