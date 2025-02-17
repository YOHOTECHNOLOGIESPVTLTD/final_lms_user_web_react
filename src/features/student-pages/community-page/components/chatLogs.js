import React, { useEffect, useRef,useState } from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { getStudentDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const ChatLog = ({ socket, Messages }) => {
  const student = getStudentDetails();
  const messagesEndRef = useRef(null);
  const messageRefs = useRef(new Map());
  const isTablet = useMediaQuery("(max-width: 768px)"); // Detect tablet screen size
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());
  const [readMessages, setReadMessages] = useState(new Set());

  useEffect(() => {
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isWindowFocused) {
            const messageId = entry.target.getAttribute("data-id");

            if (!readMessages.has(messageId)) {
              setTimeout(() => {
                if (entry.isIntersecting && isWindowFocused) {
                  triggerMessageRead(messageId);
                }
              }, 1500); // Optional delay for confirmation
            }
          }
        });
      },
      { threshold: 0.8 } // 80% of message must be visible
    );
     messageRefs.current.forEach((ref) => {
    if (ref instanceof Element) {
      observer.observe(ref);
    }

  });

    return () => {
      observer.disconnect();
    };
  }, [Messages, isWindowFocused, readMessages]);

  const triggerMessageRead = (messageId) => {
    const msg = Messages.find((m) => m._id === messageId);

    if (msg && !readMessages.has(messageId)) {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });

      console.log(`Message ${messageId} read at ${formattedTime}`);
      socket.emit("messageRead", { messageId, userId: student?._id });
      setReadMessages((prev) => new Set([...prev, messageId]));
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {  
    scrollToBottom();
  }, [Messages]);

  return (
    <Box
      sx={{
        height: "100vh", // Full viewport height
        overflowY: "auto", // Scrollable content
        backgroundImage:
          "url('https://i.pinimg.com/originals/62/8a/06/628a064e53d4d2afa7ef36075e98f1b1.jpg')",
        backgroundColor: "#F5F5F5",
        backgroundSize: "cover", // Image covers the full background
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents tiling
      }}
    >
      {/* Messages */}
      {Messages.map((message) => (
        <Grid
          container
          key={message._id}
          justifyContent={
            message.sender === student?._id ? "flex-end" : "flex-start"
          }
          sx={{ padding: isTablet ? "8px" : "16px" }}
        >
          <Grid item xs={10} sm={8} md={6}>
            <Typography
              sx={{
                color: "#0B3048",
                fontSize: isTablet ? "11px" : "12px",
                fontWeight: 400,
                opacity: "0.7",
                marginBottom: isTablet ? "8px" : "10px",
                textAlign: message.sender === student?._id ? "end" : "start",
              }}
            >
              {message.time}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: message.sender === student?._id ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  backgroundColor:
                    message.sender === student?._id ? "#61C554" : "#E8ECEF",
                  padding: isTablet ? "12px 16px" : "15px 20px",
                  borderRadius: "10px",
                  minWidth: "180px",
                }}
              >
                {message.sender !== student?._id && (
                  <Typography
                    sx={{
                      fontSize: isTablet ? "9px" : "10px",
                      alignSelf: "start",
                    }}
                  >
                    {message.sender_name}
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  sx={{
                    wordBreak: "break-word",
                    color: message.sender === student?._id ? "white" : "#000000",
                    fontSize: isTablet ? "13px" : "14px",
                    fontWeight: 400,
                  }}
                >
                  {message.message}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "end",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: isTablet ? "-2px" : "-3px",
                  }}
                >
                  {message?.sender === student?._id &&
                    message?.status?.some((s) => s.delivered) &&
                    !message?.status?.every((s) => s.delivered) && (
                      <DoneIcon
                        sx={{
                          color: "white",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                    )}

                  {message?.sender === student?._id &&
                    message?.status?.every((s) => s.delivered) &&
                    !message?.status?.every((s) => s.read) && (
                      <DoneAllIcon
                        sx={{
                          color: "white",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                    )}

                  {message?.sender === student?._id &&
                    message?.status?.every((s) => s.read) && (
                      <DoneAllIcon
                        sx={{
                          color: "#0D6EFD",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                    )}
                </Typography>
              </Box>
              <Box sx={{ marginTop: isTablet ? "3px" : "5px" }}>
                <Typography
                  sx={{
                    color: "#727272",
                    fontSize: isTablet ? "10px" : "11px",
                    fontWeight: 500,
                    textAlign: "end",
                  }}
                >
                  {formatTime(message?.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatLog;
