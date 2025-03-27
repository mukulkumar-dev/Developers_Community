import { Search, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">Dribbble</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="border px-4 py-2 rounded-md"
        />
        <Search className="text-gray-500" />
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2">Explore</button>
        <button className="px-4 py-2">Hire a Designer</button>
        <button className="px-4 py-2 bg-black text-white rounded-md">Log In</button>
      </div>
    </nav>
  );
}
