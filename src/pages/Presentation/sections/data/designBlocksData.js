/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const gamesPrefix = "https://cdnb.artstation.com/p/assets/images/images";

export default [
  {
    title: "Games",
    description: "Games that are coded with the p5.js library",
    items: [
      {
        image: `${gamesPrefix}/058/781/929/large/daniel-hong-connect4.jpg`,
        name: "Connect 4",
        route: "/sections/games/connect4",
        description: "Single-player Connect 4 game with an AI",
      },
      {
        image: `${gamesPrefix}/058/802/027/large/daniel-hong-2048.jpg`,
        name: "2048",
        route: "/sections/games/2048",
        description: "2048 games with arrow keys as controls",
      },
      {
        image: `${gamesPrefix}/059/033/270/large/daniel-hong-pictureshuffle.jpg`,
        name: "Picture Shuffle",
        route: "/sections/games/pictureShuffle",
        description: "Unshuffle grid of tiles to reveal image",
      },
      {
        image: `${gamesPrefix}/059/228/363/large/daniel-hong-othello.jpg`,
        name: "Othello",
        route: "/sections/games/othello",
        description: "Local multiplayer Othello game",
      },
      {
        image: `${gamesPrefix}/074/821/045/large/daniel-hong-minesweeper.jpg`,
        name: "Minesweeper",
        route: "/sections/games/minesweeper",
        description: "Stratgegy mine avoidance game",
      },
    ],
  },
  {
    title: "Interpreters",
    description: "Interpreters for esoteric programming languages",
    items: [
      {
        image: `${gamesPrefix}/060/173/162/large/daniel-hong-brainf.jpg`,
        name: "BrainF",
        route: "/sections/interpreters/brainf",
        description: "Esoteric language comprised of 7 chars",
      },
      {
        image: `${gamesPrefix}/060/207/156/large/daniel-hong-grid.jpg`,
        name: "Mini Scheme",
        route: "/sections/interpreters/minischeme",
        description: "Subset of Racket Scheme",
      },
    ],
  },
  {
    title: "Artist Tools",
    description: "Utilitities for digiital art",
    items: [
      {
        image: `${gamesPrefix}/081/877/341/large/daniel-hong-rope-colored.jpg`,
        name: "Visualize Subdivisions",
        route: "/sections/artistTools/visualizeSubdivisions",
        description: "String art to visualize subdividing polygons",
      },
      {
        image: `${gamesPrefix}/083/386/926/large/daniel-hong-colorwheel.jpg`,
        name: "Color Code Converter",
        route: "/sections/artistTools/colorCodeConverter",
        description: "Convert between various color code formats",
      },
      {
        image: `${gamesPrefix}/083/414/321/large/daniel-hong-creeper.jpg`,
        name: "Image to Spreadsheet",
        route: "/sections/artistTools/imageToSpreadsheet",
        description: "Convert images to spreadsheets",
      },
    ],
  },
];
