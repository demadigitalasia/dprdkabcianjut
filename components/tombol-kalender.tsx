"use client";

import { useState } from "react";
import { Ikon } from "@/components/ikon";

type AgendaItem = { judul: string; jenis: string; tanggal: string; waktu: string; lokasi: string; durasiMenit?: number };

function formatWaktuIcs(iso: string) {
  const bagian = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const nilai = Object.fromEntries(bagian.map(({ type, value }) => [type, value]));
  return `${nilai.year}${nilai.month}${nilai.day}T${nilai.hour}${nilai.minute}${nilai.second}`;
}

function buatIcs(agenda: AgendaItem) {
  const waktu = agenda.waktu.match(/\d{2}:\d{2}/)?.[0] ?? "09:00";
  const mulaiDate = new Date(`${agenda.tanggal}T${waktu}:00+07:00`);
  const selesaiDate = new Date(mulaiDate.getTime() + (agenda.durasiMenit ?? 60) * 60_000);
  const mulai = formatWaktuIcs(mulaiDate.toISOString());
  const selesai = formatWaktuIcs(selesaiDate.toISOString());
  const escape = (teks: string) => teks.replaceAll("\\", "\\\\").replaceAll(";", "\\;").replaceAll(",", "\\,").replaceAll("\n", "\\n");
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//DPRD Kabupaten Cianjur//Agenda//ID", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", `UID:${agenda.tanggal}-${encodeURIComponent(agenda.judul)}@dprd-cianjur.go.id`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`, `DTSTART;TZID=Asia/Jakarta:${mulai}`, `DTEND;TZID=Asia/Jakarta:${selesai}`, `SUMMARY:${escape(agenda.judul)}`, `DESCRIPTION:${escape(`${agenda.jenis}\nDurasi standar ${agenda.durasiMenit ?? 60} menit.`)}`, `LOCATION:${escape(agenda.lokasi)}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
}

export function TombolKalender({ agenda }: { agenda: AgendaItem }) {
  const [diunduh, setDiunduh] = useState(false);
  function unduh() {
    const url = URL.createObjectURL(new Blob([buatIcs(agenda)], { type: "text/calendar;charset=utf-8" }));
    const tautan = document.createElement("a");
    tautan.href = url;
    tautan.download = `agenda-dprd-${agenda.tanggal}.ics`;
    tautan.click();
    URL.revokeObjectURL(url);
    setDiunduh(true);
  }
  return <div className="sm:text-right">
    <button type="button" onClick={unduh} aria-label={`${diunduh ? "Unduh ulang" : "Simpan ke kalender"}: ${agenda.judul}`} className="mt-2 w-full rounded-full border border-tinta/10 bg-white px-3.5 py-2 text-sm font-semibold text-gunung transition-colors hover:border-daun/40 hover:bg-pucuk sm:w-auto">
      <span className="inline-flex items-center gap-1.5"><Ikon nama="calendar" ukuran={15} />{diunduh ? "Unduh ulang" : "Simpan ke kalender"}</span>
    </button>
    {diunduh && <p role="status" className="mt-1 max-w-48 text-xs leading-relaxed text-daun-tua">File kalender terunduh. Buka file untuk menambahkan jadwal.</p>}
  </div>;
}
