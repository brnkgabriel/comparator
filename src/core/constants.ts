import { IDBConfig, IConstants } from "./interfaces/others";

export const config:IDBConfig = {
  apiKey: "AIzaSyAA8dQEt-yZnDyY3Lra8lndRJ3LWNYVW0o",
  authDomain: "jumia-c15a3.firebaseapp.com",
  databaseURL: "https://jumia-c15a3.firebaseio.com",
  projectId: "jumia-c15a3",
  storageBucket: "jumia-c15a3.appspot.com",
  messagingSenderId: "295115190934",
  appId: "1:295115190934:web:de0b33b53a514c3c"
}

export const gfConfig: IDBConfig = {
  apiKey: "AIzaSyCKGQw8QCq8qcxJ39QznQgarzOLP_WF1_Q",
  authDomain: "jumia-17681.firebaseapp.com",
  databaseURL: "https://jumia-17681.firebaseio.com",
  projectId: "jumia-17681",
  storageBucket: "jumia-17681.appspot.com",
  messagingSenderId: "472156067665",
  appId: "1:472156067665:web:976495829b072466"
}

export const constants = {
  COLLECTION: "productcomparator",
  DOCSEVENT: "docs event",
  ABOUT: "about",
  CONFIG: "config",
  SEEALL: "see all",

  SHEETNAME: "campaign_calendar",
  NAME: "Campaign Calendar",
  TANDCS: "Campaign Calendar T & Cs",
  FOCUS: "focus",
  BUILD: "build",
  RESET: "reset",
  TABLISTENER: "tab listener",
  INSESSION: "in session",
  AFTERSESSION: "after session",
  BTWORB4SESSION: "between or before session",
  TIMESLOTSTODISPLAY: 12,
  SKUROWQUERY: ".-sku_row",
  MAINELQUERY: ".-main-el",
  FLIPPERQUERY: ".-flipper",
  FLIPPERBACKQUERY: ".-flipper .-back",
  SUPERBLOCKTITLEQUERY: ".-similar-products",
  SWITCHQUERY: ".-switcher",
  SELECTIONQUERY: ".-selection",
  SEARCHINPUTQUERY: ".-search-input",
  LIVECLASS: "-live",
  SEARCHING: "searching",
  OOSCLASS: "-oos",
  TABCLASS: "-tab",
  CATTYPE: "category",
  DIRBTN: "dir-btn",
  ATC: "atc",
  COMPARE: "compare",
  SELECTIONBTN: "selection-btn",
  SEARCHBTN: "search-btn",
  AM: "am",
  PM: "pm",
  TODAY: "today",
  YESTERDAY: "yesterday",
  TOMORROW: "tomorrow",
  PREFIX: "prefix",
  FREE: "FREE",
  INITIATIVE: "Campaign Calendar",
  TANDCSQUERY: ".-re.-rules",
  HOWITWORKSQUERY: ".-how-it-works",
  TOPBANNERQUERY: ".-banner.-top",
  FROMSTART: "from start",
  CLICK: "click",
  TOGGLE: "toggle",
  REMOVE: "remove",
  ADD: "add",
  CONTROL: ".-control",

  // Controller class constants
  SHOWCLASS: "-show",
  TXTCLASS: ".-txt",
  CLOSE: "Close",
  TERMSANDCONDIIONS: "Terms & Conditions",
  BANNERQUERY: ".-banner.-top img.lazy-image",
  DATASRC: "data-src",
  KEYWORDS: ["with", "and", "tv"],

  // Tabs class constants
  TABQUERY: ".-tab",
  TABSQUERY: ".-all-tabs",
  TABSPARENTQUERY: ".-tabs",
  PREVQUERY: ".-control.-prev",
  NEXTQUERY: ".-control.-next",
  FIRSTTAB: "first tab",
  ACTIVECLASS: "active",
  DATATIME: "data-time",
  NEXT: "next",
  PREV: "prev",

  // SKURows class constants
  SKUSELQUERY: ".-skus",
  SKUROWCLASS: "-sku_row -posrel"
}

export const fxn = {
  idQuery: (query: string) => "#initiative " + query,
  timeQuery: (time: number) => '.-sku_row[data-time="' + time + '"]',
  tabQuery: (time: number) => '.-tab[data-time="' + time + '"]'
}