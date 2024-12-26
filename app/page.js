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


















































// {
//     "id": "1",
//     "productcode":"S232",
//     "namefood": "کباب",
//     "imagefood": "/image/kebab.JPG.webp",
//     "restaurant": "شهرزاد",
//     "ingredients": "گوشت بره",
//     "price": 120000
//   },
//   {
//     "id": "2",
//     "productcode":"S456",
//     "namefood": "مرغ",
//     "imagefood": "/image/kebab.JPG.webp",
//     "restaurant": "یلدا",
//     "ingredients": "مرغ سبز و ادویه",
//     "price": 16000
//   },
//   {
//     "id": "3",
//     "productcode":"A453",
//     "namefood": "شاورما",
//     "imagefood": "/image/rice.jpg.jpg",
//     "restaurant": "بندری",
//     "ingredients": "مرغ و سس سیر",
//     "price": 8000
//   },
//   {
//     "id": "4",
//     "productcode":"S332",
//     "namefood": "قورمه سبزی",
//     "imagefood": "/image/kebab.JPG.webp",
//     "restaurant": "یلدا",
//     "ingredients": "سبزی تازه",
//     "price": 80000
//   },
//   {
//     "id": "6",
//     "productcode":"F889",
//     "namefood": "بندری",
//     "imagefood": "/image/kebab.JPG.webp",
//     "restaurant": "ژان",
//     "ingredients": "سوسیس",
//     "price": 100000
//   },
//   {
//     "id": "7",
//     "productcode":"F676",
//     "namefood": "برگر",
//     "imagefood": "/image/rice.jpg.jpg",
//     "restaurant": "ژان",
//     "ingredients": "گوشت گوساله",
//     "price": 200000
//   },
//   {
//     "id": "8",
//     "productcode":"F543",
//     "namefood": "الویه",
//     "imagefood": "/image/kebab.JPG.webp",
//     "restaurant": "مادر",
//     "ingredients": "سیب زمینی و تخم مرغ",
//     "price": 8000
//   },
//   {
//     "id": "9",
//     "productcode":"S999",
//     "namefood": "بریونی",
//     "imagefood": "/image/rice.jpg.jpg",
//     "restaurant": "اعظم",
//     "ingredients": "گوشت گردن",
//     "price": 300000
//   },
//   {
//     "id": "10",
//     "productcode":"S112",
//     "namefood": "جوجه کباب",
//     "imagefood": "/image/kebab.JPG.webp",
//     "restaurant": "شهرزاد",
//     "ingredients": "مرغ تازه",
//     "price": 95000
//   }





//-------------------------------



// import React, { useState } from "react";
// import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

// export default function TailwindStyledDialog({ open, handleClose, addRow }) {
//   const [newRow, setNewRow] = useState({
//     name: "",
//     price: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewRow({ ...newRow, [name]: value });
//   };

//   const handleSubmit = () => {
//     addRow(newRow);
//     handleClose();
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} className="flex items-center justify-center">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
//         <DialogTitle className="text-xl font-bold text-gray-800 border-b pb-2">
//           اضافه کردن سطر جدید
//         </DialogTitle>
//         <DialogContent className="py-4 space-y-4">
//           <form>
//             <input
//               name="name"
//               type="text"
//               placeholder="نام غذا"
//               value={newRow.name}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               name="price"
//               type="text"
//               placeholder="قیمت"
//               value={newRow.price}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </form>
//         </DialogContent>
//         <DialogActions className="flex justify-end space-x-2 pt-4">
//           <button
//             onClick={handleClose}
//             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
//           >
//             لغو
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             ذخیره
//           </button>
//         </DialogActions>
//       </div>
//     </Dialog>
//   );
// }


//--------------------------------------------------------------

// import React, { useState } from "react";
// import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

// const AddDialog = ({ open, onClose, onSave }) => {
//   const [foodName, setFoodName] = useState("");
//   const [price, setPrice] = useState("");

//   const handleSave = async () => {
//     try {
//       const response = await fetch('http://localhost:9000/rows', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: foodName, price: price })
//       });

//       if (response.ok) {
//         console.log("Row added successfully!");
//         onSave(); // این تابع می‌تواند برای آپدیت اطلاعات در کامپوننت اصلی استفاده شود
//       } else {
//         console.error("Failed to add row");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>اضافه کردن سطر جدید</DialogTitle>
//       <DialogContent>
//         <form>
//           <input
//             type="text"
//             placeholder="نام غذا"
//             value={foodName}
//             onChange={(e) => setFoodName(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 mb-4"
//           />
//           <input
//             type="text"
//             placeholder="قیمت"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2"
//           />
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <button
//           onClick={onClose}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
//         >
//           لغو
//         </button>
//         <button
//           onClick={handleSave}  // فراخوانی تابع save برای ارسال اطلاعات
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           ذخیره
//         </button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddDialog;


//--------------------------------------------------------------------------

// import React, { useState } from "react";
// import AddDialog from "./AddDialog";

// function App() {
//   const [dialogOpen, setDialogOpen] = useState(false);

//   // باز کردن دیالوگ
//   const handleOpen = () => {
//     setDialogOpen(true);
//   };

//   // بستن دیالوگ
//   const handleClose = () => {
//     setDialogOpen(false);
//   };

//   // عملیات ذخیره‌سازی
//   const handleSave = () => {
//      fetch('http://localhost:9000/rows')
//      .then((response) => response.json())
//      .then((data) => setRows(data));
//     // می‌توانید عملیات ذخیره‌سازی داده‌ها به دیتابیس یا API را اینجا انجام دهید
//   };

//   return (
//     <div className="p-4">
//       {/* دکمه اضافه */}
//       <button
//         onClick={handleOpen}
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//       >
//         اضافه
//       </button>

//       {/* کامپوننت دیالوگ */}
//       <AddDialog open={dialogOpen} onClose={handleClose} onSave={handleSave} />
//     </div>
//   );
// }

// export default App;


