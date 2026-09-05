import React, { useState } from 'react';
import { MENTORS_DATABASE } from '../data/mentors';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Lock, 
  HelpCircle, 
  AlertCircle,
  Sparkles,
  Download
} from 'lucide-react';
import { Mentor } from '../types';

export const MentorMarketplace: React.FC = () => {
  const { activeProfile, createBooking, bookings } = useApp();

  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [guardianConsent, setGuardianConsent] = useState<boolean>(true);
  const [guardianEmail, setGuardianEmail] = useState<string>('parent.guardian@example.com');
  const [guardianEmailError, setGuardianEmailError] = useState<string>('');
  const [generatedBookingId, setGeneratedBookingId] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const defaultQuestions = [
    'What should a Class 10/12 student start doing today?',
    'What mistakes did you make during your preparation years?',
    'How did you overcome coming from a non-metro city?',
    'Which skills turned out to be most useful in your first job?',
    'What happens if I miss the top entrance exam cutoff?'
  ];

  const handleBook = () => {
    if (!selectedMentor || !selectedSlot) return;

    const trimmedEmail = guardianEmail.trim();
    if (!emailRegex.test(trimmedEmail)) {
      setGuardianEmailError('Please enter a valid guardian email address before confirming the booking.');
      return;
    }

    setGuardianEmailError('');
    const fee = selectedMentor.pricingTiers[0].priceINR;
    const bookingId = `PW-BK-${String(Math.floor(Math.random() * 90000) + 10000)}`;
    setGeneratedBookingId(bookingId);

    createBooking({
      id: bookingId,
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      studentId: activeProfile.id,
      studentName: activeProfile.name,
      selectedSlot,
      priceINR: fee,
      status: 'Confirmed',
      guardianConsentGiven: guardianConsent,
      guardianEmail: trimmedEmail,
      preCallQuestions: defaultQuestions,
      postCallActionPlan: [
        'Complete recommended foundational project',
        'Review study schedule and time blocking',
        'Follow up with mentor in 60 days'
      ]
    });

    setBookingSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <Users className="w-3.5 h-3.5" /> Verified Professional Consultations
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
            ?Talk to Someone Who Has Done It?
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Book 30-minute verified guidance sessions with engineers, doctors, CAs, lawyers, defense officers, and coaches. Minor safety shielded with mandatory guardian consent.
          </p>
        </div>
      </div>

      {/* Minor Safety & Guardian Shield Protocol Banner */}
      <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-emerald-900">Guardian Shield & Child Safety Architecture</p>
          <p className="text-emerald-800 leading-relaxed">
            All mentors undergo identity & background KYC checks. Consultations for minors require parental consent, with automated dual-invite links allowing parents to join or review recorded session transcripts.
          </p>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MENTORS_DATABASE.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:border-brand-300 hover:shadow-md transition"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={mentor.avatarUrl}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-100"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-sm font-['Outfit']">{mentor.name}</h3>
                    <span title="Verified Professional"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /></span>
                  </div>
                  <p className="text-xs text-slate-500">{mentor.title}</p>
                  <p className="text-[11px] text-brand-600 font-semibold">{mentor.companyOrOrg}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {mentor.bio}
              </p>

              {/* Education & Experience */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] space-y-1 text-slate-600">
                <div>?? <span className="font-semibold text-slate-800">{mentor.education}</span></div>
                <div>?? {mentor.location} ? {mentor.yearsOfExperience} Yrs Exp</div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1">
                {mentor.topSkills.slice(0, 3).map((sk, i) => (
                  <span key={i} className="text-[10px] font-medium bg-brand-50 text-brand-700 px-2 py-0.5 rounded-md border border-brand-100">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing & Booking CTA */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">30-min Consultation</span>
                <span className="text-sm font-extrabold text-slate-900">
                  ?{mentor.pricingTiers[0].priceINR}
                  <span className="text-[10px] font-normal text-emerald-600 ml-1">(Free for EWS)</span>
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedMentor(mentor);
                  setSelectedSlot(mentor.availableSlots[0]);
                  setGeneratedBookingId('');
                  setGuardianEmailError('');
                  setBookingSuccess(false);
                }}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs transition"
              >
                Book Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            {!bookingSuccess ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                      Book Session with {selectedMentor.name}
                    </h3>
                    <p className="text-xs text-slate-500">{selectedMentor.title} ? {selectedMentor.companyOrOrg}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    ? Close
                  </button>
                </div>

                {/* Slot Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">Select 30-Minute Slot:</label>
                  <div className="space-y-2">
                    {selectedMentor.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full p-3 rounded-xl text-xs font-semibold text-left border transition ${
                          selectedSlot === slot
                            ? 'bg-brand-50 border-brand-500 text-brand-900'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        ?? {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guardian Consent Shield for Minors */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Guardian Consent & Safety Notice
                  </div>
                  <label className="flex items-start gap-2 text-xs text-emerald-950 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guardianConsent}
                      onChange={(e) => setGuardianConsent(e.target.checked)}
                      className="mt-0.5 accent-emerald-600"
                    />
                    <span>
                      Parent/Guardian agrees to this consultation and will receive the meeting link & summary action report.
                    </span>
                  </label>
                  <input
                    type="email"
                    value={guardianEmail}
                    onChange={(e) => {
                      setGuardianEmail(e.target.value);
                      if (guardianEmailError) {
                        setGuardianEmailError('');
                      }
                    }}
                    placeholder="Parent / Guardian Email"
                    className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 text-xs bg-white focus:outline-none"
                  />
                  {guardianEmailError && (
                    <p className="text-[11px] text-red-600 mt-1">{guardianEmailError}</p>
                  )}
                </div>

                {/* Pre-Call Questions Preview */}
                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    Auto-Generated Questions for your Call:
                  </span>
                  <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4">
                    {defaultQuestions.slice(0, 3).map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>

                {/* Book & Mock Payment Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Fee:</span>
                    <span className="text-sm font-bold text-slate-900">?{selectedMentor.pricingTiers[0].priceINR}</span>
                  </div>
                  <button
                    onClick={handleBook}
                    disabled={!guardianConsent || !emailRegex.test(guardianEmail.trim())}
                    className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition"
                  >
                    Confirm & Generate Prep Sheet
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">Session Confirmed!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your 30-minute consultation with <span className="font-semibold">{selectedMentor.name}</span> on <span className="font-semibold">{selectedSlot}</span> is scheduled.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-3">
                 <div className="flex items-center justify-between text-slate-800 font-bold">
                   <span>Receipt</span>
                   <span className="text-brand-700">{generatedBookingId}</span>
                 </div>
                 <div className="space-y-1.5 text-slate-600">
                   <div className="flex items-center justify-between">
                     <span>Session Fee</span>
                     <span>₹{selectedMentor.pricingTiers[0].priceINR}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span>GST</span>
                     <span>₹{(selectedMentor.pricingTiers[0].priceINR * 0.18).toFixed(2)}</span>
                   </div>
                   <div className="flex items-center justify-between text-emerald-700">
                     <span>EWS Waiver</span>
                     <span>-₹{(selectedMentor.pricingTiers[0].priceINR * 0.18).toFixed(2)}</span>
                   </div>
                   <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-slate-800 font-bold">
                     <span>Total Paid</span>
                     <span>₹{selectedMentor.pricingTiers[0].priceINR}</span>
                   </div>
                 </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                 <div className="font-bold text-slate-800">Your 10-Question Prep Sheet:</div>
                 <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                   {defaultQuestions.map((q, i) => (
                     <li key={i}>{q}</li>
                   ))}
                 </ol>
                </div>
                <button
                 type="button"
                 onClick={() => {
                   const fileContent = defaultQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n');
                   const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
                   const url = URL.createObjectURL(blob);
                   const anchor = document.createElement('a');
                   anchor.href = url;
                   anchor.download = 'pathwise-prep-sheet.txt';
                   anchor.click();
                   URL.revokeObjectURL(url);
                 }}
                 className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-700 transition"
                >
                 Download Prep Sheet
                </button>
                <button
                 onClick={() => setSelectedMentor(null)}
                 className="w-full py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-sm"
                >
                 Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
