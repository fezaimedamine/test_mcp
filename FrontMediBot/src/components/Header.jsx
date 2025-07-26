import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button.jsx';
import { MessageCircle, Home, Mail } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Fezai Chat</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                className="flex items-center space-x-2 hover:bg-black hover:text-white transition-colors duration-200"
              >
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </Button>
            </Link>
            <Link to="/chat">
              <Button 
                variant={isActive('/chat') ? 'default' : 'ghost'}
                className="flex items-center space-x-2 hover:bg-black hover:text-white transition-colors duration-200"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat</span>
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant={isActive('/contact') ? 'default' : 'ghost'}
                className="flex items-center space-x-2 hover:bg-black hover:text-white transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span>Contact</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

