import { motion } from "framer-motion"; 
import { useEffect, useState } from "react";

export default function ProgressBar({ start, end, name, color}) {
  const totalTimer = end.getTime() - start.getTime();
  const [progress, setProgress] = useState(0);

  useEffect(()=>{
    const interval = setInterval(() => {
      const currentTime = new Date().getTime() 
      const elapsed = currentTime - start.getTime()

      if (elapsed < 0) console.error("Something is wrong - start time in future") 

      let newProgress = (elapsed / totalTimer) * 100;
      if (newProgress > 100) newProgress = 100; // clamp max 100
      setProgress(newProgress.toFixed(3)); // triggers re-render
    }, 1000)
    
    return () => clearInterval(interval)
  },[])

  return (
    <div className="bg-gray-200 rounded-xl m-4 overflow-hidden flex-1 max-h-50 min-h-5 relative"> 
      <div className="hide-on-small-parent absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-bold">
        {name}
      </div>
      <div className="flex justify-center bg-transparent text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{progress}%</div>
      <motion.div 
        className="h-full"
        style={{ backgroundColor: `var(--color-${color})` }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }} 
        transition={{ ease: "easeOut", duration: 0.3 }}
      />
    </div>
  );
}
