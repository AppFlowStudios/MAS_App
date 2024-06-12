import { Image, StyleSheet, View, Text, } from 'react-native';
import { useState, useEffect } from 'react';
import { prayerTimesType } from '@/src/types';
import { prayerTimeData } from '@/src/types';
import { format, addDays } from 'date-fns';
import { gettingPrayerData } from '@/src/types';

type prayerDataProp={
    prayerTimes : prayerTimesType
}
export const ThePrayerData = ({prayerTimes} : prayerDataProp) : gettingPrayerData[] =>{
    let prayerTimesData : gettingPrayerData[] = []
    for (let i = 0; i < prayerTimes.data.salah.length ; i++){
        let dataToSave : gettingPrayerData = {
            date : prayerTimes.data.salah[i].date,
            hijri_month: prayerTimes.data.salah[i].hijri_month,
            hijri_date: prayerTimes.data.salah[i].hijri_date,
            athan_fajr : prayerTimes.data.salah[i].fajr,
            athan_zuhr : prayerTimes.data.salah[i].zuhr,
            athan_asr : prayerTimes.data.salah[i].asr,
            athan_maghrib : prayerTimes.data.salah[i].maghrib,
            athan_isha : prayerTimes.data.salah[i].isha,
            iqa_fajr : prayerTimes.data.iqamah[i].fajr,
            iqa_zuhr : prayerTimes.data.iqamah[i].zuhr,
            iqa_asr : prayerTimes.data.iqamah[i].asr,
            iqa_maghrib : prayerTimes.data.iqamah[i].maghrib,
            iqa_isha : prayerTimes.data.iqamah[i].isha,
            jummah1: prayerTimes.data.iqamah[i].jummah1,
            jummah2: prayerTimes.data.iqamah[i].jummah2,
        }
        prayerTimesData.push(dataToSave)
    }
    return prayerTimesData;
}