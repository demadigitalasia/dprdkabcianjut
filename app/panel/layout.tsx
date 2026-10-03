"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Ikon } from "@/components/ikon";

type TautanPanel = { href: string; label: string; icon: "arrow-right" | "check" | "search" };
type GrupPanel = { label: string; items: TautanPanel[] };
type InfoPeran = { label: string; defaultHref: string; groups: GrupPanel[] };

const RINGKASAN: TautanPanel = { href: "/panel", label: "Ringkasan", icon: "arrow-right" };
const ROLE_INFO: Record<string, InfoPeran> = {
  admin: {
    label: "Admin sistem",
    defaultHref: "/panel",
    groups: [
      { label: "Ruang kerja", items: [RINGKASAN] },
      { label: "Aspirasi", items: [
        { href: "/panel/aspirasi", label: "Verifikasi aspirasi", icon: "check" },
        { href: "/panel/aspirasi-saya", label: "Aspirasi anggota", icon: "search" },
        { href: "/panel/aspirasi-pimpinan", label: "Ringkasan pimpinan", icon: "arrow-right" },
      ] },
    ],
  },
  sekretariat: {
    label: "Sekretariat / PIC aspirasi",
    defaultHref: "/panel",
    groups: [
      { label: "Ruang kerja", items: [RINGKASAN] },
      { label: "Penanganan aspirasi", items: [{ href: "/panel/aspirasi", label: "Antrean verifikasi", icon: "check" }] },
    ],
  },
  dewan: {
    label: "Anggota dewan",
    defaultHref: "/panel",
    groups: [
      { label: "Ruang kerja", items: [RINGKASAN] },
      { label: "Penugasan saya", items: [{ href: "/panel/aspirasi-saya", label: "Aspirasi anggota", icon: "search" }] },
    ],
  },
  staf: {
    label: "Staf dewan",
    defaultHref: "/panel",
    groups: [
      { label: "Ruang kerja", items: [RINGKASAN] },
      { label: "Delegasi", items: [{ href: "/panel/aspirasi-saya", label: "Aspirasi delegasi", icon: "search" }] },
    ],
  },
  pimpinan: {
    label: "Pimpinan dewan",
    defaultHref: "/panel",
    groups: [
      { label: "Ruang kerja", items: [RINGKASAN] },
      { label: "Pemantauan", items: [{ href: "/panel/aspirasi-pimpinan", label: "Ringkasan aspirasi", icon: "arrow-right" }] },
    ],
  },
};

function semuaTautan(info: InfoPeran) {
  return info.groups.flatMap((grup) => grup.items);
}

