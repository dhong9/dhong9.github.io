// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// BrainF code
import brainFCode from "projects/interpreters/brainF/code";

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
        <div>
          <h1>BrainF</h1>
        </div>
      </View>
    </BaseLayout>
  );
}

export default BrainF;
