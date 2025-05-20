import Header from "@/components/Header";
import ComicCreator from "@/components/ComicCreator";
import Footer from "@/components/Footer";

const Index = () => {
  
  return (
    <div className="min-h-screen flex flex-col">
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <ComicCreator />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
