import Image from "next/image";
import { AvatarInisial } from "@/components/avatar-inisial";

export function PotretAnggota({
  nama,
  foto,
  className = "",
  ukuranInisial = "md",
  fotoClassName = "object-cover object-top",
}: {
  nama: string;
  foto?: string;
  className?: string;
  ukuranInisial?: "sm" | "md" | "lg";
  fotoClassName?: string;
}) {
  return (
    <div className={`relative grid aspect-[3/4] shrink-0 place-items-center overflow-hidden rounded-xl border border-gunung/10 bg-[radial-gradient(ellipse_at_70%_8%,rgba(245,210,0,0.24),transparent_45%),linear-gradient(155deg,#e6f6ec_0%,#fff_55%,#edf5f7_100%)] ${className}`}>
      {foto ? (
        <Image src={foto} alt={`Potret ${nama}`} fill sizes="(max-width: 640px) 30vw, 160px" className={fotoClassName} />
      ) : (
        <>
          <AvatarInisial nama={nama} size={ukuranInisial} />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-daun via-emas to-cianjur opacity-80" />
        </>
      )}
    </div>
  );
}
