"use client";

import { ProgressProvider } from '@bprogress/next/app';
import ProgressBar from "@/components/ProgressBar";
import Clock from "@/components/Clock"
import { useUserTime } from '@/hooks/useUserTime';
import { useEffect, useState } from 'react';
import ProgressBarContainer from '@/components/ProgressBarContainer';
import { SHIFT_START } from '@/constants/constants';

export default function Page() { 
  const [refreshTime, setRefreshTime] = useState(-1)

  useEffect(() =>{
    const interval = setInterval(()=>{
        setRefreshTime(prev => rerenderChecker(prev))
    }, 1000)
   
    return () => clearInterval(interval)
  }, [])

  return (
    <ProgressBarContainer key={refreshTime}/>
  )

}

// I mean shifts can only start every hour - that is simpler
function rerenderChecker(refreshTime) {
    const now = new Date()

    const current_hour = now.getHours()

    if (refreshTime != current_hour){
        return current_hour
    }
    return refreshTime
}