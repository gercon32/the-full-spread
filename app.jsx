const { useState, useEffect, useRef } = React;

// ═══════════════════════════════════════════════════════════════════
// MENU DATA
// ═══════════════════════════════════════════════════════════════════
const MENUS = {
  "Breakfast": {
    tagline: "Morning spreads, hot platters & build-your-own",
    hue: 38,
    categories: [
      { name: "Packages", items: [
        { name: "Breakfast Sandwich Package", price: "$11.99", note: "Min 10" },
        { name: "Breakfast Burritos Package", price: "$15.99", note: "Min 5" },
        { name: "BYO Classic Breakfast", price: "$19", note: "Min 5" },
        { name: "BYO Mexican Breakfast", price: "$19.50", note: "Min 10" },
        { name: "Overnight Oats Set", price: "$6", note: "Min 10" }
      ]},
      { name: "Eggs & Proteins", items: [
        { name: "Egg Breakfast Platter", price: "$80" },
        { name: "Applewood Bacon Platter", price: "$75" },
        { name: "Al Pastor Mushroom Platter", price: "$90" },
        { name: "Braised Beef Platter", price: "$100" },
        { name: "Grilled Sausage Patty Platter", price: "$75" }
      ]},
      { name: "Sides & Toppings", items: [
        { name: "Sliced Avocado Platter", price: "$55" },
        { name: "Tater Tots Platter", price: "$55" },
        { name: "Shredded Cheddar Platter", price: "$35" },
        { name: "Oaxaca Cheese Platter", price: "$45" },
        { name: "Black Beans Platter", price: "$45" },
        { name: "Pico de Gallo Platter", price: "$35" },
        { name: "Sweet Potato Hash Platter", price: "$75" }
      ]}
    ]
  },
  "Thai": {
    tagline: "Authentic noodles, curries, stir fry & vegetables",
    hue: 142,
    categories: [
      { name: "Popular Packages", items: [
        { name: "Popular Large Package", price: "$525", note: "Serves 30" },
        { name: "Popular Medium Package", price: "$410", note: "Serves 20" },
        { name: "Popular Small Package", price: "$315", note: "Serves 10" }
      ]},
      { name: "Party Bundles", items: [
        { name: "12–16 Person Bundle", price: "$315", note: "2 entrees + 2 apps" },
        { name: "18–22 Person Bundle", price: "$410", note: "3 entrees + 3 apps" },
        { name: "26–30 Person Bundle", price: "$525", note: "3 entrees + 3 apps" }
      ]},
      { name: "Appetizers", items: [
        { name: "Pan Fried Pork Dumplings (30 pcs)", tags: ["DF","NF"], price: "$50" },
        { name: "Pan Fried Spinach Dumplings (30 pcs)", tags: ["V","VG","DF"], price: "$75" },
        { name: "Crispy Shrimp Wontons (30 pcs)", tags: ["DF","NF"], price: "$85" },
        { name: "Vegetable Spring Rolls (30 pcs)", tags: ["V","VG","DF"], price: "$75" },
        { name: "Satay Chicken Skewers (30 pcs)", tags: ["DF","NF"], price: "$80" }
      ]},
      { name: "Mains", items: [
        { name: "Chili Garlic Platter", price: "$105" },
        { name: "Spicy Basil Platter", tags: ["DF","GF"], price: "$105" },
        { name: "Pad Thai Platter", tags: ["V","DF","GF"], price: "$105" },
        { name: "Pad See Ew Platter", tags: ["DF"], price: "$105" },
        { name: "Drunken Noodle Platter", tags: ["DF"], price: "$105" },
        { name: "Mee Goreng Platter", tags: ["V","DF"], price: "$105" },
        { name: "Thai Fried Rice Platter", tags: ["DF"], price: "$105" },
        { name: "Basil Fried Rice Platter", tags: ["DF","GF"], price: "$105" }
      ]},
      { name: "Vegetables", items: [
        { name: "Baby Bok Choy Platter", tags: ["DF","GF"], price: "$80" },
        { name: "Chinese Broccoli Platter", tags: ["DF"], price: "$85" },
        { name: "American Broccoli Platter", tags: ["V","VG","DF"], price: "$80" }
      ]}
    ]
  },
  "Hawaiian BBQ": {
    tagline: "Island-inspired BBQ, rice bowls & tropical sides",
    hue: 12,
    categories: [
      { name: "Popular Packages", items: [
        { name: "Small Package", price: "$250", note: "Serves 10" },
        { name: "Medium Package", price: "$415", note: "Serves 20" },
        { name: "Large Package", price: "$530", note: "Serves 30" },
        { name: "Gluten Free Package", price: "$555", note: "Serves 30" },
        { name: "Fish & Plant Friendly Large", price: "$545", note: "Serves 30" }
      ]},
      { name: "Build Your Own", items: [
        { name: "Large BYO", price: "$520", note: "~30 ppl · 3 base, 3 protein" },
        { name: "Medium BYO", price: "$395", note: "~20 ppl · 2 base, 2 protein" },
        { name: "Small BYO", price: "$250", note: "~10 ppl · 1 base, 1 protein" }
      ]},
      { name: "Appetizers", items: [
        { name: "Boneless Aloha Wings (30 pcs)", tags: ["DF","NF"], price: "$85" },
        { name: "Spam Musubi Platter", tags: ["DF","GF"], price: "$75" },
        { name: "Traditional Aloha Wings (30 pcs)", tags: ["DF","NF"], price: "$85" },
        { name: "Shishito Peppers", tags: ["V","VG","DF","GF"], price: "$95" }
      ]},
      { name: "Protein", items: [
        { name: "Bulgogi Beef", tags: ["DF","NF"], price: "$115" },
        { name: "Crispy Garlic Tofu", tags: ["V","VG","DF"], price: "$85" },
        { name: "Chicken Katsu", tags: ["DF","NF"], price: "$95" },
        { name: "Teriyaki Salmon", tags: ["NF"], price: "$135" },
        { name: "Garlic Salmon", price: "$135" },
        { name: "BBQ Chicken", tags: ["DF","GF","NF"], price: "$105" },
        { name: "Shrimp Tempura", price: "$110" },
        { name: "Braised Pork Belly", tags: ["DF","GF","NF"], price: "$95" }
      ]},
      { name: "Sides", items: [
        { name: "Seaweed Salad", tags: ["V","DF","NF"], price: "$50" },
        { name: "Hawaiian Mac Salad", price: "$55" },
        { name: "Roasted Corn", tags: ["V","GF"], price: "$55" },
        { name: "Sweet Potato", tags: ["V","VG","DF","GF"], price: "$65" },
        { name: "Coleslaw", tags: ["V","DF","GF"], price: "$55" },
        { name: "Mac & Cheese", tags: ["V","NF"], price: "$85" }
      ]}
    ]
  },
  "Poke Bowls": {
    tagline: "Premium fish, crispy proteins & flavorful toppings",
    hue: 195,
    categories: [
      { name: "Popular Packages", items: [
        { name: "Small Package", price: "$21.50/pp", note: "Min 10" },
        { name: "Medium Package", price: "$20.95/pp", note: "Min 20" },
        { name: "Large Package", price: "$20.50/pp", note: "Min 30" },
        { name: "Gluten Free Large", price: "$20.50/pp", note: "Min 30" },
        { name: "Fish/Plant Friendly", price: "$20.50/pp", note: "Min 20" }
      ]},
      { name: "Includes", items: [
        { name: "Base · White Rice, Spring Mix", price: "—" },
        { name: "Poke · Ahi Tuna, Spicy Salmon", price: "—" },
        { name: "Toppings · Edamame, Corn, Seaweed, Mango, Kani, Onion Crisps", price: "—" },
        { name: "Sauce · Don Poke, Yuzu Ponzu", price: "—" }
      ]},
      { name: "Protein", items: [
        { name: "Crispy Garlic Tofu", tags: ["V","VG","DF"], price: "$85" },
        { name: "Ahi Tuna", tags: ["DF","NF"], price: "$155" },
        { name: "Spicy Salmon", tags: ["DF","NF"], price: "$155" },
        { name: "Classic Salmon", tags: ["DF","GF"], price: "$155" },
        { name: "Spicy Tuna", tags: ["DF","GF"], price: "$155" },
        { name: "Yuzu Salmon & Tuna", price: "$155" }
      ]},
      { name: "Sides", items: [
        { name: "Hawaiian Mac Salad", tags: ["V","DF"], price: "$55" },
        { name: "Seaweed Salad", tags: ["V","VG","DF"], price: "$45" },
        { name: "Mango Crunch Salad", tags: ["DF","NF"], price: "$65" },
        { name: "Spicy Crab Salad", tags: ["DF"], price: "$45" }
      ]}
    ]
  },
  "Mexican": {
    tagline: "Bold proteins, house salsas & fresh toppings",
    hue: 25,
    categories: [
      { name: "Signature Packages", items: [
        { name: "Single Protein", price: "$18/pp", note: "Min 10" },
        { name: "Double Protein", price: "$20/pp", note: "Min 10" },
        { name: "Triple Protein", price: "$22/pp", note: "Min 10" }
      ]},
      { name: "Includes", items: [
        { name: "Poblano Chicken, Barbacoa, Al Pastor", price: "—" },
        { name: "Mexican Rice, Black Beans, Fajita Veggies", price: "—" },
        { name: "Sweet Potatoes, Corn, Oaxaca Cheese", price: "—" },
        { name: "Lime Crema, Red & Green Salsa, Tortillas", price: "—" }
      ]},
      { name: "Protein", items: [
        { name: "Fable Al Pastor Mushroom", tags: ["V"], price: "$95" },
        { name: "Al Pastor Pork", tags: ["GF"], price: "$85" },
        { name: "Barbacoa Beef", tags: ["GF"], price: "$95" },
        { name: "Chicken", tags: ["GF"], price: "$85" },
        { name: "Yucatan Shrimp", tags: ["GF"], price: "$105" }
      ]},
      { name: "Toppings", items: [
        { name: "Roasted Corn", tags: ["V","GF"], price: "$35" },
        { name: "Guacamole", tags: ["V","GF"], price: "$55" },
        { name: "Oaxaca Cheese", tags: ["GF"], price: "$35" },
        { name: "Pickled Red Onions", tags: ["V","GF"], price: "$25" },
        { name: "Pico de Gallo", tags: ["V","GF"], price: "$35" },
        { name: "Black Beans", tags: ["V","VG","GF"], price: "$45" },
        { name: "Pinto Beans", tags: ["V","VG","GF"], price: "$45" }
      ]},
      { name: "Salsas", items: [
        { name: "Green Salsa — Mild", tags: ["V","GF"], price: "$15" },
        { name: "Red Salsa — Smoky", tags: ["V","GF"], price: "$15" },
        { name: "Lime Crema", tags: ["GF"], price: "$15" },
        { name: "Chile De Arbol — Hot", tags: ["V","GF"], price: "$15" }
      ]}
    ]
  },
  "Chinese": {
    tagline: "Dumplings, entrees, noodles & classic platters",
    hue: 0,
    categories: [
      { name: "BYO Bundles", items: [
        { name: "12–16 Person", price: "$325", note: "2 entrees + 2 apps + 1 base" },
        { name: "18–22 Person", price: "$410", note: "3 entrees + 3 apps + 2 bases" },
        { name: "26–30 Person", price: "$520", note: "3 entrees + 3 apps + 2 bases" }
      ]},
      { name: "Entrees", items: [
        { name: "Mala Dry Pot Beef", price: "$130" },
        { name: "Signature Orange Chicken", price: "$120" },
        { name: "General Mao Chicken", price: "$120" },
        { name: "Impossible Mapo Tofu", price: "$125" },
        { name: "Chicken Broccoli", price: "$120" },
        { name: "Beef Broccoli", price: "$120" },
        { name: "Shrimp Broccoli", price: "$135" },
        { name: "Chicken & String Beans", price: "$120" },
        { name: "Shrimp & String Beans", price: "$125" },
        { name: "Beef & String Beans", price: "$120" }
      ]},
      { name: "Rice", items: [
        { name: "Classic Fried Rice", price: "$40" },
        { name: "White Rice", price: "$40" },
        { name: "Brown Rice", price: "$40" }
      ]},
      { name: "Noodles", items: [
        { name: "Sichuan Dan Dan", price: "$85" },
        { name: "Char Kway Teow", price: "$90" },
        { name: "Lo Mein", price: "$85" }
      ]},
      { name: "Appetizers", items: [
        { name: "Five Spice Pepper Wings", price: "$75" },
        { name: "Crispy Shrimp Wonton", price: "$75" },
        { name: "Steamed Pork & Chives Dumplings", price: "$65" },
        { name: "Fried Pork & Chives Dumplings", price: "$65" },
        { name: "Fried Vegetable Dumplings", price: "$65" },
        { name: "Kung Pao Egg Roll", price: "$55" }
      ]}
    ]
  },
  "Mediterranean": {
    tagline: "Shawarma, falafel, mezze & vibrant sauces",
    hue: 168,
    categories: [
      { name: "Catering Packages", items: [
        { name: "BYO Feast", price: "$660", note: "Serves 40" },
        { name: "BYO Large", price: "$530", note: "Serves 30" },
        { name: "BYO Medium", price: "$400", note: "Serves 20" },
        { name: "BYO Small", price: "$255", note: "Serves 10" }
      ]},
      { name: "Base", items: [
        { name: "Brown Rice Pilaf", tags: ["V"], price: "$55" },
        { name: "Basmati Rice", tags: ["V"], price: "$45" },
        { name: "Farro & Couscous", tags: ["V"], price: "$65" }
      ]},
      { name: "Protein", items: [
        { name: "Beef Shawarma", price: "$105" },
        { name: "Harissa Chicken", price: "$95" },
        { name: "Falafel Hummus", tags: ["V","VG"], price: "$115" },
        { name: "Pulled Mushroom Shawarma", tags: ["V"], price: "$100" },
        { name: "Roasted Salmon", price: "$135" }
      ]},
      { name: "Sides", items: [
        { name: "Broccoli", tags: ["V","VG"], price: "$55" },
        { name: "Corn", price: "$55" },
        { name: "Sweet Potato", tags: ["V","VG"], price: "$65" },
        { name: "Coleslaw", tags: ["V"], price: "$55" },
        { name: "Garlic Chicken Salad", price: "$55" }
      ]},
      { name: "Sauces & Dips", items: [
        { name: "Spicy Tahini", tags: ["V","VG"], price: "$20" },
        { name: "Hot Pepper Sauce", tags: ["V"], price: "$20" },
        { name: "Harissa", tags: ["V"], price: "$20" },
        { name: "Cilantro Zhoug", tags: ["V","VG"], price: "$20" }
      ]},
      { name: "Appetizers", items: [
        { name: "Pita Chip Salad", price: "$55" },
        { name: "Crispy Flatbread", price: "$35" },
        { name: "Zaatar Wings", price: "$85" },
        { name: "Feta Fries", tags: ["V"], price: "$50" },
        { name: "Hummus & Pita", price: "$45" },
        { name: "Tzatziki & Pita", price: "$45" }
      ]}
    ]
  },
  "Indian": {
    tagline: "Rich curries, tandoor apps & aromatic sides",
    hue: 28,
    categories: [
      { name: "Catering Packages", items: [
        { name: "Large BYO", price: "$580", note: "Serves 30" },
        { name: "Medium BYO", price: "$420", note: "Serves 20" },
        { name: "Small BYO", price: "$260", note: "Serves 10" }
      ]},
      { name: "Base", items: [
        { name: "Basmati Rice", tags: ["V"], price: "$40" },
        { name: "Brown Rice + Lentils", tags: ["V"], price: "$50" },
        { name: "Farro + Couscous", tags: ["V"], price: "$65" }
      ]},
      { name: "Protein", items: [
        { name: "Chicken Tikka Masala", price: "$100" },
        { name: "Roasted Salmon", price: "$135" },
        { name: "Green Chili Chicken", price: "$95" },
        { name: "Smoky Chili Chicken", price: "$95" },
        { name: "Tikka Pulled Shiitake", price: "$100" }
      ]},
      { name: "Sides", items: [
        { name: "Chickpea Curry", tags: ["V"], price: "$60" },
        { name: "Roasted Broccoli", tags: ["V","VG"], price: "$55" },
        { name: "Corn", price: "$55" },
        { name: "Sweet Potato", tags: ["V","VG"], price: "$60" },
        { name: "Coleslaw", tags: ["V"], price: "$55" }
      ]},
      { name: "Sauces", items: [
        { name: "Tamarind Chutney", price: "$20" },
        { name: "Cilantro Chutney", price: "$20" },
        { name: "Cucumber Raita", price: "$20" },
        { name: "Cilantro Crema", tags: ["V"], price: "$20" },
        { name: "Shawarma White", tags: ["V"], price: "$20" }
      ]},
      { name: "Apps", items: [
        { name: "Garlic Naan", price: "$50" },
        { name: "Roti", price: "$45" },
        { name: "Masala Wings", price: "$90" },
        { name: "Vegetable Samosa", tags: ["V"], price: "$65" }
      ]}
    ]
  },
  "Sushi": {
    tagline: "Premium maki platters, nigiri & fresh appetizers",
    hue: 350,
    categories: [
      { name: "Popular Packages", items: [
        { name: "Get-Together", price: "$499", note: "Serves 10+" },
        { name: "Bonfire", price: "$899", note: "Serves 25" },
        { name: "Cocktail", price: "$1,549", note: "Serves 50" }
      ]},
      { name: "Maki Platters", items: [
        { name: "Premium Kaisen", price: "$325", note: "120 pcs · serves 7-10" },
        { name: "Flaming Hot", price: "$270", note: "120 pcs · serves 7-10" },
        { name: "Herbivore", price: "$250", note: "120 pcs · serves 7-10" },
        { name: "The Naka", price: "$265", note: "120 pcs · serves 7-10" },
        { name: "Salmon Lover's", price: "$260", note: "120 pcs · serves 7-10" },
        { name: "Build Your Own Maki", price: "$265", note: "20 rolls · serves 7-10" }
      ]},
      { name: "Nigiri", items: [
        { name: "Nigiri Package", price: "$350", note: "80 pcs · serves 7-10" },
        { name: "Premium Nigiri", price: "$420", note: "80 pcs · serves 7-10" },
        { name: "BYO Nigiri", price: "$55", note: "per 10 slices" }
      ]},
      { name: "Appetizers", items: [
        { name: "Seaweed Salad", tags: ["V"], price: "$55" },
        { name: "Kani Salad", price: "$60" },
        { name: "Potato Croquette", tags: ["V"], price: "$75" },
        { name: "Shishito Peppers", tags: ["V"], price: "$80" },
        { name: "Pork Gyoza", price: "$80" },
        { name: "Vegetable Gyoza", tags: ["V"], price: "$75" },
        { name: "Cucumber Salad", price: "$65" },
        { name: "Truffle Edamame", tags: ["V"], price: "$70" }
      ]}
    ]
  }
};

