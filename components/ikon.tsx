import type { ReactNode } from "react";

type NamaIkon =
  | "arrow-left"
  | "arrow-right"
  | "arrow-up-right"
  | "calendar"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "download"
  | "mail"
  | "menu"
  | "map-pin"
  | "phone"
  | "search";

const BENTUK: Record<NamaIkon, ReactNode> = {
  "arrow-left": <path d="M19 12H5m7 7-7-7 7-7" />,
  "arrow-right": <path d="M5 12h14m-7-7 7 7-7 7" />,
  "arrow-up-right": <path d="M7 17 17 7M7 7h10v10" />,
  calendar: <>
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <path d="M7.5 3v4M16.5 3v4M3.5 9.5h17M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
  </>,
  check: <path d="m5 12 4 4L19 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-left": <path d="m15 18-6-6 6-6" />,
  download: <>
    <path d="M12 3v12m-5-5 5 5 5-5" />
    <path d="M5 17v3h14v-3" />
  </>,
  mail: <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </>,
  menu: <>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </>,
  "map-pin": <>
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
  phone: <path d="M7 3.5h3l1.5 4-2 1.5a15 15 0 0 0 6 6l1.5-2 4 1.5v3a2.5 2.5 0 0 1-2.8 2.5A16.5 16.5 0 0 1 4.5 6.3 2.5 2.5 0 0 1 7 3.5Z" />,
  search: <>
    <circle cx="10.8" cy="10.8" r="6.8" />
    <path d="m16 16 4.5 4.5" />
  </>,
};

export function Ikon({
  nama,
  ukuran = 20,
  className = "",
}: {
  nama: NamaIkon;
  ukuran?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={ukuran}
      height={ukuran}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      {BENTUK[nama]}
    </svg>
  );
}
