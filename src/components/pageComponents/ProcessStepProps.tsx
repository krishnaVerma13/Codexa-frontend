interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  color: string;
}

export default function ProcessStep({ number, title, description, color }: ProcessStepProps) {
  return (
    <div className="relative">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl text-[#06070A] mb-6 relative z-10"
        style={{ backgroundColor: color }}
      >
        {number}
      </div>
      <h3 className="font-display text-2xl text-[#F0F2F5] mb-3">{title}</h3>
      <p className="font-mono text-xs text-[#454C5E] font-light">{description}</p>
    </div>
  );
}