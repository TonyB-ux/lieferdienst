// src/components/TrustBar.tsx
export default function TrustBar() {
    return (
      <div className="glass p-4 md:p-5 flex flex-wrap items-center gap-4 justify-between">
        <span className="text-white/80 text-sm">Vertrauenswürdig gelistet:</span>
        <div className="flex items-center gap-3 opacity-90">
          <span className="chip">EU-Bio</span>
          <span className="chip">Demeter</span>
          <span className="chip">Bioland</span>
          <span className="chip">Naturland</span>
        </div>
      </div>
    );
  }

  