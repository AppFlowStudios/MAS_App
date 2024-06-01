import { Program } from "@/src/types"
const programsData : Program[] = [
    {
    programId : 0,
	programName : "Soulful Saturdays",
	programImg: "https://scontent-lga3-1.cdninstagram.com/v/t39.30808-6/438725074_18220253446302860_794808628058742151_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOCJ9&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=pLBKJ4mT8b8Q7kNvgF_6_ZW&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AYBH8TadRwLpjIxN9Vg-38Yl3mliJCwAsbHoRaWLy-xX5w&oe=665D997F&_nc_sid=cf751b",
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

    }

]

export default programsData