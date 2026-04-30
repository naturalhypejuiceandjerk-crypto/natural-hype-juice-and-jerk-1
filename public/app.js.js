const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP"
});

const menuItems = [
  {
    id: "jerk-chicken-dinner",
    name: "Jerk Chicken Dinner",
    category: "Main Meals",
    type: "meal",
    description: "Smoky jerk-seasoned chicken dinner served in your chosen size.",
    options: [
      { label: "Medium", price: 9.0 },
      { label: "Large", price: 10.5 }
    ]
  },
  {
    id: "pineapple-jerk-chicken",
    name: "Pineapple Jerk Chicken",
    category: "Main Meals",
    type: "meal",
    description: "Sweet pineapple notes paired with classic jerk spice.",
    options: [
      { label: "Medium", price: 9.0 },
      { label: "Large", price: 10.5 }
    ]
  },
  {
    id: "curry-jerk-chicken",
    name: "Curry Jerk Chicken",
    category: "Main Meals",
    type: "meal",
    description: "A rich curry twist on jerk chicken flavour.",
    options: [
      { label: "Medium", price: 9.0 },
      { label: "Large", price: 10.5 }
    ]
  },
  {
    id: "fried-chicken-dinner",
    name: "Fried Chicken Dinner",
    category: "Main Meals",
    type: "meal",
    description: "Golden fried chicken dinner in medium or large.",
    options: [
      { label: "Medium", price: 9.0 },
      { label: "Large", price: 10.5 }
    ]
  },
  {
    id: "honey-roast-glaze-chicken",
    name: "Honey Roast Glaze Chicken",
    category: "Main Meals",
    type: "meal",
    description: "Roast chicken with a sticky honey glaze finish.",
    options: [
      { label: "Medium", price: 9.0 },
      { label: "Large", price: 10.5 }
    ]
  },
  {
    id: "brown-stew-chicken-dinner",
    name: "Brown Stew Chicken Dinner",
    category: "Main Meals",
    type: "meal",
    description: "Brown stew chicken dinner with deep savoury flavour.",
    options: [
      { label: "Medium", price: 9.0 },
      { label: "Large", price: 10.5 }
    ]
  },
  {
    id: "pepper-steak-dinner",
    name: "Pepper Steak Dinner",
    category: "Main Meals",
    type: "meal",
    description: "Pepper steak dinner with bold island seasoning.",
    options: [
      { label: "Medium", price: 9.0 },
      { label: "Large", price: 11.5 }
    ]
  },
  {
    id: "curry-chicken-dinner",
    name: "Curry Chicken Dinner",
    category: "Main Meals",
    type: "meal",
    description: "Tender curry chicken dinner with a warming spice blend.",
    options: [
      { label: "Medium", price: 9.0 },
      { label: "Large", price: 11.5 }
    ]
  },
  {
    id: "curry-goat-dinner",
    name: "Curry Goat Dinner",
    category: "Main Meals",
    type: "meal",
    description: "Caribbean curry goat dinner served in two sizes.",
    options: [
      { label: "Medium", price: 9.5 },
      { label: "Large", price: 11.5 }
    ]
  },
  {
    id: "oxtail-dinner",
    name: "Oxtail Dinner",
    category: "Main Meals",
    type: "meal",
    description: "Slow-cooked oxtail dinner packed with rich flavour.",
    options: [
      { label: "Medium", price: 9.5 },
      { label: "Large", price: 11.5 }
    ]
  },
  {
    id: "bbq-fried-chicken-dinner",
    name: "Barbe Fried Chicken",
    category: "Main Meals",
    type: "meal",
    description: "Barbecue-style fried chicken dinner with extra flavour.",
    options: [
      { label: "Medium", price: 9.5 },
      { label: "Large", price: 11.5 }
    ]
  },
  {
    id: "curry-oxtail-dinner",
    name: "Curry Oxtail",
    category: "Main Meals",
    type: "meal",
    description: "Oxtail with a curry kick for a hearty island dinner.",
    options: [
      { label: "Medium", price: 9.5 },
      { label: "Large", price: 11.5 }
    ]
  },
  {
    id: "sweet-chilli-baked-fish",
    name: "Sweet Chilli Baked Fish",
    category: "Main Meals",
    type: "meal",
    description: "Baked fish glazed with sweet chilli sauce.",
    options: [
      { label: "Medium", price: 9.5 },
      { label: "Large", price: 12.0 }
    ]
  },
  {
    id: "fried-fish-dinner",
    name: "Fried Fish Dinner",
    category: "Main Meals",
    type: "meal",
    description: "Crisp fried fish dinner with generous portions.",
    options: [
      { label: "Medium", price: 11.0 },
      { label: "Large", price: 12.0 }
    ]
  },
  {
    id: "steam-fish-dinner",
    name: "Steam Fish Dinner",
    category: "Main Meals",
    type: "meal",
    description: "Steamed fish dinner with fresh and savoury flavour.",
    options: [
      { label: "Medium", price: 11.0 },
      { label: "Large", price: 12.0 }
    ]
  },
  {
    id: "jerk-chicken-salad-box",
    name: "Jerk Chicken Salad Box",
    category: "Salad Boxes",
    type: "salad",
    description: "Fresh salad box topped with jerk chicken.",
    options: [{ label: "Salad Box", price: 5.5 }]
  },
  {
    id: "fried-chicken-salad-box",
    name: "Fried Chicken Salad Box",
    category: "Salad Boxes",
    type: "salad",
    description: "Crunchy fried chicken over a fresh salad box.",
    options: [{ label: "Salad Box", price: 5.5 }]
  },
  {
    id: "boneless-fish-salad-box",
    name: "Boneless Fish Salad Box",
    category: "Salad Boxes",
    type: "salad",
    description: "Boneless fish salad box with light island flavour.",
    options: [{ label: "Salad Box", price: 5.5 }]
  },
  {
    id: "jerk-chicken-wrap",
    name: "Jerk Chicken Wrap",
    category: "Salad Boxes",
    type: "salad",
    description: "Portable jerk chicken wrap for lunch on the go.",
    options: [{ label: "Wrap", price: 6.5 }]
  },
  {
    id: "fried-chicken-wrap",
    name: "Fried Chicken Wrap",
    category: "Salad Boxes",
    type: "salad",
    description: "Fried chicken wrap with crispy texture and fresh fillings.",
    options: [{ label: "Wrap", price: 6.5 }]
  },
  {
    id: "coleslaw",
    name: "Coleslaw",
    category: "Salad Boxes",
    type: "salad",
    description: "Classic cool and creamy side portion.",
    options: [{ label: "Side", price: 1.5 }]
  },
  {
    id: "red-pease-soup",
    name: "Red Pease Soup",
    category: "Soups",
    type: "soup",
    description: "Comforting soup served hot in medium or large.",
    options: [
      { label: "Medium", price: 3.5 },
      { label: "Large", price: 5.0 }
    ]
  },
  {
    id: "chicken-soup",
    name: "Chicken Soup",
    category: "Soups",
    type: "soup",
    description: "Traditional chicken soup made for a warming pick-me-up.",
    options: [
      { label: "Medium", price: 3.5 },
      { label: "Large", price: 5.0 }
    ]
  },
  {
    id: "mutton-soup",
    name: "Mutton Soup",
    category: "Soups",
    type: "soup",
    description: "A hearty mutton soup for a fuller bowl.",
    options: [
      { label: "Medium", price: 3.5 },
      { label: "Large", price: 5.0 }
    ]
  },
  {
    id: "mannish-water",
    name: "Mannish Water",
    category: "Soups",
    type: "soup",
    description: "Bold Caribbean soup with a richer flavour profile.",
    options: [
      { label: "Medium", price: 4.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "carrot-pineapple-ginger-mix",
    name: "Carrot Pineapple Ginger Mix",
    category: "Juices",
    type: "juice",
    description: "A bright fresh blend balancing sweetness with ginger heat.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "kiwi-cucumber-pineapple-mix",
    name: "Kiwi Cucumber Pineapple Mix",
    category: "Juices",
    type: "juice",
    description: "Refreshing green blend with tropical lift.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "beetroot-berries-mix",
    name: "Beetroot Berries Mix",
    category: "Juices",
    type: "juice",
    description: "Earthy beetroot blended with berries for natural sweetness.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "strawberry-sea-moss-mix",
    name: "Strawberry Sea Moss Mix",
    category: "Juices",
    type: "juice",
    description: "Smooth sea moss drink with strawberry flavour.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "blueberry-sea-moss-mix",
    name: "Blueberry Sea Moss Mix",
    category: "Juices",
    type: "juice",
    description: "Blueberry and sea moss blended for a creamy fruit drink.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "sea-moss-mango-mix",
    name: "Sea Moss Mango Mix",
    category: "Juices",
    type: "juice",
    description: "A mango-led sea moss blend with a soft tropical finish.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "natural-sea-moss",
    name: "Natural Sea Moss",
    category: "Juices",
    type: "juice",
    description: "Natural sea moss served in small or large.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "magnum-power-punch",
    name: "Magnum Power Punch",
    category: "Juices",
    type: "juice",
    description: "A punchy house blend with a bold finish.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 5.0 }
    ]
  },
  {
    id: "irish-moss-punch",
    name: "Irish Moss Punch",
    category: "Juices",
    type: "juice",
    description: "Creamy Irish moss punch for a satisfying sip.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 5.0 }
    ]
  },
  {
    id: "guinness-punch",
    name: "Guinness Punch",
    category: "Juices",
    type: "juice",
    description: "Rich Guinness punch with a thicker body.",
    options: [
      { label: "Small", price: 4.0 },
      { label: "Large", price: 6.0 }
    ]
  },
  {
    id: "carrot-beetroot-punch",
    name: "Carrot Beetroot Punch",
    category: "Juices",
    type: "juice",
    description: "Vegetable-forward punch with a sweeter balance.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 5.0 }
    ]
  },
  {
    id: "carrot-pumpkin-punch-small",
    name: "Carrot Pumpkin Punch",
    category: "Juices",
    type: "juice",
    description: "Carrot and pumpkin punch with soft natural sweetness.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Large", price: 5.0 }
    ]
  },
  {
    id: "natural-carrot-juice",
    name: "Natural Carrot Juice",
    category: "Vegan Vegi Juice",
    type: "juice",
    description: "Straight carrot juice for a simple natural refresh.",
    options: [{ label: "Bottle", price: 5.0 }]
  },
  {
    id: "butter-squash-pumpkin",
    name: "Butter-N Squash Pumpkin",
    category: "Vegan Vegi Juice",
    type: "juice",
    description: "Squash and pumpkin blend with a naturally mellow taste.",
    options: [{ label: "Bottle", price: 6.5 }]
  },
  {
    id: "carrot-pumpkin-punch-large",
    name: "Carrot Pumpkin Punch Organic",
    category: "Vegan Vegi Juice",
    type: "juice",
    description: "Organic-style carrot and pumpkin punch.",
    options: [{ label: "Bottle", price: 6.5 }]
  },
  {
    id: "beetroot-carrot-punch-organic",
    name: "Beetroot Carrot Punch",
    category: "Vegan Vegi Juice",
    type: "juice",
    description: "Smooth beetroot and carrot punch.",
    options: [{ label: "Bottle", price: 6.5 }]
  },
  {
    id: "beetroot-berries-melon",
    name: "Beetroot Berries Melon",
    category: "Vegan Vegi Juice",
    type: "juice",
    description: "A fruit-heavy blend with berry depth and melon freshness.",
    options: [{ label: "Bottle", price: 6.5 }]
  },
  {
    id: "beetroot-berries-pineapple",
    name: "Beetroot Berries Pineapple",
    category: "Vegan Vegi Juice",
    type: "juice",
    description: "Pineapple brightens this berry-rich beetroot blend.",
    options: [{ label: "Bottle", price: 6.5 }]
  },
  {
    id: "flavoured-water-beetroot-berries",
    name: "Beetroot Berries Water",
    category: "Flavoured Water",
    type: "drink",
    description: "Light flavoured water with beetroot and berry notes.",
    options: [{ label: "Bottle", price: 1.5 }]
  },
  {
    id: "flavoured-water-cucumber-pineapple",
    name: "Cucumber Pineapple Water",
    category: "Flavoured Water",
    type: "drink",
    description: "Crisp cucumber and pineapple in a chilled water blend.",
    options: [{ label: "Bottle", price: 1.5 }]
  },
  {
    id: "flavoured-water-carrot-pineapple-ginger",
    name: "Carrot Pineapple Ginger Water",
    category: "Flavoured Water",
    type: "drink",
    description: "Light water infusion with carrot, pineapple, and ginger.",
    options: [{ label: "Bottle", price: 1.5 }]
  },
  {
    id: "flavoured-water-pineapple",
    name: "Pineapple Water",
    category: "Flavoured Water",
    type: "drink",
    description: "Simple pineapple water with tropical sweetness.",
    options: [{ label: "Bottle", price: 1.5 }]
  },
  {
    id: "tropical-rhythm",
    name: "Tropical Rhythm",
    category: "Caribbean Drinks",
    type: "drink",
    description: "Popular Caribbean bottled drink.",
    options: [{ label: "Bottle", price: 2.5 }]
  },
  {
    id: "soft-drink",
    name: "Soft Drink",
    category: "Caribbean Drinks",
    type: "drink",
    description: "Classic fizzy soft drink option.",
    options: [{ label: "Bottle", price: 2.0 }]
  },
  {
    id: "tru-juice",
    name: "Tru Juice",
    category: "Caribbean Drinks",
    type: "drink",
    description: "Fruit-forward bottled drink.",
    options: [{ label: "Bottle", price: 2.0 }]
  },
  {
    id: "bigga",
    name: "Bigga",
    category: "Caribbean Drinks",
    type: "drink",
    description: "Caribbean favourite soft drink.",
    options: [{ label: "Bottle", price: 2.0 }]
  },
  {
    id: "tropical-vibes",
    name: "Tropical Vibes",
    category: "Caribbean Drinks",
    type: "drink",
    description: "Smooth tropical bottled drink.",
    options: [{ label: "Bottle", price: 1.8 }]
  },
  {
    id: "water",
    name: "Water",
    category: "Caribbean Drinks",
    type: "drink",
    description: "Simple bottled water.",
    options: [{ label: "Bottle", price: 1.0 }]
  },
  {
    id: "can-drink",
    name: "Can",
    category: "Caribbean Drinks",
    type: "drink",
    description: "Tinned drink option.",
    options: [{ label: "Can", price: 1.2 }]
  },
  {
    id: "ackee-saltfish",
    name: "Ackee n Salt Fish",
    category: "Cooked Breakfast",
    type: "breakfast",
    description: "A Jamaican breakfast staple served hot.",
    options: [{ label: "Portion", price: 4.0 }]
  },
  {
    id: "cabbage",
    name: "Cabbage",
    category: "Cooked Breakfast",
    type: "breakfast",
    description: "Breakfast-side cabbage option.",
    options: [{ label: "Portion", price: 3.5 }]
  },
  {
    id: "callaloo",
    name: "Callaloo",
    category: "Cooked Breakfast",
    type: "breakfast",
    description: "Classic cooked callaloo portion.",
    options: [{ label: "Portion", price: 4.0 }]
  },
  {
    id: "cornmeal-porridge",
    name: "Cornmeal Porridge",
    category: "Porridges",
    type: "porridge",
    description: "Creamy porridge available in three sizes.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Medium", price: 4.5 },
      { label: "Large", price: 5.5 }
    ]
  },
  {
    id: "banana-porridge",
    name: "Banana Porridge",
    category: "Porridges",
    type: "porridge",
    description: "Smooth banana porridge for breakfast or any time.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Medium", price: 4.5 },
      { label: "Large", price: 5.5 }
    ]
  },
  {
    id: "peanut-porridge",
    name: "Peanut Porridge",
    category: "Porridges",
    type: "porridge",
    description: "Nutty and comforting porridge in three sizes.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Medium", price: 4.5 },
      { label: "Large", price: 5.5 }
    ]
  },
  {
    id: "oats-porridge",
    name: "Oats Porridge",
    category: "Porridges",
    type: "porridge",
    description: "Traditional oats porridge served hot.",
    options: [
      { label: "Small", price: 3.5 },
      { label: "Medium", price: 4.5 },
      { label: "Large", price: 5.5 }
    ]
  },
  {
    id: "stamina-porridge",
    name: "Stamina Porridge",
    category: "Porridges",
    type: "porridge",
    description: "House stamina porridge from the menu.",
    options: [{ label: "Large", price: 6.0 }]
  }
];

