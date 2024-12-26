import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

export default function AddingRow({ open, onClose }) {
    const [formData, setFormData] = useState({
        productcode: "",
        namefood: "",
        imagefood: "",
        restaurant: "",
        ingredients: "",
        price: ""
    });

    const [errors, setErrors] = useState({
        productcode: "",
        namefood: "",
        imagefood: "",
        restaurant: "",
        ingredients: "",
        price: ""
    });

    const handleAdd = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            price: value,
        });
    };
    const formattedPrice = new Intl.NumberFormat("fa-IR").format(formData.price);
    

    const handleAddSave = async () => {
        let hasError = false;
        let newErrors = { ...errors };

        
        Object.keys(formData).forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = "این فیلد الزامی است";
                hasError = true;
            } else {
                newErrors[field] = "";
            }
        });

        setErrors(newErrors);

        if (!hasError) {
            const res = await fetch("http://localhost:9000/rows", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                onClose();
                
            } else {
                }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <div className=" mx-auto border-b-2">
                <DialogTitle>
                    <span className=" font-extrabold">افزودن غذای جدید</span>
                </DialogTitle>
            </div>
            <DialogContent>
                <div className=" mt-2">
                    <form action="">
                        <div className=" mb-7">
                            <input
                                type="text"
                                name="productcode"
                                placeholder="کد کالا"
                                value={formData.productcode}
                                onChange={handleAdd}
                                className="border-b border-gray-600 focus:outline-none w-full"
                            />
                            {errors.productcode && (
                                <div className="text-red-500 text-xs mt-3">{errors.productcode}</div>
                            )}
                        </div>
                        <div className=" mb-7">
                            <input
                                type="text"
                                name="namefood"
                                placeholder="نام غذا"
                                value={formData.namefood}
                                onChange={handleAdd}
                                className="border-b border-gray-600 focus:outline-none w-full"
                            />
                            {errors.namefood && (
                                <div className="text-red-500 text-xs mt-3">{errors.namefood}</div>
                            )}
                        </div>

                        <div className=" mb-7">
                            <input
                                type="text"
                                name="restaurant"
                                placeholder="رستوران"
                                value={formData.restaurant}
                                onChange={handleAdd}
                                className="border-b border-gray-600 focus:outline-none w-full"
                            />
                            {errors.restaurant && (
                                <div className="text-red-500 text-xs mt-3">{errors.restaurant}</div>
                            )}
                        </div>

                        <div className=" mb-7">
                            <input
                                type="text"
                                name="ingredients"
                                placeholder="مواد"
                                value={formData.ingredients}
                                onChange={handleAdd}
                                className="border-b border-gray-600 focus:outline-none w-full"
                            />
                            {errors.ingredients && (
                                <div className="text-red-500 text-xs mt-3">{errors.ingredients}</div>
                            )}
                        </div>

                        <div className=" mb-9">
                            <input
                                type="number"
                                name="price"
                                placeholder="قیمت"
                                value={formData.price}
                                onChange={handlePriceChange}
                                className="border-b border-gray-600 focus:outline-none w-full"
                            />
                            {errors.price && (
                                <div className="text-red-500 text-xs mt-3">{errors.price}</div>
                            )}
                             <span className="block text-sm text-gray-500 mt-2">
                                {formattedPrice} تومان
                            </span>
                        </div>

                        <div className=" mb-10">
                            <input type="file" name="imagefood" />
                            
                        </div>
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>لغو</Button>
                <Button onClick={handleAddSave}>ذخیره</Button>
            </DialogActions>
        </Dialog>
    );
}

