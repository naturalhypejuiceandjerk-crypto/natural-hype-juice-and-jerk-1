const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP"
});

const menuItems = [
  {
    id: "jerk-chicken",
    name: "Jerk Chicken",
    category: "Main Meals",
    type: "meal",
    description: "Classic jerk chicken served as a main meal in medium or large.",
    options: [
      { label: "Medium", price: 11.5 },
      { label: "Large", price: 12.5 }
    ]
  },
  {
    id: "fried-chicken",
    name: "Fried Chicken",
    category: "Main Meals",
    type: "meal",
    description: "Crispy fried chicken meal served in medium or large.",
    options: [
      { label: "Medium", price: 11.0 },
      { label: "Large", price: 12.0 }
    ]
  },
  {
    id: "pepper-steak",
    name: "Pepper Steak",
    category: "Main Meals",
    type: "meal",
    description: "Pepper steak main meal with bold island flavour.",
    options: [
      { label: "Medium", price: 11.0 },
      { label: "Large", price: 12.0 }
    ]
  },
  {
    id: "oxtail",
    name: "Oxtail",
    category: "Main Meals",
    type: "meal",
    description: "Slow-cooked oxtail with rich flavour and tender meat.",
    options: [
      { label: "Medium", price: 11.7 },
      { label: "Large", price: 12.7 }
    ]
  },
  {
    id: "barbe-fried",
    name: "Barbe Fried",
    category: "Main Meals",
    type: "meal",
    description: "Barbe fried main meal served in medium or large.",
    options: [
      { label: "Medium", price: 11.0 },
      { label: "Large", price: 12.0 }
    ]
  },
  {
    id: "fried-fish",
    name: "Sweet Chilli Fried Fish",
    category: "Main Meals",
    type: "meal",
    description: "Sweet chilli fried fish served in medium or large.",
    options: [
      { label: "Medium", price: 11.8 },
      { label: "Large", price: 12.8 }
    ]
  },
  {
    id: "fried-fish-boneless",
    name: "Fried Fish (Boneless)",
    category: "Main Meals",
    type: "meal",
    description: "Boneless fried fish meal served in two sizes.",
    options: [
      { label: "Medium", price: 11.8 },
      { label: "Large", price: 12.8 }
    ]
  },
  {
    id: "escovitch-fish-bone",
    name: "Escovitch Fish (Bone)",
    category: "Main Meals",
    type: "meal",
    description: "Escovitch-style fish served on the bone.",
    options: [
      { label: "Medium", price: 11.8 },
      { label: "Large", price: 12.8 }
    ]
  },
  {
    id: "mix-match-meal-box",
    name: "Mix & Match Meal Box",
    category: "Main Meals",
    type: "meal",
    description: "2 meats plus rice, steam veg, pasta salad or coleslaw.",
    options: [{ label: "Meal Box", price: 16.0 }]
  },
  {
    id: "original-jerk-chicken-salad",
    name: "Original Jerk Chicken",
    category: "Salad Boxes",
    type: "salad",
    description: "Fresh salad box topped with original jerk chicken.",
    options: [{ label: "Salad Box", price: 8.5 }]
  },
  {
    id: "pineapple-jerk-chicken-salad",
    name: "Pineapple Jerk Chicken",
    category: "Salad Boxes",
    type: "salad",
    description: "Salad box with pineapple jerk chicken.",
    options: [{ label: "Salad Box", price: 9.0 }]
  },
  {
    id: "honey-glazed-chicken-salad",
    name: "Honey Glazed Chicken",
    category: "Salad Boxes",
    type: "salad",
    description: "Salad box finished with honey glazed chicken.",
    options: [{ label: "Salad Box", price: 9.0 }]
  },
  {
    id: "curry-goat-salad-box",
    name: "Curry Goat",
    category: "Salad Boxes",
    type: "salad",
    description: "Curry goat served as a salad box option.",
    options: [{ label: "Salad Box", price: 8.5 }]
  },
  {
    id: "boneless-fish-salad-box",
    name: "Boneless Fish (Plain/Sweet Chilli)",
    category: "Salad Boxes",
    type: "salad",
    description: "Boneless fish salad box, plain or sweet chilli.",
    options: [{ label: "Salad Box", price: 10.0 }]
  },
  {
    id: "barbe-fried-chicken-salad-box",
    name: "Barbe Fried Chicken",
    category: "Salad Boxes",
    type: "salad",
    description: "Barbe fried chicken served as a salad box.",
    options: [{ label: "Salad Box", price: 9.0 }]
  },
  {
    id: "meat-free-salad-box",
    name: "Meat Free",
    category: "Salad Boxes",
    type: "salad",
    description: "Meat-free salad box option.",
    options: [{ label: "Salad Box", price: 8.5 }]
  },
  {
    id: "honey-glazed-chicken-special",
    name: "Honey Glazed Chicken",
    category: "Specials",
    type: "meal",
    description: "Honey glazed chicken special in medium or large.",
    options: [
      { label: "Medium", price: 12.5 },
      { label: "Large", price: 13.5 }
    ]
  },
  {
    id: "curry-jerk-chicken-special",
    name: "Curry Jerk Chicken",
    category: "Specials",
    type: "meal",
    description: "Curry jerk chicken special with bold flavour.",
    options: [
      { label: "Medium", price: 12.5 },
      { label: "Large", price: 13.5 }
    ]
  },
  {
    id: "red-pease-soup",
    name: "Red Pease Soup",
    category: "Soups",
    type: "soup",
    description: "Comforting red pease soup served hot.",
    options: [
      { label: "Medium", price: 6.0 },
      { label: "Large", price: 7.0 }
    ]
  },
  {
    id: "chicken-soup",
    name: "Chicken Soup",
    category: "Soups",
    type: "soup",
    description: "Traditional chicken soup made fresh and warming.",
    options: [
      { label: "Medium", price: 5.5 },
      { label: "Large", price: 6.5 }
    ]
  },
  {
    id: "beetroot-berries-juice",
    name: "Beetroot Berries",
    category: "Juices",
    type: "juice",
    description: "Fresh beetroot and berries juice.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "carrot-pineapple-ginger-juice",
    name: "Carrot, Pineapple, Ginger",
    category: "Juices",
    type: "juice",
    description: "Carrot, pineapple, and ginger blend.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "kiwi-cucumber-pineapple-juice",
    name: "Kiwi, Cucumber, Pineapple",
    category: "Juices",
    type: "juice",
    description: "Refreshing kiwi, cucumber, and pineapple mix.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "irish",
    name: "Irish Seamoss Mix",
    category: "Juices",
    type: "juice",
    description: "Irish delicious seamoss",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
      ]
  },
  {
    id: "lemon-seamoss-mix",
    name: "Lemon Seamoss Mix",
    category: "Juices",
    type: "juice",
    description: "House lemon seamoss mix juice.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "strawberry-seamoss-mix",
    name: "Strawberry Seamoss Mix",
    category: "Juices",
    type: "juice",
    description: "Strawberry seamoss blend.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "mango-seamoss-mix",
    name: "Mango Seamoss Mix",
    category: "Juices",
    type: "juice",
    description: "Mango seamoss blend.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "carrot",
    name: "Carrot Seamoss mix",
    category: "Juices",
    type:"juice",
    description: "Delicios carrot seamoss mix.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
    {
    id: "seamoss",
    name: "Original Seamoss",
    category: "Juices",
    type: "juice",
    description: "Original Seamoss flavour.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id:"oli",
    name:"Sorrel Seamoss Mix",
    category:"Juices",
    type:"juice",
    description:"Jamaican Sorrel natural seamoss",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
    
  {
    id: "pineapple-fruits-seamoss-mix",
    name: "Pineapple Seamoss Mix",
    category: "Juices",
    type: "juice",
    description: "Pineapple seamoss blend.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "magnum-punch",
    name: "Magnum Punch",
    category: "Juices",
    type: "juice",
    description: "Bold house punch served medium or large.",
    options: [
      { label: "Small", price: 4.5 },
      { label: "Large", price: 6.5 }
    ]
  },
  {
    id: "guinness-punch",
    name: "Guinness Punch",
    category: "Juices",
    type: "juice",
    description: "Rich Guinness punch.",
    options: [
      { label: "Small", price: 4.5 },
      { label: "Large", price: 6.5 }
    ]
  },
  {
    id: "beetroot-berries-water",
    name: "Beetroot Berries",
    category: "Flavoured Water",
    type: "drink",
    description: "Flavoured water with beetroot and berries.",
    options: [{ label: "Bottle", price: 3.5 }]
  },
  {
    id: "carrot-pineapple-ginger-water",
    name: "Carrot Pineapple Ginger",
    category: "Flavoured Water",
    type: "drink",
    description: "Flavoured water with carrot, pineapple, and ginger.",
    options: [{ label: "Bottle", price: 3.5 }]
  },
  {
    id: "kiwi-cucumber-pineapple-water",
    name: "Kiwi Cucumber Pineapple",
    category: "Flavoured Water",
    type: "drink",
    description: "Crisp kiwi, cucumber, and pineapple water.",
    options: [{ label: "Bottle", price: 3.5 }]
  },
  {
    id: "dumpling",
    name: "Dumpling",
    category: "Finger Food",
    type: "snack",
    description: "Single dumpling.",
    options: [{ label: "Portion", price: 1.5 }]
  },
  {
    id: "patties",
    name: "Patties",
    category: "Finger Food",
    type: "snack",
    description: "Fresh patties.",
    options: [{ label: "Portion", price: 3.0 }]
  },
  {
    id: "dumpling-split-chicken",
    name: "Dumpling Split - Chicken",
    category: "Finger Food",
    type: "snack",
    description: "Dumpling split filled with chicken.",
    options: [{ label: "Portion", price: 4.5 }]
  },
  {
    id: "dumpling-split-oxtail",
    name: "Dumpling Split - Oxtail",
    category: "Finger Food",
    type: "snack",
    description: "Dumpling split filled with oxtail.",
    options: [{ label: "Portion", price: 5.0 }]
  },
  {
    id: "dumpling-split-curry-goat",
    name: "Dumpling Split - Curry Goat",
    category: "Finger Food",
    type: "snack",
    description: "Dumpling split filled with curry goat.",
    options: [{ label: "Portion", price: 5.0 }]
  },
  {
    id: "dumpling-split-veggie",
    name: "Dumpling Split - Veggie",
    category: "Finger Food",
    type: "snack",
    description: "Vegetarian dumpling split option.",
    options: [{ label: "Portion", price: 5.0 }]
  },
  {
    id: "dumpling-split-ackee-saltfish",
    name: "Dumpling Split - Ackee & Saltfish",
    category: "Finger Food",
    type: "snack",
    description: "Dumpling split filled with ackee and saltfish.",
    options: [{ label: "Portion", price: 7.0 }]
  },
  {
    id: "saltfish-fritter",
    name: "Saltfish Fritter",
    category: "Finger Food",
    type: "snack",
    description: "House saltfish fritter.",
    options: [{ label: "Portion", price: 3.0 }]
  },
  {
    id: "mac-n-cheese",
    name: "Mac N Cheese",
    category: "Finger Food",
    type: "snack",
    description: "Mac and cheese side.",
    options: [{ label: "Portion", price: 5.0 }]
  },
  {
    id:"jerk-chicken-split",
    name:"Ckicken(Split)",
    category:"Finger Food",
    type:"snack",
    description: "Tender grilled chicken in a warm toasted bun.",
    options: [{ label: "Portion", price: 4.50 }] 
  },  
  {
    id: "three-wing-portion",
    name: "3 Wing Portion",
    category: "Finger Food",
    type: "snack",
    description: "3 wing portion, jerk or plain wings.",
    options: [{ label: "Portion", price: 4.0 }]
  },
  {
    id: "festival",
    name: "Festival",
    category: "Finger Food",
    type: "snack",
    description: "Traditional festival.",
    options: [{ label: "Portion", price: 1.5 }]
  },
  {
    id: "curry-jerk-portion",
    name: "Curry Jerk Portion",
    category: "Finger Food",
    type: "snack",
    description: "Curry jerk portion.",
    options: [{ label: "Portion", price: 6.0 }]
  },
  {
    id: "plantain-portion",
    name: "Plantain Port 4pcs",
    category: "Finger Food",
    type: "snack",
    description: "Plantain portion with 4 pieces.",
    options: [{ label: "Portion", price: 3.0 }]
  },
  {
    id: "variety-snack-box",
    name: "Variety Snack Box",
    category: "Finger Food",
    type: "snack",
    description: "2pcs chicken, chips, gravy and plantain.",
    options: [{ label: "Snack Box", price: 8.0 }]
  }
];

const assetBase = window.location.protocol === "file:" ? "public/assets/menu" : "/assets/menu";

const photoAssets = {
  "jerk-chicken": `${assetBase}/jerk-chicken-rice-bowl-optimized.webp`,
  "oli": `${assetBase}/oli.png`,
  "fried-chicken": `${assetBase}/fried-chicken-rice-bowl-optimized.webp`,
  "pepper-steak": `${assetBase}/pepper-steak-optimized.webp`,
  "curry-goat": `${assetBase}/curry-goat-rice-bowl-optimized.webp`,
  "oxtail": `${assetBase}/oxtail.webp`,
  "irish": `${assetBase}/irish.png`,
  "seamoss": `${assetBase}/seamoss.jpeg`,
  "barbe-fried": `${assetBase}/barbe-fried-bowl-optimized.webp`,
  "mix-match-meal-box": `${assetBase}/jerk-chicken-bowl-optimized.webp`,
  "original-jerk-chicken-salad": `${assetBase}/jerk-chicken-salad-bowl-optimized.webp`,
  "pineapple-jerk-chicken-salad": `${assetBase}/pineapple-jerk.jpg`,
  "honey-glazed-chicken-salad": `${assetBase}/honey-glazed-chicken.jpg`,
  "fried-chicken-salad-box": `${assetBase}/fried-chicken-salad-bowl-optimized.webp`,
  "pepper-steak-salad-box": `${assetBase}/pepper-steak-optimized.webp`,
  "curry-goat-salad-box": `${assetBase}/curry-goat.jpg`,
  "barbe-fried-chicken-salad-box": `${assetBase}/barbe-fried-bowl-optimized.webp`,
  "honey-glazed-chicken-special": `${assetBase}/honey-glazed-chicken.jpg`,
  "curry-jerk-chicken-special": `${assetBase}/curry-style-chicken.jpg`,
  "pineapple-jerk-chicken-special": `${assetBase}/pineapple-jerk.jpg`,
  "curry-oxtail-special": `${assetBase}/curry-goat-rice-bowl-optimized.webp`,
  "beetroot-berries-juice": `${assetBase}/beetroot-berries-optimized.webp`,
  "carrot-pineapple-ginger-juice": `${assetBase}/pineapple-carrot-ginger-optimized.webp`,
  "kiwi-cucumber-pineapple-juice": `${assetBase}/kiwi-cucumber-pineapple-optimized.webp`,
  "guinness-punch": `${assetBase}/guinness-punch-optimized.webp`,
  "strawberry-seamoss-mix": `${assetBase}/strawbery.jpeg`,
  "lemon-seamoss-mix": `${assetBase}/lemon.jpeg`,
  "pineapple-water": `${assetBase}/pineapple-carrot-ginger-optimized.webp`,
  "beetroot-berries-water": `${assetBase}/beetroot-berries-optimized.webp`,
  "carrot-pineapple-ginger-water": `${assetBase}/pineapple-carrot-ginger-optimized.webp`,
  "kiwi-cucumber-pineapple-water": `${assetBase}/kiwi-cucumber-pineapple-optimized.webp`,
  "fried-chicken-portion": `${assetBase}/fried-chicken.jpg`,
  "jerk-chicken-portion": `${assetBase}/jamaican-jerk-chicken.jpg`,
  "jerk-chicken-split": `${assetBase}/jerk-chicken-split.jpg`,
  "honey-glazed-portion": `${assetBase}/honey-glazed-chicken.jpg`,
  "curry-jerk-portion": `${assetBase}/curry-style-chicken.jpg`
};

const riceOptions = [
  "No rice",
  "Pumpkin rice",
  "White rice",
  "Rice and peas"
];

const serviceFees = {
  pickup: 0,
  "dine-in": 0
};

const state = {
  cart: [],
  activeCategory: "All",
  query: "",
  stripeEnabled: false
};

const filtersElement = document.getElementById("filters");
const menuGridElement = document.getElementById("menuGrid");
const menuSearchElement = document.getElementById("menuSearch");
const cartItemsElement = document.getElementById("cartItems");
const subtotalValueElement = document.getElementById("subtotalValue");
const serviceFeeValueElement = document.getElementById("serviceFeeValue");
const totalValueElement = document.getElementById("totalValue");
const cartChipElement = document.getElementById("cartChip");
const checkoutFormElement = document.getElementById("checkoutForm");
const serviceModeElement = document.getElementById("serviceMode");
const formMessageElement = document.getElementById("formMessage");
const clearCartButton = document.getElementById("clearCartButton");
const toastElement = document.getElementById("toast");
const paymentBadge = document.getElementById("paymentBadge");
const paymentDescription = document.getElementById("paymentDescription");
const checkoutNote = document.getElementById("checkoutNote");
const heroArtwork = document.getElementById("heroArtwork");
const phoneInput = document.getElementById("phoneInput");

function showToast(message) {
  if (!toastElement) {
    return;
  }

  toastElement.textContent = message;
  toastElement.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toastElement.classList.remove("show");
  }, 2600);
}

