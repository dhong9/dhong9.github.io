// React
import { useParams } from "react-router-dom";

export default function ForumsCategories() {
  const { id } = useParams();

  return (
    <div>
      <h1>Forum Categories {id}</h1>
    </div>
  );
}
