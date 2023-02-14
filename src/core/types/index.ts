export interface iAbout {
  answer: string;
  num: string;
  question: string;
}

export interface iConfig {
  countryLocale: string;
  desktopBanner: string;
  mobileAppBanner: string;
  mlp: string;
  currency: string;
  domain: string;
  currencyPosition: string;
}

export interface iCategory {
  approved: string;
  image: string;
  singular_name: string;
  plural_name: string;
  price_point: string;
  sku_count: string;
  skus: iSKU[],
  url: string;
}

export interface iPrice {
  discount?: string;
  oldPrice?: string;
  oldPriceEuro?: string;
  price?: string;
  priceEuro?: string;
  rawPrice?: string;
  taxEuro?: string;
}

export interface iCampaign {
  identifier: string;
  image: string;
  name: string;
  url: string;
}

export interface iMain {
  identifier: string;
  name: string;
  url: string;
}

export interface iBadge {
  main?: iMain;
  campaign?: iCampaign
}

export interface iRating {
  average: number;
  totalRatings: number;
}

export interface iExpress {
  title: string;
}

export interface iSimple {
  isBuyable: boolean;
  loginUrl: string;
  name: string;
  prices: iPrice;
  sku: string;
}

export interface iSKU {
  badges?: iBadge;
  brand?: string;
  categories?: string;
  displayName: string;
  image: string;
  isBuyable?: boolean;
  isShopExpress?: boolean;
  name?: string;
  prices: iPrice;
  rating?: iRating;
  selectedVariation?: string;
  sellerId?: number;
  shopExpress?: iExpress;
  simples?: iSimple[];
  sku: string;
  tags: string;
  url: string;
  properties?: string[];
  singularName?: string;
  pluralName?: string;
}

export interface iSuperblock {
  darkShade: string;
  lightShade: string;
  categories: iCategory[];
  id: string;
  name: string;
  url: string;
  skus: iSKU[]
}

export interface iDynamicObject {
  [key: string]: any;
}

export interface iRemoteData {
  about?: iAbout[];
  config?: iConfig;
  categories?: iCategory[]
}

export interface iCatMap {
  category: iCategory
}

export interface iNames {
  displayName: string;
  singularName: string;
}

export interface iProductFloorOptions {
  skus: iSKU[],
  catObj: iCategory,
  name: string,
  desc: string
}