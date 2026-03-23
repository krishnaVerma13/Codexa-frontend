interface FeatureCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: 'mint' | 'lavender' | 'peach' | 'sky' | 'yellow';
}

 export default function FeatureCard({ number, icon, title, description, accentColor }: FeatureCardProps) {
  const colors = {
    mint: '#B8F5D4',
    lavender: '#D4BCFF',
    peach: '#FFD4B8',
    sky: '#B8E8FF',
    yellow: '#FFF0A8',
  };
  
  return (
    <div className="bg-[#0D1117] border border-[#1E2330] rounded-xl p-8 hover:border-[#B8F5D4]/30 transition-all relative group">
      <div className="absolute top-6 right-6 font-display text-6xl text-[#1E2330] leading-none">
        {number}
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-[#1E2330] flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="font-display text-xl text-[#F0F2F5] mb-3">
          {title}
        </h3>
        <p className="font-mono text-xs text-[#454C5E] font-light">
          {description}
        </p>
      </div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: colors[accentColor] }}
      />
    </div>
  );
}