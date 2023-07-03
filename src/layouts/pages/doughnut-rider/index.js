import FeaturedPost from "components/FeaturedPost";

export default function DoughnutRiderPage() {
  const post = {
    title: "Announcements",
    date: "July 10, 2020",
    description: "Making a big announcement",
    image:
      "https://images.pexels.com/photos/17353007/pexels-photo-17353007/free-photo-of-bikes.jpeg",
    imageLabel: "Bikes",
  };
  return (
    <div>
      <FeaturedPost post={post} />
    </div>
  );
}
