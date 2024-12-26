

import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import AddingRow from "./addingRow";


export default function DataGridFood({ columns, rows }) {

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  

  const handlerOpenIframe = () =>{
    setAddDialogOpen(true)
  }
  const handlerCloseAdd = () =>{
    setAddDialogOpen(false)
  }
  
  
  

  return (
    
    <div className=" w-full h-[400px] ">
      <button onClick={handlerOpenIframe} className=" mr-4 mb-3 w-44 h-10  rounded-2xl bg-blue-100 text-gray-800 font-bold"> افزودن غذای جدید</button>
    <AddingRow
    open={addDialogOpen}
    onClose={handlerCloseAdd}
     />
      <DataGrid
        sx={{
          direction: "rtl",
          position:'relative',
          "& .MuiDataGrid-cell": {
            overflow: "visible !important",
            position: 'relative',
            fontWeight : 'bold'
          },
          "& .MuiDataGrid-footerContainer":{
            backgroundColor: "rgba(190,222,222,0.4)",
          },
          "& .super-app-theme--header": {
            backgroundColor: "rgba(190,222,222,0.4)",
          },
          "& .MuiDataGrid-columnHeaders": {
          direction: "rtl",
        },
        "& .MuiDataGrid-row": {
          direction: "rtl",
        },
          
        }}
        columns={columns}
        rows={rows}
        rowHeight={50}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'
        }
        // checkboxSelection
        // slots={{ toolbar: GridToolbar }}
        
        
      />
    </div>
  );
}

