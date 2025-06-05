
import { BookOpen, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-blue-300" />
            <p className="text-sm">
              © {new Date().getFullYear()} Comicry
            </p>
          </div>
          <p className="flex gap-2">Made with <Heart size={14} className="text-blue-400" /> for storytellers</p>

          <p className="text-sm flex items-center gap-1">
            <a href='https://ko-fi.com/F2F01FX7J5' target='_blank'><img height='36' style={{ height: "40px", width: "auto" }} src='https://storage.ko-fi.com/cdn/kofi2.png?v=6' alt='Buy Me a Coffee at ko-fi.com' /></a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
