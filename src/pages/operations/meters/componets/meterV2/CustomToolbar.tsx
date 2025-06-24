import {
  Box,
  Button,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router";
import { getStyles } from "../../../../../styles/component/CustomToolbar.styles";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import axios from "axios"; // Import axios for making API calls

const CustomToolbar = ({
  onUpload,
  searchQuery,
  setSearchQuery,
  onSearch,
}: {
  onUpload: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const styles = getStyles(theme, isSmallScreen);
  const { ManageCreateMeterV2 } = useSelector(
    (state: RootState) => state.permissions
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the hidden file input
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the selected file
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility
  const [uploading, setUploading] = useState(false); // Track if the file is being uploaded

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file); // Store the selected file
      setOpenDialog(true); // Show the confirmation dialog
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (selectedFile) {
      // Immediately show that the file is uploading
      setUploading(true);

      console.log("Selected File:", selectedFile); // Debugging: Check selected file

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        // Debugging: Ensure we're about to make the correct API request
        console.log("FormData:", formData);

        // Send the file to the server without waiting for the response
        const uploadPromise = axios.post(
          "https://husknigerianotificationserviceqa-fxbeakdecehtetcz.southafricanorth-01.azurewebsites.net/send-bulk-sms", // Replace with your API URL
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure proper content type for file uploads
            },
          }
        );

        // Immediately show success feedback
        setOpenDialog(false); // Close the dialog
        alert("File uploaded successfully!"); // Show success alert (you can change this to a toast or modal)

        // Handle the response once it comes in
        uploadPromise
          .then((response) => {
            console.log("Upload Response:", response.data); // Log the response from the server
          })
          .catch((error) => {
            console.error("Upload Error:", error); // Log any errors
          });

      } catch (error) {
        // In case of error during file upload
        setUploading(false);
        console.error("Error during file upload:", error); // Debugging: Check for errors
        setOpenDialog(false); // Close dialog
        alert("File upload failed. Please try again!"); // Show error alert
      }
    } else {
      console.log("No file selected"); // Debugging: Ensure file is selected
    }
  };

  // Trigger file input when the Upload button is clicked
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the hidden file input
    }
  };

  return (
    <Box sx={styles.toolbarContainer}>
      <Stack
        direction={styles.leftStack.direction as any}
        spacing={styles.leftStack.spacing}
        flexWrap={styles.leftStack.flexWrap as any}
      >
        <TextField
          placeholder="Search here...."
          size="small"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          sx={styles.textField}
        />
        <Button
          variant="contained"
          onClick={onSearch}
          sx={{
            ...styles.customButton,
            height: "34px",
            mt: isSmallScreen ? 0.5 : "10px",
          }}
        >
          Search
        </Button>
      </Stack>

      <Stack
        direction={styles.rightStack.direction as any}
        spacing={styles.rightStack.spacing}
        sx={{
          mt: styles.rightStack.mt,
          alignSelf: styles.rightStack.alignSelf,
        }}
      >
        {ManageCreateMeterV2 && (
          <Button
            variant="contained"
            onClick={() => navigate("/add-Meter")}
            sx={styles.customButton}
          >
            + Add
          </Button>
        )}
        {/* Upload button */}
        <Button
          variant="outlined"
          onClick={handleUploadClick} // Trigger file input when clicked
          sx={styles.customButton}
        >
          Upload
        </Button>

        {/* Hidden file input element */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv, .xlsx" // Only allow CSV and Excel files
          onChange={handleFileSelect} // Handle file selection
          style={{ display: "none" }} // Hide the input
        />
      </Stack>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)} // Close dialog when the user clicks outside or on the close button
      >
        <DialogTitle>Confirm File Upload</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to upload the file:</p>
          <strong>{selectedFile?.name}</strong> {/* Show the selected file name */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleFileUpload}
            color="primary"
            disabled={uploading} // Disable the button while uploading
          >
            {uploading ? (
              <CircularProgress size={24} color="inherit" /> // Show loading indicator
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default React.memo(CustomToolbar);
