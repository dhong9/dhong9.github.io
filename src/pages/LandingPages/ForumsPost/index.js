// React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Services
import { getPostById } from "services/postsService";

export default function ForumsPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // Get post By id
  useEffect(
    getPostById(id, ({ data }) => {
      console.log(data);
      setPost(data);
    }),
    []
  );

  return post ? (
    <div>
      <p>{post.body}</p>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
