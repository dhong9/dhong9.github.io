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

// Image
import defaultProfileImage from "assets/images/default_profile.jpg";

function UploadImage() {
  // User could not have gotten to this component without a regular login

  const [selectedFile, setSelectedFile] = useState(defaultProfileImage);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      console.log("Event: ");
      console.log(e);
      setSelectedFile(reader.result);
    };
    console.log(selectedFile);
  };

  return (
    <>
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
            <MKAvatar src={defaultProfileImage} alt="Profile picture" size="xxl" />
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
      </MKBox>
    </>
  );
}

export default UploadImage;
