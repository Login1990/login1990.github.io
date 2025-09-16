"use client";
import { useState, useEffect } from "react";

export function useUserTime() {
  const [time, setTime] = useState(new Date()); // ✅ works in JS

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
