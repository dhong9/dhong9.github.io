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
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("x1:", x1);
    console.log("y1:", y1);
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
        <MKBox mb={2}>
          <MKInput type="number" label="x1" onChange={(e) => setX1(e.target.value)} fullWidth />
          <MKInput type="number" label="y1" onChange={(e) => setY1(e.target.value)} fullWidth />
        </MKBox>
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
