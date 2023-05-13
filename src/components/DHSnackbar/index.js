import { forwardRef } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const TransitionLeft = (props) => <Slide {...props} direction="left" />;

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function DHSnackbar({ onClose, open, severity, message }) {
  return (
    <Snackbar
      TransitionComponent={TransitionLeft}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={message} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

// Typechecking props of DHSnackbar
DHSnackbar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  severity: PropTypes.string,
  message: PropTypes.string,
};

DHSnackbar.defaultProps = {
  open: false,
  onClose: null,
  severity: "",
  message: "",
};
