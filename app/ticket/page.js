"use client";


import { useEffect, useState } from "react"



export default function Ticket(){

    const [ticketInfo , setTicketInfo] = useState([])
    const [parent , setParent] = useState([])
    const [path, setPath] = useState([]);
    const [currentChange , setCurrentChange] = useState(null)
    const [isSelectedId , setIsSelectedId] = useState(null);
    const [changeStatus , setChangeStatus] =useState(true)
    

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
    setIsSelectedId(item.id);
    setCurrentChange(item)
  };
  const handleNext = () => {
      setPath([...path, currentChange]);
      setCurrentChange(null);
      if( currentChange?.child.length == 0 ){
      setChangeStatus(false)
    }
      
    
    
   
  };

  const handleBack = () => {
    setPath(path.slice(0, -1)); 
    setChangeStatus(true)
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
            <div
              key={item.id}
              onClick={() => handleChildClick(item)}
              className={isSelectedId === item.id ? "block w-full text-left px-4 py-2 bg-green-300  rounded cursor-default" : "block w-full text-left px-4 py-2 bg-gray-200 rounded cursor-default"}
            >
              {item.name}
            </div>
          ))}

        {currentParent &&
          currentParent.child?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleChildClick(item)}
              className="block w-full text-left px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded"
            >
              {item.name}
            </div>
          ))}
          
            
             {
              changeStatus ?
              <button
              onClick={handleNext}
              
              className="block w-full text-left px-4 py-2 bg-green-200 hover:bg-green-300 rounded"
            >
              بعدی
            </button>
            :
            <button
            onClick={handleNext}
            className="block w-full text-left px-4 py-2 bg-green-200 hover:bg-green-300 rounded"
          >
            قبلی
          </button> 
             }
            
          

      </div>
    </div>

        

    )

}