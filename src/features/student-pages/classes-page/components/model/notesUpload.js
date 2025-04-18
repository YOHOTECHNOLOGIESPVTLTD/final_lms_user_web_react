import React, { useRef, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NotesUpload = ({ handleFileChange, updateClass }) => {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    file: Yup.mixed().required("File is required"),
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={
          <FileUploadOutlinedIcon
            sx={{
              color: "#5611B1",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "24px",
            }}
          />
        }
        sx={{
          border: "2px solid #5611B1",
          borderRadius: "24px",
          color: "#5611B1",
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: "24px",
          backgroundColor: "#5611B1",
          "&:hover": {
            backgroundColor: "#421096",  
          },
        }}
      >
        Notes
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Upload Notes</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ title: "", description: "", file: null }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const data = {
                notes: {
                  title: values?.title,
                  description: values?.description,
                  file: values.file,
                },
              };
              updateClass(data);
              handleClose();
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <Box sx={{ mb: 2 }}>
                  <Field name="title" as={TextField} label="Title" fullWidth />
                  <ErrorMessage
                    name="title"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Field
                    name="title"
                    as={TextField}
                    label="title"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      backgroundColor: "#fff",  
                      borderRadius: "8px", 
                      padding: "10px", 
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                    }}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Box>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="application/pdf"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => fileInputRef.current.click()}
                  sx={{ mb: 2 }}
                >
                  Select File
                </Button>
                <ErrorMessage
                  name="file"
                  component="div"
                  style={{ color: "red" }}
                />
                <DialogActions>
                  <Button onClick={handleClose} sx={{ fontSize: "12px",textTransform: "capitalize",
                  transition: "background-color 0.3s ease", 
                 "&:hover": {
                  backgroundColor: "#e0e0e0",  
                  }, }}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    sx={{ fontSize: "12px" ,textTransform: "capitalize",
                      transition: "background-color 0.3s ease", 
                      "&:hover": {
                        backgroundColor: "#5611B1", 
                        color: "#fff", 
                      },}}
                  >
                    Upload
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotesUpload;
