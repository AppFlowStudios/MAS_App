export type Lectures ={
    lectureID: number,
    lectureName: string,
    lectureSpeaker: string,
    lectureLink: string | "N/A",
    lectureAI: string | "N/A",
    lectureData: string | "N/A",
    lectureTime: string
}
export type Program = {
    programId: number,
    programName: string,
    programImg: string | null,
    programDesc: string | null,
    lectures: Lectures[]
}

export type salahData = {
    date : string,
    hijri_date: string,
    hijri_month: string,
    day: string,
    fajr: string,
    sunrise: string,
    zuhr: string,
    asr: string,
    maghrib: string,
    isha: string
}

export type iqamahData = {
    date: string,
    fajr: string,
    sunrise: string,
    zuhr: string,
    asr: string,
    maghrib: string,
    isha: string,
    jummah1: string,
    jummah2: string
}
export type prayerTimeData = {
    salah: salahData[],
    iqamah: iqamahData[]
}
export type prayerTimesType = {
    status: string,
    data: prayerTimeData,
    message: string
}