export function GarisPadi({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 6"
      preserveAspectRatio="none"
      className={`h-1.5 w-full ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="gp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00a551" />
          <stop offset="55%" stopColor="#f5d200" />
          <stop offset="100%" stopColor="#0b76c4" />
        </linearGradient>
      </defs>
      <rect x="0" y="2" width="240" height="2" rx="1" fill="url(#gp)" opacity="0.7" />
    </svg>
  );
}

export function ButirPadi({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-current ${className}`}
    />
  );
}

/* Motif geometris lambang — garis gradien modern: gunung, air, matahari emas */
export function MotifGunung({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00a551" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0b76c4" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d="M100 16 L182 108 H18 Z" stroke="url(#mg)" strokeWidth="2" />
      <path d="M100 44 L148 108 H52 Z" fill="url(#mg)" opacity="0.12" />
      <circle cx="100" cy="34" r="9" fill="#f5d200" opacity="0.95" />
      <line x1="18" y1="118" x2="182" y2="118" stroke="url(#mg)" strokeWidth="2" />
      <line x1="18" y1="128" x2="182" y2="128" stroke="url(#mg)" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}
