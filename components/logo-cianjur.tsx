// Ilustrasi vektor Lambang Kabupaten Cianjur untuk keperluan DEMO.
// Elemen mengikuti Perda Kab. Cianjur No. 19/1987: perisai, gunung hijau,
// hamparan biru (air), padi bersilang, pita "SUGIH MUKTI".
// PRODUKSI: gunakan berkas lambang resmi (mis. demo/public/logo-cianjur.png).

const DAUN_KIRI: Array<[number, number, number]> = [
  [34, 108, -60],
  [42, 118, -48],
  [40, 130, -38],
  [50, 138, -28],
  [48, 150, -18],
  [58, 158, -10],
  [62, 170, -2],
  [74, 178, 5],
  [86, 188, 12],
];

export function LogoCianjur({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 245"
      className={className}
      role="img"
      aria-label="Lambang Kabupaten Cianjur"
    >
      {/* Perisai — warna dasar kuning emas */}
      <path
        d="M12 10 H188 V116 C188 158 162 193 100 220 C38 193 12 158 12 116 Z"
        fill="#F5D200"
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Hamparan biru (air) */}
      <path
        d="M12 116 H188 C188 158 162 193 100 220 C38 193 12 158 12 116 Z"
        fill="#0071BC"
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Gunung hijau (kesuburan) */}
      <path
        d="M100 54 L13 116 H187 Z"
        fill="#009E4F"
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Padi bersilang — tangkai */}
      <path
        d="M100 198 C 76 186 50 156 36 112"
        fill="none"
        stroke="#111"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M100 198 C 124 186 150 156 164 112"
        fill="none"
        stroke="#111"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Padi bersilang — bulir kiri */}
      {DAUN_KIRI.map(([x, y, r], i) => (
        <ellipse
          key={`k${i}`}
          cx={x}
          cy={y}
          rx="4.5"
          ry="9"
          fill="#F5D200"
          stroke="#111"
          strokeWidth="1.5"
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
      {/* Padi bersilang — bulir kanan (cermin) */}
      {DAUN_KIRI.map(([x, y, r], i) => (
        <ellipse
          key={`ka${i}`}
          cx={200 - x}
          cy={y}
          rx="4.5"
          ry="9"
          fill="#F5D200"
          stroke="#111"
          strokeWidth="1.5"
          transform={`rotate(${-r} ${200 - x} ${y})`}
        />
      ))}

      {/* Pita kuning emas "SUGIH MUKTI" */}
      <path
        d="M14 194 C 60 218 140 218 186 194 L 186 214 C 140 238 60 238 14 214 Z"
        fill="#F5D200"
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M14 194 L2 202 L14 214 Z" fill="#F5D200" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
      <path d="M186 194 L198 202 L186 214 Z" fill="#F5D200" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
      <text
        x="100"
        y="213"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#111"
        letterSpacing="1.5"
        fontFamily="system-ui, sans-serif"
      >
        SUGIH MUKTI
      </text>
    </svg>
  );
}
