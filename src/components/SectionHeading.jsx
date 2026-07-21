export default function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`mx-auto mb-14 flex max-w-2xl flex-col ${alignClass}`}>
      {eyebrow && (
        <span className="badge mb-3 inline-block text-[11px] font-bold text-cyan">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </div>
  );
}
