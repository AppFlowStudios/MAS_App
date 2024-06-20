import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Program } from "../types";

type addProgramProviderProp = {
    addedPrograms: Program[],
    onSetAddProgram : (program : Program) => void
}
const addProgramContext = createContext<addProgramProviderProp>({
    addedPrograms: [],
    onSetAddProgram: () => {}
})

const AddProgramProvider = ( {children} : PropsWithChildren ) =>{
    const [ addedPrograms, setAddProgram ] = useState<Program[]>([])

    const onSetAddProgram = ( program: Program) =>{
        const newAddedProgram: Program = {
            programId : program.programId,
            programImg :  program.programImg,
            programName : program.programName,
            programDesc : program.programDesc,
            programSpeaker : program.programSpeaker,
            lectures : program.lectures
        }

        setAddProgram([newAddedProgram, ...addedPrograms])
    }

    return(
        <addProgramContext.Provider
            value={{addedPrograms, onSetAddProgram}}
        >
            {children}
        </addProgramContext.Provider>
    )
    }

export default AddProgramProvider
export const useAddProgram = () => useContext(addProgramContext);