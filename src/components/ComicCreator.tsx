
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2, Download, Image, Type, Palette, Layout, Lightbulb, Share2 } from "lucide-react";
import ComicPanel from "@/components/ComicPanel";
import ComicTemplates from "@/components/ComicTemplates";
import { ComicPanelType } from "@/types/comic";
import { templates } from "@/data/templates";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

const ComicCreator = () => {
  const [panels, setPanels] = useState<ComicPanelType[]>([
    {
      id: "panel-1",
      background: "/backgrounds/city-street.jpg",
      characters: [
        { id: "char-1", type: "hero", position: { x: 20, y: 50 }, scale: 1, flip: false }
      ],
      speechBubbles: [
        { id: "speech-1", text: "Welcome to your adventure!", position: { x: 60, y: 20 }, type: "right" }
      ],
      caption: "Day 1: The Beginning"
    },
    {
      id: "panel-2",
      background: "/backgrounds/office.jpg",
      characters: [],
      speechBubbles: [],
      caption: "Add characters and speech bubbles!"
    }
  ]);
  
  const [activeTab, setActiveTab] = useState("create");
  const { toast } = useToast();

  const addPanel = () => {
    if (panels.length >= 8) return;
    
    const newPanel: ComicPanelType = {
      id: `panel-${panels.length + 1}`,
      background: "",
      characters: [],
      speechBubbles: [],
      caption: ""
    };
    
    setPanels([...panels, newPanel]);
  };

  const removePanel = (id: string) => {
    if (panels.length <= 1) return;
    setPanels(panels.filter(panel => panel.id !== id));
  };

  const updatePanel = (updatedPanel: ComicPanelType) => {
    setPanels(panels.map(panel => 
      panel.id === updatedPanel.id ? updatedPanel : panel
    ));
  };

  const handleTemplateSelect = (templatePanels: ComicPanelType[]) => {
    setPanels(templatePanels);
    // Switch to create tab after selecting a template
    setActiveTab("create");
  };

  const downloadComic = async () => {
    const comicStrip = document.getElementById('comic-strip');
    
    if (!comicStrip) {
      toast({
        title: "Error",
        description: "Could not find comic to download",
        variant: "destructive"
      });
      return;
    }
    
    try {
      toast({
        description: "Preparing your comic for download...",
      });
      
      const canvas = await html2canvas(comicStrip, {
        backgroundColor: '#f8fafc',
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true
      });
      
      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create an anchor element for download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'my-comic-strip.png';
      
      // Append to the document and trigger a click
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      
      toast({
        title: "Success!",
        description: "Your comic has been downloaded",
      });
    } catch (error) {
      console.error("Error generating comic download:", error);
      toast({
        title: "Download failed",
        description: "There was a problem creating your download",
        variant: "destructive"
      });
    }
  };

  const shareComic = async () => {
    const comicStrip = document.getElementById('comic-strip');
    
    if (!comicStrip) {
      toast({
        title: "Error",
        description: "Could not find comic to share",
        variant: "destructive"
      });
      return;
    }
    
    try {
      toast({
        description: "Preparing your comic for sharing...",
      });
      
      const canvas = await html2canvas(comicStrip, {
        backgroundColor: '#f8fafc',
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true
      });
      
      // Convert the canvas to a blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error("Could not create image blob");
        }
        
        try {
          // Check if Web Share API is available
          if (navigator.share) {
            const file = new File([blob], 'my-comic-strip.png', { type: 'image/png' });
            
            await navigator.share({
              title: 'My Comic Strip',
              text: 'Check out this comic I created!',
              files: [file]
            });
            
            toast({
              title: "Shared!",
              description: "Your comic has been shared successfully",
            });
          } else {
            // Fallback for browsers that don't support the Web Share API
            const dataUrl = canvas.toDataURL('image/png');
            
            // Create a temporary textarea for copying the URL
            const textarea = document.createElement('textarea');
            textarea.value = "Here's my comic strip: " + dataUrl;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            toast({
              title: "Link Copied!",
              description: "Image data copied to clipboard. Paste it to share!",
            });
          }
        } catch (error) {
          console.error("Sharing failed:", error);
          toast({
            title: "Sharing failed",
            description: "There was a problem sharing your comic",
            variant: "destructive"
          });
        }
      }, 'image/png');
      
    } catch (error) {
      console.error("Error generating comic for sharing:", error);
      toast({
        title: "Sharing failed",
        description: "There was a problem preparing your comic",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Comic Creator</h1>
        <p className="text-lg mb-6">
          Create your own comic strip! Choose from templates or build your own 3-8 panel comic.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Palette size={16} />
            <span>Create Comic</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Layout size={16} />
            <span>Templates</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="mt-6">
          <div id="comic-strip" className="flex flex-wrap gap-6 justify-center">
            {panels.map((panel, index) => (
              <div key={panel.id} className="relative">
                <ComicPanel
                  panel={panel}
                  updatePanel={updatePanel}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-3 -right-3 rounded-full"
                  onClick={() => removePanel(panel.id)}
                  disabled={panels.length <= 1}
                >
                  <Trash2 size={14} />
                </Button>
                <div className="mt-2 text-center font-bold">Panel {index + 1}</div>
              </div>
            ))}
            
            {panels.length < 8 && (
              <div 
                className="w-[300px] h-[300px] border-2 border-dashed border-blue-600/40 rounded-lg 
                           flex items-center justify-center cursor-pointer hover:border-blue-600/70 transition-colors"
                onClick={addPanel}
              >
                <div className="flex flex-col items-center text-blue-600/70">
                  <PlusCircle size={40} />
                  <span className="mt-2 font-medium">Add Panel</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              onClick={() => setPanels([{
                id: "panel-1",
                background: "",
                characters: [],
                speechBubbles: [],
                caption: ""
              }])}
              className="flex items-center gap-2"
            >
              <Trash2 size={16} />
              <span>Clear All</span>
            </Button>
            
            <Button 
              variant="outline"
              onClick={shareComic}
              className="flex items-center gap-2"
            >
              <Share2 size={16} />
              <span>Share Comic</span>
            </Button>
            
            <Button 
              onClick={downloadComic}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Download size={16} />
              <span>Download Comic</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <ComicTemplates 
            templates={templates} 
            onSelect={handleTemplateSelect}
          />
          <div className="flex justify-center mt-8">
            <div className="max-w-xl p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Lightbulb size={24} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Template Tips</h3>
                  <p className="text-sm">
                    Choose a template as your starting point, then customize the characters, 
                    speech bubbles, and captions to make it your own. Each template tells a 
                    different story to get you started!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComicCreator;