const CUISINES = [
  { id: "Breakfast",     glyph: "01", short: "Mornings",    desc: "Hot platters · BYO" },
  { id: "Thai",          glyph: "02", short: "Bangkok",     desc: "Curry · pad thai" },
  { id: "Hawaiian BBQ",  glyph: "03", short: "Aloha",       desc: "Grills · plate lunch" },
  { id: "Poke Bowls",    glyph: "04", short: "Bowls",       desc: "Ahi · spicy salmon" },
  { id: "Mexican",       glyph: "05", short: "CDMX",        desc: "Tacos · barbacoa" },
  { id: "Chinese",       glyph: "06", short: "Sichuan",     desc: "Mapo · dumplings" },
  { id: "Mediterranean", glyph: "07", short: "Levant",      desc: "Shawarma · mezze" },
  { id: "Indian",        glyph: "08", short: "Tikka",       desc: "Tandoor · curry" },
  { id: "Sushi",         glyph: "09", short: "Edomae",      desc: "Maki · nigiri" },
];

// ═══════════════════════════════════════════════════════════════════
// FOOD PLACEHOLDER — striped, label, hue-tinted
// ═══════════════════════════════════════════════════════════════════
// Twemoji helper — turns an emoji char into the SVG codepoint URL on jsDelivr.
// Handles multi-codepoint emoji and strips the FE0F variation selector.
function twemojiUrl(emoji) {
  const codepoints = [];
  for (const ch of emoji) {
    const cp = ch.codePointAt(0);
    if (cp !== 0xFE0F) codepoints.push(cp.toString(16));
  }
  return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${codepoints.join('-')}.svg`;
}

function FoodPlaceholder({ hue, label, height = 140, src, alt, emoji }) {
  const bg = `oklch(0.78 0.10 ${hue})`;
  const stripe = `oklch(0.68 0.13 ${hue})`;
  const ink = `oklch(0.22 0.05 ${hue})`;
  const showImg = !!src;
  // Icon size scales with container height.
  const iconSize = Math.round(height * 0.5);
  return (
    <div style={{
      position: 'relative', width: '100%', height: height,
      background: showImg
        ? '#000'
        : `repeating-linear-gradient(135deg, ${bg} 0 18px, ${stripe} 18px 36px)`,
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {showImg && (
        <img
          src={src}
          alt={alt || label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      {!showImg && (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 30% 30%, ${bg}00 0%, ${bg}80 60%)`,
            pointerEvents: 'none',
          }} />
          {emoji && (
            <img
              src={twemojiUrl(emoji)}
              alt={alt || label}
              loading="lazy"
              draggable="false"
              style={{
                width: iconSize, height: iconSize,
                filter: 'drop-shadow(0 2px 6px rgba(40,20,10,0.18))',
                position: 'relative', zIndex: 1,
                userSelect: 'none',
              }}
            />
          )}
          <div style={{
            position: 'absolute', left: 10, bottom: 8,
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 9, color: ink, letterSpacing: '0.8px',
            background: 'rgba(244,237,224,0.85)',
            padding: '3px 7px', borderRadius: 2,
          }}>
            {label}
          </div>
        </>
      )}
    </div>
  );
}

