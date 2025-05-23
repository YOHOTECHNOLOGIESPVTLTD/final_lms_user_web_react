import { Grid, Typography, Box } from "@mui/material";
import oridinalSuffix from "utils/course/addOridinalSuffix";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import NoteIcon from "assets/icons/noteIcon";
import { useTabResponsive } from "utils/tabResponsive";

const CourseModuleCard = ({
  id,
  style,
  title,
  progress,
  notes,
  videos,
  closeCourseView,
  openCourseView,
  class_details,
}) => {
  const { tabView } = useTabResponsive();

  return (
    <Grid
      onClick={() => openCourseView(class_details, id)}
      item
      sx={{
        width: "291px",
        height: "200px",
        borderRadius: "16px",
        padding: "25px",
        background: `linear-gradient(${style.card})`,
        cursor: "pointer",
        transition: "transform 0.4s, box-shadow 0.4s",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "flex-start",
          pb: "24px",
          alignItems: "center",
          fontSize: "21px",
          fontWeight: 600,
        }}
      >
        <Typography
          sx={{
            padding: "10px",
            backgroundColor: style.background,
            color: style.color,
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {oridinalSuffix(id)}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Chapter
        </Typography>
      </Box>
      <Box sx={{ pb: "24px", display: "flex", gap: "31px" }}>
        <Typography
          sx={{
            color: "white",
            fontSize: "14px",
            fontWeight: 800,
            flex: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "38px",
            fontWeight: 900,
          }}
        >
          {progress}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
          <NoteIcon color="white" width="22px" height="22px" fill="white" />
          <Typography
            sx={{
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {notes} Notes
          </Typography>
        </Box>
        <Box sx={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
          <SmartDisplayOutlinedIcon
            sx={{ color: "white", height: "22px", width: "22px" }}
          />
          <Typography
            sx={{
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {videos} Videos
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default CourseModuleCard;

