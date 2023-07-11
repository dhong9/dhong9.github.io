import { useEffect, useState } from "react";

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import ForumHeader from "components/ForumHeader";

// Services
import { getCategories } from "services/categoriesService";
import { getPosts } from "services/postsService";
import MainFeaturedPost from "components/MainFeaturedPost";

function Forums() {
  const [categories, setCategories] = useState([]);
  const [mainFeaturedPosts, setMainFeaturedPosts] = useState([]);

  useEffect(() => {
    // Get categories
    getCategories(({ data: { results } }) => {
      setCategories(results);
    });

    // Get posts
    getPosts(({ data: { results } }) => {
      const mainFeaturedList = [];
      for (const { postName, body, mainFeatured } of results) {
        // A post cannot be both main featured and just featured
        if (mainFeatured) {
          const post = {
            postName,
            body,
            image: "https://source.unsplash.com/random",
            imageText: "main image description",
            linkText: "Continue reading...",
          };
          mainFeaturedList.push(post);
        }
      }
      setMainFeaturedPosts(mainFeaturedList);
    });
  }, []);

  return (
    <BaseLayout
      title="Doughnut Rider"
      breadcrumb={[{ label: "Doughnut Rider", route: "/doughnutRider" }]}
    >
      <ForumHeader categories={categories} />
      {mainFeaturedPosts.map((mainFeaturedPost) => (
        <MainFeaturedPost key={mainFeaturedPost.id} post={mainFeaturedPost} />
      ))}
    </BaseLayout>
  );
}

export default Forums;
