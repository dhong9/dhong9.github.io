/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Minesweeper code
import minesweeperCode from "projects/games/minesweeper/code";

function Minesweeper() {
  return (
    <BaseLayout
      title="Games"
      breadcrumb={[
        { label: "Games", route: "/sections/games/minesweeper" },
        { label: "Minesweeper" },
      ]}
    >
      <View title="Minesweeper" code={minesweeperCode} height="40rem"></View>
    </BaseLayout>
  );
}

export default Minesweeper;
