
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Share2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-blue-600/90 backdrop-blur-sm text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={32} className="text-blue-100" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Comicry</h1>
            <p className="text-sm text-blue-100">Tell your story</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
