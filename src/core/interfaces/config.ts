import { AllTypes, MarketingTypes } from "./data";


export interface IRemoteData {
  config: IRemoteConfig;
  domain: IDomain;
  json_list: MarketingTypes[]
}

export interface IDomain {
  url: string;
  host: string;
  catalog: string;
  campaign_url: string;
  desktop_banner: string;
  campaign: string;
  currency: string;
  mobile_banner: string;
}

export interface IFlashSalesConfig {
  flash_sales_weblink: string;
  display_collection_icons_flash_sales: string;
  flash_sales_desktop_banner: string;
  display_double_banner_flash_sales: string;
  flash_sales_app_banner: string;
  display_catalog_flash_sales: string;
  skus_per_page_flash_sales: string;
  minute_duration_flash_sales: string;
  flash_sales_mobile_banner: string;
}

export interface ICampaignCalendarConfig {
  campaign_calendar_weblink: string;
  display_collection_icons_campaign_calendar: string;
  campaign_calendar_desktop_banner: string;
  display_double_banner_campaign_calendar: string;
  campaign_calendar_app_banner: string;
  display_catalog_campaign_calendar: string;
  skus_per_page_campaign_calendar: string;
  minute_duration_campaign_calendar: string;
  campaign_calendar_mobile_banner: string;
}

export interface ITreasureHuntConfig {
  display_double_banner_treasure_hunt: string;
  display_collection_icons_treasure_hunt: string;
  treasure_hunt_desktop_banner: string;
  display_catalog_treasure_hunt: string;
  treasure_hunt_deeplink: string;
  treasure_hunt_how_to_video: string;
  skus_per_page_treasure_hunt: string;
  treasure_hunt_mobile_banner: string;
  treasure_hunt_app_banner: string;
  minute_duration_treasure_hunt: string;
}

export interface ISurprisesConfig {
  surprises_app_banner: string;
  display_collection_icons_surprises: string;
  display_double_banner_surprises: string;
  minute_duration_surprises: string;
  skus_per_page_surprises: string;
  display_catalog_surprises: string;
  surprises_desktop_banner: string;
  surprises_weblink: string;
  surprises_mobile_banner: string;
  surprises_deeplink: string;
}

export interface IMastercardConfig {
  display_double_banner_mastercard: string;
  minute_duration_mastercard: string;
  mastercard_desktop_banner: string;
  mastercard_app_banner: string;
  skus_per_page_mastercard: string;
  display_catalog_mastercard: string;
  mastercard_weblink: string;
  mastercard_deeplink: string;
  mastercard_mobile_banner: string;
  display_collection_icons_mastercard: string;
}

export interface ILegalConfig {
  legal_desktop_banner: string;
  legal_mobile_banner: string;
  legal_weblink: string;
  legal_app_banner: string;
  minute_duration_legal: string;
  skus_per_page_legal: string;
  display_catalog_legal: string;
  display_collection_icons_legal: string;
  display_double_banner_legal: string;
}

export interface IJumiaIconsConfig {
  jumia_prime_icon: string;
  jumia_food_icon: string;
  official_store_icon: string;
  jumia_mall_icon: string;
  jumia_pay_icon: string;
}

export interface IJumiaPrimeConfig {
  display_catalog_jumia_prime: string;
  display_collection_icons_jumia_prime: string;
  jumia_prime_app_banner: string;
  skus_per_page_jumia_prime: string;
  minute_duration_jumia_prime: string;
  jumia_prime_mobile_banner: string;
  display_double_banner_jumia_prime: string;
  jumia_prime_desktop_banner: string;
  jumia_prime_weblink: string;
}

export interface IPredictAndWinConfig {
  display_catalog_predict_win: string;
  display_collection_icons_predict_win: string;
  display_double_banner_predict_win: string;
  predict_win_weblink: string;
  minute_duration_predict_win: string;
  skus_per_page_predict_win: string;
  predict_win_desktop_banner: string;
  predict_win_mobile_banner: string;
  predict_win_deeplink: string;
  predict_win_app_banner: string;
}

export interface IJumdleConfig {
  display_double_banner_jumdle: string;
  jumdle_deeplink: string;
  display_collection_icons_jumdle: string;
  jumdle_app_banner: string;
  display_catalog_jumdle: string;
  jumdle_mobile_banner: string;
  skus_per_page_jumdle: string;
  jumdle_weblink: string;
  minute_duration_jumdle: string;
  jumdle_desktop_banner: string;
}

