import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-3xl font-semibold mb-6">Welcome to Our App</h1>
        <p className="text-lg mb-6">Please choose an action:</p>

        {/* Using Link with legacyBehavior */}
        <Link href="/pages/signup" className="block mb-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Sign Up
        </Link>

        {/* Link to the Login page */}
        <Link href="/pages/login" className="block bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Login
        </Link>
      </div>
    </div>
  );
}
