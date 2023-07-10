import { useEffect, useState } from "react";

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import ForumHeader from "components/ForumHeader";

// Services
import { getCategories } from "services/categoriesService";
import { getPosts } from "services/postsService";

function Forums() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Get categories
    getCategories(({ data: { results } }) => {
      setCategories(results);
    });

    // Get posts
    getPosts(console.log);
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
