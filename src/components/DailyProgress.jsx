"use client";
import { useState, useEffect } from "react";

export default function DailyProgress() {
  const startTime = { hour: 0, minute: 0, second: 0 };
  const endTime   = { hour: 2, minute: 0, second: 0 };

  const getTotalSeconds = ({ hour, minute, second }) =>
    hour * 3600 + minute * 60 + second;

  const calculateProgress = () => {
    const now = new Date();
    const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    const startSeconds = getTotalSeconds(startTime);
    const endSeconds   = getTotalSeconds(endTime);

    if (currentSeconds <= startSeconds) return 0;
    if (currentSeconds >= endSeconds) return 100;
    return ((currentSeconds - startSeconds) / (endSeconds - startSeconds)) * 100;
  };

  const [progress, setProgress] = useState(calculateProgress());

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(calculateProgress());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{progress.toFixed(3)}%</p>
    </div>
  );
}
