/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Kit 2 React React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Navbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `name` key is used for the name of the route on the Navbar.
  2. The `icon` key is used for the icon of the route on the Navbar.
  3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  4. The `route` key is used to store the route location which is used for the react router.
  5. The `href` key is used to store the external links location.
  6. The `component` key is used to store the component of its route.
  7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
  8. The `description` key is used to define the description of
          a route under its name.
  9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
          you can set the columns amount based on this key.
  10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import Author from "layouts/pages/landing-pages/author";
import SignIn from "layouts/pages/authentication/sign-in";

// Sections
import NavTabs from "layouts/sections/navigation/nav-tabs";

// Games
import Connect4 from "projects/games/connect4";
import Twenty48 from "projects/games/2048";
import PictureShuffle from "projects/games/pictureShuffle";
import Othello from "projects/games/othello";

// Interpreters
import BrainF from "projects/interpreters/brainF";

const routes = [
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "landing pages",
        collapse: [
          {
            name: "about us",
            route: "/pages/landing-pages/about-us",
            component: <AboutUs />,
          },
          {
            name: "contact us",
            route: "/pages/landing-pages/contact-us",
            component: <ContactUs />,
          },
          {
            name: "author",
            route: "/pages/landing-pages/author",
            component: <Author />,
          },
        ],
      },
      {
        name: "account",
        collapse: [
          {
            name: "sign in",
            route: "/pages/authentication/sign-in",
            component: <SignIn />,
          },
        ],
      },
    ],
  },
  {
    name: "sections",
    icon: <Icon>view_day</Icon>,
    collapse: [
      {
        name: "games",
        description: "See all games",
        dropdown: true,
        collapse: [
          {
            name: "connect4",
            route: "/sections/games/connect4",
            component: <Connect4 />,
          },
          {
            name: "2048",
            route: "/sections/games/2048",
            component: <Twenty48 />,
          },
          {
            name: "pictureShuffle",
            route: "/sections/games/pictureShuffle",
            component: <PictureShuffle />,
          },
          {
            name: "othello",
            route: "/sections/games/othello",
            component: <Othello />,
          },
        ],
      },
      {
        name: "interpreters",
        description: "See all interpreters",
        dropdown: true,
        collapse: [
          {
            name: "brainF",
            route: "/sections/interpreters/brainF",
            component: <BrainF />,
          },
          {
            name: "whitespace",
            route: "/sections/interpreters/whitespace",
            component: <NavTabs />,
          },
        ],
      },
    ],
  },
  {
    name: "github",
    icon: <GitHubIcon />,
    href: "https://github.com/dhong9/dhong9.github.io",
  },
];

export default routes;
