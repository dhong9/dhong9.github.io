// React
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/spreadsheetCells.png";

function ImageToSpreadsheet() {
  const [selectedFile, setSelectedFile] = useState("");

  const handleImageUpload = (e) => {
    const [file] = e.target.files;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      console.log("Event: ");
      console.log(e);
      setSelectedFile(reader.result);
    };
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
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
                  Image to Spreadsheet
                </MKTypography>
              </MKBox>
              <MKBox component="form" role="form">
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
                  <MKBox mb={2}>
                    <MKTypography variant="p" fontWeight="regular" color="black" mt={1}>
                      {selectedFile || "No file selected"}
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default ImageToSpreadsheet;
