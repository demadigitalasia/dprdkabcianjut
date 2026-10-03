const GAYA: Record<string, string> = {
  Diterima: "bg-tinta/5 text-tinta-pudar",
  Diverifikasi: "bg-cianjur/10 text-tinta",
  Diteruskan: "bg-emas/30 text-tinta",
  Dibahas: "bg-pucuk text-daun-tua",
  Ditindaklanjuti: "bg-daun/15 text-daun-tua",
  Ditutup: "bg-tinta/5 text-tinta-pudar",
  "Akan datang": "bg-emas/30 text-tinta",
  Selesai: "bg-tinta/5 text-tinta-pudar",
};

export function BadgeStatus({ status }: { status: string }) {
  const gaya = GAYA[status] ?? "bg-tinta/5 text-tinta-pudar";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${gaya}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
