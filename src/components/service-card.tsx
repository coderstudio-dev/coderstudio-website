interface ServiceCardProps {
  index: number;
  tag: string;
  title: string;
  description: string;
}

export function ServiceCard({ index, tag, title, description }: ServiceCardProps) {
  return (
    <div className="relative p-8 border-r border-b border-white/[0.09] transition-colors hover:bg-[#5dd0ff]/[0.04]">
      <div className="flex justify-between items-baseline mb-10">
        <span className="font-mono text-xs text-[#5dd0ff]">{String(index).padStart(2, "0")}</span>
        <span className="font-mono text-[10px] tracking-wide text-[#6C7278] uppercase">{tag}</span>
      </div>
      <h3 className="font-display text-2xl font-normal mb-3">{title}</h3>
      <p className="text-[14.5px] leading-relaxed text-[#9AA0A6]">{description}</p>
    </div>
  );
}
