/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2023 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React examples
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function DeleteAccount() {
  return (
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
              Are You Sure?
            </MKTypography>
          </MKBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DeleteAccount;
