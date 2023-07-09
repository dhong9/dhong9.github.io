import React from "react";

// @mui material components
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

export default function ForumHeader(props) {
  const { sections } = props;

  return (
    <Toolbar
      component="nav"
      variant="dense"
      sx={{ justifyContent: "space-between", overflowX: "auto" }}
    >
      {sections.map((section) => (
        <Link
          color="inherit"
          noWrap
          key={section.title}
          variant="body2"
          href={section.url}
          sx={{ p: 1, flexShrink: 0 }}
        >
          {section.title}
        </Link>
      ))}
    </Toolbar>
  );
}

// Typechecking props of ForumHeader
ForumHeader.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
};

ForumHeader.defaultProps = {
  sections: [],
  title: "",
};
