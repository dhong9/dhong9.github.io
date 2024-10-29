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
import visualizeSubdivisionsCode from "projects/artistTools/visualizeSubdivisions/code";

// p5
import Sketch from "react-p5";

function VisualizeSubdivisions() {
  // Form elements
  const [coords, setCoords] = useState([
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(coords);
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
          coords.map((_, row) => (
            <MKBox mb={2} key={row}>
              <MKInput
                type="number"
                label={`x${-~row}`}
                onChange={(e) => {
                  const copy = [...coords];
                  copy[row][0] = +e.target.value;
                  setCoords(copy);
                }}
              />
              <MKInput
                type="number"
                label={`y${-~row}`}
                onChange={(e) => {
                  const copy = [...coords];
                  copy[row][1] = +e.target.value;
                  setCoords(copy);
                }}
              />
            </MKBox>
          )),
        ]}
        <MKBox mt={3} mb={1} textAlign="center">
          <MKButton variant="gradient" color="info" onClick={handleSubmit} component="h2" fullWidth>
            plot
          </MKButton>
        </MKBox>
      </MKBox>

      <View title="Visualize Subdivisions" code={visualizeSubdivisionsCode} height="40rem">
        <Sketch setup={setup} draw={draw} />
      </View>
    </BaseLayout>
  );
}

export default VisualizeSubdivisions;
