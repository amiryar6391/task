// import React, { useState, useEffect, useRef } from "react";
// import { BsPerson } from "react-icons/bs";
// import axios from "axios";

// const ChatRoom = ({ initialComment }) => {
//   const [messages, setMessages] = useState([]); // پیام‌ها
//   const [inputMessage, setInputMessage] = useState(""); // متن وارد شده توسط مشتری
//   const [loading, setLoading] = useState(false); // نشانگر ارسال پیام
//   const messagesEndRef = useRef(null)

//   const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//       };
  
//   // دریافت پیام‌ها از بک‌اند
//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/messages"); // تغییر مسیر به API شما
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   // ارسال پیام جدید
//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return;
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5000/messages", {
//         text: inputMessage,
//         sender: "user",
//       });
//       setInputMessage("");
//       fetchMessages(); // به‌روزرسانی پیام‌ها بعد از ارسال
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//     setLoading(false);
//   };

  

//   // اولین پیام چت (کامنت مشتری) را ارسال کنید
//   useEffect(() => {
//     const sendInitialMessage = async () => {
//       if (initialComment) {
//         try {
//           await axios.post("http://localhost:5000/messages", {
//             text: initialComment,
//             sender: "user",
//           });
//           await axios.post("http://localhost:5000/messages", {
//             text: "پیام شما دریافت شد. کارشناسان ما در اسرع وقت پاسخ خواهند داد.",
//             sender: "support",
//           });
//           fetchMessages(); // دریافت پیام‌ها
//         } catch (error) {
//           console.error("Error sending initial comment:", error);
//         }
//       }
//     };

//     sendInitialMessage();
//   }, [initialComment]);

//   useEffect(()=>{
//     scrollToBottom()

//   },[messages])

//   // اجرای polling هر 10 ثانیه
//   useEffect(() => {
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 10000); // هر 10 ثانیه
//     return () => clearInterval(interval); // پاکسازی تایمر
//   }, []);

//   return (
//     <div className="chat-container bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto mt-10">
//       {/* نمایش پیام‌ها */}
//       <div className="messages h-64 overflow-y-auto bg-white p-4 rounded-lg mb-4 shadow-inner">
//         {messages.map((msg, index) => (
//            <div
//            key={index}
//             className={`message mb-2 p-2 rounded-lg max-w-xs ${
//               msg.sender === "user"
//                 ? "bg-blue-500 text-white place-self-start ml-auto flex"
//                 : "bg-gray-300 text-black place-self-end"
//             }`}
//           >
//             <div className=" ml-1">{msg.sender === "user" && <span className=""  ><BsPerson size={25} className=" p-1 border border-white rounded-full"/></span>}</div>
//             {msg.text}
//           </div>
//         ))}
//         <div ref={messagesEndRef}/>
//       </div>

//       {/* فرم ارسال پیام */}
//       <div className="message-input flex items-center gap-2">
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder="پیام خود را بنویسید..."
//           disabled={loading}
//           className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
//         />
//         <button
//           onClick={sendMessage}
//           disabled={loading}
//           className={`p-2 rounded-lg text-white ${
//             loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
//           } disabled:cursor-not-allowed`}
//         >
//           {loading ? "در حال ارسال..." : "ارسال"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;


import React, { useState, useEffect, useRef } from "react";
import { Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getmessage } from "@/redux/slices/to";


const ChatRoom = ({ initialComment }) => {
  const [messages, setMessages] = useState([]); // پیام‌ها
  const [inputMessage, setInputMessage] = useState(""); // متن وارد شده توسط مشتری
  const [loading, setLoading] = useState(false); // نشانگر ارسال پیام
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();



  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // دریافت پیام‌ها از بک‌اند
  // const fetchMessages = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/messages");
  //     console.log(response);
      
  //     setMessages(response.data);
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //   }
  // };
  
  const {message} = useSelector(state => state?.toReducer)
  
  




  // ارسال پیام جدید
  // const sendMessage = async () => {
  //   if (!inputMessage.trim()) return;
  //   setLoading(true);
  //   try {
  //     await axios.post("http://localhost:5000/messages", {
  //       text: inputMessage,
  //       sender: "user",
  //     });
  //     setInputMessage("");
  //     fetchMessages();
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  //   setLoading(false);
  // };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    setLoading(true);
  
    try {
      // ارسال پیام به Redux store
      await dispatch(getmessage({ text: inputMessage, sender: "user" }));
  
      // پاک کردن پیام ورودی
      setInputMessage("");
  
      // به‌روزرسانی پیام‌ها
      
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // اولین پیام چت (کامنت مشتری) را ارسال کنید
  // useEffect(() => {
  //   const sendInitialMessage = async () => {
  //     if (initialComment) {
  //       try {
  //         await axios.post("http://localhost:5000/messages", {
  //           text: initialComment,
  //           sender: "user",
  //         });
  //         await axios.post("http://localhost:5000/messages", {
  //           text: "پیام شما دریافت شد. کارشناسان ما در اسرع وقت پاسخ خواهند داد.",
  //           sender: "support",
  //         });
  //         fetchMessages();
  //       } catch (error) {
  //         console.error("Error sending initial comment:", error);
  //       }
  //     }
  //   };

  //   sendInitialMessage();
  // }, [initialComment]);
  useEffect(() => {
    const sendInitialMessage = async () => {
      if (initialComment) {
        try {
          // ارسال پیام کاربر
          await dispatch(getmessage({ text: initialComment, sender: "user" }));
          
          // ارسال پیام پشتیبان
          await dispatch(getmessage({ text: "پیام شما در اسرع وقت جواب داده میشود", sender: "support" }));
          
          // به‌روزرسانی پیام‌ها
          
        } catch (error) {
          console.error("Error sending initial message:", error);
        }
      }
    };
  
    // فراخوانی تابع
    sendInitialMessage();
  }, [initialComment , dispatch]); // وابستگی‌ها

  useEffect(() => {
    setMessages(message);
  }, [message]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 // اجرای polling هر 10 ثانیه
  // useEffect(() => {
  //   fetchMessages();
  //   const interval = setInterval(fetchMessages, 10000); // هر 10 ثانیه
  //   return () => clearInterval(interval); // پاکسازی تایمر
  // }, []);

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        bgcolor: "grey.100",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* نمایش پیام‌ها */}
      <Box
        sx={{
          height: "16rem",
          overflowY: "auto",
          bgcolor: "white",
          p: 2,
          borderRadius: 2,
          boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.1)",
          mb: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-start" : "flex-end",
              mb: 1,
            }}
          >
            {msg.sender === "user" && (
              <Avatar
                sx={{
                  bgcolor: "blue",
                  color: "white",
                  width: 30,
                  height: 30,
                  mr: 1,
                }}
              >
                <PersonIcon fontSize="small" />
              </Avatar>
            )}
            <Paper
              sx={{
                p: 1,
                borderRadius: 2,
                maxWidth: "250px",
                bgcolor: msg.sender === "user" ? "primary.main" : "grey.300",
                color: msg.sender === "user" ? "white" : "black",
              }}
            >
              <Typography variant="body2">{msg.text}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="پیام خود را بنویسید..."
          disabled={loading}
          size="small"
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          disabled={loading}
          sx={{
            bgcolor: loading ? "primary.light" : "primary.main",
            "&:hover": { bgcolor: loading ? "primary.light" : "primary.dark" },
          }}
        >
          {loading ? "در حال ارسال..." : "ارسال"}
        </Button>
      </Box>
    </Box>
  );
};

export default ChatRoom;
