/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { useState } from "react";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import MKAvatar from "components/MKAvatar";

// DH React components
import DHSnackbar from "components/DHSnackbar";

// Services
import { updateProfileImage } from "services/accountsService";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Image
import defaultProfileImage from "assets/images/default_profile.jpg";

function UploadImage({ userId }) {
  // User could not have gotten to this component without a regular login

  const SIZE_LIMIT = 4 * 1024 * 1024;
  const [selectedFile, setSelectedFile] = useState(defaultProfileImage);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [uploadSeverity, setUploadSeverity] = useState("info");
  const [uploadMessage, setUploadMessage] = useState("");
  const [formError, setFormError] = useState("");

  const handleImageUpload = (e) => {
    const [file] = e.target.files;

    // Check file size limit
    const fileSize = file.size;
    if (fileSize > SIZE_LIMIT) {
      // Size limit exceeded
      setUploadSeverity("error");
      setUploadMessage("Image file too large ( > 4MB )");
      setSnackbarOpen(true);
      setFormError("Image file too large ( > 4MB )");
      return;
    }

    setFormError("");

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      console.log("Event: ");
      console.log(e);
      setSelectedFile(reader.result);
    };
    console.log(selectedFile);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") {
      setSnackbarOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      setFormError("");
      updateProfileImage(userId, selectedFile, console.log, console.error);
    } else {
      // User did not select an image
      setFormError("Please select an image");
    }
  };

  return (
    <>
      <DHSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={uploadSeverity}
        message={uploadMessage}
      />
      <MKBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Upload Image
        </MKTypography>
      </MKBox>
      <MKBox pt={4} pb={3} px={3}>
        <MKBox component="form" role="form">
          <MKBox mb={2} justifyContent="center" display="flex">
            <MKAvatar src={selectedFile} alt="Profile picture" size="xxl" />
          </MKBox>
          <MKBox mb={2}>
            <MKButton variant="contained" component="label">
              Select Image
              <input
                id="contained-button-file"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                multiple
                hidden
              />
            </MKButton>
          </MKBox>
        </MKBox>
        {formError && (
          <MKBox display="flex" alignItems="center" ml={-1}>
            <span style={{ color: "red", fontSize: "10pt" }}>{formError}</span>
          </MKBox>
        )}
        <MKBox mt={4} mb={1}>
          <MKButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
            submit
          </MKButton>
        </MKBox>
      </MKBox>
    </>
  );
}

// Typechecking props of UploadImage
UploadImage.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UploadImage;
