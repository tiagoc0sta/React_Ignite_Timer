import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

import {
  HomeContainer,    
  StartCountdownButton, 
  StopCountdownButton, 
  
} from "./styles";
import { NewCycleForm } from "./components/NewCycleform";
import { Countdown } from "./components/Countdown";

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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ser de no minimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
})

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
  const[cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string |null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
 
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount:0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const { handleSubmit, watch, reset } = newCycleForm

  function setSecondsPassed(seconds:number) {

  }

  function markCurrentCycleAsFinished() {
    setCycles((state) => 
            state.map((cycle) => {
              if(cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date()}
              } else {
                return cycle
              }
            }),
          )
  }

  function handleCreateNewCycle(data:NewCycleFormData)
   {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }



    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    
    reset();
  }

  function handleInterruptedCycle() {
    
    setCycles((state) =>
      state.map((cycle) => {
        if(cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date()}
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)

  }
  

  const task = watch('task')
  const isSubmitDisabled = !task

  console.log(cycles)

  return (
    <HomeContainer>      
        <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
          <CyclesContext.Provider 
            value={{
              activeCycle, 
              activeCycleId,  
              markCurrentCycleAsFinished,
              amountSecondsPassed,
              setSecondsPassed,
            }}
            >
              <FormProvider {...newCycleForm}>
                <NewCycleForm />
              </FormProvider>
            <Countdown />    
            </CyclesContext.Provider>    

        {activeCycle? (
          <StopCountdownButton onClick={handleInterruptedCycle} type="button">
            <HandPalm size={24}/>
            Interromper
          </StopCountdownButton>
        ): (
          <StartCountdownButton  disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Começar
          </StartCountdownButton>
        )}
      </form> 
    </HomeContainer>
  )
} 
