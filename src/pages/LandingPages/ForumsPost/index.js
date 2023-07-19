// React
import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";

// Sections components
import FeaturedPost from "components/FeaturedPost";
import BaseLayout from "layouts/sections/components/BaseLayout";

// Services
import { getPostById } from "services/postsService";

export default function ForumsPost() {
  //const { id } = useParams();
  const [post, setPost] = useState(null);

  // Get post By id
  useEffect(
    getPostById(1, ({ data }) => {
      setPost(data);
    }),
    []
  );

  return (
    <BaseLayout
      title="Doughnut Rider"
      breadcrumb={[{ label: "Doughnut Rider", route: "/doughnutRider" }]}
    >
      {post ? (
        <div>
          <FeaturedPost post={post} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </BaseLayout>
  );
}