const assetBase = window.location.protocol === "file:" ? "public/assets/menu" : "/assets/menu";

const photoAssets = {
  "jerk-chicken-dinner": `${assetBase}/jamaican-jerk-chicken.jpg`,
  "pineapple-jerk-chicken": `${assetBase}/pineapple-jerk.jpg`,
  "curry-jerk-chicken": `${assetBase}/curry-style-chicken.jpg`,
  "fried-chicken-dinner": `${assetBase}/fried-chicken.jpg`,
  "honey-roast-glaze-chicken": `${assetBase}/honey-glazed-chicken.jpg`,
  "brown-stew-chicken-dinner": `${assetBase}/brown-stew-chicken.jpg`,
  "pepper-steak-dinner": `${assetBase}/pepper-steak.webp`,
  "curry-chicken-dinner": `${assetBase}/curry-chicken.jpg`,
  "curry-goat-dinner": `${assetBase}/caribbean-chicken.jpg`,
  "oxtail-dinner": `${assetBase}/oxtail.webp`,
  "bbq-fried-chicken-dinner": `${assetBase}/caribbean-chicken.jpg`,
  "curry-oxtail-dinner": `${assetBase}/oxtail.webp`,
  "sweet-chilli-baked-fish": `${assetBase}/caribbean-chicken.jpg`,
  "fried-fish-dinner": `${assetBase}/caribbean-chicken.jpg`,
  "steam-fish-dinner": `${assetBase}/caribbean-chicken.jpg`,
  "jerk-chicken-salad-box": `${assetBase}/jamaican-jerk-chicken.jpg`,
  "fried-chicken-salad-box": `${assetBase}/fried-chicken.jpg`,
  "boneless-fish-salad-box": `${assetBase}/caribbean-chicken.jpg`,
  "jerk-chicken-wrap": `${assetBase}/jamaican-jerk-chicken.jpg`,
  "fried-chicken-wrap": `${assetBase}/fried-chicken.jpg`,
  "ackee-saltfish": `${assetBase}/caribbean-chicken.jpg`,
  cabbage: `${assetBase}/caribbean-chicken.jpg`,
  callaloo: `${assetBase}/caribbean-chicken.jpg`
};

