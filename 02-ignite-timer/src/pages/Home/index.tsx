import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer } from "./styles";

export function Home(){
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <input id="task" />

          <label htmlFor="minuteAmount">durante</label>
          <input type="number" id="minuteAmount" />

          <span>minutos.</span>
        </FormContainer>            

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button type="submit">
          <Play size={24}/>
          Começar</button>
      </form> 
    </HomeContainer>
  )
} //
