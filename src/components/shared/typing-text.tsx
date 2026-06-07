"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypingText({ text, speed = 50, className = "" }: TypingTextProps) {
  const reducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(reducedMotion ? text : "");
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed("");
    setDone(false);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, reducedMotion]);

  return (
    <span className={`break-words ${className}`} aria-label={text}>
      <span aria-hidden="true">{displayed}</span>
      {!done && (
        <span
          className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-[rgb(var(--accent-primary))] align-middle"
          aria-hidden
        />
      )}
    </span>
  );
}
