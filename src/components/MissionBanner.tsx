
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MissionBannerProps {
  onClose: () => void;
}

const MissionBanner = ({ onClose }: MissionBannerProps) => {
  return (
    <div className="bg-blue-600 text-white p-4 relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2 text-white hover:bg-blue-700/20"
        onClick={onClose}
      >
        <X size={18} />
      </Button>
      
      <div className="container mx-auto">
        <h2 className="font-bold text-lg mb-1">This Week's Mission: Create Your Own Comic!</h2>
        <p className="text-sm">
          Create a 3-8 panel comic strip about anything you want! Make it funny, serious, 
          motivational, or absurd — just make sure it's creative and tells a story.
        </p>
      </div>
    </div>
  );
};

export default MissionBanner;
