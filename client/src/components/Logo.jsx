export default function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 110" height="44" aria-label="Kyoudai Hostel">

      {/* Gold finial */}
      <circle cx="52" cy="12" r="5" fill="#C9962A"/>
      <rect x="49.5" y="17" width="5" height="11" rx="1.5" fill="#C9962A"/>

      {/* Pagoda tiers — white on dark navbar */}
      <polygon points="52,28 31,53 73,53" fill="#FFFFFF"/>
      <line x1="29" y1="53" x2="75" y2="53" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <polygon points="31,53 73,53 83,66 21,66" fill="#FFFFFF"/>
      <line x1="19" y1="66" x2="85" y2="66" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <polygon points="21,66 83,66 97,80 7,80" fill="#FFFFFF"/>
      <line x1="5" y1="80" x2="99" y2="80" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <rect x="5" y="80" width="94" height="6" rx="1" fill="rgba(255,255,255,0.35)"/>

      {/* Two figures — gold */}
      <circle cx="34" cy="94" r="7" fill="#C9962A"/>
      <rect x="27" y="101" width="14" height="14" rx="3" fill="#C9962A"/>
      <circle cx="70" cy="94" r="7" fill="#C9962A"/>
      <rect x="63" y="101" width="14" height="14" rx="3" fill="#C9962A"/>

      {/* Bond diamond */}
      <polygon points="52,96 56,100 52,104 48,100" fill="#FFFFFF"/>

      {/* Divider */}
      <line x1="116" y1="20" x2="116" y2="95" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>

      {/* Wordmark */}
      <text x="134" y="60"
        fontFamily="'Cinzel', Georgia, serif"
        fontSize="28" fontWeight="700"
        fill="#FFFFFF"
        letterSpacing="4">KYOUDAI</text>

      <text x="136" y="78"
        fontFamily="'Cinzel', Georgia, serif"
        fontSize="10"
        fill="#C9962A"
        letterSpacing="3.5">兄弟 · HOSTEL</text>

      <text x="136" y="95"
        fontFamily="'Raleway', Arial, sans-serif"
        fontSize="7.5"
        fill="rgba(255,255,255,0.35)"
        letterSpacing="2">KIRTIPUR · KATHMANDU, NEPAL</text>

    </svg>
  )
}
