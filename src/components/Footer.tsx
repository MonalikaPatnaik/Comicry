
import { BookOpen, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-blue-300" />
            <p className="text-sm">
              © {new Date().getFullYear()} Comic Creator
            </p>
          </div>
          
          <div className="flex gap-6">
            <a 
              href="https://example.com/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-300 hover:text-white transition-colors"
            >
              Tutorials
            </a>
            <a 
              href="https://example.com/community" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-300 hover:text-white transition-colors"
            >
              Community
            </a>
          </div>
          
          <p className="text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-blue-400" /> for storytellers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
