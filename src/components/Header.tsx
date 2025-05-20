
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Share2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-blue-600/90 backdrop-blur-sm text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={32} className="text-blue-100" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Comic Creator</h1>
            <p className="text-sm text-blue-100">Tell your story</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="https://example.com/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-100 hover:text-white transition-colors"
          >
            Tutorials
          </a>
          <a 
            href="https://example.com/community" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-100 hover:text-white transition-colors"
          >
            Community
          </a>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" className="hidden sm:flex items-center gap-2">
            <Download size={16} />
            <span>Save</span>
          </Button>
          
          <Button size="sm" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
            <Share2 size={16} />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
