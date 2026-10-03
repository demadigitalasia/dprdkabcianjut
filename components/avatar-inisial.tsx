const WARNA = [
  "from-emas/70 to-emas",
  "from-pucuk to-daun/40",
  "from-cianjur/15 to-cianjur/35",
  "from-daun/20 to-daun/45",
];

export function AvatarInisial({
  nama,
  size = "md",
}: {
  nama: string;
  size?: "sm" | "md" | "lg";
}) {
  const inisial = nama
    .replace(/^(H\.|Hj\.)\s*/i, "")
    .split(" ")
    .filter((k) => /^[A-Za-z]/.test(k))
    .slice(0, 2)
    .map((k) => k[0]?.toUpperCase())
    .join("");

  const hash = [...nama].reduce((s, c) => s + c.charCodeAt(0), 0);
  const warna = WARNA[hash % WARNA.length];

  const ukuran =
    size === "sm" ? "h-10 w-10 text-sm" : size === "lg" ? "h-24 w-24 text-2xl" : "h-16 w-16 text-lg";

  return (
    <span
      aria-hidden
      className={`${ukuran} ${warna} grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-heading font-bold text-tinta shadow-sm ring-2 ring-white`}
    >
      {inisial}
    </span>
  );
}
