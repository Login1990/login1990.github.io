"use client";

import { ProgressProvider } from '@bprogress/next/app';
import ProgressBar from "@/components/ProgressBar";
import Clock from "@/components/Clock"
import { useUserTime } from '@/hooks/useUserTime';
import { useEffect, useState } from 'react';
import ProgressBarContainer from '@/components/ProgressBarContainer';
import { SHIFT_START } from '@/constants/constants';

export default function Page() { 
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() =>{
    const interval = setInterval(()=>{
        setRefreshKey(prev => rerenderChecker(prev))
    }, 1000)
   
    return () => clearInterval(interval)
  }, [])

  return (
    <ProgressBarContainer key={refreshKey}/>
  )

}

function rerenderChecker(refreshKey) {
    const now = new Date();
    let newRefreshKey = 0;

    const morning_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.MORNING_START, 0, 0)
    const morning_end = new Date(morning_start.getTime()+  8 * 60 * 60 * 1000)

    const brunch_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.BRUNCH_START, 0, 0)
    const brunch_end = new Date(brunch_start.getTime()+  8 * 60 * 60 * 1000)

    const evening_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.EVENING_START, 0, 0)
    const evening_end = new Date(evening_start.getTime()+  8 * 60 * 60 * 1000)

    const late_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.LATE_START, 0, 0)
    const late_end = new Date(late_start.getTime()+  8 * 60 * 60 * 1000)

    const night_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.LATE_START, 0, 0)
    const night_end = new Date(night_start.getTime()+  8 * 60 * 60 * 1000)

    if (now > morning_start && now < morning_end) {
        newRefreshKey += 1
    }

    if (now > brunch_start && now < brunch_end) {
        newRefreshKey += 1
    }
    
    if (now > evening_start && now < evening_end) {
        newRefreshKey += 1
    } 

    if (now > late_start && now < late_end) {
        newRefreshKey += 1
    } 

    if (now > night_start && now < night_end) {
        newRefreshKey += 1
    } 

    if (newRefreshKey == 0) {
        return refreshKey
    } else {
        return newRefreshKey
    }
        
}