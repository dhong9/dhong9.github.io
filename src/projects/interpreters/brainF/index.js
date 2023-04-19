// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// BrainF code
import brainFCode from "projects/interpreters/brainF/code";

// Generic interpreter
import Interpreter from "../interpreter";

// Form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";

import React, { useState } from "react";

function BrainF() {
  const [visualize, setVisualize] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");

  const handleChange = (event) => {
    setVisualize(event.target.checked);
  };

  const showOutput = () => {
    setCodeOutput("hello, world!");
  };

  return (
    <BaseLayout
      title="Page Headers"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/page-sections/page-headers" },
        { label: "Page Headers" },
      ]}
    >
      <View title="Header 1" code={brainFCode} height="40rem">
        <Interpreter />
      </View>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={visualize} onChange={handleChange} />}
          label="Visualize"
        />
        <MKButton onClick={showOutput} type="submit" variant="gradient" color="info">
          Show value
        </MKButton>
      </FormGroup>

      {codeOutput && (
        <MKBox
          borderRadius="lg"
          shadow="lg"
          p={2}
          mt={2}
          component="div"
          sx={{ display: "inline" }}
        >
          {codeOutput}
        </MKBox>
      )}
    </BaseLayout>
  );
}

export default BrainF;