function NavigasiPanel({ info, pathname, collapsed = false, onNavigate }: {
  info: InfoPeran;
  pathname: string;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Navigasi panel" className="space-y-5">
      {info.groups.map((grup) => (
        <div key={grup.label}>
          {!collapsed && <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-tinta-pudar">{grup.label}</p>}
          <ul className="space-y-1">
            {grup.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    aria-label={collapsed ? item.label : undefined}
                    title={collapsed ? item.label : undefined}
                    className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${active ? "bg-gunung text-white" : "text-tinta-pudar hover:bg-pucuk hover:text-gunung"} ${collapsed ? "justify-center px-2" : ""}`}
                  >
                    <Ikon nama={item.icon} ukuran={17} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function PanelLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);
  const info = ROLE_INFO[role];
  const halamanPublik = pathname === "/panel/login" || pathname === "/panel/lupa-password";

  useEffect(() => {
    if (halamanPublik) return;
    const timeout = window.setTimeout(() => {
      const currentRole = sessionStorage.getItem("panel_demo_role") ?? "";
      setRole(currentRole);
      setEmail(sessionStorage.getItem("panel_demo_email") ?? "");
      setReady(true);
      if (!ROLE_INFO[currentRole]) router.replace("/panel/login");
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [halamanPublik, router]);

  useEffect(() => {
    if (halamanPublik || !ready || !info) return;
    if (pathname !== "/panel" && !semuaTautan(info).some((item) => item.href === pathname)) {
      router.replace(info.defaultHref);
    }
  }, [halamanPublik, info, pathname, ready, router]);

  function keluar() {
    sessionStorage.removeItem("panel_demo_role");
    sessionStorage.removeItem("panel_demo_email");
    router.push("/panel/login");
  }

  if (halamanPublik) return children;
  if (!ready || !info) return <div className="grid min-h-screen place-items-center bg-krem text-sm text-tinta-pudar">Menyiapkan panel…</div>;

  return (
    <div className="min-h-screen bg-krem">
      <header className="border-b border-jerami bg-white">
        <div aria-hidden className="h-1 bg-gradient-to-r from-daun via-emas to-cianjur" />
        <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gunung p-1.5">
              <Image src="/logo-cianjur.webp" alt="Lambang Kabupaten Cianjur" width={42} height={44} className="h-full w-auto object-contain" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold uppercase tracking-[0.13em] text-daun-tua sm:text-xs">Sekretariat DPRD Kabupaten Cianjur</p>
              <p className="mt-0.5 font-heading text-lg font-semibold leading-tight text-tinta sm:text-xl">Ruang Kerja</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-gunung">{info.label}</p>
              <p className="max-w-52 truncate text-[11px] text-tinta-pudar">{email}</p>
            </div>
            <Link href="/" className="hidden min-h-10 items-center rounded-full border border-jerami px-4 text-sm font-semibold text-daun-tua transition-colors hover:bg-pucuk sm:inline-flex">Situs publik</Link>
            <button type="button" onClick={keluar} className="min-h-10 rounded-full border border-jerami px-4 text-sm font-semibold text-daun-tua transition-colors hover:bg-pucuk">Keluar</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[90rem] px-4 py-4 sm:px-6 sm:py-6">
        <div className="rounded-xl border border-emas/40 bg-[#fff9d9] px-4 py-3 text-xs leading-relaxed text-gunung">
          <strong>Pratinjau antarmuka.</strong> Peran dan data pada panel ini belum memakai autentikasi maupun pembatasan akses di server.
        </div>

        <div className={`mt-5 lg:grid ${collapsed ? "lg:grid-cols-[4.5rem_minmax(0,1fr)]" : "lg:grid-cols-[15.5rem_minmax(0,1fr)]"} lg:items-start lg:gap-6`}>
          <aside className="sticky top-4 hidden rounded-2xl border border-jerami bg-white p-3 lg:block">
            <div className={`mb-4 flex items-center ${collapsed ? "justify-center" : "justify-between px-2"}`}>
              {!collapsed && <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-daun-tua">Menu panel</p><p className="mt-0.5 text-xs text-tinta-pudar">{info.label}</p></div>}
              <button type="button" aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"} onClick={() => setCollapsed(!collapsed)} className="grid h-9 w-9 place-items-center rounded-lg text-tinta-pudar hover:bg-krem hover:text-gunung">
                <Ikon nama="chevron-left" ukuran={17} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
              </button>
            </div>
            <NavigasiPanel info={info} pathname={pathname} collapsed={collapsed} />
          </aside>

          <div className="min-w-0">
            <div className="mb-4 lg:hidden">
              <button type="button" aria-expanded={menuMobile} aria-controls="navigasi-panel-mobile" onClick={() => setMenuMobile(!menuMobile)} className="flex min-h-11 w-full items-center justify-between rounded-xl border border-jerami bg-white px-4 text-sm font-semibold text-gunung">
                <span className="flex items-center gap-2"><Ikon nama="menu" ukuran={18} /> Menu · {info.label}</span>
                <Ikon nama="chevron-down" ukuran={16} className={menuMobile ? "rotate-180" : ""} />
              </button>
              {menuMobile && <div id="navigasi-panel-mobile" className="mt-2 rounded-xl border border-jerami bg-white p-3"><NavigasiPanel info={info} pathname={pathname} onNavigate={() => setMenuMobile(false)} /><Link href="/" onClick={() => setMenuMobile(false)} className="mt-4 flex min-h-11 items-center border-t border-jerami px-3 pt-3 text-sm font-semibold text-daun-tua">Buka situs publik</Link></div>}
            </div>
            <div id="konten-panel" className="min-w-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
