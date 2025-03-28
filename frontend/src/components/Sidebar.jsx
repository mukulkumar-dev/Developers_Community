// src/components/Sidebar.js
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Dev Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="hover:text-gray-400">Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard/profile" className="hover:text-gray-400">Profile
          </Link>
        </li>
        <li>
          <Link href="/dashboard/posts" className="hover:text-gray-400">Community Posts
          </Link>
        </li>
        <li>
          <Link href="/dashboard/notifications" className="hover:text-gray-400">Notifications
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
