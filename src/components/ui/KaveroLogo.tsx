import Image from "next/image";
import Link from "next/link";

interface KaveroLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
  priority?: boolean;
}

export function KaveroLogo({
  className = "",
  size = "md",
  href = "/",
  priority = false,
}: KaveroLogoProps) {
  const sizeMap = {
    sm: { width: 90, height: 40 },
    md: { width: 112, height: 50 },
    lg: { width: 150, height: 67 },
  };

  const { width, height } = sizeMap[size];

  const content = (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <Image
        src="/images/kavero-logo-2x.png"
        alt="KAVERO Coffee Logo"
        width={width}
        height={height}
        priority={priority}
        draggable={false}
        className="h-auto w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] kavero-nondraggable-image"
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        draggable={false}
        className="inline-block transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 rounded select-none"
      >
        {content}
      </Link>
    );
  }

  return content;
}
