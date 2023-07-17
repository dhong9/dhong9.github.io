// React
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Services
import { getPostById } from "services/postsService";

export default function ForumsPost() {
  const { id } = useParams();

  // Get post By id
  useEffect(getPostById(id, console.log), []);

  return <div>Form post with ID {id}</div>;
}
