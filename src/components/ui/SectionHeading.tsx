import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  showBotanicalDivider?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  showBotanicalDivider = false,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <span className="font-script text-copper-light text-xl sm:text-2xl tracking-wide mb-1 select-none">
          {eyebrow}
        </span>
      )}

      <h2 className="font-serif text-2xl sm:text-3xl text-cream-light font-normal tracking-tight">
        {title}
      </h2>

      {showBotanicalDivider && (
        <div className="flex items-center justify-center gap-2.5 my-2.5 text-copper/60 w-36">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-copper/50" />
          <svg
            className="w-3.5 h-3.5 text-copper-light fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2C10.5 5 10.5 8 12 11C13.5 8 13.5 5 12 2Z" />
            <path d="M7 6C6.5 9 8 12 11 13C10 10 9 7.5 7 6Z" />
            <path d="M17 6C15 7.5 14 10 13 13C16 12 17.5 9 17 6Z" />
          </svg>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-copper/50" />
        </div>
      )}

      {description && (
        <p className="mt-1.5 text-xs sm:text-sm text-cream-secondary max-w-lg font-light leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
