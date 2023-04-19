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

function BrainF() {
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
        <FormControlLabel control={<Checkbox />} label="Visualize" />
      </FormGroup>
    </BaseLayout>
  );
}

export default BrainF;
