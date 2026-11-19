
function Fireflies({ count = 18, variant = "default" }) {
  return (
    <div
      className={`fireflies-layer fireflies-${variant}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => {
        const x = (index * 37 + 11) % 96;
        const y = (index * 53 + 7) % 94;
        const size = 2 + (index % 3);
        const duration = 9 + (index % 8) * 1.5;
        const delay = -(index * 1.37);
        const driftX = ((index * 17) % 90) - 45;
        const driftY = -35 - ((index * 13) % 65);

        return (
          <span
            key={index}
            className="firefly"
            style={{
              "--x": `${x}%`,
              "--y": `${y}%`,
              "--size": `${size}px`,
              "--duration": `${duration}s`,
              "--delay": `${delay}s`,
              "--drift-x": `${driftX}px`,
              "--drift-y": `${driftY}px`,
            }}
          />
        );
      })}
    </div>
  );
}

export default Fireflies;