const CUISINE_EMOJI = {
  "Breakfast":     "🥞",
  "Thai":          "🍜",
  "Hawaiian BBQ":  "🍗",
  "Poke Bowls":    "🥗",
  "Mexican":       "🌮",
  "Chinese":       "🥟",
  "Mediterranean": "🥙",
  "Indian":        "🍛",
  "Sushi":         "🍣",
};
const HERO_EMOJI = "🍽️";       // plate w/ utensils
const DELIVERY_EMOJI = "📦";  // package

const IMG_V = "10";  // bump when images change to bust iframe cache
const CUISINE_IMG = {
  "Breakfast":     `images/breakfast.jpg?v=${IMG_V}`,
  "Thai":          `images/thai.jpg?v=${IMG_V}`,
  "Hawaiian BBQ":  `images/hawaiian-bbq.jpg?v=${IMG_V}`,
  "Poke Bowls":    `images/poke.jpg?v=${IMG_V}`,
  "Mexican":       `images/mexican.jpg?v=${IMG_V}`,
  "Chinese":       `images/chinese.jpg?v=${IMG_V}`,
  "Mediterranean": `images/mediterranean.jpg?v=${IMG_V}`,
  "Indian":        `images/indian.jpg?v=${IMG_V}`,
  "Sushi":         `images/sushi.jpg?v=${IMG_V}`,
};
const HERO_IMG = `images/hero.jpg?v=${IMG_V}`;
const DELIVERY_IMG = `images/delivery.jpg?v=${IMG_V}`;

