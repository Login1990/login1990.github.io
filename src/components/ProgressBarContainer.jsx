import ProgressBar from "@/components/ProgressBar";
import { SHIFT_START } from "@/constants/constants";

export default function ProgressBarContainer() {
    console.log('hello')
    const now = new Date();

    const morning_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.MORNING_START, 0, 0)
    const morning_end = new Date(morning_start.getTime()+  8 * 60 * 60 * 1000)

    const brunch_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.BRUNCH_START, 0, 0)
    const brunch_end = new Date(brunch_start.getTime()+  8 * 60 * 60 * 1000)

    const evening_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.EVENING_START, 0, 0)
    const evening_end = new Date(evening_start.getTime()+  8 * 60 * 60 * 1000)

    const late_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.LATE_START, 0, 0)
    const late_end = new Date(late_start.getTime()+  8 * 60 * 60 * 1000)

    const night_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.NIGHT_START, 0, 0)
    const night_end = new Date(night_start.getTime()+  8 * 60 * 60 * 1000)

    const data = [
        {type: "Morning", start: morning_start, end: morning_end},
        {type: "Brunch", start: brunch_start, end: brunch_end},
        {type: "Evening", start: evening_start, end: evening_end},
        {type: "Late", start: late_start, end: late_end},
        {type: "Night", start: night_start, end: night_end},
    ]

    const componentsToRender = data
        .map((item, index) => {
            if (now > item.start && now < item.end) return <ProgressBar key={index} start={item.start} end={item.end} name={item.type}/>
        })

    if (componentsToRender.length == 0){
        return <p>Something went terribly wrong...</p>
    }   

    return (
        <div className='flex flex-col justify-center h-[95%]'>
            {componentsToRender}
        </div>
    )
}