interface SectionLabelProps {
  index?: string;
  children: string;
  className?: string;
}

export function SectionLabel({ index, children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-(--color-fg-muted) ${className}`}
    >
      {index && <span className="text-(--color-accent)">{index}</span>}
      {index && <span className="text-(--color-fg-faint)">—</span>}
      <span>{children}</span>
    </div>
  );
}
