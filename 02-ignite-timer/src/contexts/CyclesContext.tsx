import { createContext } from "react";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finshedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  setSecondsPassed:(seconds: number) => void
  markCurrentCycleAsFinished: () => void
  
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider(){
  return(
    <CyclesContext.Provider 
            value={{
              activeCycle, 
              activeCycleId,  
              markCurrentCycleAsFinished,
              amountSecondsPassed,
              setSecondsPassed,
            }}
            >
              
            </CyclesContext.Provider>
  )
}