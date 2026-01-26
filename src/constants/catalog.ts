export type CatalogSection = {
  id: string;
  title: string;
  slug: string;
  parentCategorySlug: string;
  image?: string;
};

export type CatalogCategory = {
  id: string;
  title: string;
  slug: string;
  image?: string;
  children?: { title: string; slug: string }[];
};

export type ProductBadge = "hit" | "new" | "sale" | "recommended";

export type CatalogProduct = {
  id: string;
  title: string;
  slug: string;

  categorySlug: string;
  sectionSlug: string;

  brand: string;
  type: string;

  price: number;
  oldPrice?: number;

  inStock: boolean;

  badges?: ProductBadge[];
  salePercent?: number;

  image?: string;
};

export const sidebarPromoImage = "/images/support.jpg";


export const catalogCategories: CatalogCategory[] = [
  {
    id: "cat-instrument",
    title: "Инструмент",
    slug: "instrument",
    image: "/images/catalog/tools.jpg",
    children: [
      { title: "Измерительный инструмент", slug: "measuring" },
      { title: "Инструмент для укладки плитки", slug: "tile" },
      { title: "Слесарные инструменты", slug: "locksmith" },
    ],
  },
  {
    id: "cat-floor",
    title: "Напольные покрытия",
    slug: "floor",
    image: "/images/catalog/floor.jpg",
    children: [
      { title: "Ламинат", slug: "laminate" },
      { title: "Паркетная доска", slug: "parquet" },
    ],
  },
  {
    id: "cat-tile",
    title: "Плитка",
    slug: "tiles",
    image: "/images/catalog/tile.jpg",
    children: [
      { title: "Напольная плитка", slug: "floor-tile" },
      { title: "Настенная плитка", slug: "wall-tile" },
      { title: "Плитка-мозаика", slug: "mosaic" },
    ],
  },
  {
    id: "cat-mixes",
    title: "Сухие смеси и грунтовки",
    slug: "mixes",
    image: "/images/catalog/mixes.jpg",
    children: [
      { title: "Цемент", slug: "cement" },
      { title: "Шпаклевка", slug: "putty" },
      { title: "Штукатурка", slug: "plaster" },
    ],
  },
  {
    id: "cat-power",
    title: "Электроинструменты",
    slug: "power-tools",
    image: "/images/catalog/power-tools.jpg",
    children: [
      { title: "Дрель", slug: "drill" },
      { title: "Фен технический", slug: "heat-gun" },
      { title: "Шуруповерт", slug: "screwdriver" },
    ],
  },
];


export const catalogSections: CatalogSection[] = [
  {
    id: "sec-measuring",
    parentCategorySlug: "instrument",
    title: "Измерительный инструмент",
    slug: "measuring",
    image: "/images/sections/measuring.png",
  },
  {
    id: "sec-tile",
    parentCategorySlug: "instrument",
    title: "Инструмент для укладки плитки",
    slug: "tile",
    image: "/images/sections/tile.png",
  },
  {
    id: "sec-locksmith",
    parentCategorySlug: "instrument",
    title: "Слесарные инструменты",
    slug: "locksmith",
    image: "/images/sections/locksmith.png",
  },
  {
    id: "sec-laminate",
    parentCategorySlug: "floor",
    title: "Ламинат",
    slug: "laminate",
    image: "/images/sections/laminate.png",
  },
  {
    id: "sec-linoleum",
    parentCategorySlug: "floor",
    title: "Линолеум",
    slug: "linoleum",
    image: "/images/sections/linoleum.png",
  },
  {
    id: "sec-parquet",
    parentCategorySlug: "floor",
    title: "Паркетная доска",
    slug: "parquet",
    image: "/images/sections/parquet.png",
  },
  // --- tiles ---
  {
    id: "sec-floor-tile",
    parentCategorySlug: "tiles",
    title: "Напольная плитка",
    slug: "floor-tile",
    image: "/images/sections/floor-tile.png",
  },
  {
    id: "sec-wall-tile",
    parentCategorySlug: "tiles",
    title: "Настенная плитка",
    slug: "wall-tile",
    image: "/images/sections/wall-tile.png",
  },
  {
    id: "sec-mosaic",
    parentCategorySlug: "tiles",
    title: "Плитка-мозаика",
    slug: "mosaic",
    image: "/images/sections/mosaic.png",
  },
  // --- mixes ---
  {
    id: "sec-cement",
    parentCategorySlug: "mixes",
    title: "Цемент",
    slug: "cement",
    image: "/images/sections/cement.png",
  },
  {
    id: "sec-putty",
    parentCategorySlug: "mixes",
    title: "Шпатлевка",
    slug: "putty",
    image: "/images/sections/putty.png",
  },
  {
    id: "sec-plaster",
    parentCategorySlug: "mixes",
    title: "Штукатурка",
    slug: "plaster",
    image: "/images/sections/plaster.png",
  },
  // --- power-tools ---
  {
    id: "sec-drill",
    parentCategorySlug: "power-tools",
    title: "Дрель",
    slug: "drill",
    image: "/images/sections/drill.png",
  },
  {
    id: "sec-heat-gun",
    parentCategorySlug: "power-tools",
    title: "Фен технический",
    slug: "heat-gun",
    image: "/images/sections/heat-gun.png",
  },
  {
    id: "sec-screwdriver",
    parentCategorySlug: "power-tools",
    title: "Шуруповерт",
    slug: "screwdriver",
    image: "/images/sections/screwdriver.png",
  },
];


