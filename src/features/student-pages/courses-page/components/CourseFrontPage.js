import { Box, Typography,Tabs, Tab, } from "@mui/material";
import { CourseCardBg } from "utils/images";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import NoteIcon from "assets/icons/noteIcon";
import CertificateIcon from "assets/icons/certificateIcon";
import LanguageIcon from "assets/icons/languageIcon";
import { getImageUrl } from "utils/common/imageUtlils";
import { formatDate } from "utils/formatDate.js";
import CourseStudentViewPage from "./courseViewPage";
import { useState } from "react";
import { Link } from "react-router-dom";

const CourseFrontPage = ({ Course }) => {
  const [currentTabs, setCurrentTabs] = useState("1");
  const Benefits = [
    {
      icon: <LanguageIcon color="white" />,
      id: "benifit1",
      title: "English & Tamil",
      background: "#5F1AA4",
      shadow: "0px 0px 50px 0px rgba(95, 26, 164, 0.63)",
    },
    {
      icon: <CertificateIcon color="white" padding="17px 41px 10px 40px" />,
      id: "benifit2",
      title: "3 Certificates",
      background: "#0051C8",
      shadow: "0px 0px 50px 0px rgba(0, 81, 200, 0.63)",
    },
    {
      icon: (
        <NoteIcon color="white" fill={"white"} padding="17px 41px 10px 40px" />
      ),
      id: "benifit3",
      title: "Notes",
      background: "#0F8D0D",
      shadow: "0px 0px 50px 0px rgba(15, 141, 13, 0.63)",
    },
  ];

  const tabs_list = [
    { id: "1", title: "Current Course" },
   { id: "2", title: "Completed" },
 ];

   

  
  return (
    <Box sx={{ pr: "60px", overflowY: "auto", maxHeight: "100vh",p:6, m:4}}>
      <Box sx={{ display: "flex", flexDirection: "column", pr: "90px" }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", pb: "20px" }}
        >

          
          <Typography
            sx={{
              color: "#000",
              fontfamily: "Nunito Sans",
              fontsize: "40px",
              fontstyle: "normal",
              fontweight: 900,
              lineheight: "24px",
              p:4,
              
            }}
          >
            Course List & Details
          </Typography>
          
        </Box>
        <Tabs
                value={currentTabs}
                onChange={(e, value) => setCurrentTabs(value)}
                indicatorColor="primary"
                sx={{
                  "&.MuiTabs-root:not(.MuiTabs-vertical)": {
                    borderBottom: 0,
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#5611B1",
                  },
                  "& .MuiTab-root": {
                    color: "#000000",
                  },
                  "& .Mui-selected": {
                    color: "#5611B1",
                  },
                }}
              >
                {tabs_list.map((tab) => (
                  <Tab
                    sx={{
                      p:4,
                      fontfamily: 'Poppins',
              fontsize: '16px',
              fontstyle: 'normal',
              fontweight: 500,
              lineheight: '14px',
                    }}
                    key={tab.id}
                    value={tab.id}
                    label={tab.title}
                  />
                ))}
              </Tabs>
              <Box sx={{ pb: "27px", p: 6 }}>
  <Link to="/student/courses/:id">
    <img
      src={getImageUrl(Course?.image)}
      style={{ width: "363px", height: "160px", borderRadius: "25px" }}
      alt="course"
    />
  </Link>
</Box>
        <Box sx={{ pb: "12px", display: "flex", gap: "21px" }}>
          <Typography
            sx={{
              color: "#000",
              fontfamily: "Nunito Sans",
              fontsize: "14px",
              fontstyle: "normal",
              fontweight: 800,
              lineheight: "32px",
              p:1,
              textAlign:"right"
        
            
            }}
          >
            {Course?.course_name}
          </Typography>
          <Typography
            sx={{ display: "inline-flex", gap: "5px", alignItems: "center" }}
          >
            <StarIcon sx={{ color: "#EEBA02" }} />
            <span
              style={{
                color: "#000000",
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "13px",
                p:1,
              
              }}
            >
              ( 4.0 )
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            pb: "21px",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "10px",
            }}
          >
            By Rajalakshmi Institute
          </Typography>
          <Typography
            sx={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <UpdateIcon sx={{ color: "black" }} />
            <span
              style={{
                color: "#000000",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "10px",
              }}
            >
              {Course.duration} Hrs
            </span>
            
          </Typography>
          </Box>
      </Box>
      </Box>
  );
};

export default CourseFrontPage;
