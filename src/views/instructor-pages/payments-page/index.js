// import React, { useEffect } from "react";
// import { Box, Typography, useMediaQuery } from "@mui/material";
// import { instructorPaymentCardData } from "data/instructor";
// import PaymentCard from "features/instructor-pages/payments-page/components/paymentCard";
// import { PaymentBg } from "utils/images";
// import SalaryDetailsTable from "features/instructor-pages/payments-page/components/salaryTable";
// import { useTabResponsive } from "utils/tabResponsive";
// import updateStaffSalaries from "features/instructor-pages/payments-page/redux/thunks";
// import { useDispatch, useSelector } from "react-redux";
// import { selectInstructorPayments } from "features/instructor-pages/payments-page/redux/selectors";
// import { useSpinner } from "context/SpinnerProvider";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// const months = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const PaymentInterface = () => {
//   const dispatch = useDispatch();
//   const salaries = useSelector(selectInstructorPayments);
//   const { tabView } = useTabResponsive();
//   const { showSpinner, hideSpinner } = useSpinner();

 
//   const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1024px)");

//   const getSalaryDetails = async () => {
//     try {
//       showSpinner();
//       dispatch(updateStaffSalaries());
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     } finally {
//       hideSpinner();
//     }
//   };

//   useEffect(() => {
//     getSalaryDetails();
//   }, [dispatch]);

//   return (
//     <Box
//       sx={{
//         mx: tabView ? "0px" : isTablet ? "20px" : "40px",
//         mt: tabView ? "80px" : "40px",
//         mb: "20px",
//         borderRadius: tabView ? "0px" : "25px",
//         boxShadow: tabView ? "none" : "0px 4px 12px rgba(0, 0, 0, 0.1)",
//         border: "1px solid rgba(0, 0, 0, 0.1)",
//         overflow: "hidden",
//         backgroundColor: "#fff",
//       }}
//     >
//       <Box
//         sx={{
//           backgroundImage: `url(${PaymentBg})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           width: "100%",
//         }}
//       >
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: isTablet ? "column" : "row",
//             p: isTablet ? "30px" : "40px",
//             justifyContent: "space-between",
//             alignItems: isTablet ? "center" : "flex-start",
//             textAlign: isTablet ? "center" : "left",
//           }}
//         >
//           <Typography
//             sx={{
//               color: "#151010",
//               fontSize: isTablet ? "24px" : "28px",
//               fontWeight: "700",
//               lineHeight: "32px",
//             }}
//           >
//             Payment
//           </Typography>

//           {/* Raise Ticket Section */}
//           <Box sx={{ textAlign: isTablet ? "center" : "end" }}>
//             <Typography
//               sx={{
//                 color: "#0D6EFD",
//                 fontSize: "16px",
//                 fontWeight: "700",
//                 lineHeight: "22px",
//                 textDecoration: "underline",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s, color 0.3s",
//                 "&:hover": {
//                   backgroundColor: "rgba(13, 110, 253, 0.1)",
//                   color: "#084298",
//                   textDecoration: "none",
//                 },
//                 "&:active": {
//                   backgroundColor: "rgba(13, 110, 253, 0.2)",
//                 },
//               }}
//               component={Link}
//               to={"/instructor/tickets?create=true"}
//             >
//               Raise A Ticket?
//             </Typography>
//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 fontWeight: "400",
//                 color: "#495057",
//                 lineHeight: "24px",
//               }}
//             >
//               For any Queries, Please Raise your Ticket
//             </Typography>
//           </Box>
//         </Box>

//         {/* Payment Cards */}
//         <Box
//           sx={{
//             display: "flex",
//             p: tabView ? "20px" : isTablet ? "30px" : "40px",
//             gap: "46px",
//             flexWrap: "wrap",
//             justifyContent: isTablet ? "center" : "flex-start",
//           }}
//         >
//           {instructorPaymentCardData.map((i) => (
//             <PaymentCard
//               title={i.title}
//               amount={i.amount}
//               icon={i.icon}
//               key={i.title}
//               style={i.style}
//               sx={{
//                 transition: "transform 0.2s ease-in-out",
//                 cursor: "pointer",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                 },
//                 "&:active": {
//                   transform: "scale(1.02)",
//                 },
//               }}
//             />
//           ))}
//         </Box>

//         {/* Salary Table */}
//         <SalaryDetailsTable data={salaries} months={months} />
//       </Box>
//     </Box>
//   );
// };

// export default PaymentInterface;

import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery,  Stack} from "@mui/material";
import { instructorPaymentCardData } from "data/instructor";
import PaymentCard from "features/instructor-pages/payments-page/components/paymentCard";
import { PaymentBg } from "utils/images";
import PaymentIcon from "@mui/icons-material/Payment";
import SalaryDetailsTable from "features/instructor-pages/payments-page/components/salaryTable";
import { useTabResponsive } from "utils/tabResponsive";
import updateStaffSalaries from "features/instructor-pages/payments-page/redux/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorPayments } from "features/instructor-pages/payments-page/redux/selectors";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Joyride from "react-joyride";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const PaymentInterface = () => {
  const dispatch = useDispatch();
  const salaries = useSelector(selectInstructorPayments);
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();
  const [runTour, setRunTour] = useState(true); // Run tour by default

  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1024px)");

  const getSalaryDetails = async () => {
    try {
      showSpinner();
      dispatch(updateStaffSalaries());
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    getSalaryDetails();
  }, [dispatch]);

  // Guided Tour Steps
  const tourSteps = [
    // {
    //   target: "#payment-header",
    //   content: "This is the Payment section where you can view your earnings.",
    //   placement: "top",
    //   disableBeacon: true,
    // },
    {
      target: "#raise-ticket",
      content: "If you have any queries, you can raise a ticket here.",
      placement: "top",
      disableBeacon: true,
    },
    {
      target: "#payment-cards",
      content: "Here you can see the different payment breakdowns.",
      placement: "top",
      disableBeacon: true,
    },
    {
      target: "#salary-table",
      content: "This table displays your salary details by month. Click the 'Download Slip' button to download your salary slip.",
      placement: "top",
      disableBeacon: true,
    },
  ];

  return (
    <>
      {/* Joyride Guided Tour */}
      {/* <Joyride
        steps={tourSteps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        disableOverlayClose={true}
        spotlightClicks={true}
        styles={{ options: { zIndex: 10000 } }}
      /> */}

      {/* Main Container */}
      <Box
        sx={{
          mx: tabView ? "0px" : isTablet ? "20px" : "40px",
          mt: tabView ? "80px" : "40px",
          mb: "20px",
          borderRadius: tabView ? "0px" : "25px",
          boxShadow: tabView ? "none" : "0px 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {/* Background Section */}
        <Box
          sx={{
            backgroundImage: `url(${PaymentBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        >
          {/* Header Section */}
          <Box
            id="payment-header"
            sx={{
              display: "flex",
              flexDirection: isTablet ? "column" : "row",
              p: isTablet ? "30px" : "40px",
              justifyContent: "space-between",
              alignItems: isTablet ? "center" : "flex-start",
              textAlign: isTablet ? "center" : "left",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
  <PaymentIcon sx={{ color: "#151010", fontSize: isTablet ? 28 : 32 }} />
  <Typography
    sx={{
      color: "#151010",
      fontSize: isTablet ? "24px" : "28px",
      fontWeight: "700",
      lineHeight: "32px",
    }}
  >
    Payment
  </Typography>
</Stack>

            {/* Raise Ticket Section */}
            {/* <Box id="raise-ticket" sx={{ textAlign: isTablet ? "center" : "end" }}>
              <Typography
                sx={{
                  color: "#0D6EFD",
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "22px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                component={Link}
                to={"/instructor/tickets?create=true"}
              >
                Raise A Ticket?
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "#495057",
                  lineHeight: "24px",
                }}
              >
                For any queries, please raise your ticket here.
              </Typography>
            </Box> */}
          </Box>

          {/* Payment Cards Section */}
          <Box
            id="payment-cards"
            sx={{
              display: "flex",
              p: tabView ? "20px" : isTablet ? "30px" : "40px",
              gap: "46px",
              flexWrap: "wrap",
              justifyContent: isTablet ? "center" : "flex-start",
            }}
          >
            {instructorPaymentCardData.map((i) => (
              <PaymentCard
                title={i.title}
                amount={i.amount}
                icon={i.icon}
                key={i.title}
                style={i.style}
              />
            ))}
          </Box>

          {/* Salary Table Section */}
          <Box id="salary-table" sx={{ p: "30px" }}>
            <SalaryDetailsTable data={salaries} months={months} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PaymentInterface;
