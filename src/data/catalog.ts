export type Handle = "miquela" | "imma" | "shudu";

export type Character = {
  handle: Handle;
  name: string;
  instagram: string;
  city: string;
  since: string;
  role: string;
  studio: string;
  makers: string;
  bio: string;
  portraitId: string;
};

export type Pin = {
  id: string;
  character: Handle;
  title: string;
  caption: string;
  credit: string;
};

export const characters: Character[] = [
  {
    handle: "miquela",
    name: "Miquela",
    instagram: "@lilmiquela",
    city: "Los Angeles",
    since: "2016",
    role: "Musician and model",
    studio: "Brud",
    makers: "Trevor McFedries, Sara DeCou",
    portraitId: "miquela-prada",
    bio: "A virtual musician and model who has lived, on the record, in Los Angeles since 2016. The studio Brud — Trevor McFedries and Sara DeCou — built her. The public work runs from Prada to a BMW film to songs released under her own name.",
  },
  {
    handle: "imma",
    name: "imma",
    instagram: "@imma.gram",
    city: "Tokyo",
    since: "2018",
    role: "Virtual model",
    studio: "Aww Inc.",
    makers: "Aww Inc.",
    portraitId: "imma-studio",
    bio: "A virtual model from Tokyo, made by Aww Inc. The pink bob is the whole identity. She has worked fashion week, lived inside an IKEA apartment in Harajuku, and shown up in campaigns that treat a rendered person like a working model.",
  },
  {
    handle: "shudu",
    name: "Shudu",
    instagram: "@shudu.gram",
    city: "London",
    since: "2017",
    role: "Digital supermodel",
    studio: "The Diigitals",
    makers: "Cameron-James Wilson",
    portraitId: "shudu-veil",
    bio: "The digital supermodel from The Diigitals, introduced in 2017 by photographer Cameron-James Wilson. The pictures are controlled: gold jewelry, a yellow T-shirt, a black roll-neck. She was presented as a supermodel who exists only as an image.",
  },
];

export const pins: Pin[] = [
  {
    id: "miquela-prada",
    character: "miquela",
    title: "Printed shirt",
    caption: "Studio portrait. The bow and the blunt fringe are the early Miquela silhouette.",
    credit: "The Cut",
  },
  {
    id: "imma-bar",
    character: "imma",
    title: "At the counter",
    caption: "A candid. Phone, white shirt, the bob doing all the identification.",
    credit: "Virtual Humans",
  },
  {
    id: "shudu-orange",
    character: "shudu",
    title: "Ochre",
    caption: "Hands at the hairline, silver hoops, a stack of metal at the throat.",
    credit: "Quartz",
  },
  {
    id: "miquela-neon",
    character: "miquela",
    title: "Gels",
    caption: "Color on a face study. The freckles stay.",
    credit: "The Cut",
  },
  {
    id: "imma-motion",
    character: "imma",
    title: "Three exposures",
    caption: "One figure, three passes, a single pink ground. Studio still from Aww.",
    credit: "Aww Inc.",
  },
  {
    id: "shudu-veil",
    character: "shudu",
    title: "Bronze veil",
    caption: "A draped head, almost no set. The portrait The New Yorker ran.",
    credit: "The New Yorker",
  },
  {
    id: "miquela-yellow",
    character: "miquela",
    title: "Yellow culottes",
    caption: "Full length, outside. Black knit, a green storefront, white sneakers.",
    credit: "The Cut",
  },
  {
    id: "imma-static",
    character: "imma",
    title: "Static room",
    caption: "Seated among cathode-ray sets. Stars on the sleeve.",
    credit: "Virtual Humans",
  },
  {
    id: "shudu-gold",
    character: "shudu",
    title: "Gold collar",
    caption: "Ball hoops and a stacked collar. Tight crop, warm ground.",
    credit: "The Independent",
  },
  {
    id: "miquela-stripe",
    character: "miquela",
    title: "Striped knit",
    caption: "Close crop. Ribbed stripe, fringe cut straight across.",
    credit: "The Cut",
  },
  {
    id: "imma-profile",
    character: "imma",
    title: "Profile",
    caption: "Lashes, a mole, the line of the fringe. Almost nothing else.",
    credit: "Virtual Humans",
  },
  {
    id: "shudu-roll",
    character: "shudu",
    title: "Roll-neck",
    caption: "Black knit, no props. A studio head from The Diigitals.",
    credit: "The Diigitals",
  },
  {
    id: "miquela-leather",
    character: "miquela",
    title: "Green leather",
    caption: "Jacket off one shoulder, flat orange ground. A Wired portrait.",
    credit: "Wired",
  },
  {
    id: "imma-pfw",
    character: "imma",
    title: "On set",
    caption: "Blue coat, repeated. A fashion-week still, as carried by Virtual Humans.",
    credit: "Virtual Humans",
  },
  {
    id: "shudu-yellow",
    character: "shudu",
    title: "Soulsky",
    caption: "The yellow shirt. Giraffe, acacia, one arm raised.",
    credit: "The Cut",
  },
  {
    id: "miquela-red",
    character: "miquela",
    title: "Red puffer",
    caption: "A phone held too close. One eye, the fringe, glossy red nylon.",
    credit: "Sound of Life",
  },
  {
    id: "imma-studio",
    character: "imma",
    title: "Pink sweep",
    caption: "Headshot. Gloss, a precise fringe, nothing in the background but color.",
    credit: "Aww Inc.",
  },
  {
    id: "shudu-banner",
    character: "shudu",
    title: "Turned",
    caption: "Another black ground, the face turned toward the light. The Diigitals.",
    credit: "The Diigitals",
  },
];

const byHandle = new Map(characters.map((character) => [character.handle, character]));
const byId = new Map(pins.map((pin) => [pin.id, pin]));

export function getCharacter(handle: string) {
  return byHandle.get(handle as Handle);
}

export function getPin(id: string) {
  return byId.get(id);
}

export function pinsFor(handle: Handle) {
  return pins.filter((pin) => pin.character === handle);
}

export function pinSrc(id: string) {
  return `/stills/${id}.jpg`;
}