function getCategories() {
  return ["All", ...new Set(menuItems.map((item) => item.category))];
}

function paletteForCategory(category) {
  const map = {
    "Main Meals": ["#ffb24d", "#ff8d1c", "#fff2dd"],
    "Salad Boxes": ["#78d652", "#2d7a34", "#eefbe7"],
    Specials: ["#ff9f4f", "#e05f12", "#fff0df"],
    Soups: ["#ffb65f", "#d76a0b", "#fff1df"],
    Juices: ["#ffc94a", "#6dbd45", "#fff8d7"],
    "Flavoured Water": ["#67d4ff", "#2d7a34", "#e8fbff"],
    "Finger Food": ["#ffb566", "#d85a13", "#fff0df"]
  };
  return map[category] || ["#ffb24d", "#2d7a34", "#fff4e8"];
}

function iconByType(type) {
  if (type === "meal") {
    return `
      <ellipse cx="260" cy="205" rx="126" ry="32" fill="rgba(255,255,255,0.5)" />
      <ellipse cx="255" cy="188" rx="96" ry="58" fill="#fff8ed" stroke="rgba(45,122,52,0.12)" stroke-width="4" />
      <ellipse cx="226" cy="176" rx="30" ry="36" fill="#84491a" />
      <circle cx="212" cy="162" r="13" fill="#ff9f2d" />
      <circle cx="298" cy="170" r="18" fill="#7ec63f" />
      <circle cx="322" cy="188" r="15" fill="#db3d2d" />
      <circle cx="280" cy="203" r="16" fill="#2d7a34" />
      <rect x="164" y="120" width="156" height="12" rx="6" fill="rgba(255,255,255,0.28)" />
    `;
  }

  if (type === "salad") {
    return `
      <ellipse cx="260" cy="212" rx="122" ry="24" fill="rgba(255,255,255,0.45)" />
      <path d="M160 138h190c0 44-20 84-94 84s-96-40-96-84z" fill="#fffdf6" stroke="rgba(45,122,52,0.12)" stroke-width="4" />
      <circle cx="208" cy="164" r="20" fill="#3fb34a" />
      <circle cx="260" cy="156" r="24" fill="#70d243" />
      <circle cx="304" cy="168" r="18" fill="#ff6a45" />
      <circle cx="240" cy="184" r="14" fill="#ffb73d" />
      <circle cx="286" cy="190" r="15" fill="#2d7a34" />
    `;
  }

  if (type === "soup") {
    return `
      <ellipse cx="260" cy="216" rx="120" ry="24" fill="rgba(255,255,255,0.45)" />
      <path d="M162 158h192c0 42-22 66-96 66-74 0-96-24-96-66z" fill="#fffef9" stroke="rgba(45,122,52,0.12)" stroke-width="4" />
      <ellipse cx="258" cy="158" rx="74" ry="24" fill="#d68a46" />
      <path d="M210 108c8 10 9 18 2 30" stroke="rgba(255,255,255,0.85)" stroke-width="6" stroke-linecap="round" fill="none" />
      <path d="M246 98c8 12 10 22 3 36" stroke="rgba(255,255,255,0.85)" stroke-width="6" stroke-linecap="round" fill="none" />
      <path d="M286 110c7 10 8 20 2 31" stroke="rgba(255,255,255,0.85)" stroke-width="6" stroke-linecap="round" fill="none" />
    `;
  }

  if (type === "snack") {
    return `
      <ellipse cx="260" cy="212" rx="124" ry="26" fill="rgba(255,255,255,0.45)" />
      <circle cx="256" cy="170" r="72" fill="#313131" />
      <circle cx="256" cy="170" r="60" fill="#202020" />
      <circle cx="228" cy="164" r="20" fill="#ffd564" />
      <circle cx="286" cy="180" r="22" fill="#3e9f3c" />
      <circle cx="252" cy="190" r="18" fill="#ff7a4a" />
      <rect x="312" y="174" width="80" height="18" rx="9" fill="#313131" transform="rotate(12 312 174)" />
    `;
  }

  return `
    <ellipse cx="260" cy="214" rx="112" ry="24" fill="rgba(255,255,255,0.45)" />
    <rect x="212" y="88" width="92" height="126" rx="26" fill="#fff8f0" />
    <rect x="228" y="102" width="60" height="82" rx="20" fill="rgba(255,147,20,0.38)" />
    <circle cx="258" cy="142" r="22" fill="rgba(45,122,52,0.32)" />
    <path d="M320 122c20 16 28 30 28 48s-14 34-36 34" stroke="rgba(255,255,255,0.8)" stroke-width="10" stroke-linecap="round" fill="none" />
  `;
}

