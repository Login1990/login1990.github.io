"use client";
import { useUserTime } from "@/hooks/useUserTime";

export default function Clock() {
  const time = useUserTime();

  return <div>🕒 {time.toLocaleTimeString()}</div>;
}