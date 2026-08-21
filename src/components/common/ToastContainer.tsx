import React from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#24483A] text-white p-4 rounded-xl shadow-xl border border-[#2E5D4B] flex items-start gap-3 transform transition-all animate-in slide-in-from-bottom-5 fade-in duration-200"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-[#C8A96B]" />
              )}
              {toast.type === "warning" && (
                <AlertCircle className="w-5 h-5 text-[#B86B4B]" />
              )}
              {toast.type === "info" && (
                <Info className="w-5 h-5 text-[#F8F5EF]" />
              )}
              {!toast.type && (
                <CheckCircle2 className="w-5 h-5 text-[#C8A96B]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-semibold text-[#F8F5EF] leading-snug">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-xs text-[#EDE5D8] mt-0.5 line-clamp-2">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#EDE5D8]/70 hover:text-white shrink-0 p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
