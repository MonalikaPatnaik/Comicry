
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComicPanelType } from "@/types/comic";
import { Image, Type, Users, MessageCircle, Save, X, Upload, Move } from "lucide-react";
import { characterTypesExtended, getCharacterImagePath } from "@/data/character-options";
import { backgroundTypes } from "@/data/comic-assets";
import { useToast } from "@/hooks/use-toast";
import CharacterCustomizer from "./CharacterCustomizer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

interface ComicPanelProps {
  panel: ComicPanelType;
  updatePanel: (panel: ComicPanelType) => void;
}

const ComicPanel = ({ panel, updatePanel }: ComicPanelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTab, setEditTab] = useState("background");
  const [editingPanel, setEditingPanel] = useState<ComicPanelType>(panel);
  const [draggedBubbleId, setDraggedBubbleId] = useState<string | null>(null);
  const [draggedCharacterId, setDraggedCharacterId] = useState<string | null>(null);
  const [customBackgroundFile, setCustomBackgroundFile] = useState<File | null>(null);
  const [customCharacterFile, setCustomCharacterFile] = useState<File | null>(null);
  const [activeBubbleStyle, setActiveBubbleStyle] = useState<"default" | "alt" | "thought">("default");
  const [selectedBubbleId, setSelectedBubbleId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Open the editor with a copy of the panel
  const handleOpenEditor = () => {
    setEditingPanel({...panel});
    setIsEditing(true);
  };
  
  // Save changes
  const handleSaveChanges = () => {
    updatePanel(editingPanel);
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Your panel has been updated",
    });
  };
  
  // Discard changes
  const handleDiscardChanges = () => {
    setIsEditing(false);
    toast({
      description: "Changes discarded",
      variant: "destructive",
    });
  };

  // Handle caption change
  const handleCaptionChange = (caption: string) => {
    setEditingPanel({ ...editingPanel, caption });
  };

  // Handle background change
  const handleBackgroundChange = (background: string) => {
    setEditingPanel({ ...editingPanel, background });
  };

  // Handle custom background upload
  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }
    
    setCustomBackgroundFile(file);
    const backgroundUrl = URL.createObjectURL(file);
    handleBackgroundChange(backgroundUrl);
    
    toast({
      title: "Background uploaded",
      description: "Your custom background has been added",
    });
  };

  // Handle custom character upload
  const handleCharacterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }
    
    setCustomCharacterFile(file);
    const characterUrl = URL.createObjectURL(file);
    
    // Add the custom character to the panel
    addCustomCharacter(characterUrl);
    
    toast({
      title: "Character uploaded",
      description: "Your custom character has been added",
    });
  };

  // Add character
  const addCharacter = (type: string) => {
    const newCharacter = {
      id: `char-${Date.now()}`,
      type,
      position: { x: 50, y: 50 },
      scale: 1,
      flip: false,
      emotion: "default", // Default emotion
      variant: "front"    // Default variant (front view)
    };
    
    setEditingPanel({
      ...editingPanel,
      characters: [...editingPanel.characters, newCharacter]
    });
  };

  // Add custom character
  const addCustomCharacter = (imageUrl: string) => {
    const newCharacter = {
      id: `char-${Date.now()}`,
      type: `custom-${Date.now()}`, // Unique identifier for custom character
      position: { x: 50, y: 50 },
      scale: 1,
      flip: false,
      customImage: imageUrl // Store the custom image URL
    };
    
    setEditingPanel({
      ...editingPanel,
      characters: [...editingPanel.characters, newCharacter]
    });
  };

  // Remove character
  const removeCharacter = (id: string) => {
    setEditingPanel({
      ...editingPanel,
      characters: editingPanel.characters.filter(char => char.id !== id)
    });
  };

  // Update character with new properties
  const updateCharacter = (updatedCharacter: any) => {
    setEditingPanel({
      ...editingPanel,
      characters: editingPanel.characters.map(char => 
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    });
  };

  // Add speech bubble
  const addSpeechBubble = (type: "left" | "right" | "bottom") => {
    let bubbleClass = "";
    if (activeBubbleStyle === "alt") {
      bubbleClass = "comic-speech-bubble-alt";
    } else if (activeBubbleStyle === "thought") {
      bubbleClass = "comic-speech-bubble-thought";
    }
    
    const newBubble = {
      id: `speech-${Date.now()}`,
      text: "Type your text here",
      position: { x: 50, y: 50 },
      type,
      style: activeBubbleStyle,
      cssClass: bubbleClass,
      scale: 1.0 // Default scale
    };
    
    setEditingPanel({
      ...editingPanel,
      speechBubbles: [...editingPanel.speechBubbles, newBubble]
    });
    
    toast({
      description: "Speech bubble added! Drag to position it.",
    });
  };

  // Remove speech bubble
  const removeSpeechBubble = (id: string) => {
    setEditingPanel({
      ...editingPanel,
      speechBubbles: editingPanel.speechBubbles.filter(bubble => bubble.id !== id)
    });
    if (selectedBubbleId === id) {
      setSelectedBubbleId(null);
    }
  };

  // Update speech bubble text
  const updateSpeechBubbleText = (id: string, text: string) => {
    setEditingPanel({
      ...editingPanel,
      speechBubbles: editingPanel.speechBubbles.map(bubble => 
        bubble.id === id ? { ...bubble, text } : bubble
      )
    });
  };
  
  // Handle speech bubble drag start
  const handleBubbleDragStart = (e: React.MouseEvent, id: string) => {
    setDraggedBubbleId(id);
    // Prevent default to enable drag operations
    e.preventDefault();
  };
  
  // Handle speech bubble drag
  const handleBubbleDrag = (e: React.MouseEvent) => {
    if (draggedBubbleId) {
      // Get panel dimensions and mouse position relative to panel
      const panelRect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - panelRect.left) / panelRect.width) * 100;
      const y = ((e.clientY - panelRect.top) / panelRect.height) * 100;
      
      // Clamp values to keep bubble within panel bounds (5-95%)
      const clampedX = Math.min(Math.max(x, 5), 95);
      const clampedY = Math.min(Math.max(y, 5), 95);
      
      setEditingPanel({
        ...editingPanel,
        speechBubbles: editingPanel.speechBubbles.map(bubble => 
          bubble.id === draggedBubbleId 
            ? { ...bubble, position: { x: clampedX, y: clampedY } } 
            : bubble
        )
      });
    }
    
    if (draggedCharacterId) {
      // Get panel dimensions and mouse position relative to panel
      const panelRect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - panelRect.left) / panelRect.width) * 100;
      const y = ((e.clientY - panelRect.top) / panelRect.height) * 100;
      
      // Clamp values to keep character within panel bounds (5-95%)
      const clampedX = Math.min(Math.max(x, 5), 95);
      const clampedY = Math.min(Math.max(y, 5), 95);
      
      setEditingPanel({
        ...editingPanel,
        characters: editingPanel.characters.map(char => 
          char.id === draggedCharacterId 
            ? { ...char, position: { x: clampedX, y: clampedY } } 
            : char
        )
      });
    }
  };
  
  // Handle character drag start
  const handleCharacterDragStart = (e: React.MouseEvent, id: string) => {
    setDraggedCharacterId(id);
    // Prevent default to enable drag operations
    e.preventDefault();
  };
  
  // Handle drag end (for both bubbles and characters)
  const handleDragEnd = () => {
    setDraggedBubbleId(null);
    setDraggedCharacterId(null);
  };
  
  // Select a speech bubble to resize
  const handleSelectBubble = (id: string) => {
    setSelectedBubbleId(id === selectedBubbleId ? null : id);
  };
  
  // Resize speech bubble - fixed this function to properly update scale
  const handleBubbleResize = (scale: number) => {
    if (!selectedBubbleId) return;
    
    setEditingPanel({
      ...editingPanel,
      speechBubbles: editingPanel.speechBubbles.map(bubble => {
        if (bubble.id === selectedBubbleId) {
          return {
            ...bubble,
            scale: scale
          };
        }
        return bubble;
      })
    });
  };

  // Helper to get speech bubble CSS class
  const getBubbleClass = (bubble: any) => {
    const baseClass = "comic-speech-bubble";
    const positionClass = `speech-bubble-${bubble.type}`;
    const styleClass = bubble.style === "alt" ? "comic-speech-bubble-alt" : 
                     bubble.style === "thought" ? "comic-speech-bubble-thought" : "";
    
    return bubble.cssClass || `${baseClass} ${positionClass} ${styleClass}`;
  };

  const renderPanelContent = (isEditMode: boolean = false) => {
    // Use the editing panel when in edit mode, otherwise use the actual panel
    const displayPanel = isEditMode ? editingPanel : panel;
    
    return (
      <div 
        className="comic-panel w-[300px] h-[300px] overflow-hidden cursor-pointer relative"
        onClick={isEditMode ? undefined : handleOpenEditor}
        onMouseMove={isEditMode ? handleBubbleDrag : undefined}
        onMouseUp={isEditMode ? handleDragEnd : undefined}
        onMouseLeave={isEditMode ? handleDragEnd : undefined}
        style={{
          backgroundImage: displayPanel.background ? `url(${displayPanel.background})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Caption */}
        {displayPanel.caption && (
          <div className="absolute top-0 left-0 right-0 bg-black/70 text-white p-2 text-center font-bold">
            {displayPanel.caption}
          </div>
        )}

        {/* Characters */}
        {displayPanel.characters.map(character => (
          <div 
            key={character.id} 
            className={`absolute ${isEditMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
            style={{
              left: `${character.position.x}%`,
              top: `${character.position.y}%`,
              transform: `translate(-50%, -50%) scale(${character.scale}) ${character.flip ? 'scaleX(-1)' : ''}`,
            }}
            onMouseDown={isEditMode ? (e) => handleCharacterDragStart(e, character.id) : undefined}
          >
            <img 
              src={character.customImage || getCharacterImagePath(character)} 
              alt={character.type}
              className="h-24 object-contain"
            />
            {isEditMode && draggedCharacterId === character.id && (
              <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"></div>
            )}
          </div>
        ))}

        {/* Speech Bubbles */}
        {displayPanel.speechBubbles.map(bubble => (
          <div 
            key={bubble.id}
            className={`${getBubbleClass(bubble)} ${isEditMode ? 'cursor-grab active:cursor-grabbing' : ''} ${selectedBubbleId === bubble.id ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              left: `${bubble.position.x}%`,
              top: `${bubble.position.y}%`,
              transform: `translate(-50%, -50%) scale(${bubble.scale || 1})` // Apply the scale here
            }}
            onMouseDown={isEditMode ? (e) => handleBubbleDragStart(e, bubble.id) : undefined}
            onClick={isEditMode ? (e) => {
              e.stopPropagation();
              handleSelectBubble(bubble.id);
            } : undefined}
          >
            {bubble.text}
          </div>
        ))}

        {/* Empty state */}
        {!displayPanel.background && !displayPanel.characters.length && !displayPanel.speechBubbles.length && !displayPanel.caption && (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <Image size={40} />
            <p className="mt-2">Click to edit panel</p>
          </div>
        )}
      </div>
    );
  };

  // Get the initial scale value for the selected bubble
  const getInitialSliderValue = () => {
    if (!selectedBubbleId) return [1];
    
    const selectedBubble = editingPanel.speechBubbles.find(bubble => bubble.id === selectedBubbleId);
    return selectedBubble?.scale ? [selectedBubble.scale] : [1];
  };

  return (
    <>
      {renderPanelContent()}
      
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Comic Panel</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[calc(90vh-130px)]">
            <div className="border rounded-lg p-4 bg-gray-50">
              {renderPanelContent(true)}
              <div className="mt-2 text-xs text-gray-500 text-center">
                {selectedBubbleId ? "Click a speech bubble to select it for resizing" : "Drag speech bubbles and characters to reposition them"}
              </div>
            </div>

            <div>
              <Tabs value={editTab} onValueChange={setEditTab}>
                <TabsList className="grid grid-cols-4 w-full sticky top-0 z-10 bg-white">
                  <TabsTrigger value="background" className="text-xs flex flex-col items-center gap-1 py-1">
                    <Image size={16} />
                    <span>Background</span>
                  </TabsTrigger>
                  <TabsTrigger value="characters" className="text-xs flex flex-col items-center gap-1 py-1">
                    <Users size={16} />
                    <span>Characters</span>
                  </TabsTrigger>
                  <TabsTrigger value="speech" className="text-xs flex flex-col items-center gap-1 py-1">
                    <MessageCircle size={16} />
                    <span>Speech</span>
                  </TabsTrigger>
                  <TabsTrigger value="caption" className="text-xs flex flex-col items-center gap-1 py-1">
                    <Type size={16} />
                    <span>Caption</span>
                  </TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[calc(90vh-250px)]">
                  <TabsContent value="background" className="space-y-4 pt-4">
                    <div className="flex flex-col gap-4">
                      <div className="border rounded-lg p-4 bg-blue-50">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="background-upload">Upload Custom Background</Label>
                          <Input
                            id="background-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundUpload}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div 
                          className={`aspect-square border rounded ${!editingPanel.background ? 'border-blue-500 bg-gray-100' : 'border-gray-200'} flex items-center justify-center cursor-pointer hover:border-blue-500`}
                          onClick={() => handleBackgroundChange("")}
                        >
                          <span className="text-sm text-gray-500">None</span>
                        </div>
                        
                        {backgroundTypes.map(bg => (
                          <div 
                            key={bg.id}
                            className={`aspect-square border rounded overflow-hidden cursor-pointer ${editingPanel.background === bg.path ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-gray-200'}`}
                            onClick={() => handleBackgroundChange(bg.path)}
                          >
                            <img 
                              src={bg.path} 
                              alt={bg.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="characters" className="space-y-4 pt-4">
                    <div className="border rounded-lg p-4 bg-blue-50 mb-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="character-upload">Upload Custom Character</Label>
                        <Input
                          id="character-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleCharacterUpload}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {characterTypesExtended.map(char => (
                        <div 
                          key={char.id}
                          className="border rounded p-2 flex flex-col items-center hover:bg-gray-50 cursor-pointer"
                          onClick={() => addCharacter(char.id)}
                        >
                          <img 
                            src={`/characters/${char.id}.png`} 
                            alt={char.name}
                            className="h-16 object-contain mb-1"
                          />
                          <p className="text-xs text-center font-medium">{char.name}</p>
                        </div>
                      ))}
                    </div>
                    
                    {editingPanel.characters.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Current Characters:</h4>
                        <div className="space-y-3">
                          {editingPanel.characters.map(char => (
                            <CharacterCustomizer
                              key={char.id}
                              character={char}
                              updateCharacter={updateCharacter}
                              removeCharacter={removeCharacter}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="speech" className="space-y-4 pt-4">
                    <div className="mb-4">
                      <Label className="mb-2 block">Bubble Style</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <div
                          className={`p-3 border rounded-lg text-center cursor-pointer transition-colors
                                    ${activeBubbleStyle === "default" ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"}`}
                          onClick={() => setActiveBubbleStyle("default")}
                        >
                          <div className="comic-speech-bubble text-sm scale-75 mx-auto mb-1">
                            <span>Regular</span>
                          </div>
                          <span className="text-xs">Default</span>
                        </div>
                        <div
                          className={`p-3 border rounded-lg text-center cursor-pointer transition-colors
                                    ${activeBubbleStyle === "alt" ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"}`}
                          onClick={() => setActiveBubbleStyle("alt")}
                        >
                          <div className="comic-speech-bubble-alt text-sm scale-75 mx-auto mb-1">
                            <span>Colored</span>
                          </div>
                          <span className="text-xs">Blue</span>
                        </div>
                        <div
                          className={`p-3 border rounded-lg text-center cursor-pointer transition-colors
                                    ${activeBubbleStyle === "thought" ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"}`}
                          onClick={() => setActiveBubbleStyle("thought")}
                        >
                          <div className="comic-speech-bubble-thought text-sm scale-75 mx-auto mb-1">
                            <span>Thinking</span>
                          </div>
                          <span className="text-xs">Thought</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Button onClick={() => addSpeechBubble("left")}>Left Bubble</Button>
                      <Button onClick={() => addSpeechBubble("right")}>Right Bubble</Button>
                      <Button onClick={() => addSpeechBubble("bottom")}>Bottom Bubble</Button>
                    </div>
                    
                    {selectedBubbleId && (
                      <div className="mt-4 border rounded-lg p-4 bg-blue-50">
                        <Label className="mb-2 block">Resize Selected Bubble</Label>
                        <div className="flex items-center gap-2">
                          <Move size={16} />
                          <Slider
                            defaultValue={getInitialSliderValue()}
                            min={0.5}
                            max={1.5}
                            step={0.1}
                            onValueChange={([value]) => handleBubbleResize(value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    )}
                    
                    {editingPanel.speechBubbles.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Current Speech Bubbles:</h4>
                        <div className="space-y-3">
                          {editingPanel.speechBubbles.map((bubble, index) => (
                            <div 
                              key={bubble.id} 
                              className={`bg-gray-50 p-3 rounded ${selectedBubbleId === bubble.id ? 'ring-2 ring-blue-500' : ''}`}
                              onClick={() => handleSelectBubble(bubble.id)}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Bubble {index + 1}</span>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeSpeechBubble(bubble.id);
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                              <Input
                                value={bubble.text}
                                onChange={(e) => updateSpeechBubbleText(bubble.id, e.target.value)}
                                placeholder="Speech text"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="caption" className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <Label htmlFor="caption">Panel Caption</Label>
                      <Input
                        id="caption"
                        value={editingPanel.caption || ''}
                        onChange={(e) => handleCaptionChange(e.target.value)}
                        placeholder="Add a caption for your panel"
                      />
                      <p className="text-xs text-gray-500">
                        Captions help tell your story and provide context between panels.
                      </p>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </div>
          </div>
          
          <DialogFooter className="flex justify-end gap-2 mt-4 border-t pt-4 sticky bottom-0 bg-white">
            <Button 
              variant="outline" 
              onClick={handleDiscardChanges}
              className="flex items-center gap-2"
            >
              <X size={16} />
              Discard
            </Button>
            <Button 
              onClick={handleSaveChanges}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ComicPanel;
