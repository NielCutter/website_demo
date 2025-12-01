interface SkillIconProps {
  name: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SkillIcon({ name, icon, className = "" }: SkillIconProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all duration-200 ${className}`}
      title={name}
    >
      {icon && <div className="text-2xl">{icon}</div>}
      <span className="text-xs text-gray-400 text-center">{name}</span>
    </div>
  );
}

