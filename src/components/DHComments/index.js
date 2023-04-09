// @mui material components
import Grid from "@mui/material/Grid";

// Sections components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

export default function DHComments() {
  return (
    <div>
      <MKBox px={3} py={{ xs: 2, sm: 6 }}>
        <MKTypography variant="h2" mb={1}>
          Leave a Comment!
        </MKTypography>
        <MKTypography variant="body1" color="text" mb={2}>
          We&apos;d like to hear from you.
        </MKTypography>
      </MKBox>
      <MKBox pt={0.5} pb={3} px={3}>
        <Grid container>
          <Grid item xs={12} pr={1} mb={6}>
            <MKInput
              variant="standard"
              label="Your message"
              placeholder="I want to say that..."
              InputLabelProps={{ shrink: true }}
              fullWidth
              multiline
              rows={6}
            />
          </Grid>
        </Grid>
      </MKBox>
    </div>
  );
}
