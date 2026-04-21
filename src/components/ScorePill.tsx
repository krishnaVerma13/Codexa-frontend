interface ScorePillProps {
  label: string;
  value: number;
  color: 'mint' | 'lavender' | 'peach' | 'sky' | 'yellow';
  text:string
  showBar?: boolean;
}

const colorMap = {
  mint: '#B8F5D4',
  lavender: '#D4BCFF',
  peach: '#FFD4B8',
  sky: '#B8E8FF',
  yellow: '#FFF0A8',
};

export function ScorePill({ label, value, color,text = "", showBar = true }: ScorePillProps) {
  const colorValue = colorMap[color];

  return (
    <div
      className="min-w-35 bg-[#0D1117] border border-[#1E2330] rounded-lg p-4"
      style={{ borderTop: `2px solid ${colorValue}` }}
    >
      <div className="font-mono text-[13px] uppercase  mb-1">
        {label}
      </div>
      <div
        className="font-display text-[32px] leading-none mb-2"
        style={{ color: colorValue }}
      >
        {value} <span className="font-mono text-[12px] uppercase text-[#737d97] mb-1">{text}</span>
      </div>
      {showBar && (
        <div className="h-0.75 bg-[#1E2330] rounded-full overflow-hidden">
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
