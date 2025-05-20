
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
          <p className="flex gap-2">Made with <Heart size={14} className="text-blue-400" /> for storytellers</p>

          <p className="text-sm flex items-center gap-1">
            <a href="https://www.buymeacoffee.com/Monalika" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: "50px", width: "200px" }} /></a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
