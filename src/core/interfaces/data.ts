

export type MarketingTypes = IFlashSales | ICampaignCalendar | ISurprises | IVoteDeals | ITreasureHunt | IJumdle | IPredictAndWin | IQuizQuestions | ISpotTheDifferencePrizes | ISpotTheDifferenceImages | IWheelOFFortune | IUserneed | IGiftFinder

export type CSTypes = IInternationalShippingStations | IInternationalShippingFAQs | IDeliveryTimelines | IPlaceOrder | ITrackOrder | IJumiaExpress | IJumiaExpressFAQs | IPickupStations | IHelpFAQs | IMastercard | IJumiaPrime | ILegal | IStandardChartered | IReturnOverview | IReturnFAQs | IReturnTimelines | IReturnEligibility | IServiceCenters

export type AllTypes = MarketingTypes | CSTypes

interface IMarketing {
  time: string;
  type: string;
  status: string;
  initiative: string;
}

interface ISKU {
  sku: string;
  name: string;
  image: string;
  pdp: string;
}

export interface IFlashSales extends IMarketing, ISKU {
  barred_price: string;
  fs_price: string;
  fs_discount: string;
}

export interface ICampaignCalendar extends IMarketing, ISKU {
  barred_price: string;
  price: string;
  discount: string; 
  endTime: string 
}

export interface ISurprises extends IMarketing {
  code: string;
  name: string;
  image: string;
  pdp: string;
  barred_price: string;
  max_discount: string;
  discount: string; 
}

export interface IVoteDeals extends IMarketing, ISKU {
  old_price: string;
  new_price: string;
  category: string; 
}

export interface ITreasureHunt extends IMarketing {
  sku: string;
  name: string;
  offer: string;
  barred_price: string;
  price: string;
  units: string;
  category: string;
  category_url: string;
  image: string; 
}

export interface IJumdle extends IMarketing, ISKU {
  barred_price: string;
  fs_price: string;
  fs_discount: string;
  winner_name: string;
  winner_url: string; 
}

export interface IPredictAndWin {
  team_1: string;
  team_2: string;
  team_1_img: string;
  team_2_img: string;
  prize: string;
  prize_img: string;
  type: string;
  winner_name: string;
  winner_url: string;
  time: string;
  initiative: string;
}


export interface IQuizQuestions {
  id: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: string;
  odd: string;
  common: string;
  type: string;
  initiative: string;
}

export interface ISpotTheDifferencePrizes extends IMarketing, ISKU { 
  barred_price: string;
  fs_price: string;
  fs_discount: string;
  winner_name: string;
  winner_url: string 
}

export interface ISpotTheDifferenceImages {
  id: string;
  image: string;
  spot_color: string;
  initiative: string;
}

export interface IWheelOFFortune extends IMarketing {
  sku: string;
  prize_amount: string;
  prize: string;
  desc: string;
  units: string;
  category: string;
  category_url: string;
  image: string; 
  segment_no: string;
  dark_color: string;
  light_color: string;
  winner_name: string;
  winner_url: string; 
}

export interface IUserneed {
  name: string;
  image: string;
  url: string;
  initiative: string;
}

export interface IGiftFinder {
  name: string;
  image: string;
  url: string;
  tag: string;
  initiative: string;
}

export interface IInternationalShippingStations {
  name: string;
  address: string;
  map:string;
}

export interface IInternationalShippingFAQs {
  category: string;
  questions: string;
  answers: string;
  initiative: string;
}

export interface IDeliveryTimelines {
  location: string;
  tier: string;
  jumia_express: string;
  standard_shipping: string;
  shipped_from_overseas: string;
  economy_shipping: string;
  initiative: string;
}

export interface IPlaceOrder {
  step_no:string;
  step_description: string;
  initiative: string;
  type: string;
}

export interface ITrackOrder {
  step_no: string;
  step_description: string;
  initiative: string;
  type: string;
}

export interface IJumiaExpress {
  location: string;
  tier: string;
  jumia_express: string;
  initiative: string;
}

export interface IJumiaExpressFAQs {
  question: string;
  answer: string;
  initiative: string;
}

export interface IPickupStations {
  name: string;
  week: string;
  weekend: string;
  number: string;
  address: string;
  state: string;
  email: string;
  landmark: string;
  map: string;
  latitude: string;
  longitude: string;
  initiative: string;
}

export interface IHelpFAQs {
  category: string;
  question: string;
  answer: string;
  initiative: string;
}

export interface IMastercard {
  category: string;
  tandc: string;
  initiative: string;
}

export interface IJumiaPrime {
  category: string;
  tandc: string;
  initiative: string;
}

export interface ILegal {
  category: string;
  tandc: string;
  initiative: string;
}

export interface IStandardChartered {
  category: string;
  tandc: string;
  initiative: string;
}

export interface IReturnOverview {
  title: string;
  icon: string;
  description: string;
  initiative: string;
}

export interface IReturnFAQs {
  question: string;
  answer: string;
  initiative: string;
}

export interface IReturnTimelines {
  location: string;
  tier: string;
  pickup_timeline: string;
  refund_timeline: string;
  initiative: string;
}

export interface IRefundTimelines {
  payment_method: string;
  refund_method: string;
  refund_timeline: string;
  initiative: string;
}

export interface IReturnEligibility {
  category: string;
  changed_my_mind: string;
  wrong: string;
  defective: string;
  damaged_broken: string;
  fake_unauthentic: string;
  size: string;
  initiative: string;
}

export interface IServiceCenters {
  name: string;
  category: string;
  brand: string;
  region: string;
  email: string;
  map1: string;
  map2: string;
  address1: string;
  address2: string;
  phone1: string;
  phone2: string;
  warranty: string;
  warrantytype: string;
  warrantycomments: string;
  initiative: string;
}