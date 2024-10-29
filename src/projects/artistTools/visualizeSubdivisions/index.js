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

function VisualizeSubdivisions() {
  return (
    <BaseLayout
      title="Games"
      breadcrumb={[
        { label: "Artist Tools", route: "/sections/artistTools/2048" },
        { label: "Visualize Subdivisions" },
      ]}
    >
      <View title="Visualize Subdivisions" code={visualizeSubdivisionsCode} height="40rem"></View>
    </BaseLayout>
  );
}

export default VisualizeSubdivisions;
