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
        count: 4,
        route: "/sections/games/connect4",
        description: "Single-player Connect 4 game with an AI",
      },
      {
        image: `${gamesPrefix}/058/802/027/large/daniel-hong-2048.jpg`,
        name: "2048",
        count: 14,
        route: "/sections/games/2048",
      },
      {
        image: `${gamesPrefix}/059/033/270/large/daniel-hong-pictureshuffle.jpg`,
        name: "Picture Shuffle",
        count: 8,
        route: "/sections/games/pictureShuffle",
      },
      {
        image: `${gamesPrefix}/059/228/363/large/daniel-hong-othello.jpg`,
        name: "Othello",
        count: 1,
        route: "/sections/games/othello",
      },
      {
        image: `${gamesPrefix}/074/821/045/large/daniel-hong-minesweeper.jpg`,
        name: "Minesweeper",
        count: 1,
        route: "/sections/games/minesweeper",
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
        count: 4,
        route: "/sections/interpreters/brainf",
      },
      {
        image: `${gamesPrefix}/060/207/156/large/daniel-hong-grid.jpg`,
        name: "Mini Scheme",
        count: 2,
        route: "/sections/interpreters/minischeme",
      },
    ],
  },
];
