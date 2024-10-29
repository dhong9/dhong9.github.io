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

// Visualize subdivisions code
import visualizeSubdivisionsCode from "projects/artistTools/visualizeSubdivisions/code";

// p5
import Sketch from "react-p5";

function VisualizeSubdivisions() {
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
        { label: "Artist Tools", route: "/sections/artistTools/2048" },
        { label: "Visualize Subdivisions" },
      ]}
    >
      <View title="Visualize Subdivisions" code={visualizeSubdivisionsCode} height="40rem">
        <Sketch setup={setup} draw={draw} />
      </View>
    </BaseLayout>
  );
}

export default VisualizeSubdivisions;
