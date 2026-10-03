export function PlaceholderFoto({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative grid place-items-end overflow-hidden bg-[radial-gradient(ellipse_at_82%_105%,rgba(0,165,81,0.2),transparent_48%),linear-gradient(135deg,#e6f6ec_0%,#ffffff_52%,#eaf4f8_100%)] p-4 ${className}`}
    >
      <span className="absolute -right-8 -top-16 h-48 w-48 rounded-full border border-daun/10" />
      <span className="absolute -right-2 -top-10 h-36 w-36 rounded-full border border-cianjur/10" />
      <span className="relative rounded-full border border-white/80 bg-white/75 px-3 py-1 text-[11px] font-semibold tracking-wide text-gunung/75 backdrop-blur-sm">
        Dokumentasi Cianjur
      </span>
    </div>
  );
}
