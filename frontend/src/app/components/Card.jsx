export default function Card({ image, title, author }) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500">{author}</p>
        </div>
      </div>
    );
  }
  