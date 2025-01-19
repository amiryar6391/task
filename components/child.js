import { useEffect, useState } from "react"


export default function Child({ setHandleClick }){

    const [x , setX]= useState(0)
    const handleClick = () =>{
        
        setX(prev => prev+1)
    }
    useEffect(() => {
        setHandleClick(handleClick);
    }, [setHandleClick]);
   
    return(
        <>
         <div>
                <p>{x}</p>
        </div>

        </>
    )
}