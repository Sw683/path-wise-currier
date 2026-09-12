import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Mail, FileText, CheckCircle2, Lock } from 'lucide-react';

export const EducationVerifyModal: React.FC = () => {
  const { isVerificationOpen, setIsVerificationOpen, handleCompleteVerification, currentUser } = useApp();

  const [method, setMethod] = useState<'email' | 'id_card'>('email');
  const [collegeEmail, setCollegeEmail] = useState(`${currentUser.name.toLowerCase().replace(' ', '.')}@du.ac.in`);
  const [idCardNumber, setIdCardNumber] = useState('2024-DU-KMC-8942');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isVerificationOpen) return null;

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      handleCompleteVerification(
        method === 'email' ? 'Institutional Email' : 'Student ID Document',
        method === 'email' ? collegeEmail.split('@')[1] || 'du.ac.in' : currentUser.universityName
      );
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white relative">
          <button
            onClick={() => setIsVerificationOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xs uppercase tracking-wider text-emerald-100">
              Academic Credential Verification
            </span>
          </div>

          <h3 className="text-xl font-extrabold">Verify Your Student Status</h3>
          <p className="text-xs text-emerald-100 mt-1">
            Unlock the verified student shield on your profile and get priority teammate matchmaking.
          </p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleVerifySubmit} className="p-6 space-y-4 text-xs">
          
          {/* Privacy Guarantee (Section 17) */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-bold block">Strict Privacy Guarantee:</strong>
              <p className="text-[11px] text-emerald-900 leading-tight">
                Your ID number or private documentation will <strong>never</strong> be displayed publicly. Only a clean "Verified Student" badge is attached to your profile.
              </p>
            </div>
          </div>

          {/* Verification Method Tabs */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Verification Method</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod('email')}
                className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  method === 'email'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>College .edu / .ac.in</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('id_card')}
                className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  method === 'id_card'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Student ID Scan</span>
              </button>
            </div>
          </div>

          {/* Method 1: College Email */}
          {method === 'email' ? (
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Institutional Email Address
              </label>
              <input
                type="email"
                required
                value={collegeEmail}
                onChange={e => setCollegeEmail(e.target.value)}
                placeholder="yourname@du.ac.in or @iitd.ac.in"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                A verification code will be sent to your campus inbox.
              </p>
            </div>
          ) : (
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Student Enrollment / Roll Number
              </label>
              <input
                type="text"
                required
                value={idCardNumber}
                onChange={e => setIdCardNumber(e.target.value)}
                placeholder="e.g. 2024-DU-8942"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Encrypted with institutional directory verification.
              </p>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsVerificationOpen(false)}
              className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              {isProcessing ? 'Verifying...' : 'Verify & Issue Badge 🛡️'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
