import { PropsWithChildren, createContext, useContext, useState } from "react";
import { gettingPrayerData } from "../types";
type programsContextProp = {
    prayerTimesWeek : gettingPrayerData[],
    currentPrayer : string,
    onSetCurrentPrayer : ( currentPrayer : string ) => void,
    onSetPrayerTimesWeek : (prayer: gettingPrayerData[]) => void
}
const PrayersContext = createContext<programsContextProp>({
    prayerTimesWeek: [],
    onSetPrayerTimesWeek: () => {},
    currentPrayer : '',
    onSetCurrentPrayer : () => {}

})

const PrayerTimesProvider = ( {children} : PropsWithChildren ) =>{
    const[prayerTimesWeek, setPrayerTimesWeek] = useState<gettingPrayerData[]>([]);
    const [ currentPrayer, setCurrentPrayer ] = useState<string>('')
    const onSetPrayerTimesWeek = ( prayer: gettingPrayerData[] ) =>{
        setPrayerTimesWeek(prayer)
    }
    const onSetCurrentPrayer = ( prayer : string ) => {
        setCurrentPrayer(prayer)
    }

return(
    <PrayersContext.Provider
        value={{prayerTimesWeek, onSetPrayerTimesWeek, currentPrayer, onSetCurrentPrayer}}
    >
        {children}
    </PrayersContext.Provider>
)
}

export default PrayerTimesProvider

export const usePrayer = () =>  useContext(PrayersContext) ;