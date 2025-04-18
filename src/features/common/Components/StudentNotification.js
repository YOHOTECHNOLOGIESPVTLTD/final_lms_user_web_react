import { Box, Divider, Tabs, Tab, IconButton, Popover, Typography, Button, Avatar } from "@mui/material";
import { useState } from "react";
import LaunchSharpIcon from '@mui/icons-material/LaunchSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Link } from "react-router-dom";
import { getImageUrl } from "utils/common/imageUtlils";
import { profilePlaceholder } from "utils/placeholders";

const StudentNotification = ({ notifications, id, anchorEl, isOpen, setClose, handleNotificationChange }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return notification.status === "read";
    if (tabValue === 2) return notification.status === "unread";
    return true;
  });

  const handleNotificationClick = (notifi) => {
    handleNotificationChange(notifi);
    setClose();  // Close the popover when a notification is clicked
  };

  return (
    <Popover
      id={id}
      open={isOpen}
      onClose={setClose}
      anchorEl={anchorEl}  
      anchorOrigin={{
        vertical: "top",  
        horizontal: "right",
         
      }}
      transformOrigin={{
        vertical: "top",  
        horizontal: "right",  
      }}
      sx={{
        marginTop: "75px",  // Adjust the margin for better positioning
      }}
    >
      <Box
        sx={{
          width: "492px",
          height: "500px",
          border: "1px solid #DEE2E6",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: "space-between", padding: "24px" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ color: "#495057", fontSize: "24px", fontWeight: 500, lineHeight: "32px" }}>
              Notifications
            </Typography>
            <Typography sx={{ color: "#495057", fontSize: "24px", fontWeight: 700, lineHeight: "32px" }}>
              ({filteredNotifications.length})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: "flex-start", gap: "20px" }}>
            <IconButton sx={{ width: "19px", height: "19px" }} onClick={setClose} component={Link} to={"/student/notifications"}>
              <LaunchSharpIcon sx={{ height: "19px", width: "19px", color: "#000000" }} />
            </IconButton>
            <IconButton sx={{ width: "11px", height: "11px" }} onClick={setClose}>
              <CloseSharpIcon sx={{ color: "#6C757D" }} />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ px: "24px", display: "flex", justifyContent: "flex-start" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab
              label="All"
              sx={{
                color: tabValue === 0 ? '#5611B1' : '#6C757D',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '22px',
                borderBottom: tabValue === 0 ? '2px solid #5611B1' : 'none',
              }}
            />
            <Tab
              label="Read"
              sx={{
                color: tabValue === 1 ? '#5611B1' : '#6C757D',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '22px',
                borderBottom: tabValue === 1 ? '2px solid #5611B1' : 'none',
              }}
            />
            <Tab
              label="Unread"
              sx={{
                color: tabValue === 2 ? '#5611B1' : '#6C757D',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '22px',
                borderBottom: tabValue === 2 ? '2px solid #5611B1' : 'none',
              }}
            />
          </Tabs>
        </Box>
        <Box sx={{ height: "39vh", overflow: 'auto' }}>
          {filteredNotifications?.map((notifi) => (
            <Box
              key={notifi?._id}
              onClick={() => handleNotificationClick(notifi)}  // Updated function call to handle click
              sx={{
                padding: "13px 24px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-between",
                cursor: "pointer",
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <Box sx={{ flexShrink: 0 }}>
                <Avatar
                  sx={{
                    width: "48px",
                    height: "48px",
                  }}
                  src={notifi?.student?.image ? getImageUrl(notifi?.student?.image) : profilePlaceholder}
                />
              </Box>
              <Box sx={{ flex: 1, marginLeft: "16px", maxWidth: "calc(100% - 130px)" }}>
                <Typography sx={{ color: "#343A40", fontSize: "16px", fontWeight: 500 }}>
                  {notifi?.title}
                </Typography>
                <Typography sx={{ color: "#6C757D", fontSize: "12px", fontWeight: 300 }}>
                  {notifi?.body}
                </Typography>
              </Box>
              <Box sx={{ flexShrink: 0, textAlign: 'right' }}>
                <Typography sx={{ color: "#86929D", fontSize: "9px", fontWeight: 700 }}>
                  33 Minutes Ago
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "end", p: "20px 16px 20px 20px" }}>
          
          <Button
  onClick={setClose}
  component={Link}
  to={"/student/notifications"}
  sx={{
    color: "#FBFBFB",  // Text color
    backgroundColor: "#5611B1",  // Initial background color
    borderRadius: "8px",  // Rounded corners
    boxShadow: "0px 6px 34px -8px #0D6EFD",  // Box shadow effect
    padding: "9px 24px",  // Padding inside the button
    ":hover": {
      backgroundColor: "#4B099D",  // Darker shade for hover effect
      // You can also modify other properties on hover if needed
    },
  }}
>
  View all Notifications
</Button>

        </Box>
      </Box>
    </Popover>
  );
}

export default StudentNotification;
