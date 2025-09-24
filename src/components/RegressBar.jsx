import { useState, useEffect } from "react";
import { motion, time } from "framer-motion";


function msToTime(ms) {
  let totalSeconds = Math.floor(ms / 1000); // convert ms to seconds

  const hours = Math.floor(totalSeconds / 3600); // 1 hour = 3600 seconds
  totalSeconds %= 3600;

  const minutes = Math.floor(totalSeconds / 60); // 1 minute = 60 seconds
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

function msToHMS(ms) {
  const { hours, minutes, seconds } = msToTime(ms);

  // Pad numbers to 2 digits
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
}


export default function RegressBar({ start, end, name, color}) {
  const totalTimer = end.getTime() - start.getTime();
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState("00:00:00")
 
  useEffect(()=>{
    const interval = setInterval(() => {
        const currentTime = new Date().getTime() 
        const timeLeft = end.getTime() - currentTime

        let newProgress = (timeLeft / totalTimer) * 100;
        if (newProgress < 0) newProgress = 0; // clamp max 100
        setProgress(newProgress.toFixed(3)); // triggers re-render
        setTimer(msToHMS(timeLeft))
    }, 1000)
    
    return () => clearInterval(interval)
  },[])
  console.log(name)
  return (
    <div className="bg-gray-200 rounded-xl m-4 overflow-hidden flex-1 max-h-50 min-h-5 relative"> 
      <div className="hide-on-small-parent absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-bold">
        Get ready for: {name}
      </div>
      <div className="flex justify-center bg-transparent text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">-{timer}</div>
      <motion.div 
        className="h-[100.2%] absolute right-0 top-50/100 transform -translate-y-1/2" //truly one of the developers of our time (it caused small pixel wide gap for some reason, so...)
        style={{ backgroundColor: `var(--color-${color})`, opacity: 0.5}}
        initial={{ width: "100%" }}
        animate={{ width: `${progress}%` }} 
        transition={{ ease: "easeOut", duration: 0.3 }}
      />
    </div>
  );
}
