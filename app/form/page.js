"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Slider,
  Button,
  TextareaAutosize,
} from "@mui/material";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    subject: "",
    priority: 5,
    pageName: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (e, value) => {
    setFormData({ ...formData, priority: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // ارسال داده‌ها به سرور یا انجام عملیات دیگر
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      {/* TextField for Subject */}
      <TextField
        label="موضوع"
        name="subject"
        variant="outlined"
        fullWidth
        value={formData.subject}
        onChange={handleChange}
        required
      />

      {/* Slider for Priority */}
      <Box>
        <Typography gutterBottom>اولویت: {formData.priority}</Typography>
        <Slider
          value={formData.priority}
          onChange={handleSliderChange}
          step={1}
          marks
          min={0}
          max={10}
          valueLabelDisplay="auto"
        />
      </Box>

      {/* TextField for Page Name */}
      <TextField
        label="نام صفحه"
        name="pageName"
        variant="outlined"
        fullWidth
        value={formData.pageName}
        onChange={handleChange}
        required
      />

      {/* Textarea for Comments */}
      <Box>
        <Typography gutterBottom>کامنت:</Typography>
        <TextareaAutosize
          minRows={4}
          name="comment"
          placeholder="متن کامنت خود را وارد کنید..."
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          value={formData.comment}
          onChange={handleChange}
        />
      </Box>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        ارسال
      </Button>
    </Box>
  );
}
