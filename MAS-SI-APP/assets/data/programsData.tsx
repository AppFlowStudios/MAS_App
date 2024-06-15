import { Program } from "@/src/types"
const programsData : Program[] = [
    {
    programId : 0,
	programName : "Soulful Saturdays",
	programImg: "",
	programDesc: "Youth Lecturs Every Saturday hosted by Sh. Abdelrahman Badawy",
	lectures :[
		{
			lectureID : 0,
			lectureName: "Soulful Saturdays with Sh. Abdelrahman Badawy: You Must Learn this Crucial Skill",
			lectureSpeaker: "Sh. Abdelrahman Badawy",
			lectureLink : "https://www.youtube.com/watch?v=oF3YUj2JJvo&t=26s",
			lectureAI : "AI Text here",
			lectureData: "May 4, 2024",
			lectureTime: "{maghrib iqama time}"
		}
    ]
    },
    
    {
        programId: 1,
        programName: "Victors Not Victims",
        programImg: "",
        programDesc: "Ramadan Series",
        lectures: [
            {
                lectureID : 0,
                lectureName: "Scared Activism: Session 1 With Rami Kawas",
                lectureSpeaker: "Rami Kawas",
                lectureLink : "https://www.youtube.com/watch?v=IpJNDqz8eI4",
                lectureAI : "AI Text Here",
                lectureData: "Mar 16, 2024",
                lectureTime: " After 2nd Taraweeh"                
            },
            {
                lectureID : 1,
                lectureName: "Victors Not Victims: Sacred Activism w/ Sh. Mohammed Elshinawy and Imam Tom Facchine",
                lectureSpeaker: "Sh. Mohammed Elshinawy and Imam Tom Facchine",
                lectureLink : "https://www.youtube.com/watch?v=kCmPv0BtfZ4&list=PLtTZRfy7BpLx7obAsuqx8zmZTfGsH-Zo6&index=3",
                lectureAI : "AI Text Here",
                lectureData: "Mar 23, 2024",
                lectureTime: " After 2nd Taraweeh"     
            }


        ]

    },
    {
        programId: 2,
        programName: "Khutbahs",
        programImg: "",
        programDesc: "Friday Lecture",
        lectures: [
            {
                lectureID : 0,
                lectureName: "Friday Khutbah 6/7 with Shiekh Abdelrahman Badawy",
                lectureSpeaker: "Shiekh Abdelrahman Badawy",
                lectureLink : "https://www.youtube.com/watch?v=1s4pF1u4GEE",
                lectureAI : "AI Text Here",
                lectureData: "June 7, 2024",
                lectureTime: " First Jummah"                
            },   
        ] 
    }

]

export default programsData