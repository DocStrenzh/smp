export type ServiceProduct = {
  id: string;
  serviceSlug: string;
  category: string;
  title: string;
  image: string;
  priceRub: number;
  shortSpecs: string[]; 
};

export const serviceProducts: ServiceProduct[] = [
  {
    id: "bps-block-1",
    serviceSlug: "bps",
    category: "Блоки подпорной стенки",
    title: "Блок верхний доборный",
    image: "/images/catalog/bps/block-1.jpg",
    priceRub: 2484,
    shortSpecs: [
      "Марка бетона: B30",
      "Морозостойкость: F300",
      "Водонепроницаемость: W8",
      "Применение: доборные элементы",
    ],
  },
  {
    id: "bps-block-2",
    serviceSlug: "bps",
    category: "Блоки подпорной стенки",
    title: "Блок основной доборный",
    image: "/images/catalog/bps/block-2.jpg",
    priceRub: 2180,
    shortSpecs: [
      "Марка бетона: B30",
      "Морозостойкость: F300",
      "Водонепроницаемость: W8",
      "Применение: доборные элементы",
    ],
  },
  {
    id: "bps-block-3",
    serviceSlug: "bps",
    category: "Блоки подпорной стенки",
    title: "Блок верхний",
    image: "/images/catalog/bps/block-3.jpg",
    priceRub: 4874,
    shortSpecs: [
      "Марка бетона: B30",
      "Морозостойкость: F300",
      "Водонепроницаемость: W8",
      "Фактура: под камень",
    ],
  },
  {
    id: "bps-block-4",
    serviceSlug: "bps",
    category: "Блоки подпорной стенки",
    title: "Блок основной",
    image: "/images/catalog/bps/block-4.jpg",
    priceRub: 5200,
    shortSpecs: [
      "Марка бетона: B30",
      "Морозостойкость: F300",
      "Водонепроницаемость: W8",
      "Фиксация: шип-паз",
    ],
  },
];

export const getServiceProductsBySlug = (slug?: string) =>
  serviceProducts.filter((p) => p.serviceSlug === slug);

export const formatRub = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value) + " ₽";
