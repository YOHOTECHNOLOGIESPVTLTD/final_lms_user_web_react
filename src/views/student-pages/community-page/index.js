import { Box, Grid } from "@mui/material";
import SideBar from "features/student-pages/community-page/components/Sidebar";
import Chat from "features/student-pages/community-page/components/Chat";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentCommunities } from "features/student-pages/community-page/redux/thunks";
import {
  selectStudentCommunity,
  selectLoading,
} from "features/student-pages/community-page/redux/selectors";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const CommunityPage = () => {
  const dispatch = useDispatch();
  const communities = useSelector(selectStudentCommunity);
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [Messages, setMessages] = useState([]);


  useEffect(() => {
    const getCommunities = async () => {
      try {
        dispatch(getAllStudentCommunities());
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    getCommunities();
  }, [dispatch]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_URL);
    setSocket(socket);
  }, []);
  

  return (
    <Box
      sx={{
        height: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "18px",
          border: "1px solid #C3C3C3",
          boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container sx={{ flex: 1 }}>
          <Grid item xs={4}>
            <SideBar
              communities={communities}
              socket={socket}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              Messages = { Messages }
              setMessages = { setMessages}
            />
          </Grid>
          <Grid item xs={8} sx={{ display: "flex" }}>
            <Chat
              currentChat={currentChat}
              socket={socket}
              setCurrentChat={setCurrentChat}
              Messages={Messages}
              setMessages={setMessages}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CommunityPage;