export const catalogProducts: CatalogProduct[] = [
  {
    id: "p-1",
    title: "Дальномер лазерный BOSCH Professional GLM 40",
    slug: "bosch-glm-40",
    categorySlug: "instrument",
    sectionSlug: "measuring",
    brand: "BOSCH",
    type: "дальномер",
    price: 4500,
    oldPrice: 4900,
    inStock: true,
    badges: ["new", "sale"],
    salePercent: -8,
    image: "/img/products/bosch-glm40.png",
  },
  {
    id: "p-2",
    title: "Дальномер ELITECH ЛД 40Н лазерный",
    slug: "elitech-ld-40n",
    categorySlug: "instrument",
    sectionSlug: "measuring",
    brand: "ELITECH",
    type: "дальномер",
    price: 2600,
    inStock: true,
    image: "/img/products/elitech-ld40n.png",
  },
  {
    id: "p-3",
    title: "Лазерный нивелир BOSCH Universal Level 2 Set",
    slug: "bosch-universal-level-2",
    categorySlug: "instrument",
    sectionSlug: "measuring",
    brand: "BOSCH",
    type: "нивелир",
    price: 4500,
    inStock: true,
    badges: ["hit", "new"],
    image: "/img/products/bosch-level2.png",
  },

  {
    id: "p-4",
    title: "Зубчатая гладилка LUX-TOOLS Classic сталь 130×270 мм",
    slug: "lux-trowel-130x270",
    categorySlug: "instrument",
    sectionSlug: "tile",
    brand: "LUX-TOOLS",
    type: "гладилка",
    price: 229,
    inStock: true,
    image: "/img/products/trowel.png",
  },
  {
    id: "p-5",
    title: "Захват LUX вакуумный двойной 120 мм",
    slug: "lux-vacuum-double-120",
    categorySlug: "instrument",
    sectionSlug: "tile",
    brand: "LUX-TOOLS",
    type: "захват",
    price: 1130,
    oldPrice: 1450,
    inStock: true,
    badges: ["new", "sale"],
    salePercent: -22,
    image: "/img/products/vacuum-double.png",
  },
  {
    id: "p-6",
    title: "Вакуумный захват LUX-TOOLS Classic тройной",
    slug: "lux-vacuum-triple",
    categorySlug: "instrument",
    sectionSlug: "tile",
    brand: "LUX-TOOLS",
    type: "захват",
    price: 1450,
    inStock: true,
    badges: ["hit"],
    image: "/img/products/vacuum-triple.png",
  },

  {
    id: "p-7",
    title: "Молоток кровельщика LUX-TOOLS 600 гр",
    slug: "lux-roof-hammer-600",
    categorySlug: "instrument",
    sectionSlug: "locksmith",
    brand: "LUX-TOOLS",
    type: "молоток",
    price: 1500,
    inStock: true,
    badges: ["new"],
    image: "/img/products/hammer.png",
  },
  {
    id: "p-8",
    title: "Молоток слесарный дерево 300 гр",
    slug: "hammer-300-wood",
    categorySlug: "instrument",
    sectionSlug: "locksmith",
    brand: "PR-VOLGA",
    type: "молоток",
    price: 90,
    oldPrice: 120,
    inStock: true,
    badges: ["hit", "sale", "recommended"],
    salePercent: -25,
    image: "/img/products/hammer-wood.png",
  },
  {
    id: "p-9",
    title: "Набор отверток LUX-TOOLS Classic 6 предметов",
    slug: "lux-screwdrivers-6",
    categorySlug: "instrument",
    sectionSlug: "locksmith",
    brand: "LUX-TOOLS",
    type: "отвертка крестовая",
    price: 710,
    inStock: true,
    badges: ["new"],
    image: "/img/products/screwdrivers.png",
  },
  // =======================
// FLOOR — Ламинат
// =======================
  {
    id: "p-floor-1",
    title: "Ламинат «Дуб Монгольский» 33 класс",
    slug: "laminate-dub-mongolskiy-33",
    categorySlug: "floor",
    sectionSlug: "laminate",
    brand: "ARTENS",
    type: "ламинат",
    price: 480,
    inStock: true,
    badges: ["hit"],
    image: "/img/products/laminate-1.png",
  },
  {
    id: "p-floor-2",
    title: "Ламинат «Дуб Ривер» 31 класс",
    slug: "laminate-dub-river-31",
    categorySlug: "floor",
    sectionSlug: "laminate",
    brand: "ARTENS",
    type: "ламинат",
    price: 228,
    oldPrice: 280,
    inStock: true,
    badges: ["sale"],
    salePercent: -18,
    image: "/img/products/laminate-2.png",
  },
  {
    id: "p-floor-3",
    title: "Ламинат «Дуб Хадсон» 31 класс",
    slug: "laminate-dub-hudson-31",
    categorySlug: "floor",
    sectionSlug: "laminate",
    brand: "ARTENS",
    type: "ламинат",
    price: 228,
    inStock: true,
    badges: ["new", "recommended"],
    image: "/img/products/laminate-3.png",
  },

// =======================
// FLOOR — Линолеум
// =======================
  {
    id: "p-floor-4",
    title: "Линолеум «Дуб Венский» 32 класс 3 м",
    slug: "linoleum-dub-venskiy-32",
    categorySlug: "floor",
    sectionSlug: "linoleum",
    brand: "TARKETT",
    type: "линолеум",
    price: 508,
    inStock: true,
    image: "/img/products/linoleum-1.png",
  },
  {
    id: "p-floor-5",
    title: "Линолеум «Дуб Маренго» 21 класс 3 м",
    slug: "linoleum-dub-marengo-21",
    categorySlug: "floor",
    sectionSlug: "linoleum",
    brand: "TARKETT",
    type: "линолеум",
    price: 286,
    oldPrice: 560,
    inStock: true,
    badges: ["sale"],
    salePercent: -48,
    image: "/img/products/linoleum-2.png",
  },
  {
    id: "p-floor-6",
    title: "Линолеум «Дуб Прованс» 32 класс 3.5 м",
    slug: "linoleum-dub-provans-32",
    categorySlug: "floor",
    sectionSlug: "linoleum",
    brand: "TARKETT",
    type: "линолеум",
    price: 614,
    inStock: true,
    badges: ["hit"],
    image: "/img/products/linoleum-3.png",
  },

// =======================
// FLOOR — Паркетная доска
// =======================
  {
    id: "p-floor-7",
    title: "Паркетная доска «Дуб Натуральный»",
    slug: "parquet-dub-natural",
    categorySlug: "floor",
    sectionSlug: "parquet",
    brand: "BARLINEK",
    type: "паркетная доска",
    price: 3200,
    inStock: true,
    badges: ["recommended"],
    image: "/img/products/parquet-1.png",
  },
  {
    id: "p-floor-8",
    title: "Паркетная доска «Дуб Селект»",
    slug: "parquet-dub-select",
    categorySlug: "floor",
    sectionSlug: "parquet",
    brand: "BARLINEK",
    type: "паркетная доска",
    price: 3650,
    inStock: false,
    image: "/img/products/parquet-2.png",
  },

// =======================
// TILES — Напольная плитка
// =======================
  {
    id: "p-tile-1",
    title: "Плитка напольная керамогранит 600×600",
    slug: "floor-tile-600x600",
    categorySlug: "tiles",
    sectionSlug: "floor-tile",
    brand: "KERAMA MARAZZI",
    type: "керамогранит",
    price: 1190,
    inStock: true,
    badges: ["hit"],
    image: "/img/products/tile-floor.png",
  },

// =======================
// MIXES — Цемент
// =======================
  {
    id: "p-mix-1",
    title: "Цемент М500 Д0 50 кг",
    slug: "cement-m500-50kg",
    categorySlug: "mixes",
    sectionSlug: "cement",
    brand: "EUROCEMENT",
    type: "цемент",
    price: 520,
    inStock: true,
    image: "/img/products/cement.png",
  },

// =======================
// POWER TOOLS — Шуруповерт
// =======================
  {
    id: "p-power-1",
    title: "Шуруповерт аккумуляторный BOSCH GSR 120-LI",
    slug: "bosch-gsr-120",
    categorySlug: "power-tools",
    sectionSlug: "screwdriver",
    brand: "BOSCH",
    type: "шуруповерт",
    price: 6900,
    inStock: true,
    badges: ["hit", "recommended"],
    image: "/img/products/screwdriver-bosch.png",
  },

  {
    id: "p-tile-floor-1",
    title: "Керамогранит «Милан Брера» 30x30 см",
    slug: "keramogranit-milan-brera-30x30",
    categorySlug: "tiles",
    sectionSlug: "floor-tile",
    brand: "KERAMA MARAZZI",
    type: "керамогранит",
    price: 1090,
    oldPrice: 1340,
    inStock: true,
    badges: ["hit", "sale"],
    salePercent: -18,
    image: "/img/products/tile-milan-brera.png",
  },
  {
    id: "p-tile-floor-2",
    title: "Керамогранит «Сланец» 30x30",
    slug: "keramogranit-slanec-30x30",
    categorySlug: "tiles",
    sectionSlug: "floor-tile",
    brand: "KERAMA MARAZZI",
    type: "керамогранит",
    price: 1200,
    inStock: true,
    badges: ["hit"],
    image: "/img/products/tile-slanec.png",
  },
  {
    id: "p-tile-floor-3",
    title: "Керамогранит EZ01 40x40",
    slug: "keramogranit-ez01-40x40",
    categorySlug: "tiles",
    sectionSlug: "floor-tile",
    brand: "ESTIMA",
    type: "керамогранит",
    price: 1620,
    inStock: true,
    badges: ["new"],
    image: "/img/products/tile-ez01.png",
  },
  {
    id: "p-mix-cement-1",
    title: "Портландцемент Holcim M500 ЦЕМ II/А-И 42.5 25 кг",
    slug: "holcim-m500-25kg",
    categorySlug: "mixes",
    sectionSlug: "cement",
    brand: "HOLCIM",
    type: "цемент",
    price: 183,
    oldPrice: 220,
    inStock: true,
    badges: ["hit", "sale"],
    salePercent: -16,
    image: "/img/products/cement-holcim-25.png",
  },
  {
    id: "p-mix-cement-2",
    title: "Портландцемент Евроцемент М500 ЦЕМ II/А-Ш 42.5 Н 50 кг",
    slug: "eurocement-m500-50kg",
    categorySlug: "mixes",
    sectionSlug: "cement",
    brand: "ЕВРОЦЕМЕНТ",
    type: "цемент",
    price: 413,
    inStock: true,
    badges: ["hit"],
    image: "/img/products/cement-eurocement-50.png",
  },
  {
    id: "p-mix-cement-3",
    title: "Цемент Axton 5 кг",
    slug: "axton-cement-5kg",
    categorySlug: "mixes",
    sectionSlug: "cement",
    brand: "AXTON",
    type: "цемент",
    price: 96,
    inStock: true,
    badges: ["new"],
    image: "/img/products/cement-axton-5.png",
  },
  {
    id: "p-mix-cement-4",
    title: "Цемент монтажный Ceresit CX5 водоостанавливающий, 2 кг",
    slug: "ceresit-cx5-2kg",
    categorySlug: "mixes",
    sectionSlug: "cement",
    brand: "CERESIT",
    type: "цемент",
    price: 330,
    oldPrice: 370,
    inStock: true,
    badges: ["sale"],
    salePercent: -10,
    image: "/img/products/cement-ceresit-cx5.png",
  },
  {
    id: "p-mix-cement-5",
    title: "Цемент Севряковцемент ПЦ-500 Д20, 50 кг",
    slug: "severyakovcement-pc500-50kg",
    categorySlug: "mixes",
    sectionSlug: "cement",
    brand: "СЕВРЯКОВЦЕМЕНТ",
    type: "цемент",
    price: 305,
    inStock: true,
    badges: ["recommended"],
    image: "/img/products/cement-sevryakov-50.png",
  },
  {
    id: "p-mix-putty-1",
    title: "Шпаклевка полимерная финишная Axton 5 кг",
    slug: "axton-putty-finish-5kg",
    categorySlug: "mixes",
    sectionSlug: "putty",
    brand: "AXTON",
    type: "шпаклевка",
    price: 160,
    inStock: true,
    image: "/img/products/putty-axton-5.png",
  },
  {
    id: "p-mix-putty-2",
    title: "Шпаклёвка полимерная финишная Weber Vetonit LR Plus 20 кг",
    slug: "vetonit-lr-plus-20kg",
    categorySlug: "mixes",
    sectionSlug: "putty",
    brand: "WEBER",
    type: "шпаклевка",
    price: 590,
    inStock: true,
    badges: ["hit", "new"],
    image: "/img/products/putty-vetonit-lr-plus.png",
  },
  {
    id: "p-mix-putty-3",
    title: "Шпаклевка цементная Axton базовая, 25 кг",
    slug: "axton-putty-cement-base-25kg",
    categorySlug: "mixes",
    sectionSlug: "putty",
    brand: "AXTON",
    type: "шпаклевка",
    price: 286,
    inStock: true,
    image: "/img/products/putty-axton-cement.png",
  },
  {
    id: "p-mix-putty-4",
    title: "Шпаклёвка цементная финишная Weber Vetonit Facade white 20 кг",
    slug: "vetonit-facade-white-20kg",
    categorySlug: "mixes",
    sectionSlug: "putty",
    brand: "WEBER",
    type: "шпаклевка",
    price: 560,
    oldPrice: 670,
    inStock: true,
    badges: ["hit", "new", "sale"],
    salePercent: -16,
    image: "/img/products/putty-vetonit-facade.png",
  },

  {
    id: "p-mix-plaster-1",
    title: "Штукатурка гипсовая Plitonit GT 30 кг",
    slug: "plitonit-gt-30kg",
    categorySlug: "mixes",
    sectionSlug: "plaster",
    brand: "PLITONIT",
    type: "штукатурка",
    price: 420,
    inStock: true,
    badges: ["hit"],
    image: "/img/products/plaster-plitonit.png",
  },
  // =======================
// POWER TOOLS — DRILL
// =======================
  {
    id: "pt-1",
    title: "Аккумуляторная дрель-шуруповерт BOSCH EasyDrill 12-2 (без АКБ)",
    slug: "bosch-easydrill-12-2",
    categorySlug: "power-tools",
    sectionSlug: "drill",
    brand: "BOSCH",
    type: "дрель-шуруповерт",
    price: 2290,
    inStock: true,
    badges: ["hit", "recommended"],
    image: "/img/products/power/bosch-easydrill.png",
  },
  {
    id: "pt-2",
    title: "Дрель аккумуляторная Einhell TC-CD 18/35 Li 18 В",
    slug: "einhell-tc-cd-18-35",
    categorySlug: "power-tools",
    sectionSlug: "drill",
    brand: "Einhell",
    type: "дрель аккумуляторная",
    price: 5990,
    oldPrice: 7990,
    salePercent: -25,
    inStock: true,
    badges: ["hit", "sale", "recommended"],
    image: "/img/products/power/einhell-18-35.png",
  },
  {
    id: "pt-3",
    title: "Дрель ударная Bosch Professional GSB 13 RE (БЗП)",
    slug: "bosch-gsb-13-re",
    categorySlug: "power-tools",
    sectionSlug: "drill",
    brand: "BOSCH",
    type: "дрель ударная",
    price: 4100,
    inStock: true,
    badges: ["hit", "recommended"],
    image: "/img/products/power/bosch-gsb13.png",
  },

// =======================
// POWER TOOLS — HEAT GUN
// =======================
  {
    id: "pt-4",
    title: "Фен технический BOSCH UniversalHeat 600",
    slug: "bosch-universalheat-600",
    categorySlug: "power-tools",
    sectionSlug: "heat-gun",
    brand: "BOSCH",
    type: "фен технический",
    price: 3990,
    inStock: true,
    badges: ["new", "recommended"],
    image: "/img/products/power/bosch-heatgun.png",
  },
  {
    id: "pt-5",
    title: "Фен технический Makita HG5030K",
    slug: "makita-hg5030k",
    categorySlug: "power-tools",
    sectionSlug: "heat-gun",
    brand: "Makita",
    type: "фен технический",
    price: 5290,
    inStock: true,
    badges: ["hit"],
    image: "/img/products/power/makita-heatgun.png",
  },

// =======================
// POWER TOOLS — SCREWDRIVER
// =======================
  {
    id: "pt-6",
    title: "Дрель-шуруповерт ELITECH ДА 10.8СЛК2 (2 АКБ, без ЗУ)",
    slug: "elitech-da-10-8",
    categorySlug: "power-tools",
    sectionSlug: "screwdriver",
    brand: "ELITECH",
    type: "шуруповерт аккумуляторный",
    price: 2990,
    inStock: true,
    badges: ["hit"],
    image: "/img/products/power/elitech-10-8.png",
  },
  {
    id: "pt-7",
    title: "Дрель-шуруповерт аккумуляторная 12 В (1x АКБ)",
    slug: "screwdriver-12v-1akb",
    categorySlug: "power-tools",
    sectionSlug: "screwdriver",
    brand: "NoName",
    type: "шуруповерт аккумуляторный",
    price: 946,
    inStock: true,
    badges: ["new"],
    image: "/img/products/power/screwdriver-12v.png",
  },
  {
    id: "pt-8",
    title: "Дрель-шуруповерт аккумуляторная Makita DDF453SYX5 (2x АКБ)",
    slug: "makita-ddf453syx5",
    categorySlug: "power-tools",
    sectionSlug: "screwdriver",
    brand: "Makita",
    type: "шуруповерт аккумуляторный",
    price: 8990,
    oldPrice: 9990,
    salePercent: -10,
    inStock: true,
    badges: ["new", "sale"],
    image: "/img/products/power/makita-ddf453.png",
  },

];

export const getCategoryBySlug = (slug: string) =>
  catalogCategories.find((c) => c.slug === slug);

export const getSectionsByCategorySlug = (categorySlug: string) =>
  catalogSections.filter((s) => s.parentCategorySlug === categorySlug);

export const getProductsByCategorySlug = (categorySlug: string) =>
  catalogProducts.filter((p) => p.categorySlug === categorySlug);

export const uniqSorted = (items: string[]) =>
  Array.from(new Set(items)).sort((a, b) => a.localeCompare(b, "ru"));

export const badgeLabel: Record<ProductBadge, string> = {
  hit: "Хит",
  new: "Новинка",
  sale: "Акция",
  recommended: "Советуем",
};
