import ProgressBar from "@/components/ProgressBar";
import { SHIFT_COLOR, SHIFT_START, TIME_BUFFER } from "@/constants/constants";
import RegressBar from "./RegressBar";

export default function ProgressBarContainer() {
    const now = new Date();

    const morning_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.MORNING_START, 0, 0)
    const morning_end = new Date(morning_start.getTime()+  8 * 60 * 60 * 1000)

    const brunch_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.BRUNCH_START, 0, 0)
    const brunch_end = new Date(brunch_start.getTime()+  8 * 60 * 60 * 1000)

    const afternoon_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.AFTERNOON_START, 0, 0)
    const afternoon_end = new Date(brunch_start.getTime()+  8 * 60 * 60 * 1000)

    const evening_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.EVENING_START, 0, 0)
    const evening_end = new Date(evening_start.getTime()+  8 * 60 * 60 * 1000)

    let late_start
    let late_end

    let night_start
    let night_end

    if (now.getHours() <= 7){
        late_start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, SHIFT_START.LATE_START, 0, 0)
        late_end = new Date(late_start.getTime()+  8 * 60 * 60 * 1000)

        night_start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, SHIFT_START.NIGHT_START, 0, 0)
        night_end = new Date(night_start.getTime()+  8 * 60 * 60 * 1000)
        

    } else {
        late_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.LATE_START, 0, 0)
        late_end = new Date(late_start.getTime()+  8 * 60 * 60 * 1000)

        night_start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), SHIFT_START.NIGHT_START, 0, 0)
        night_end = new Date(night_start.getTime()+  8 * 60 * 60 * 1000)
    }

    const data = [
        {type: "Morning", start: morning_start, end: morning_end, color: "morning"},
        {type: "Brunch", start: brunch_start, end: brunch_end, color: "brunch"},
        {type: "Afternoon", start: afternoon_start, end: afternoon_end, color: "afternoon"},
        {type: "Evening", start: evening_start, end: evening_end, color: "evening"},
        {type: "Late", start: late_start, end: late_end, color: "late"},
        {type: "Night", start: night_start, end: night_end, color: "night"},
    ]

    const progressBarsToRender = data
        .filter(item => now > item.start && now < item.end)
        .map((item, index) => {
            return <ProgressBar key={`progress${index}`} start={item.start} end={item.end} name={item.type} color={item.color}/>
        })
    
    const regressBarsToRender = data
        .filter(item => now > item.start - TIME_BUFFER && now < item.start)
        .map((item, index) => {
            return <RegressBar key={`regress${index}`} start={new Date(item.start - TIME_BUFFER)} end={item.start} name={item.type} color={item.color}/>
        })

    if (progressBarsToRender.length == 0){
        return <p>Your business is closed.</p>
    }

    return (
        <div className='flex flex-col justify-center h-[95%]'>
            {progressBarsToRender}
            {regressBarsToRender}
        </div>
    )
}