export interface IVoteDealsConfig {
  display_catalog_vote_deals: string;
  skus_per_page_vote_deals: string;
  vote_deals_desktop_banner: string;
  display_collection_icons_vote_deals: string;
  display_double_banner_vote_deals: string;
  minute_duration_vote_deals: string;
  vote_deals_mobile_banner: string;
  votedeals_deeplink: string;
  vote_deals_app_banner: string;
  vote_deals_weblink: string;
}

export interface ISpotTheDifferenceConfig {
  display_double_banner_spot_the_difference: string;
  spot_the_difference_deeplink: string;
  spot_the_difference_weblink: string;
  spot_the_difference_mobile_banner: string;
  display_catalog_spot_the_difference: string;
  spot_the_difference_app_banner: string;
  display_collection_icons_spot_the_difference: string;
  spot_the_difference_desktop_banner: string;
  skus_per_page_spot_the_difference: string;
  minute_duration_spot_the_difference: string;
}

export interface IInternationalShippingConfig {
  international_shipping_weblink: string;
  display_catalog_international_shipping: string;
  international_shipping_app_banner: string;
  display_double_banner_international_shipping: string;
  display_collection_icons_international_shipping: string;
  skus_per_page_international_shipping: string;
  international_shipping_desktop_banner: string;
  minute_duration_international_shipping: string;
  international_shipping_mobile_banner: string;
}

export interface IWinnersConfig {
  display_double_banner_winners: string;
  display_catalog_winners: string;
  winners_deeplink: string;
  winners_mobile_banner: string;
  display_collection_icons_winners: string;
  minute_duration_winners: string;
  winners_app_banner: string;
  winners_weblink: string;
  skus_per_page_winners: string;
  winners_desktop_banner: string;
}

export interface ISolveAndWinConfig {
  minute_duration_solve_win: string;
  display_collection_icons_solve_win: string;
  solve_win_deeplink: string;
  solve_win_weblink: string;
  display_double_banner_solve_win: string;
  solve_win_desktop_banner: string;
  display_catalog_solve_win: string;
  solve_win_app_banner: string;
  skus_per_page_solve_win: string;
  solve_win_mobile_banner: string;
}

export interface IInitiativeColorsConfig {
  "Jumia Pay": string;
  "Rush Hour": string;
  "Shopping Voucher": string;
  "Brand Festival": string;
  "Official Store": string;
  "Jumia Tower": string;
  "Cyber Monday": string;
  "Daily Checkin": string;
  "Brand Day": string;
  "Free Delivery": string;
  "Daily Hot 10": string;
  "Jumia Food": string;
  "Jumia Prime": string;
  "Jumia Box": string;
  "Treasure Hunt": string;
  "Weekend Super Savers": string;
  "Flash Sale": string;
  "Explosion Day": string;
  "Star Prize": string;
}

export interface IRemoteConfig extends
IMastercardConfig, IPredictAndWinConfig, ITreasureHuntConfig,
IFlashSalesConfig, ISurprisesConfig, ILegalConfig, IJumiaIconsConfig,
IJumdleConfig, IVoteDealsConfig, ISpotTheDifferenceConfig, ISolveAndWinConfig,
IInternationalShippingConfig, IWinnersConfig, IJumiaIconsConfig,
IInitiativeColorsConfig, ICampaignCalendarConfig {
  display_featurebox_title: string;
  campaign_2_mdb: string;
  currency_position: string;
  skus_per_page: string;
  campaign_banner_mobile: string;
  Deals: string;
  campaign: string;
  host: string;
  app_page_url: string;
  campaign_tag: string;
  country_domain: string;
  campaign_2_url: string;
  country_name: string;
  all_products_catalog: string;
  featurebox_title: string;
  display_catalog: string;
  campaign_1_url: string;
  country_code: string;
  campaign_url: string;
  campaign_2_ddb: string;
  currency: string;
  display_double_banner: string;
  campaign_color: string;
  display_collection_icons: string;
  download_apps_page: string;
  campaign_1_ddb: string;
  time_zone: string;
  campaign_banner_desktop: string;
}