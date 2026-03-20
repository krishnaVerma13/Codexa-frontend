interface ScorePillProps {
  label: string;
  value: number;
  color: 'mint' | 'lavender' | 'peach' | 'sky' | 'yellow';
  showBar?: boolean;
}

const colorMap = {
  mint: '#B8F5D4',
  lavender: '#D4BCFF',
  peach: '#FFD4B8',
  sky: '#B8E8FF',
  yellow: '#FFF0A8',
};

export function ScorePill({ label, value, color, showBar = true }: ScorePillProps) {
  const colorValue = colorMap[color];
  
  return (
    <div 
      className="min-w-[140px] bg-[#0D1117] border border-[#1E2330] rounded-lg p-4"
      style={{ borderTop: `2px solid ${colorValue}` }}
    >
      <div className="font-mono text-[10px] uppercase text-[#454C5E] mb-1">
        {label}
      </div>
      <div 
        className="font-display text-[32px] leading-none mb-2"
        style={{ color: colorValue }}
      >
        {value}
      </div>
      {showBar && (
        <div className="h-[3px] bg-[#1E2330] rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${value}%`,
              backgroundColor: colorValue 
            }}
          />
        </div>
      )}
    </div>
  );
}
