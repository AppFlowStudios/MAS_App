import { PropsWithChildren, createContext, useContext, useState } from "react";
import { gettingPrayerData } from "../types";
type programsContextProp = {
    prayerTimesWeek : gettingPrayerData[],
    onSetPrayerTimesWeek : (prayer: gettingPrayerData[]) => void
}
const PrayersContext = createContext<programsContextProp>({
    prayerTimesWeek: [],
    onSetPrayerTimesWeek: () => {}
})

const PrayerTimesProvider = ( {children} : PropsWithChildren ) =>{
    const[prayerTimesWeek, setPrayerTimesWeek] = useState<gettingPrayerData[]>([]);

    const onSetPrayerTimesWeek = ( prayer: gettingPrayerData[] ) =>{
        setPrayerTimesWeek([...prayer])
}
console.log(prayerTimesWeek)
return(
    <PrayersContext.Provider
        value={{prayerTimesWeek, onSetPrayerTimesWeek}}
    >
        {children}
    </PrayersContext.Provider>
)
}

export default PrayerTimesProvider

export const usePrayer = () =>  useContext(PrayersContext) ;