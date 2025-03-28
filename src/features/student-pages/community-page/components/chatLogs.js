import React, { useRef, useEffect, useState } from "react";
import { Box, Grid, Typography, IconButton, Button } from "@mui/material";
import { getStudentDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatLog = ({ socket, Messages, messagePagination, setMessagePagination, FetchMessages }) => {
  const student = getStudentDetails();
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const messageRefs = useRef(new Map());
  const [readMessages, setReadMessages] = useState(new Set());
  const [isFetching, setIsFetching] = useState(false);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (messageContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
      setIsUserAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  };

  useEffect(() => {
    if (isUserAtBottom) {
      scrollToBottom();
    }
  }, [Messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute("data-id");
            if (messageId && !readMessages.has(messageId)) {
              triggerMessageRead(messageId);
            }
          }
        });
      },
      { threshold: 0.8 }
    );

    messageRefs.current.forEach((ref) => {
      if (ref instanceof Element) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [Messages, readMessages]);

  const triggerMessageRead = (messageId) => {
    if (!readMessages.has(messageId)) {
      socket.emit("messageRead", { messageId, userId: student?._id });
      setReadMessages((prev) => new Set([...prev, messageId]));
    }
  };

  const handleDeleteMessage = (messageId) => {
    socket.emit("deleteMessage", { messageId, userId: student?._id });
  };

  const handleLoadMore = async () => {
    if (messagePagination.currentPage < messagePagination.totalPages) {
      const chatContainer = messagesEndRef.current.parentElement;
      const scrollOffset = chatContainer.scrollHeight - chatContainer.scrollTop;

    setIsFetching(true);
    const nextPage = messagePagination.currentPage + 1;
    await FetchMessages(nextPage);
    setIsFetching(false);

    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight - scrollOffset;
    }, 0);
    }
  };

  return (
    <Box
      ref={messageContainerRef}
      onScroll={handleScroll}
      sx={{
        height: "100vh",
        overflowY: "auto",
        backgroundImage:
          "url('https://i.pinimg.com/originals/62/8a/06/628a064e53d4d2afa7ef36075e98f1b1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {messagePagination?.currentPage < messagePagination?.totalPages && (
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <Button
            onClick={handleLoadMore}
            variant="contained"
            disabled={isFetching}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
              },
            }}
          >
            {isFetching ? "Loading..." : "Load More Messages"}
          </Button>
        </Box>
      )}

      {Messages?.map((msg) => (
        <Grid
          container
          key={msg._id}
          justifyContent={
            msg.sender === student?._id ? "flex-end" : "flex-start"
          }
          sx={{ marginBottom: "8px" }}
          data-id={msg._id}
          ref={(el) => messageRefs.current.set(msg._id, el)}
        >
          <Grid item xs={9} sm={7} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === student?._id ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  backgroundColor: msg.sender === student?._id ? "#61C554" : "#E8ECEF",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  minWidth: "180px",
                  maxWidth: "100%",
                  wordWrap: "break-word",
                }}
              >
                {msg.sender !== student?._id && (
                  <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                    {msg.sender_name}
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  sx={{
                    color: msg.sender === student?._id ? "white" : "#000",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  {msg.message}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "4px",
                  }}
                >
                  <Typography sx={{ fontSize: "11px", color: "#727272" }}>
                    {formatTime(msg?.createdAt)}
                  </Typography>

                  {msg.sender === student?._id &&
                    (msg.status?.some((s) => s.delivered) ? (
                      msg.status?.every((s) => s.read) ? (
                        <DoneAllIcon sx={{ color: "#0D6EFD", width: "16px" }} />
                      ) : (
                        <DoneAllIcon sx={{ color: "white", width: "16px" }} />
                      )
                    ) : (
                      <DoneIcon sx={{ color: "white", width: "16px" }} />
                    ))}

                  {msg.sender === student?._id && (
                    <IconButton
                      onClick={() => handleDeleteMessage(msg._id)}
                      sx={{ color: "white", padding: "2px", display: "none" }}
                    >
                      <DeleteIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  )}
                </Box>
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
