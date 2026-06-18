import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import register from "../assets/Illustration (1).png"
import logo from "../assets/Subtract.png";


export default function SignUpView({ onNavigateToLogin, onAuthSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !username || !password) {
      setErrorMsg('Please complete all fields prior to registration.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must review and agree to our terms and privacy protocols.');
      return;
    }

    localStorage.setItem('userProfile', JSON.stringify({ fullName, email, username, password }));
    localStorage.setItem('isLoggedIn', 'true');
    
    onAuthSuccess();
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col lg:flex-row font-nunito overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
      
      <div className="w-full lg:w-[420px] shrink-0 p-8 sm:p-12 xl:p-16 flex flex-col justify-center bg-white z-10 relative">
        <div className="max-w-sm w-full mx-auto space-y-7">
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="w-14 h-14  text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
             <img src={logo}/>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sign Up</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#f8fafc] hover:bg-slate-100 rounded-xl border border-slate-100 text-xs font-bold text-slate-700 transition-colors">
              <img src="https://docs.imgix.net/assets/images/sandbox/google-logo.svg" alt="" className="w-3.5 h-3.5" />
              <span>Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#f8fafc] hover:bg-slate-100 rounded-xl border border-slate-100 text-xs font-bold text-slate-700 transition-colors">
              <span className="text-blue-600 font-black text-sm leading-none">f</span>
              <span>Facebook</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-50 rounded-xl text-[11px] font-bold text-rose-500 border border-rose-100">{errorMsg}</div>
            )}

            <div className="space-y-1.5">
              <label className="flex text-xs font-bold text-slate-800">Full Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Jiangyu"
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex text-xs font-bold text-slate-800">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex text-xs font-bold text-slate-800">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="johnkevine4362"
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all"
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="flex text-xs font-bold text-slate-800 block">Password</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 bottom-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input 
                type="checkbox" 
                id="termsCheck"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff]/20 bg-slate-50 cursor-pointer mt-0.5"
              />
              <label htmlFor="termsCheck" className="text-[11px] font-medium text-slate-400 leading-normal select-none cursor-pointer">
                By creating an account you agree to the{' '}
                <a href="#terms" className="text-[#5551ff] hover:underline font-bold">terms of use</a> and our{' '}
                <a href="#privacy" className="text-[#5551ff] hover:underline font-bold">privacy policy</a>.
              </label>
            </div>

            <button type="submit" className="w-full bg-[#5551ff] hover:bg-[#4440ef] text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all shadow-md shadow-indigo-100/50 mt-2">
              Create account
            </button>
          </form>

          <div className="text-center text-xs font-medium text-slate-400 pt-2">
            Already have an account?{' '}
            <button onClick={onNavigateToLogin} className="text-[#5551ff] hover:underline font-bold">Log in</button>
          </div>

        </div>
      </div>

      <div className="flex-1 bg-[#f8fafc] hidden lg:flex items-center justify-center p-12 border-l border-slate-100">
        <div className="max-w-xl w-full text-center relative animate-fade-in">
          <div className="relative inline-block">
            <img 
              src={register} 
              alt="Workspace Overview Vector Sketch Representation" 
              className="w-full h-auto max-h-[500px] object-contain rounded-3xl mix-blend-multiply opacity-90"
            />
          </div>
        </div>
      </div>

    </div>
  );
}