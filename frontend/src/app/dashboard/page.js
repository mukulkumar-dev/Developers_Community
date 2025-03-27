import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function Dashboard() {
  const designs = [
    { image: "/images/design1.png", title: "UI Design 1", author: "Designer 1" },
    { image: "/images/design2.png", title: "UI Design 2", author: "Designer 2" },
    { image: "/images/design3.png", title: "UI Design 3", author: "Designer 3" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-center">Community Landing Page</h1>
        <p className="text-gray-600 text-center mt-2">
          Explore top designs, UI components, and creative inspirations.
        </p>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {designs.map((design, index) => (
            <Card key={index} {...design} />
          ))}
        </div>
      </div>
    </div>
  );
}
