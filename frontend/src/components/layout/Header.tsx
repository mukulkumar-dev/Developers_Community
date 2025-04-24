
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white dark:bg-devgray-900 border-b border-devgray-200 dark:border-devgray-700 sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-devblue-600 to-devpurple-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">{`</>`}</span>
          </div>
          <span className="font-bold text-xl text-devgray-900 dark:text-white">DevComm</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/blogs" className="nav-link">Blogs</Link>
          <Link to="/questions" className="nav-link">Q&A</Link>
          <Link to="/events" className="nav-link">Events</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-devgray-100 dark:hover:bg-devgray-800">
            <Search className="w-5 h-5 text-devgray-600 dark:text-devgray-400" />
          </button>
          
          {isAuthenticated ? (
            <>
              <button className="p-2 rounded-full hover:bg-devgray-100 dark:hover:bg-devgray-800 relative">
                <Bell className="w-5 h-5 text-devgray-600 dark:text-devgray-400" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-devblue-600 rounded-full"></span>
              </button>
              <div className="relative group">
                <Link to="/profile" className="p-1 rounded-full border-2 border-transparent hover:border-devblue-500">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-devgray-200 dark:bg-devgray-700 rounded-full overflow-hidden flex items-center justify-center">
                      <User className="w-5 h-5 text-devgray-500" />
                    </div>
                  )}
                </Link>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white dark:bg-devgray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="px-4 py-2 border-b border-devgray-200 dark:border-devgray-700">
                    <p className="text-sm font-medium text-devgray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-devgray-500 truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-devgray-700 dark:text-devgray-200 hover:bg-devgray-100 dark:hover:bg-devgray-700">
                    Profile
                  </Link>
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-devgray-100 dark:hover:bg-devgray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login" className="btn-outline py-1.5">Log In</Link>
              <Link to="/signup" className="btn-primary py-1.5">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-devgray-100 dark:hover:bg-devgray-800"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-devgray-800 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-devgray-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-devgray-900 py-4 px-6 border-t border-devgray-200 dark:border-devgray-700 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/projects" className="nav-link" onClick={() => setIsOpen(false)}>Projects</Link>
            <Link to="/blogs" className="nav-link" onClick={() => setIsOpen(false)}>Blogs</Link>
            <Link to="/questions" className="nav-link" onClick={() => setIsOpen(false)}>Q&A</Link>
            <Link to="/events" className="nav-link" onClick={() => setIsOpen(false)}>Events</Link>
            
            <div className="pt-4 border-t border-devgray-200 dark:border-devgray-700">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-devgray-200 dark:bg-devgray-700 rounded-full overflow-hidden">
                        <User className="w-full h-full text-devgray-500 p-1" />
                      </div>
                    )}
                    <span className="text-devgray-800 dark:text-white">{user?.name}</span>
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }} 
                    className="w-full text-left py-2 text-red-600 dark:text-red-400"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" className="btn-outline py-2 w-full text-center" onClick={() => setIsOpen(false)}>
                    Log In
                  </Link>
                  <Link to="/signup" className="btn-primary py-2 w-full text-center" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
