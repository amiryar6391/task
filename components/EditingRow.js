import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";



export default function EditingRow({ open, onClose, row, onSave }) {
  const [formData, setFormData] = useState(row || {});
  const [price, setPrice] = useState(""); 
  const [previewImage, setPreviewImage] = useState(null); 

  useEffect(() => {
    setFormData(row || {});
    setPreviewImage(row?.imagefood || null); 
    setPrice(row?.price?.toString() || ""); 
  }, [row]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "imagefood") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        imagefood: file, 
      });
      setPreviewImage(URL.createObjectURL(file)); 
    } else if (name === "price") {
    
      const numericValue = value.replace(/[^0-9]/g, "");
      setPrice(numericValue);
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();

      
      const sanitizedData = {
        ...formData,
        price: parseInt(price, 10), 
      };

      for (const key in sanitizedData) {
        formDataToSend.append(key, sanitizedData[key]);
      }

      const res = await fetch(`http://localhost:9000/rows/${row.id}`, {
        method: "PATCH",
        body: formDataToSend,
      });

      if (res.status === 200) {
        onSave(formData);
        onClose();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "ویرایش اطلاعات با موفقیت انجام شد!",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        console.error("Failed to update the row.");
      }
    } catch (error) {
      console.error("Error updating the row:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="mx-auto border-b-2">
        <DialogTitle>
          <span className="font-extrabold">ویرایش اطلاعات</span>
        </DialogTitle>
      </div>
      <DialogContent>
        <form>
          <div className="mb-5">
            <label htmlFor="" className=" text-gray-500 font-extrabold">نام غذا :</label>
            <input
              type="text"
              name="namefood"
              value={formData.namefood || ""}
              onChange={handleChange}
              className="w-full border border-gray-500 rounded-md p-1 ml-2"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="" className=" text-gray-500 font-extrabold">رستوران :</label>
            <input
              type="text"
              name="restaurant"
              value={formData.restaurant || ""}
              onChange={handleChange}
              className="w-full border border-gray-500 rounded-md p-1"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="" className=" text-gray-500 font-extrabold">مواد :</label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients || ""}
              onChange={handleChange}
              className="w-full border border-gray-500 rounded-md p-1"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="" className=" text-gray-500 font-extrabold">قیمت :</label>
            <input
              type="text"
              name="price"
              value={price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              onChange={handleChange}
              className="w-full border border-gray-500 rounded-md p-1"
            />
          </div>

          <div className="flex mt-4">
            <input
              type="file"
              name="imagefood"
              onChange={handleChange}
            />
            {previewImage ? (
              <Image
                src={previewImage}
                alt="Preview"
                width={40}
                height={30}
              />
            ) : null}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          لغو
        </Button>
        <Button onClick={handleSave} color="primary">
          ذخیره
        </Button>
      </DialogActions>
    </Dialog>
  );
}






























































































