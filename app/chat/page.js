"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = ({ initialComment }) => {
  const [messages, setMessages] = useState([]); // پیام‌ها
  const [inputMessage, setInputMessage] = useState(""); // متن وارد شده توسط مشتری
  const [loading, setLoading] = useState(false); // نشانگر ارسال پیام

  // دریافت پیام‌ها از بک‌اند
  const fetchMessages = async () => {
    try {
      const response = await axios.get("/api/support/messages"); // تغییر مسیر به API شما
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // ارسال پیام جدید
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    setLoading(true);
    try {
      await axios.post("/api/support/messages", {
        text: inputMessage,
        sender: "user",
      });
      setInputMessage("");
      fetchMessages(); // به‌روزرسانی پیام‌ها بعد از ارسال
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setLoading(false);
  };

  // اولین پیام چت (کامنت مشتری) را ارسال کنید
  useEffect(() => {
    const sendInitialMessage = async () => {
      if (initialComment) {
        try {
          await axios.post("/api/support/messages", {
            text: initialComment,
            sender: "user",
          });
          await axios.post("/api/support/messages", {
            text: "پیام شما دریافت شد. کارشناسان ما در اسرع وقت پاسخ خواهند داد.",
            sender: "support",
          });
          fetchMessages(); // دریافت پیام‌ها
        } catch (error) {
          console.error("Error sending initial comment:", error);
        }
      }
    };

    sendInitialMessage();
  }, [initialComment]);

  // اجرای polling هر 10 ثانیه
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // هر 10 ثانیه
    return () => clearInterval(interval); // پاکسازی تایمر
  }, []);

  return (
    <div className="chat-container bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto mt-10">
      {/* نمایش پیام‌ها */}
      <div className="messages h-64 overflow-y-auto bg-white p-4 rounded-lg mb-4 shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message mb-2 p-2 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* فرم ارسال پیام */}
      <div className="message-input flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="پیام خود را بنویسید..."
          disabled={loading}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`p-2 rounded-lg text-white ${
            loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          } disabled:cursor-not-allowed`}
        >
          {loading ? "در حال ارسال..." : "ارسال"}
        </button>
      </div>
    </div>
  );
};

export default Chat;



// const fetchMessages = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/messages");
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };
  
//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return;
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:3001/messages", {
//         text: inputMessage,
//         sender: "user",
//       });
//       setInputMessage("");
//       fetchMessages();
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//     setLoading(false);
//   };
  

// {
//     "messages": []
//   }


