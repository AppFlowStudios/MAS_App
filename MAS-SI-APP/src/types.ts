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
    lectures: Lectures[]
}