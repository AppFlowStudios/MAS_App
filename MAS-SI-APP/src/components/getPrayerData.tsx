import { gettingPrayerData } from '@/src/types';
type prayerDataProp={
    prayerTimes : any 
}
export const ThePrayerData = ({prayerTimes} : prayerDataProp) : gettingPrayerData[] =>{
    let prayerTimesData : gettingPrayerData[] = []
    for (let i = 0; i < prayerTimes.prayerData.length ; i++){
        let dataToSave : gettingPrayerData = {
            date : prayerTimes.prayerData[i].date,
            hijri_month: prayerTimes.prayerData[i].hijri_month,
            hijri_date: prayerTimes.prayerData[i].hijri_date,
            athan_fajr : prayerTimes.prayerData[i].fajr,
            athan_zuhr : prayerTimes.prayerData[i].zuhr,
            athan_asr : prayerTimes.prayerData[i].asr,
            athan_maghrib : prayerTimes.prayerData[i].maghrib,
            athan_isha : prayerTimes.prayerData[i].isha,
            iqa_fajr : prayerTimes.iqamahData[i].fajr,
            iqa_zuhr : prayerTimes.iqamahData[i].zuhr,
            iqa_asr : prayerTimes.iqamahData[i].asr,
            iqa_maghrib : prayerTimes.iqamahData[i].maghrib,
            iqa_isha : prayerTimes.iqamahData[i].isha,
            jummah1: prayerTimes.iqamahData[i].jummah1,
            jummah2: prayerTimes.iqamahData[i].jummah2,
        }
        prayerTimesData.push(dataToSave)
    }
    return prayerTimesData;
}