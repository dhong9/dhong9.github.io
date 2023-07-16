import { useParams } from "react-router-dom";

export default function ForumsPost() {
  const { id } = useParams();

  return <div>Form post with ID {id}</div>;
}
