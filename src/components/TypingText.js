import React, { useEffect, useRef, useState } from 'react';

export default function TypingText({ words, speed = 90, deleteSpeed = 55, pause = 2200 }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const stateRef = useRef({ text: '', wordIndex: 0, isDeleting: false });
  const timeoutRef = useRef(null);

  useEffect(() => {
    function tick() {
      const { wordIndex, isDeleting } = stateRef.current;
      const word = words[wordIndex];
      const current = stateRef.current.text;

      let next;
      let delay;

      if (!isDeleting) {
        next = word.slice(0, current.length + 1);
        delay = speed + Math.random() * 40;

        if (next === word) {
          stateRef.current = { ...stateRef.current, text: next, isDeleting: false };
          setText(next);
          timeoutRef.current = setTimeout(() => {
            stateRef.current.isDeleting = true;
            setIsDeleting(true);
            timeoutRef.current = setTimeout(tick, deleteSpeed);
          }, pause);
          return;
        }
      } else {
        next = current.slice(0, -1);
        delay = deleteSpeed;

        if (next === '') {
          const nextIndex = (wordIndex + 1) % words.length;
          stateRef.current = { text: '', wordIndex: nextIndex, isDeleting: false };
          setWordIndex(nextIndex);
          setIsDeleting(false);
          setText('');
          timeoutRef.current = setTimeout(tick, speed * 2);
          return;
        }
      }

      stateRef.current = { ...stateRef.current, text: next };
      setText(next);
      timeoutRef.current = setTimeout(tick, delay);
    }

    timeoutRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <span className="typingText">
      {text}
      <span className="typingCursor" aria-hidden="true" />
    </span>
  );
}