function createArtwork(item) {
  const [accent, secondary, base] = paletteForCategory(item.category);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" role="img" aria-label="${item.name}">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" rx="34" fill="url(#bg)" />
      <circle cx="430" cy="80" r="82" fill="rgba(255,255,255,0.18)" />
      <circle cx="96" cy="282" r="74" fill="rgba(255,255,255,0.14)" />
      <rect x="28" y="24" width="148" height="34" rx="17" fill="rgba(255,255,255,0.24)" />
      <text x="42" y="46" fill="#ffffff" font-size="20" font-family="DM Sans, Arial" font-weight="700">${item.category}</text>
      <rect x="64" y="70" width="392" height="214" rx="34" fill="${base}" />
      ${iconByType(item.type)}
      <rect x="34" y="294" width="452" height="40" rx="18" fill="rgba(29,50,31,0.22)" />
      <text x="48" y="320" fill="#ffffff" font-size="24" font-family="DM Sans, Arial" font-weight="800">${item.name}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getItemImage(item) {
  return photoAssets[item.id] || createArtwork(item);
}

function itemAllowsRice(item) {
  return item.type === "meal";
}

function getSelectedRice(itemId) {
  const select = document.querySelector(`[data-rice-select="${itemId}"]`);
  return select ? select.value : "";
}

function loadCart() {
  try {
    const saved = window.localStorage.getItem("naturalHypeCart");
    state.cart = saved ? JSON.parse(saved) : [];
  } catch (error) {
    state.cart = [];
  }
}

function saveCart() {
  window.localStorage.setItem("naturalHypeCart", JSON.stringify(state.cart));
}

function setMessage(message, isError = false) {
  if (!formMessageElement) {
    return;
  }

  formMessageElement.textContent = message;
  formMessageElement.style.color = isError ? "#b42318" : "var(--green)";
}

function getServiceFee() {
  if (!serviceModeElement) {
    return 0;
  }

  return serviceFees[serviceModeElement.value] || 0;
}

function getCartTotals() {
  const subtotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const serviceFee = subtotal > 0 ? getServiceFee() : 0;
  return {
    subtotal,
    serviceFee,
    total: subtotal + serviceFee
  };
}

function renderFilters() {
  if (!filtersElement) {
    return;
  }

  const categories = getCategories();
  filtersElement.innerHTML = categories
    .map((category) => {
      const activeClass = category === state.activeCategory ? "active" : "";
      return `<button class="filter-button ${activeClass}" type="button" data-category="${category}">${category}</button>`;
    })
    .join("");
}

function renderMenu() {
  if (!menuGridElement) {
    return;
  }

  const query = state.query.trim().toLowerCase();
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = state.activeCategory === "All" || item.category === state.activeCategory;
    const haystack = `${item.name} ${item.description} ${item.category}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesCategory && matchesQuery;
  });

  if (!filteredItems.length) {
    menuGridElement.innerHTML = `<article class="menu-card"><h3>No items found</h3><p>Try another category or search term.</p></article>`;
    return;
  }

  menuGridElement.innerHTML = filteredItems
    .map((item) => {
      const optionsMarkup = item.options
        .map(
          (option, index) =>
            `<option value="${index}">${option.label} - ${currencyFormatter.format(option.price)}</option>`
        )
        .join("");

      return `
        <article class="menu-card">
          <div class="menu-card-image">
            <img src="${getItemImage(item)}" alt="${item.name}" loading="lazy" />
          </div>
          <div class="menu-meta">
            <span class="pill">${item.category}</span>
            <span class="pill">${item.options.length} option${item.options.length > 1 ? "s" : ""}</span>
          </div>
          <div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
          <div class="price-row">
            <strong>${currencyFormatter.format(item.options[0].price)}</strong>
            <span>From</span>
          </div>
          <label>
            <span>Choose size</span>
            <select data-item-select="${item.id}">
              ${optionsMarkup}
            </select>
          </label>
          ${
            itemAllowsRice(item)
              ? `
                <label>
                  <span>Rice option</span>
                  <select data-rice-select="${item.id}">
                    ${riceOptions.map((rice) => `<option value="${rice}">${rice}</option>`).join("")}
                  </select>
                </label>
              `
              : ""
          }
          <button type="button" data-add-item="${item.id}">Add to cart</button>
        </article>
      `;
    })
    .join("");
}

function renderCart() {
  if (!cartItemsElement || !subtotalValueElement || !serviceFeeValueElement || !totalValueElement) {
    if (cartChipElement) {
      cartChipElement.textContent = `Cart ${state.cart.reduce((sum, item) => sum + item.quantity, 0)}`;
    }
    return;
  }

  if (!state.cart.length) {
    cartItemsElement.innerHTML = `<div class="empty-cart">Your cart is empty. Add meals, salad boxes, soups, juices, or finger food to begin.</div>`;
  } else {
    cartItemsElement.innerHTML = state.cart
      .map(
        (item) => `
          <article class="cart-item">
            <div class="cart-item-top">
              <div>
                <strong>${item.name}</strong>
                <span>${[item.optionLabel, item.rice].filter(Boolean).join(" - ")}</span>
              </div>
              <strong>${currencyFormatter.format(item.price * item.quantity)}</strong>
            </div>
            <div class="cart-item-bottom">
              <span>${currencyFormatter.format(item.price)} each</span>
              <div class="quantity-controls">
                <button type="button" data-quantity="${item.cartId}" data-change="-1">-</button>
                <strong>${item.quantity}</strong>
                <button type="button" data-quantity="${item.cartId}" data-change="1">+</button>
                <button type="button" data-remove="${item.cartId}">Remove</button>
              </div>
            </div>
          </article>
        `
      )
      .join("");
  }

  const totals = getCartTotals();
  subtotalValueElement.textContent = currencyFormatter.format(totals.subtotal);
  serviceFeeValueElement.textContent = currencyFormatter.format(totals.serviceFee);
  totalValueElement.textContent = currencyFormatter.format(totals.total);
  if (cartChipElement) {
    cartChipElement.textContent = `Cart ${state.cart.reduce((sum, item) => sum + item.quantity, 0)}`;
  }
}

function addToCart(itemId) {
  const item = menuItems.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  const select = document.querySelector(`[data-item-select="${item.id}"]`);
  const optionIndex = Number(select.value || 0);
  const option = item.options[optionIndex];
  const selectedRice = getSelectedRice(item.id);
  const cartId = `${item.id}-${option.label}-${selectedRice}`;
  const existing = state.cart.find((entry) => entry.cartId === cartId);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      cartId,
      itemId: item.id,
      name: item.name,
      optionLabel: option.label,
      rice: selectedRice,
      price: option.price,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  showToast(`${item.name} added to cart`);
}

function updateQuantity(cartId, change) {
  const item = state.cart.find((entry) => entry.cartId === cartId);
  if (!item) {
    return;
  }

  item.quantity += change;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.cartId !== cartId);
  }

  saveCart();
  renderCart();
}

function removeItem(cartId) {
  state.cart = state.cart.filter((entry) => entry.cartId !== cartId);
  saveCart();
  renderCart();
}

function updateServiceField() {
  renderCart();
}

function formatUkPhoneNumber(value) {
  const trimmed = value.trim();
  let digits = trimmed.replace(/\D/g, "");

  if (trimmed.startsWith("+44")) {
    digits = `0${digits.slice(2)}`;
  } else if (digits.startsWith("44")) {
    digits = `0${digits.slice(2)}`;
  }

  digits = digits.slice(0, 11);

  if (digits.length <= 5) {
    return digits;
  }

  if (digits.startsWith("02") && digits.length > 3) {
    return [digits.slice(0, 3), digits.slice(3, 7), digits.slice(7)].filter(Boolean).join(" ");
  }

  if (digits.startsWith("01") && digits.length > 4) {
    return [digits.slice(0, 4), digits.slice(4, 7), digits.slice(7)].filter(Boolean).join(" ");
  }

  return [digits.slice(0, 5), digits.slice(5)].filter(Boolean).join(" ");
}

async function loadConfig() {
  try {
    const response = await fetch("/api/config");
    const config = await response.json();
    state.stripeEnabled = Boolean(config.stripeEnabled);
  } catch (error) {
    state.stripeEnabled = false;
  }

  if (state.stripeEnabled) {
    if (paymentBadge) {
      paymentBadge.textContent = "Secure checkout";
    }
    if (paymentDescription) {
      paymentDescription.textContent =
        "Secure online payment is available for your order.";
    }
    if (checkoutNote) {
      checkoutNote.textContent =
        "You will continue to a secure payment page.";
    }
  } else {
    if (paymentBadge) {
      paymentBadge.textContent = "Online payment unavailable";
    }
    if (paymentDescription) {
      paymentDescription.textContent =
        "Online payment is temporarily unavailable.";
    }
    if (checkoutNote) {
      checkoutNote.textContent =
        "Please try again shortly.";
    }
  }
}

async function handleCheckout(event) {
  if (!checkoutFormElement) {
    return;
  }

  event.preventDefault();
  setMessage("");

  if (!state.cart.length) {
    setMessage("Add at least one menu item before checkout.", true);
    return;
  }

  const formData = new FormData(checkoutFormElement);
  const serviceMode = String(formData.get("serviceMode"));
  const payload = {
    cartItems: state.cart,
    customer: {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim()
    },
    service: {
      mode: serviceMode,
      desiredTime: String(formData.get("desiredTime") || "").trim(),
      address: "",
      notes: String(formData.get("notes") || "").trim(),
      fee: getServiceFee()
    }
  };

  if (!state.stripeEnabled) {
    setMessage("Online payment is unavailable right now.", true);
    return;
  }

  const submitButton = document.getElementById("checkoutButton");
  submitButton.disabled = true;
  submitButton.textContent = "Processing...";

  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Checkout could not start.");
    }

    if (result.mode === "stripe" && result.url) {
      window.location.href = result.url;
      return;
    }
    throw new Error("Payment checkout could not start.");
  } catch (error) {
    setMessage(error.message || "Checkout failed.", true);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Continue to payment";
  }
}

function handleQueryStatus() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("checkout");

  if (status === "success") {
    state.cart = [];
    saveCart();
    renderCart();
    setMessage("Payment completed successfully. The cart has been cleared.");
    showToast("Payment complete");
    window.history.replaceState({}, "", window.location.pathname);
  }

  if (status === "cancelled") {
    setMessage("Payment was cancelled. Your cart is still saved.", true);
    window.history.replaceState({}, "", window.location.pathname);
  }
}

function attachEvents() {
  if (filtersElement) {
    filtersElement.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) {
        return;
      }

      state.activeCategory = button.dataset.category;
      renderFilters();
      renderMenu();
    });
  }

  if (menuSearchElement) {
    menuSearchElement.addEventListener("input", (event) => {
      state.query = event.target.value;
      renderMenu();
    });
  }

  if (menuGridElement) {
    menuGridElement.addEventListener("click", (event) => {
      const button = event.target.closest("[data-add-item]");
      if (!button) {
        return;
      }

      addToCart(button.dataset.addItem);
    });
  }

  if (cartItemsElement) {
    cartItemsElement.addEventListener("click", (event) => {
      const quantityButton = event.target.closest("[data-quantity]");
      if (quantityButton) {
        updateQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
        return;
      }

      const removeButton = event.target.closest("[data-remove]");
      if (removeButton) {
        removeItem(removeButton.dataset.remove);
      }
    });
  }

  if (serviceModeElement) {
    serviceModeElement.addEventListener("change", updateServiceField);
  }

  if (checkoutFormElement) {
    checkoutFormElement.addEventListener("submit", handleCheckout);
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", (event) => {
      event.target.value = formatUkPhoneNumber(event.target.value);
    });
    phoneInput.addEventListener("blur", (event) => {
      event.target.value = formatUkPhoneNumber(event.target.value);
    });
  }

  if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
      state.cart = [];
      saveCart();
      renderCart();
      showToast("Cart cleared");
    });
  }

  if (cartChipElement) {
    cartChipElement.addEventListener("click", () => {
      const checkoutSection = document.getElementById("checkout");
      if (checkoutSection) {
        checkoutSection.scrollIntoView({ behavior: "smooth" });
        return;
      }

      window.location.href = "/checkout.html";
    });
  }
}

function initHeroArtwork() {
  if (!heroArtwork) {
    return;
  }

  const featured = menuItems.find((item) => item.id === "jerk-chicken") || menuItems[0];
  heroArtwork.innerHTML = `<img src="${getItemImage(featured)}" alt="${featured.name}" />`;
}

function init() {
  loadCart();
  renderFilters();
  renderMenu();
  renderCart();
  updateServiceField();
  initHeroArtwork();
  attachEvents();
  loadConfig();
  handleQueryStatus();
}

init();






