import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Program } from "../types";
type ProgramContextType = {
    currentProgram: Program;
    onSetProgram: (program : Program) => void;
}

export const ProgramContext = createContext<ProgramContextType>({
    currentProgram : {
        programId: -1,
        programName: "",
        programImg: "",
        programDesc: "",
        lectures: []
    },
    onSetProgram: () => {}
}
);

const ProgramProvider = ( {children} : PropsWithChildren ) => {
    const [currentProgram, setCurrentProgram] = useState<Program>({
        programId: -1,
        programName: "",
        programImg: "",
        programDesc: "",
        lectures: []})

    
    const onSetProgram = ( program: Program ) =>{
        setCurrentProgram(program)
    }
    return(
        <ProgramContext.Provider
            value={{currentProgram, onSetProgram}}
        >
            {children}
        </ProgramContext.Provider>
    )
}

export default ProgramProvider

export const useProgram = () => useContext(ProgramContext);