
// Character emotion options
export const characterEmotions = [
  { id: "default", name: "Default" },
  { id: "happy", name: "Happy" },
  { id: "angry", name: "Angry" },
  { id: "sad", name: "Sad" },
  { id: "surprised", name: "Surprised" },
  { id: "annoyed", name: "Annoyed" }
];

// Character variant options
export const characterVariants = [
  { id: "front", name: "Front View" },
  { id: "side", name: "Side View" },
  { id: "back", name: "Back View" }
];

// Main character types with support for variants and emotions
export const characterTypesExtended = [
  {
    id: "hero",
    name: "Hero",
    supportsEmotions: true,
    supportsVariants: true
  },
  {
    id: "sidekick",
    name: "Sidekick",
    supportsEmotions: true,
    supportsVariants: true
  },
  {
    id: "civilian",
    name: "Civilian",
    supportsEmotions: true,
    supportsVariants: true
  },
  {
    id: "animal",
    name: "Animal",
    supportsEmotions: false,
    supportsVariants: true
  },
  {
    id: "villain",
    name: "Villain",
    supportsEmotions: true,
    supportsVariants: true
  },
  {
    id: "mentor",
    name: "Mentor",
    supportsEmotions: true, 
    supportsVariants: true
  }
];

// Helper function to get character image path
export const getCharacterImagePath = (character: { type: string, emotion?: string, variant?: string }) => {
  let path = `/characters/${character.type}`;
  
  // Add variant if present, default to front view
  if (character.variant) {
    path += `-${character.variant}`;
  }
  
  // Add emotion if present, default to neutral
  if (character.emotion && character.emotion !== "default") {
    path += `-${character.emotion}`;
  }
  
  return `${path}.png`;
};