const sauceOptions = [
  "Jerk Sauce",
  "Sweet Chilli",
  "Pepper Sauce",
  "Brown Stew Gravy",
  "BBQ Sauce",
  "Honey Glaze",
  "Curry Gravy"
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
    Soups: ["#ffb65f", "#d76a0b", "#fff1df"],
    Juices: ["#ffc94a", "#6dbd45", "#fff8d7"],
    "Vegan Vegi Juice": ["#87dd58", "#2f9f5c", "#ecffd9"],
    "Flavoured Water": ["#67d4ff", "#2d7a34", "#e8fbff"],
    "Caribbean Drinks": ["#ffa766", "#7b3bf0", "#fff0e7"],
    "Cooked Breakfast": ["#ffcd5c", "#ff911f", "#fff7e0"],
    Porridges: ["#d9b17d", "#94642d", "#fff4ea"]
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

  if (type === "soup" || type === "porridge") {
    return `
      <ellipse cx="260" cy="216" rx="120" ry="24" fill="rgba(255,255,255,0.45)" />
      <path d="M162 158h192c0 42-22 66-96 66-74 0-96-24-96-66z" fill="#fffef9" stroke="rgba(45,122,52,0.12)" stroke-width="4" />
      <ellipse cx="258" cy="158" rx="74" ry="24" fill="${type === "porridge" ? "#ecd8b3" : "#d68a46"}" />
      <path d="M210 108c8 10 9 18 2 30" stroke="rgba(255,255,255,0.85)" stroke-width="6" stroke-linecap="round" fill="none" />
      <path d="M246 98c8 12 10 22 3 36" stroke="rgba(255,255,255,0.85)" stroke-width="6" stroke-linecap="round" fill="none" />
      <path d="M286 110c7 10 8 20 2 31" stroke="rgba(255,255,255,0.85)" stroke-width="6" stroke-linecap="round" fill="none" />
    `;
  }

  if (type === "breakfast") {
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

function itemAllowsSauce(item) {
  return ["meal", "salad", "breakfast"].includes(item.type);
}

function getSelectedSauces(itemId) {
  return Array.from(document.querySelectorAll(`[data-sauce-item="${itemId}"]:checked`)).map(
    (input) => input.value
  );
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
            itemAllowsSauce(item)
              ? `
                <div class="sauce-picker">
                  <span>Select sauces</span>
                  <div class="sauce-options">
                    ${sauceOptions
                      .map(
                        (sauce) => `
                          <label class="sauce-option">
                            <input type="checkbox" value="${sauce}" data-sauce-item="${item.id}" />
                            <span>${sauce}</span>
                          </label>
                        `
                      )
                      .join("")}
                  </div>
                </div>
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
    cartItemsElement.innerHTML = `<div class="empty-cart">Your cart is empty. Add meals, juices, soups, or porridge to begin.</div>`;
  } else {
    cartItemsElement.innerHTML = state.cart
      .map(
        (item) => `
          <article class="cart-item">
            <div class="cart-item-top">
              <div>
                <strong>${item.name}</strong>
                <span>${item.optionLabel}${item.sauces && item.sauces.length ? ` • ${item.sauces.join(", ")}` : ""}</span>
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
  const selectedSauces = getSelectedSauces(item.id);
  const sauceLabel = selectedSauces.length ? selectedSauces.join(", ") : "No extra sauce";
  const cartId = `${item.id}-${option.label}-${sauceLabel}`;
  const existing = state.cart.find((entry) => entry.cartId === cartId);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      cartId,
      itemId: item.id,
      name: item.name,
      optionLabel: option.label,
      sauces: selectedSauces,
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
        "Secure card payment is handled by Stripe.";
    }
    if (checkoutNote) {
      checkoutNote.textContent =
        "You will be sent to Stripe to complete payment.";
    }
  } else {
    if (paymentBadge) {
      paymentBadge.textContent = "Card payment unavailable";
    }
    if (paymentDescription) {
      paymentDescription.textContent =
        "Online card payment is temporarily unavailable.";
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
    setMessage("Online card payment is unavailable right now.", true);
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
    throw new Error("Stripe checkout could not start.");
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
    setMessage("Payment completed successfully in Stripe. The cart has been cleared.");
    showToast("Stripe payment complete");
    window.history.replaceState({}, "", window.location.pathname);
  }

  if (status === "cancelled") {
    setMessage("Stripe checkout was cancelled. Your cart is still saved.", true);
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

    menuGridElement.addEventListener("change", (event) => {
      const input = event.target.closest("[data-sauce-item]");
      if (!input) {
        return;
      }

      const checkboxes = Array.from(document.querySelectorAll(`[data-sauce-item="${input.dataset.sauceItem}"]`));
      const checked = checkboxes.filter((box) => box.checked);

      if (checked.length > 3) {
        input.checked = false;
        showToast("Choose up to 3 sauces per item");
      }
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

  const featured = menuItems.find((item) => item.id === "jerk-chicken-dinner");
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