// ═══════════════════════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════════════════════
function Nav({ onCta, lang, setLang, t }) {
  return (
    <nav className="tfs-nav">
      <div className="tfs-mark">
        <span className="tfs-mark-glyph">✦</span>
        <span>The Full <em>Spread</em></span>
      </div>
      <div className="tfs-nav-right">
        <LangToggle lang={lang} setLang={setLang} />
        <button className="tfs-nav-cta" onClick={onCta}>
          {t.navQuote}
          <span className="tfs-arrow">↗</span>
        </button>
      </div>
    </nav>
  );
}

function LangToggle({ lang, setLang, variant = 'nav' }) {
  return (
    <div className={`tfs-lang ${variant === 'footer' ? 'is-footer' : ''}`} role="group" aria-label="Language">
      <button
        className={`tfs-lang-opt ${lang === 'en' ? 'is-active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >EN</button>
      <button
        className={`tfs-lang-opt ${lang === 'es' ? 'is-active' : ''}`}
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
      >ES</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════
function Hero({ onQuote, onExplore, t }) {
  return (
    <section className="tfs-hero">
      <div className="tfs-hero-rule">
        <span>{t.heroEst}</span>
        <span className="tfs-hero-dot">●</span>
        <span>{t.heroKitchens}</span>
        <span className="tfs-hero-dot">●</span>
        <span>{t.heroInvoice}</span>
      </div>

      <h1 className="tfs-hero-h1">
        {t.heroH1a}<br/>
        {t.heroH1b}<br/>
        <em>{t.heroH1c}</em><br/>
        <span className="tfs-hero-underline">{t.heroH1d}</span>
      </h1>

      <div className="tfs-hero-photo">
        <FoodPlaceholder hue={25} label="HERO · spread on butcher paper" height={180} src={HERO_IMG} alt="Catering spread" emoji={HERO_EMOJI} />
        <div className="tfs-hero-photo-tag">
          <span className="tfs-tag-num">№ 01</span>
          <span>{t.heroPhotoTag}</span>
        </div>
      </div>

      <p className="tfs-hero-lede">
        {t.heroLede}
      </p>

      <div className="tfs-hero-btns">
        <button className="tfs-btn-primary" onClick={onQuote}>
          {t.heroBtnQuote}
          <span className="tfs-arrow">→</span>
        </button>
        <button className="tfs-btn-ghost" onClick={onExplore}>
          {t.heroBtnExplore}
        </button>
      </div>

      <div className="tfs-hero-credits">
        <div className="tfs-credit">
          <div className="tfs-credit-num">{t.creditCuisinesNum}</div>
          <div className="tfs-credit-label" style={{whiteSpace: 'pre-line'}}>{t.creditCuisinesLabel}</div>
        </div>
        <div className="tfs-credit-line" />
        <div className="tfs-credit">
          <div className="tfs-credit-num">{t.creditTimeNum}</div>
          <div className="tfs-credit-label" style={{whiteSpace: 'pre-line'}}>{t.creditTimeLabel}</div>
        </div>
        <div className="tfs-credit-line" />
        <div className="tfs-credit">
          <div className="tfs-credit-num" style={{whiteSpace: 'pre-line'}}>{t.creditGuestsNum}</div>
          <div className="tfs-credit-label" style={{whiteSpace: 'pre-line'}}>{t.creditGuestsLabel}</div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CUISINES
// ═══════════════════════════════════════════════════════════════════
function Cuisines({ selected, onToggle, onOpen, t }) {
  return (
    <section id="cuisines" className="tfs-cuisines">
      <SectionHeader
        eyebrow={t.chapter02}
        title={<>{t.cuisinesTitleA}<br/><em>{t.cuisinesTitleB}</em> {t.cuisinesTitleC}</>}
        sub={t.cuisinesSub}
      />

      <div className="tfs-cuisine-grid">
        {CUISINES.map(c => {
          const isSel = selected.has(c.id);
          const data = MENUS[c.id];
          return (
            <div
              key={c.id}
              className={`tfs-cuisine-card ${isSel ? 'is-selected' : ''}`}
              onClick={() => onToggle(c.id)}
            >
              <div className="tfs-cuisine-photo">
                <FoodPlaceholder hue={data.hue} label={c.id.toUpperCase()} height={108} src={CUISINE_IMG[c.id]} alt={t.cuisines[c.id].name} emoji={CUISINE_EMOJI[c.id]} />
                {isSel && (
                  <div className="tfs-cuisine-check">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="tfs-cuisine-meta">
                <div className="tfs-cuisine-row">
                  <span className="tfs-cuisine-num">{c.glyph}</span>
                  <button
                    className="tfs-cuisine-info"
                    onClick={(e) => { e.stopPropagation(); onOpen(c.id); }}
                    aria-label={`Open ${c.id} menu`}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 2h8M1 5h8M1 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                <div className="tfs-cuisine-name">{t.cuisines[c.id].name}</div>
                <div className="tfs-cuisine-desc">{t.cuisines[c.id].desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="tfs-cuisine-cta" onClick={() => document.getElementById('order').scrollIntoView({ behavior: 'smooth' })}>
        <span>{selected.size > 0 ? t.cuisineCtaContinue(selected.size) : t.cuisineCtaEmpty}</span>
        <span className="tfs-arrow">→</span>
      </button>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SECTION HEADER
// ═══════════════════════════════════════════════════════════════════
function SectionHeader({ eyebrow, title, sub, light }) {
  return (
    <div className={`tfs-section-head ${light ? 'is-light' : ''}`}>
      <div className="tfs-eyebrow">
        <span className="tfs-eyebrow-mark">¶</span>
        {eyebrow}
      </div>
      <h2 className="tfs-h2">{title}</h2>
      {sub && <p className="tfs-section-sub">{sub}</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOW IT WORKS — on dark forest
// ═══════════════════════════════════════════════════════════════════
function HowItWorks({ t }) {
  const steps = [
    { n: "i.",   title: t.step1Title, desc: t.step1Desc },
    { n: "ii.",  title: t.step2Title, desc: t.step2Desc },
    { n: "iii.", title: t.step3Title, desc: t.step3Desc },
  ];
  return (
    <section className="tfs-how">
      <SectionHeader
        eyebrow={t.chapter03}
        title={<>{t.howTitleA}<br/><em>{t.howTitleB}</em></>}
        light
      />
      <div className="tfs-steps">
        {steps.map((s, i) => (
          <div key={i} className="tfs-step">
            <div className="tfs-step-num">{s.n}</div>
            <div className="tfs-step-body">
              <div className="tfs-step-title">{s.title}</div>
              <div className="tfs-step-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="tfs-how-photo">
        <FoodPlaceholder hue={142} label="DELIVERY · packed & labeled" height={160} src={DELIVERY_IMG} alt="Delivery, packed and labeled" emoji={DELIVERY_EMOJI} />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PERKS
// ═══════════════════════════════════════════════════════════════════
function Perks({ t }) {
  const kickers = ["a.","b.","c.","d.","e.","f."];
  const perks = t.perks.map((p, i) => ({ kicker: kickers[i], ...p }));
  return (
    <section className="tfs-perks">
      <SectionHeader
        eyebrow={t.chapter04}
        title={<>{t.perksTitleA}<br/><em>{t.perksTitleB}</em></>}
      />
      <div className="tfs-perks-list">
        {perks.map((p, i) => (
          <div key={i} className="tfs-perk">
            <div className="tfs-perk-kicker">{p.kicker}</div>
            <div className="tfs-perk-body">
              <div className="tfs-perk-title">{p.title}</div>
              <div className="tfs-perk-desc">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// QUOTE FORM
// ═══════════════════════════════════════════════════════════════════
function QuoteForm({ selected, onRemove, t }) {
  const [form, setForm] = useState({
    fname: '', femail: '', fphone: '', fdate: '', fcount: '', faddress: '', fnotes: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.fname.trim()) e.fname = t.fErrRequired;
    if (!form.femail.trim()) e.femail = t.fErrRequired;
    else if (!/^\S+@\S+\.\S+$/.test(form.femail)) e.femail = t.fErrEmail;
    if (!form.fphone.trim()) e.fphone = t.fErrRequired;
    if (!form.fdate) e.fdate = t.fErrRequired;
    if (!form.fcount.trim()) e.fcount = t.fErrRequired;
    if (!form.faddress.trim()) e.faddress = t.fErrRequired;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setServerError('');
    const cuisineList = selected.size > 0 ? [...selected].join(', ') : 'Not specified';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '0b0546bb-031a-46ac-b42e-478f0dbc087f',
          from_name: 'The Full Spread',
          replyto: form.femail,
          to: 'geryolconce@gmail.com',
          subject: `New catering quote request — ${form.fname}`,
          name: form.fname,
          email: form.femail,
          phone: form.fphone,
          event_date: form.fdate,
          headcount: form.fcount,
          delivery_address: form.faddress,
          cuisines: cuisineList,
          notes: form.fnotes || 'None'
        })
      });
      const data = await res.json();
      if (data.success) setSuccess(true);
      else { setServerError(t.formServerErr); setSubmitting(false); }
    } catch (err) {
      setServerError(t.formConnErr);
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section id="order" className="tfs-order">
        <div className="tfs-success">
          <div className="tfs-success-mark">✓</div>
          <div className="tfs-success-eyebrow">¶ {t.successEyebrow} · {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
          <h2 className="tfs-h2 tfs-success-h">{t.successTitle}</h2>
          <p className="tfs-success-sub" style={{whiteSpace: 'pre-line'}}>
            {t.successSub}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="tfs-order">
      <SectionHeader
        eyebrow={t.chapter05}
        title={<>{t.formTitleA}<br/>{t.formTitleB} <em>{t.formTitleC}</em></>}
        sub={t.formSub}
        light
      />

      <div className="tfs-form-summary">
        <div className="tfs-form-summary-label">{t.formSelectionLabel}</div>
        {selected.size === 0 ? (
          <div className="tfs-form-summary-empty">{t.formSelectionEmpty}</div>
        ) : (
          <div className="tfs-form-summary-tags">
            {[...selected].map(c => (
              <button key={c} className="tfs-summary-tag" onClick={() => onRemove(c)}>
                {c}
                <span className="tfs-summary-tag-x">×</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <FormField label={t.fName} id="fname" value={form.fname} onChange={v => set('fname', v)} error={errors.fname} placeholder={t.fNamePh} />
      <FormField label={t.fEmail} id="femail" type="email" value={form.femail} onChange={v => set('femail', v)} error={errors.femail} placeholder={t.fEmailPh} />
      <FormField label={t.fPhone} id="fphone" type="tel" value={form.fphone} onChange={v => set('fphone', v)} error={errors.fphone} placeholder={t.fPhonePh} />
      <div className="tfs-form-row">
        <FormField label={t.fDate} id="fdate" type="date" value={form.fdate} onChange={v => set('fdate', v)} error={errors.fdate} />
        <FormField label={t.fCount} id="fcount" type="number" value={form.fcount} onChange={v => set('fcount', v)} error={errors.fcount} placeholder={t.fCountPh} />
      </div>
      <FormField label={t.fAddress} id="faddress" value={form.faddress} onChange={v => set('faddress', v)} error={errors.faddress} placeholder={t.fAddressPh} />
      <FormField label={t.fNotes} id="fnotes" type="textarea" value={form.fnotes} onChange={v => set('fnotes', v)} placeholder={t.fNotesPh} />

      <button className="tfs-submit" onClick={submit} disabled={submitting}>
        {submitting ? t.formSubmitting : t.formSubmit}
        {!submitting && <span className="tfs-arrow">→</span>}
      </button>
      {serverError && <div className="tfs-form-server-err">{serverError}</div>}
      <div className="tfs-form-note">
        {t.formNote}
      </div>
    </section>
  );
}

function FormField({ label, id, type = 'text', value, onChange, error, placeholder }) {
  const InputEl = type === 'textarea' ? 'textarea' : 'input';
  return (
    <div className={`tfs-field ${error ? 'has-err' : ''}`}>
      <label htmlFor={id} className="tfs-field-label">
        {label}
        {error && <span className="tfs-field-err">— {error}</span>}
      </label>
      <InputEl
        id={id}
        className="tfs-field-input"
        type={type !== 'textarea' ? type : undefined}
        rows={type === 'textarea' ? 3 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════
function Footer({ lang, setLang, t }) {
  return (
    <footer className="tfs-footer">
      <div className="tfs-footer-mark">
        <span className="tfs-mark-glyph">✦</span>
        The Full <em>Spread</em>
      </div>
      <div className="tfs-footer-tag">{t.footerTag}</div>
      <div className="tfs-footer-lang">
        <LangToggle lang={lang} setLang={setLang} variant="footer" />
      </div>
      <div className="tfs-footer-links">
        <a href="#">Instagram</a>
        <span className="tfs-footer-dot">·</span>
        <a href="#">WhatsApp</a>
        <span className="tfs-footer-dot">·</span>
        <a href="mailto:hello@thefullspread.com">Email</a>
      </div>
      <div className="tfs-footer-rule" />
      <div className="tfs-footer-copy">
        <span>{t.footerCopy}</span>
        <span>{t.footerRights}</span>
      </div>
      <div className="tfs-footer-attr">
        Icons by <a href="https://github.com/jdecked/twemoji" target="_blank" rel="noopener">Twemoji</a> · CC-BY 4.0
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════
// BOTTOM SHEET — menu detail
// ═══════════════════════════════════════════════════════════════════
function MenuSheet({ cuisine, isSelected, onToggle, onClose, t }) {
  const open = !!cuisine;
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [open]);
  if (!cuisine) return null;
  const data = MENUS[cuisine];
  return (
    <>
      <div className={`tfs-sheet-overlay ${open ? 'is-open' : ''}`} onClick={onClose} />
      <div className={`tfs-sheet ${open ? 'is-open' : ''}`}>
        <div className="tfs-sheet-handle" />
        <div className="tfs-sheet-photo">
          <FoodPlaceholder hue={data.hue} label={`${cuisine.toUpperCase()} · spread`} height={120} src={CUISINE_IMG[cuisine]} alt={t.cuisines[cuisine].name} emoji={CUISINE_EMOJI[cuisine]} />
        </div>
        <div className="tfs-sheet-head">
          <div>
            <div className="tfs-sheet-eyebrow">¶ {t.sheetEyebrow}</div>
            <h3 className="tfs-sheet-title">{t.cuisines[cuisine].name}</h3>
            <div className="tfs-sheet-tagline">{data.tagline}</div>
          </div>
          <button className="tfs-sheet-close" onClick={onClose} aria-label={t.sheetClose}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="tfs-sheet-body">
          {data.categories.map((cat, ci) => (
            <div key={ci} className="tfs-sheet-cat">
              <div className="tfs-sheet-cat-rule">
                <span>{cat.name}</span>
                <span className="tfs-sheet-cat-count">{cat.items.length}</span>
              </div>
              {cat.items.map((it, ii) => (
                <div key={ii} className="tfs-sheet-item">
                  <div className="tfs-sheet-item-left">
                    <div className="tfs-sheet-item-name">{it.name}</div>
                    {(it.tags || it.note) && (
                      <div className="tfs-sheet-item-meta">
                        {it.note && <span className="tfs-sheet-item-note">{it.note}</span>}
                        {it.tags && it.tags.map((t, ti) => (
                          <span key={ti} className="tfs-diet">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="tfs-sheet-item-price">{it.price}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tfs-sheet-footer">
          <button
            className={`tfs-sheet-btn ${isSelected ? 'is-remove' : ''}`}
            onClick={onToggle}
          >
            {isSelected ? t.sheetRemove(t.cuisines[cuisine].name) : t.sheetAdd(t.cuisines[cuisine].name)}
            {!isSelected && <span className="tfs-arrow">→</span>}
          </button>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STICKY TRAY — selected cuisines, peeks from bottom
// ═══════════════════════════════════════════════════════════════════
function SelectionTray({ selected, onJump, t }) {
  const visible = selected.size > 0;
  return (
    <div className={`tfs-tray ${visible ? 'is-visible' : ''}`}>
      <div className="tfs-tray-left">
        <div className="tfs-tray-count">{selected.size}</div>
        <div>
          <div className="tfs-tray-label">{t.trayLabel}</div>
          <div className="tfs-tray-tags">
            {[...selected].map(c => t.cuisines[c].name).slice(0, 3).join(' · ')}
            {selected.size > 3 ? ` +${selected.size - 3}` : ''}
          </div>
        </div>
      </div>
      <button className="tfs-tray-btn" onClick={onJump}>
        {t.trayBtn}
        <span className="tfs-arrow">→</span>
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════
function App() {
  const [selected, setSelected] = useState(new Set());
  const [sheetCuisine, setSheetCuisine] = useState(null);
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem('tfs-lang');
      if (stored === 'en' || stored === 'es') return stored;
      const nav = (navigator.language || 'en').toLowerCase();
      return nav.startsWith('es') ? 'es' : 'en';
    } catch { return 'en'; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem('tfs-lang', l); } catch {}
    document.documentElement.lang = l;
  };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const t = window.TFS_TRANSLATIONS[lang];

  const toggle = (id) => {
    setSelected(s => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const remove = (id) => {
    setSelected(s => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="tfs-shell">
      <Nav onCta={() => scrollTo('order')} lang={lang} setLang={setLang} t={t} />
      <Hero
        onQuote={() => scrollTo('order')}
        onExplore={() => scrollTo('cuisines')}
        t={t}
      />
      <Cuisines
        selected={selected}
        onToggle={toggle}
        onOpen={(id) => setSheetCuisine(id)}
        t={t}
      />
      <HowItWorks t={t} />
      <Perks t={t} />
      <QuoteForm selected={selected} onRemove={remove} t={t} />
      <Footer lang={lang} setLang={setLang} t={t} />
      <MenuSheet
        cuisine={sheetCuisine}
        isSelected={sheetCuisine ? selected.has(sheetCuisine) : false}
        onToggle={() => { if (sheetCuisine) toggle(sheetCuisine); }}
        onClose={() => setSheetCuisine(null)}
        t={t}
      />
      <SelectionTray selected={selected} onJump={() => scrollTo('order')} t={t} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
