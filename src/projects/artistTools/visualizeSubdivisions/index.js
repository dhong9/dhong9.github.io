/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React
import { useState } from "react";

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Visualize subdivisions code
import { buildStringArtObject } from "projects/artistTools/visualizeSubdivisions/VisualizeSubdivisions_Util";
import visualizeSubdivisionsCode from "projects/artistTools/visualizeSubdivisions/code";

// p5
import Sketch from "react-p5";

function VisualizeSubdivisions() {
  // Form elements
  const [coords, setCoords] = useState([
    [20, 100],
    [150, 350],
    [250, 120],
  ]);
  const [subdivisions, setSubdivisions] = useState(2);

  const stringArtObject = buildStringArtObject(coords, subdivisions);

  const addPoint = (e) => {
    e.preventDefault();
    setCoords([...coords, [0, 0]]);
  };

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    // Canvas dimension is based on div's size
    const visualizeSubdivisions = document.querySelector(".codeOutput");
    p5.createCanvas(visualizeSubdivisions.clientWidth, visualizeSubdivisions.clientHeight).parent(
      canvasParentRef
    );
  };

  const draw = (p5) => {
    p5.background(200);

    const { polyPoints, subdivPointsLine, netLines, intersectionPoints } = stringArtObject;

    p5.strokeWeight(10);
    p5.stroke(0, 255, 77);
    for (let i = 0; i < polyPoints.length - 1; i++) {
      const [x1, y1] = polyPoints[i];
      const [x2, y2] = polyPoints[i + 1];
      p5.line(x1, y1, x2, y2);
    }
    const [x1, y1] = polyPoints.at(-1);
    const [x2, y2] = polyPoints[0];
    p5.line(x1, y1, x2, y2);

    p5.strokeWeight(5);
    p5.stroke(255, 187, 0);
    for (const netLine of netLines) {
      p5.line(...netLine);
    }

    p5.stroke(98, 0, 255);
    for (const subdivPointsL of subdivPointsLine) {
      for (const [x, y] of subdivPointsL) {
        p5.point(x, y);
      }
    }

    p5.strokeWeight(20);
    p5.stroke(255, 0, 98);
    for (const [x, y] of polyPoints) {
      p5.point(x, y);
    }

    // Draw resulting polygon
    p5.strokeWeight(10);
    p5.stroke(0, 179, 255);
    for (let i = 0; i < intersectionPoints.length - 1; i++) {
      p5.line(
        intersectionPoints[i][0],
        intersectionPoints[i][1],
        intersectionPoints[i + 1][0],
        intersectionPoints[i + 1][1]
      );
    }
  };

  return (
    <BaseLayout
      title="Artist Tools"
      breadcrumb={[
        { label: "Artist Tools", route: "/sections/artistTools/visualizeSubdivisions" },
        { label: "Visualize Subdivisions" },
      ]}
    >
      {/* Input points */}
      <MKBox component="form" role="form">
        {[
          coords.map((coord, row) => (
            <MKBox mb={2} key={row}>
              <MKInput
                type="number"
                label={`x${-~row}`}
                onChange={(e) => {
                  const copy = [...coords];
                  copy[row][0] = +e.target.value;
                  setCoords(copy);
                }}
                value={coord[0]}
              />
              <MKInput
                type="number"
                label={`y${-~row}`}
                onChange={(e) => {
                  const copy = [...coords];
                  copy[row][1] = +e.target.value;
                  setCoords(copy);
                }}
                value={coord[1]}
              />
            </MKBox>
          )),
        ]}

        {/* Buttons to add points */}
        <MKBox mt={3} mb={1}>
          <MKButton variant="gradient" color="info" onClick={addPoint} component="h2">
            add point
          </MKButton>
        </MKBox>

        <MKBox mb={2}>
          <MKInput
            type="number"
            label="Subdivisions"
            onChange={(e) => setSubdivisions(+e.target.value)}
            value={subdivisions}
          />
        </MKBox>
      </MKBox>

      <View title="Visualize Subdivisions" code={visualizeSubdivisionsCode} height="40rem">
        <Sketch setup={setup} draw={draw} />
      </View>
    </BaseLayout>
  );
}

export default VisualizeSubdivisions;
