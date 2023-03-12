// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// WhiteSpace code
import whitespaceCode from "projects/interpreters/whitespace/code";

// Generic interpreter
import Interpreter from "../interpreter";

function BrainF() {
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
    </BaseLayout>
  );
}

export default BrainF;
