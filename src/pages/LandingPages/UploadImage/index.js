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

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

function UploadImage() {
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    console.log(url);
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
            <MKButton variant="contained" component="span">
              Select Image
            </MKButton>
          </MKBox>
          <MKBox mb={2}>
            <MKInput
              type="file"
              accept="image/*"
              label="Image"
              onChange={handleImageUpload}
              fullWidth
              multiple
            />
          </MKBox>
        </MKBox>
      </MKBox>
    </>
  );
}

export default UploadImage;
