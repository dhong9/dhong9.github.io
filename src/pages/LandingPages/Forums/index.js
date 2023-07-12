import { useEffect, useState } from "react";

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import ForumHeader from "components/ForumHeader";
import MainFeaturedPost from "components/MainFeaturedPost";
import FeaturedPost from "components/FeaturedPost";
import MainForumPosts from "components/MainForumPosts";

// Services
import { getCategories } from "services/categoriesService";
import { getPosts } from "services/postsService";

function Forums() {
  const [categories, setCategories] = useState([]);
  const [mainFeaturedPosts, setMainFeaturedPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [mainPosts, setMainPosts] = useState([]);

  useEffect(() => {
    // Get categories
    getCategories(({ data: { results } }) => {
      setCategories(results);
    });

    // Get posts
    getPosts(({ data: { results } }) => {
      const mainFeaturedList = [];
      const featuredList = [];
      const mainPostList = [];
      for (const { id, postName, body, mainFeatured, featured } of results) {
        // Common featured post data structure
        const post = {
          id,
          postName,
          body,
        };
        // A post cannot be both main featured and just featured
        if (mainFeatured) {
          mainFeaturedList.push(post);
        } else if (featured) {
          featuredList.push(post);
        } else {
          mainPostList.push(post);
        }
      }
      setMainFeaturedPosts(mainFeaturedList);
      setFeaturedPosts(featuredList);
      setMainPosts(mainPostList);
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
      {featuredPosts.map((mainFeaturedPost) => (
        <FeaturedPost key={mainFeaturedPost.id} post={mainFeaturedPost} />
      ))}
      <MainForumPosts posts={mainPosts} title="From the firehose" />
    </BaseLayout>
  );
}

export default Forums;
