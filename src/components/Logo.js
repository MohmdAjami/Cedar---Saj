const Logo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="31" fill="#1f4d3a" />
    <path d="M32 10 L42 22 H37 L46 32 H39 L50 44 H14 L25 32 H18 L27 22 H22 Z" fill="#d9a441" />
    <rect x="29" y="44" width="6" height="10" rx="1" fill="#d9a441" />
  </svg>
);

export default Logo;
