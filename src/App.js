import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logout } from './config/firebase';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';
import AIInsights from './components/AIInsights';
import Sidebar from './components/Sidebar'; // New Component
import { QUESTIONS } from './data/mockdata';
import { calculateOverfitMetrics } from './utils/Mlengine';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('prediction'); // 'prediction', 'questions', 'gemini'
  const [history, setHistory] = useState([]);
  const [stressTest, setStressTest] = useState(false);
  const metrics = calculateOverfitMetrics(history);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  if (!user) return <Login onLoginSuccess={setUser} />;

  
  const handleAttempt = (qId, isCorrect) => {
  // Find the question object
  const question = QUESTIONS.find(q => q.id === qId);
  
  // Check if this exact attempt (same ID and same result) already exists
  const existingAttempt = history.find(h => h.id === qId);

  if (existingAttempt && existingAttempt.correct === isCorrect) {
    // If user clicks the same button twice, remove the attempt (Reset)
    setHistory(history.filter(h => h.id !== qId));
  } else {
    // Replace existing attempt or add new one
    const newHistory = history.filter(h => h.id !== qId);
    setHistory([...newHistory, { ...question, correct: isCorrect }]);
  }
};
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Side Menu */}
      <Sidebar 
        activeView={view} 
        setView={setView} 
        user={user} 
        onLogout={logout} 
      />

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-800 capitalize tracking-tight">
              {view === 'prediction' ? 'Overfit Diagnostics' : view}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              {view === 'prediction' && "Real-time performance generalization analysis."}
              {view === 'questions' && "Knowledge validation through pattern testing."}
              {view === 'gemini' && "AI-driven regularization strategies."}
            </p>
          </div>
          
          {view === 'questions' && (
            <button 
              onClick={() => setStressTest(!stressTest)}
              className={`text-[10px] font-black px-4 py-2 rounded-full border transition-all uppercase tracking-widest ${stressTest ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-200' : 'text-slate-400 border-slate-200'}`}
            >
              {stressTest ? 'Adversarial Mode On' : 'Standard Mode'}
            </button>
          )}
        </header>

        {/* Conditional Rendering based on Navigation */}
        <div className="animate-in fade-in duration-500">
          {view === 'prediction' && <Dashboard metrics={metrics} />}
          {view === 'questions' && (
            <Practice 
              questions={stressTest ? QUESTIONS.filter(q => q.isUnseen) : QUESTIONS} 
              onAttempt={handleAttempt} 
            />
          )}
          {view === 'gemini' && <AIInsights metrics={metrics} />}
        </div>
      </main>
    </div>
  );
}