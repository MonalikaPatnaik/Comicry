
import { ComicTemplate } from "@/types/comic";

// Comic templates
export const templates: ComicTemplate[] = [
  {
    id: "template1",
    title: "Hero's Journey",
    description: "Follow our hero as they embark on an exciting adventure.",
    previewImage: "/templates/hero-journey.jpg",
    panels: [
      {
        id: "panel-1",
        background: "/backgrounds/city-street.jpg",
        characters: [
          { id: "char-1", type: "hero", position: { x: 30, y: 50 }, scale: 1, flip: false, emotion: "default", variant: "front" }
        ],
        speechBubbles: [
          { id: "speech-1", text: "I need to find a way to save the city!", position: { x: 60, y: 30 }, type: "right" }
        ],
        caption: "Our hero contemplates their mission"
      },
      {
        id: "panel-2",
        background: "/backgrounds/city-street.jpg",
        characters: [
          { id: "char-1", type: "hero", position: { x: 25, y: 60 }, scale: 1, flip: false, emotion: "default", variant: "front" },
          { id: "char-2", type: "sidekick", position: { x: 70, y: 60 }, scale: 1, flip: true, emotion: "happy", variant: "front" }
        ],
        speechBubbles: [
          { id: "speech-1", text: "I can't do this alone. Will you help me?", position: { x: 45, y: 30 }, type: "right" },
          { id: "speech-2", text: "Count me in!", position: { x: 70, y: 20 }, type: "left" }
        ],
        caption: "Finding an ally"
      },
      {
        id: "panel-3",
        background: "/backgrounds/castle.jpg",
        characters: [
          { id: "char-1", type: "hero", position: { x: 30, y: 60 }, scale: 1, flip: false, emotion: "surprised", variant: "front" },
          { id: "char-2", type: "sidekick", position: { x: 70, y: 60 }, scale: 1, flip: true, emotion: "default", variant: "front" }
        ],
        speechBubbles: [
          { id: "speech-1", text: "This must be where the villain is hiding!", position: { x: 50, y: 30 }, type: "bottom" }
        ],
        caption: "Discovering the villain's lair"
      },
      {
        id: "panel-4",
        background: "/backgrounds/castle.jpg",
        characters: [
          { id: "char-1", type: "hero", position: { x: 25, y: 60 }, scale: 1, flip: false, emotion: "angry", variant: "front" },
          { id: "char-2", type: "sidekick", position: { x: 70, y: 60 }, scale: 1, flip: true, emotion: "surprised", variant: "front" },
          { id: "char-3", type: "villain", position: { x: 50, y: 60 }, scale: 1.2, flip: false, emotion: "angry", variant: "front" }
        ],
        speechBubbles: [
          { id: "speech-1", text: "You're too late! The city will be mine!", position: { x: 50, y: 30 }, type: "bottom", style: "alt" }
        ],
        caption: "The final confrontation begins"
      }
    ]
  },
  {
    id: "template2",
    title: "Office Comedy",
    description: "A humorous day in the life of office workers.",
    previewImage: "/templates/office-comedy.jpg",
    panels: [
      {
        id: "panel-1",
        background: "/backgrounds/office.jpg",
        characters: [
          { id: "char-1", type: "civilian", position: { x: 30, y: 60 }, scale: 1, flip: false },
          { id: "char-2", type: "civilian", position: { x: 70, y: 60 }, scale: 1, flip: true }
        ],
        speechBubbles: [
          { id: "speech-1", text: "I bet I can finish this report before lunch!", position: { x: 50, y: 30 }, type: "left" },
          { id: "speech-2", text: "You're on!", position: { x: 70, y: 20 }, type: "left" }
        ],
        caption: "Monday morning challenge"
      },
      {
        id: "panel-2",
        background: "/backgrounds/office.jpg",
        characters: [
          { id: "char-1", type: "civilian", position: { x: 30, y: 60 }, scale: 1, flip: false }
        ],
        speechBubbles: [
          { id: "speech-1", text: "Why won't this computer work?!", position: { x: 60, y: 30 }, type: "right" }
        ],
        caption: "Technical difficulties"
      },
      {
        id: "panel-3",
        background: "/backgrounds/office.jpg",
        characters: [
          { id: "char-2", type: "civilian", position: { x: 70, y: 60 }, scale: 1, flip: true }
        ],
        speechBubbles: [
          { id: "speech-1", text: "All done! Where did everyone go?", position: { x: 50, y: 30 }, type: "left" }
        ],
        caption: "5:30 PM..."
      },
      {
        id: "panel-4",
        background: "/backgrounds/office.jpg",
        characters: [
          { id: "char-1", type: "civilian", position: { x: 30, y: 60 }, scale: 1, flip: false },
          { id: "char-2", type: "civilian", position: { x: 70, y: 60 }, scale: 1, flip: true },
          { id: "char-3", type: "mentor", position: { x: 50, y: 60 }, scale: 1, flip: false }
        ],
        speechBubbles: [
          { id: "speech-1", text: "Great job team! Pizza party on Friday!", position: { x: 50, y: 30 }, type: "bottom" }
        ],
        caption: "Worth it in the end"
      }
    ]
  },
  {
    id: "template3",
    title: "Space Adventure",
    description: "An epic journey through the cosmos with unexpected twists.",
    previewImage: "/templates/space-adventure.jpg",
    panels: [
      {
        id: "panel-1",
        background: "/backgrounds/space.jpg",
        characters: [
          { id: "char-1", type: "hero", position: { x: 30, y: 60 }, scale: 1, flip: false },
          { id: "char-2", type: "sidekick", position: { x: 70, y: 60 }, scale: 1, flip: true }
        ],
        speechBubbles: [
          { id: "speech-1", text: "Our ship is damaged! We need to find a planet to land on!", position: { x: 50, y: 30 }, type: "right" }
        ],
        caption: "Trouble in deep space"
      },
      {
        id: "panel-2",
        background: "/backgrounds/space.jpg",
        characters: [
          { id: "char-1", type: "hero", position: { x: 50, y: 60 }, scale: 1, flip: false }
        ],
        speechBubbles: [
          { id: "speech-1", text: "I'll have to make an emergency landing!", position: { x: 50, y: 30 }, type: "bottom" }
        ],
        caption: "Making a difficult decision"
      },
      {
        id: "panel-3",
        background: "/backgrounds/park.jpg",
        characters: [
          { id: "char-1", type: "hero", position: { x: 50, y: 40 }, scale: 1.2, flip: false }
        ],
        speechBubbles: [],
        caption: "Crash landing on an unknown planet..."
      },
      {
        id: "panel-4",
        background: "/backgrounds/park.jpg",
        characters: [
          { id: "char-1", type: "hero", position: { x: 30, y: 60 }, scale: 1, flip: false },
          { id: "char-2", type: "animal", position: { x: 70, y: 60 }, scale: 1, flip: false },
          { id: "char-3", type: "civilian", position: { x: 50, y: 60 }, scale: 1, flip: false }
        ],
        speechBubbles: [
          { id: "speech-1", text: "Welcome to our planet, traveler! We can help repair your ship.", position: { x: 50, y: 30 }, type: "bottom" }
        ],
        caption: "Making new friends"
      }
    ]
  }
];
