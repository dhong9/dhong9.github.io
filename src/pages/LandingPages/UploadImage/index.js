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
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

function UploadImage() {
  const [imagePath, setImagePath] = useState("");

  const handleImageUpload = (e) => {
    setImagePath(e.target.value);
    console.log(imagePath);
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
          <MKBox mb={2}>
            <MKInput type="file" label="Image" onChange={handleImageUpload} fullWidth />
          </MKBox>
        </MKBox>
      </MKBox>
    </>
  );
}

export default UploadImage;
