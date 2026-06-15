import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/logo-mark.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src={logoMark} alt="" width={36} height={36} className="h-9 w-9" />
      <span
        className={`font-display text-lg font-bold tracking-tight ${
          light ? "text-white" : "text-brand"
        }`}
      >
        Balancepoint <span className="font-medium opacity-90">Capital</span>
      </span>
    </Link>
  );
}
