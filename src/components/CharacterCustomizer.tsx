
import { useState } from "react";
import { Character } from "@/types/comic";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { characterEmotions, characterVariants, characterTypesExtended, getCharacterImagePath } from "@/data/character-options";
import { Move, ArrowLeft, ArrowRight } from "lucide-react";

interface CharacterCustomizerProps {
  character: Character;
  updateCharacter: (character: Character) => void;
  removeCharacter: (id: string) => void;
}

const CharacterCustomizer = ({ character, updateCharacter, removeCharacter }: CharacterCustomizerProps) => {
  // If using a custom image, show different controls
  const isCustomImage = !!character.customImage;
  
  // Helper to update a specific property
  const updateProperty = <K extends keyof Character>(property: K, value: Character[K]) => {
    updateCharacter({
      ...character,
      [property]: value
    });
  };

  // Find character type information
  const characterTypeInfo = characterTypesExtended.find(c => c.id === character.type);
  
  // Check if character type supports emotions
  // For custom images, we allow all customizations
  const supportsEmotions = isCustomImage || (characterTypeInfo?.supportsEmotions ?? false);
  
  return (
    <div className="bg-gray-50 p-4 rounded-md space-y-4 max-h-[300px] overflow-y-auto">
      <div className="flex items-center justify-between sticky top-0 bg-gray-50 pb-2 z-10">
        <div className="flex items-center gap-2">
          <img 
            src={character.customImage || getCharacterImagePath(character)} 
            alt={character.type}
            className="h-10 w-10 object-contain"
            style={{ transform: character.flip ? 'scaleX(-1)' : 'none' }}
          />
          <span className="font-medium">
            {character.type.charAt(0).toUpperCase() + character.type.slice(1)}
          </span>
        </div>
        <Button variant="destructive" size="sm" onClick={() => removeCharacter(character.id)}>
          Remove
        </Button>
      </div>
      
      {/* Emotions dropdown - only show if supported */}
      {supportsEmotions && (
        <div className="space-y-1">
          <Label>Emotion</Label>
          <Select
            value={character.emotion || "default"}
            onValueChange={(value) => updateProperty("emotion", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select emotion" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {characterEmotions.map((emotion) => (
                <SelectItem key={emotion.id} value={emotion.id}>{emotion.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {/* Size adjustment */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label>Size</Label>
          <div className="flex items-center gap-1 text-xs">
            <Move className="h-3 w-3" />
            <span>{(character.scale * 100).toFixed(0)}%</span>
          </div>
        </div>
        <Slider
          value={[character.scale * 100]}
          min={50}
          max={150}
          step={5}
          onValueChange={(values) => updateProperty("scale", values[0] / 100)}
        />
      </div>
      
      {/* Flip character button */}
      <div className="flex justify-between pb-1">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 w-full"
          onClick={() => updateProperty("flip", !character.flip)}
        >
          {character.flip ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          {character.flip ? "Flip Left" : "Flip Right"}
        </Button>
      </div>
    </div>
  );
};

export default CharacterCustomizer;
