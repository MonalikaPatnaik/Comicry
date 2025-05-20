
import { useState } from 'react';
import Header from "@/components/Header";
import ComicCreator from "@/components/ComicCreator";
import Footer from "@/components/Footer";
import MissionBanner from "@/components/MissionBanner";

const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col">
      {showBanner && <MissionBanner onClose={() => setShowBanner(false)} />}
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <ComicCreator />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
