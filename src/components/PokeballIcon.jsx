function PokeballIcon({ size = 32, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" fill="#fff" stroke="#222" strokeWidth="6" />
      <path d="M4 50a46 46 0 0 1 92 0z" fill="#e53935" stroke="#222" strokeWidth="6" />
      <path d="M4 50h92" stroke="#222" strokeWidth="8" />
      <circle cx="50" cy="50" r="14" fill="#fff" stroke="#222" strokeWidth="6" />
      <circle cx="50" cy="50" r="6" fill="#ddd" />
    </svg>
  );
}

export default PokeballIcon;
