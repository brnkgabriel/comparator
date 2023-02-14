import { ICampaignCalendar } from "./data";

export interface IDBConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface IConstants {
  ANOTHERDATA: string;
  SHEETNAME: string;
  NAME: string;
  TANDCS: string;
  FOCUS: string;
  BUILD: string;
  RESET: string;
  TABLISTENER: string;
  INSESSION: string;
  AFTERSESSION: string;
  BTWORB4SESSION: string;
  TIMESLOTSTODISPLAY: number;
  LIVECLASS: string;
  OOSCLASS: string;
  TABCLASS: string;
  PREFIX: string;
  TODAY: string;
  YESTERDAY: string;
  TOMORROW: string;
  AM: string;
  PM: string;
  FREE: string;
  INITIATIVE: string;
  FROMSTART: string;
  CLICK: string;

  // Controller class interface
  HOWITWORKSQUERY: string;
  TOPBANNERQUERY: string;
  SKUROWQUERY: string;
  TANDCSQUERY: string;
  SHOWCLASS: string;
  TXTCLASS: string;
  CLOSE: string;
  TERMSANDCONDIIONS: string;
  BANNERQUERY: string;
  DATASRC: string;


  // Tabs class interface
  TABQUERY: string;
  TABSQUERY: string;
  TABSPARENTQUERY: string;
  PREVQUERY: string;
  NEXTQUERY: string;
  FIRSTTAB: string;
  ACTIVECLASS: string;
  DATATIME: string;
  NEXT: string;
  PREV: string;

  // SKURows class interface
  SKUSELQUERY: string;
  SKUROWCLASS: string;
}



type KeyType = "Vote Deals" | "14 Days 14 Surprises" | "Wheel of Fortune" | "Treasure Hunt" | "Userneed" | "Shopper's Prize Draw" | "Jumia Food" | "What Do You Need" | "Tag" | "Solve & Win" | "Delivery Timelines" | "Pickup Stations" | "Help - Mall FAQs" | "Service Centers" | "Return FAQs" | "Return Timelines" | "Return Overview" | "Return Eligible Items" | "Jumia Express" | "Jumia Express FAQs" | "Jumdle" | "Jumdle T & Cs" | "Spot The Difference" | "Spot The Difference Images" | "Place Order" | "Track Order" | "Predict & Win" | "Winners" | "Mastercard" | "Standard Chartered" | "Gift Finder" | "International Shipping" | "International Shipping Stations" | "Jumia Prime" | "Surprises" | "Legal" | "Flash Sale" | "Campaign Calendar" | "Vote Deals T & C" | "WOF T & C" | "Treasure Hunt T & C" | "Solve & Win T & C" | "Quiz T & C" | "Spot The Difference T & C" | "Predict & Win T & C" | "Jumdle T & Cs" | "Surprises T & Cs" | "Flash Sale T & C" | "Campaign Calendar T & Cs";

export interface IGetDataOptions {
  key: string;
  name: string;
}

export interface IPastAndFutureTimes {
  past: number[];
  future: number[]
}

export interface IBuild {
  reorderedTimes: number[],
  groupedSKUs: IGroup[]
}

export interface IGroup {
  time: number;
  skus: ICampaignCalendar[];
}