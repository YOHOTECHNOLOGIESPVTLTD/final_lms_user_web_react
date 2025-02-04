import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@emotion/react";
import { Email as EmailIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  Typography,
  FormHelperText,
  InputAdornment,
  IconButton,
  Grid,
  Paper,
  Container,
  Divider,
} from "@mui/material";
import { useAtom } from "jotai";
import { studentLoginStepAtom } from "store/atoms/authAtoms";
import { Link } from "react-router-dom/dist";
import * as yup from "yup";
import { useFormik } from "formik";
import { useStudentLogin } from "../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getErrorMessage } from "utils/common/error";
import LZString from "lz-string";
import { ForgetPassword_Step, Login_Step, Otp_Step } from "lib/constants";
import { useSpinner } from "context/SpinnerProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";

// Validation schema
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginForm = () => {
  const theme = useTheme();
  const studentLogin = useStudentLogin();
  const navigate = useNavigate();
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const { showSpinner, hideSpinner } = useSpinner();
  const [showPassword, setShowPassword] = useState(false);

  // Formik hook for handling form state
  const formik = useFormik({
    initialValues: {
      email: "student@gmail.com",
      password: "Wecandoit@2024",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        showSpinner();
        const response = await studentLogin(values);
        if (response.success) {
          navigate("/student/home");
        }
      } catch (error) {
        hideSpinner();
        toast.error(getErrorMessage(error));
      } finally {
        hideSpinner();
      }
    },
  });

  const handleForgetPassword = (e) => {
    e.preventDefault();
    setLoginStep(ForgetPassword_Step);
  };

  return (
    <Box>
      <Box
        sx={{
          px: { sm: 6, xs: 1 },
          mt: { sm: "15vh", xs: 5 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "poppins",
            textAlign: "justify",
            fontSize: 22,
            mb: 5,
            mr:10,
            color: theme.palette.dark.main,
            textAlign : "center",
          }}
        >
          Join & Connect the Fastest Growing Online Community
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          style={{ minWidth: "380px", maxWidth: "400px" }}
          
        >
          <Box mb={5} mt={5} mr={10}>
            <FormControl
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
            >
              <InputLabel>Email or Username</InputLabel>
              <Input
                id="user-name"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box mb={5} mt={10} mr={10}>
            <FormControl
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
            >
              <InputLabel>Password</InputLabel>
              <Input
                variant={"filled"}
                type={ showPassword ?  "text" : "password"}
                name="password"
                id="password"
                placeholder=".........."
                sx={{ minWidth: "300px"}}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end" >
                    <IconButton onClick={() => setShowPassword(!showPassword)} >
                       {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                required
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              gap: 3,
              mt: 2,
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ alignItems: "center", display: "none" }}>
              <Checkbox
                sx={{
                  color: "#E5D2FF",
                  "&.Mui-checked": {
                    color: "#5611B1",
                  },
                }}
              />
              <Typography sx={{ fontSize: 12, color: "#757575" }}>
                I accept the terms & conditions
              </Typography>
            </Box>
            <Button
  variant="contained"
  size="large"
  sx={{
    borderRadius: 28, // Rounded corners
    background: "linear-gradient(90deg, #6A11CB 0%, #2575FC 100%)", // Gradient background
    color: "#FFFFFF", // Text color
    fontWeight: 600, // Bold text
    fontSize: "16px", // Font size
    textTransform: "none", // Prevent uppercase text transformation
    padding: "12px 24px", // Adjusted padding for a better look
    my: "20px", // Vertical margin
    mr:"30px",
    transition: "all 0.3s ease-in-out", // Smooth hover effect
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
    "&:hover": {
      background: "linear-gradient(90deg, #2575FC 0%, #6A11CB 100%)", // Reverse gradient on hover
      transform: "scale(1.05)", // Slightly enlarges the button
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
    },
  }}
  type="submit"
>
  Sign in
</Button>

          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10,mr:10, gap: "5px" }}>
            <Typography sx={{ fontSize: "0.9375rem",fontWeight: 500,lineHeight: 1.375, color: "#676b7b" }} >
              Forget Password?
              </Typography>
              <Link
  to="#"
  style={{
    fontSize: "0.9375rem", // Adjusted font size for clarity
    fontWeight: 500, // Semi-bold text
    lineHeight: 1.375, // Adjusted line height for better spacing
    color: "#666cff", // Default link color
    textDecoration: "none", // Removes underline
    transition: "color 0.3s ease, text-shadow 0.3s ease", // Smooth hover effects
  }}
  onClick={handleForgetPassword}
  onMouseEnter={(e) => {
    e.target.style.color = "#4c55eb"; // Lighter shade on hover
    e.target.style.textShadow = "0px 2px 4px rgba(102, 108, 255, 0.5)"; // Subtle shadow effect
  }}
  onMouseLeave={(e) => {
    e.target.style.color = "#666cff"; // Revert to original color
    e.target.style.textShadow = "none"; // Remove shadow
  }}
>
  Get it
</Link>

          </Box>
          <Box sx={{ mt: 12,mr:10, display: "flex", alignItems: "center", gap: 1,ml:15, }}>
            <span>
              <InfoIcon />
            </span>
            <Typography
              sx={{
                fontSize: 12,
                color: "#828282",
                fontWeight: 400,
                lineHeight: "32px",
            
              }}
            >
              Enter the mail ID & Password that given by LMS
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;

