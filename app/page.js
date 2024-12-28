"use client";

import DataGridFood from "@/components/dataGridFood";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cart from "@/components/cart";
import { Button } from "@mui/material";
import EditingRow from "@/components/EditingRow";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import AddingRow from "@/components/addingRow";


export default function Home() {

  const [columnsinfo , setColumnsinfo] = useState([])
  const [rowsinfo , setRowsinfo] = useState([])

  const [editDialogOpen, setEditDialogOpen] = useState(false);
const [currentRow, setCurrentRow] = useState(null);

 
 

  
  const getColumns = async () =>{
    const res = await fetch('http://localhost:9000/columns')
    const data = await res.json(res)
    
    const custColumns = data.map((col) => {
      if(col.field == "imagefood"){
        return {
          ...col ,
          renderCell: (params) => (
            <div className="group relative">
              
                <Image
                  src={params.value}
                  alt="image food"
                  width={60}
                  height={40}
                  className=" mt-1 "
                />
                 <div className="absolute hidden group-hover:flex justify-center items-center top-0 right-14 z-40 w-48 h-24 p-2 bg-white border border-gray-300 rounded-md shadow-lg">
                <Image
                  src={params.value}
                  alt="food large"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              </div>
          
          ),

        }
      } else if (col.field == 'action'){
        return {
          ...col ,
          renderCell:(params) => {

            //editing button function
            const handleEdit = () =>{
              openEditDialog(params.row);
            }

            //deleting button function
            const handleDelete = async () =>{
              try{
                const res = await fetch(`http://localhost:9000/rows/${params.row.id}` , {
                  method : "DELETE",
                  headers : { "Content-Type" : "application/json"}
                })
                if (res.status === 200) {
                      
                        setRowsinfo((prevRows) => prevRows.filter((row) => row.id !== params.row.id));
                      } else {
                        console.log("Failed to delete the row.");
                      }

              }
              catch(error){
                console.error("Error deleting the row:", error);
              }
    
            }
            return(
              <div>
                <Button variant="text" onClick={handleEdit}>
                    <CiEdit  size='22px' className=" text-gray-800"/>
                </Button>

                <Button variant="text" color="success" onClick={handleDelete}>
                 <MdOutlineDelete size='20px' className=" text-gray-800"/>
                </Button>
              </div>
            )
          }

        }
      } else if(col.field == 'price'){
        return{
          ...col ,
          renderCell:(params)=>(
            <span>{`${Number(params.value).toLocaleString('fa-IR')}`} تومان</span>
          )
        }
      }
      return col
    })
    setColumnsinfo(custColumns)
  }


  const getRows = async () =>{
    const res = await fetch('http://localhost:9000/rows')
    const data = await res.json()
    setRowsinfo(data)
  }

  useEffect(()=>{
    getColumns()
    getRows()
  },[])

///editing
  const openEditDialog = (row) => {
    setCurrentRow(row);
    setEditDialogOpen(true);
  };
  
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentRow(null);
  };
  
  const handleSaveEdit = (updatedRow) => {
    setRowsinfo((prevRows) =>
      prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
  };

  
 

  return (
    <>
      <div className=" w-[61%] h-[400px] mx-auto mt-32 font ">
        <DataGridFood
          columns={columnsinfo}
          rows={rowsinfo}
        />
        <EditingRow 
        open={editDialogOpen}
        onClose={closeEditDialog}
        row={currentRow}
        onSave={handleSaveEdit}  
        />
        <AddingRow />
      </div>

      {/* <div className=" block sm:hidden">
        {rows.map((row) => (
          <Cart {...row} key={row.id} />
        ))}
      </div> */}
    </>
  );
}




















































