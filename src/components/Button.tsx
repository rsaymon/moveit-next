import { useState } from 'react';


interface ButtonProps{
    color: string;
    children: string;
}

export function Button(props: ButtonProps){
    
    const [counter, setCounter] = useState(1);

    function increment () {
        setCounter (counter + 1);
    }

    return(
        <button 
        type="button" 
        style={{ backgroundColor: props.color }}
        onClick= {increment}>
            {props.children} <strong>{counter}</strong>
        </button>
    );


}
/* usar
 <div>
      <Button color="red">Botão 1</Button>
      
      <Button color="blue">Botão 2</Button>
      
      <Button color="yellow">Botão 3</Button>
    </div> */