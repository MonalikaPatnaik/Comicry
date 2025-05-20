
export interface Position {
  x: number;
  y: number;
}

export interface Character {
  id: string;
  type: string;
  position: Position;
  scale: number;
  flip: boolean;
  customImage?: string; // Added for custom character images
  emotion?: string; // Added for character emotions
  variant?: string; // Added for character variants (side view, etc)
}

export interface SpeechBubble {
  id: string;
  text: string;
  position: Position;
  type: "left" | "right" | "bottom";
  style?: "default" | "alt" | "thought"; // Added for different bubble styles
  cssClass?: string; // Optional CSS class for styling
  scale?: number; // Added for bubble sizing
}

export interface ComicPanelType {
  id: string;
  background: string;
  characters: Character[];
  speechBubbles: SpeechBubble[];
  caption: string;
}

export interface ComicTemplate {
  id: string;
  title: string;
  description: string;
  previewImage: string;
  panels: ComicPanelType[];
}
