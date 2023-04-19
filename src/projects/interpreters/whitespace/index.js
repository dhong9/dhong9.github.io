// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// WhiteSpace code
import whitespaceCode from "projects/interpreters/whitespace/code";

// Generic interpreter
import Interpreter from "../interpreter";

// Form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MKButton from "components/MKButton";

import React, { useState } from "react";

function WhiteSpace() {
  const [visualize, setVisualize] = useState(false);

  const handleChange = (event) => {
    setVisualize(event.target.checked);
  };

  return (
    <BaseLayout
      title="Page Headers"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/page-sections/page-headers" },
        { label: "Page Headers" },
      ]}
    >
      <View title="Header 1" code={whitespaceCode} height="40rem">
        <Interpreter />
      </View>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={visualize} onChange={handleChange} />}
          label="Visualize"
        />
        <MKButton type="submit" variant="gradient" color="info">
          Show value
        </MKButton>
      </FormGroup>
    </BaseLayout>
  );
}

export default WhiteSpace;
