import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { ActionTypes, addNewCcleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
interface CreateCycleData{
  task: string;
  minutesAmount: number;
}


interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  setSecondsPassed:(seconds: number) => void
  markCurrentCycleAsFinished: () => void
  createNewCycle:(data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}


export function CyclesContextProvider({ 
  children,
}: CyclesContextProviderProps) {
  const[cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    }, 
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0', 
      )

      if(storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return { 
        cycles: [],
        activeCycleId: null
      }
    }
  )

  const { cycles, activeCycleId } = cyclesState;    
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate),
      )
    }
    
    return 0
  })

  useEffect(() =>{
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])  

  

  function setSecondsPassed(seconds:number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
    
  }

  function createNewCycle(data:CreateCycleData)
   {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCcleAction(newCycle))

    setAmountSecondsPassed(0)
    
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return(
    <CyclesContext.Provider 
            value={{
              cycles,
              activeCycle, 
              activeCycleId,  
              markCurrentCycleAsFinished,
              amountSecondsPassed,
              setSecondsPassed,
              createNewCycle,
              interruptCurrentCycle
            }}
            >
             { children } 
            </CyclesContext.Provider>
  )
}