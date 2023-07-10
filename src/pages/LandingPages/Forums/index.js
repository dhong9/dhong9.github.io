import { useEffect, useState } from "react";

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import ForumHeader from "components/ForumHeader";

// Categories service
import { getCategories } from "services/categoriesService";

function Forums() {
  const [categories, setCategories] = useState([]);

  // Get categories on page load
  useEffect(() => {
    getCategories(({ data: { results } }) => {
      setCategories(results);
    });
  }, []);

  return (
    <BaseLayout
      title="Doughnut Rider"
      breadcrumb={[{ label: "Doughnut Rider", route: "/doughnutRider" }]}
    >
      <ForumHeader categories={categories} />
    </BaseLayout>
  );
}

export default Forums;
