import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Program } from "../types";
type addProgramProviderProp = {
    addedPrograms: Program
    onSetAddProgram : (program : Program) => void
}

const addProgramProvider = ( {children} : PropsWithChildren) =>{
    const [ addedPrograms, setAddProgram ] = useState<Program[]>([])

    const onSetAddProgram = ( program: Program) =>{
        const newAddedProgram: Program = {
            programId : program.programId,
            programImg :  program.programImg,
            programName : program.programName,
            programDesc : program.programDesc,
            lectures : program.lectures
        }

        setAddProgram([newAddedProgram, ...addedPrograms])
    }
    }

