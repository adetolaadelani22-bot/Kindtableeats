import React, { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F5EF] py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="space-y-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B86B4B]">We are here to help</span>
          <h1 className="font-serif text-4xl font-bold leading-tight text-[#24483A] sm:text-5xl">Contact KindTableEats</h1>
          <p className="max-w-md text-sm leading-relaxed text-[#6D716C]">Questions about an order, a kitchen, or joining our community? Send us a note and our team will get back to you.</p>
          <div className="space-y-4 border-t border-[#2025221a] pt-6 text-sm text-[#202522]">
            <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#B86B4B]" /> hello@kindtableeats.org</p>
            <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[#B86B4B]" /> Community kitchens across London and worldwide</p>
          </div>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="space-y-5 rounded-2xl border border-[#EDE5D8] bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-xs font-semibold text-[#202522]">Name<input required className="mt-2 w-full rounded-lg border border-[#EDE5D8] bg-[#F8F5EF] px-3 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#24483A]" /></label>
            <label className="text-xs font-semibold text-[#202522]">Email<input required type="email" className="mt-2 w-full rounded-lg border border-[#EDE5D8] bg-[#F8F5EF] px-3 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#24483A]" /></label>
          </div>
          <label className="block text-xs font-semibold text-[#202522]">Message<textarea required rows={6} className="mt-2 w-full resize-y rounded-lg border border-[#EDE5D8] bg-[#F8F5EF] px-3 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-[#24483A]" /></label>
          {sent && <p role="status" className="text-sm font-semibold text-[#24483A]">Thanks. Your message has been received.</p>}
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#24483A] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#193329]"><Send className="h-4 w-4" /> Send message</button>
        </form>
      </div>
    </div>
  );
};
