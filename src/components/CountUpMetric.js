import React, { useEffect, useRef, useState } from 'react';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUpMetric({ end, suffix = '', prefix = '', label, duration = 2000, className = 'portfolioMetric' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const startTime = performance.now();

        function tick(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.round(easeOutCubic(progress) * end);
          setCount(value);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  const formatted = end >= 1000 ? count.toLocaleString() : String(count);

  return (
    <div className={`${className} countUpMetric`} ref={ref}>
      <strong>{prefix}{formatted}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}
