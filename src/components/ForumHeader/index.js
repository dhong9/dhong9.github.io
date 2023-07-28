import React from "react";

// @mui material components
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

export default function ForumHeader(props) {
  const { categories } = props;

  return (
    <Toolbar
      component="nav"
      variant="dense"
      sx={{ justifyContent: "space-between", overflowX: "auto" }}
    >
      {categories.map(({ id, name }) => (
        <Link
          color="inherit"
          noWrap
          key={id}
          variant="body2"
          href={"/doughnutRider/categories/" + id}
          sx={{ p: 1, flexShrink: 0 }}
        >
          {name}
        </Link>
      ))}
    </Toolbar>
  );
}

// Typechecking props of ForumHeader
ForumHeader.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

ForumHeader.defaultProps = {
  categories: [],
  title: "",
};
