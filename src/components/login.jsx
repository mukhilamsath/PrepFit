import React from 'react';
import { loginWithGoogle } from '../config/firebase';
import { LogIn } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const handleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      onLoginSuccess(result.user);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center max-w-md w-full">
        <h1 className="text-5xl font-black gradient-text tracking-tighter mb-4">PrepFit.</h1>
        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
          Log in to detect and fix your placement preparation overfitting.
        </p>
        
        <button 
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 py-4 px-6 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-indigo-400 transition-all shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}