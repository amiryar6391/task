"use client";


import { useEffect, useState } from "react"



export default function Ticket(){

    const [ticketInfo , setTicketInfo] = useState([])
    const [parent , setParent] = useState([])
    const [path, setPath] = useState([]);
    

    const getTicketInfo = async() =>{
            const res= await fetch('http://localhost:7000/data_ticket')
            const data = await res.json()
            setTicketInfo(data)
        }

        const getChildren = (parentId, data) => {
            return data
              .filter((item) => String(item?.parent) === parentId)
              .map((childItem) => ({
                ...childItem,
                child: getChildren(childItem?.id , data)
              }));
          };





        const parents = (data) =>{

            let parentsType = data
                .filter( type => type?.parent === null )
                .map((childItems) => ({
                    
                    
                        ...childItems,
                        child:getChildren(childItems?.id , data)
                    

            }))

            setParent(parentsType);
            
              
        }
        
        
    
        useEffect(()=>{
            getTicketInfo()
        
        },[])

        useEffect(() => {
            if ( ticketInfo.length > 0 ) {
              parents(ticketInfo);
            }
          }, [ticketInfo]);

    const currentParent = path[path.length - 1];
    console.log(currentParent?.id);

    

  const handleChildClick = (item) => {
    setPath([...path, item]); 
  };

  const handleBack = () => {
    setPath(path.slice(0, -1)); 
  };


    return(

        <div className="flex justify-center items-center h-screen">
      <div className="border border-gray-800 w-[400px] h-[500px] p-4 space-y-2">
    
        {path.length > 0 && (
          <button
            onClick={handleBack}
            className="block w-full text-left px-4 py-2 bg-red-200 hover:bg-red-300 rounded"
          >
            بازگشت
          </button>
        )}

        
        {!currentParent &&
          parent.map((item) => (
            <button
              key={item.id}
              onClick={() => handleChildClick(item)}
              className="block w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              {item.name}
            </button>
          ))}

        {currentParent &&
          currentParent.child?.map((item) => (
            <button
              key={item.id}
              onClick={() => handleChildClick(item)}
              className="block w-full text-left px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded"
            >
              {item.name}
            </button>
          ))}
      </div>
    </div>

        

    )

}