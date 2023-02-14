var Featurebox = (function (json) {

  class Util {
    constructor() {
      this.initialize()
    }

    initialize() {
      this.DATA_ARRIVES = "data arrives"
      this.COLLECTION = json.config.collection || "marketing-initiatives"
      this.FILTER_UPDATED = "filter updated"
      this.UPDATE_URL = "update url"
      this.FREELINKS_BUILT = "freelinks built"
      this.FREELINK_NAME = "Userneed"
      this.GIFT_FINDER = "Gift Finder"
      this.UPDATE_FILTER_UI = "Update Filter Ui"
      this.SKUS_PER_PAGE = 40
      this.MAX_PAGE = 50
      this.NAME = json.name || ""
      this.APPID_QUERY = "#app"
      this.TAG = "Tag"
      this.PRODUCTS = "fetch type products"
      this.FILTERS = "fetch type filters"
      this.DESKTOP_SIDX = 'window.__STORE__='
      this.DESKTOP_EIDX = '};</scr'
      this.MOBILE_SIDX = "window.__INITIAL_STATE__="
      this.MOBILE_EIDX = ";window.__CONFS__"
      this.CATEGORY = "category"
      this.BRAND = "brand"
      this.PRODUCTS_DISPLAYED = "products displayed" 
      this.CATALOG = "catalog"
      this.FILTER = "filter"
      this.JUMIA_LOGO = "https://ng.jumia.is/cms/0-1-homepage/jumia-new-logo.png"
      
      this.isMobile = navigator.userAgent.toLowerCase().includes("mobi")
      this.urlParams = {
        brand: "",
        rating: "",
        price: "",
        discount: "",
        shop_premium_services: "",
        shipped_from: "",
        search: "",
        category: "",
        page: "",
        sort: "",
        tag: "",
        type: ""
      }


      this.config = {}

      this.skuDetails = null

      this.remContent = [
        "Grocery/Beverages/Coffee, Tea & Cocoa/Coffee & Tea Gifts",
        "Health & Beauty/Health Care/Medications & Treatments",
        "Home & Office/Office Products/Packaging Materials",
        "Grocery/Lighters & Matches",
        "Grocery/Beverages/Coffee, Tea & Cocoa/Tea/Herbal",
        "Fashion/Men's Fashion/Clothing/Underwear",
        "Women's Fashion/Clothing/Lingerie, Sleep & Lounge",
        "Health & Beauty/Sexual Wellness",
        "Fashion/Women's Fashion/Underwear & Sleepwear",
        "Fashion/Women's Fashion/Maternity",
        "Fashion/Women's Fashion/Clothing/Swimsuits & Cover Ups",
        "Women's Fashion/Clothing/Socks & Hosiery",
        "Sporting Goods/Sports & Fitness/Exercise & Fitness",
        "Home & Office/Arts, Crafts & Sewing/Sewing/Sewing Notions & Supplies/Dress Forms & Mannequins/Mannequins",
        "Fashion/Women's Fashion/Clothing/Active/Active Underwear",
      ];

      this.discounts = [
        { name: "50% or more", value: "50-100" },
        { name: "40% or more", value: "40-100" },
        { name: "30% or more", value: "30-100" },
        { name: "20% or more", value: "20-100" },
        { name: "10% or more", value: "10-100" },
      ]

      this.ratings = [
        { name: "rating-4", percent: "80%", value: "4-5" },
        { name: "rating-3", percent: "60%", value: "3-5" },
        { name: "rating-2", percent: "40%", value: "2-5" },
        { name: "rating-1", percent: "20%", value: "1-5" },
      ]

      /**
       * 
       * @param {string} query 
       * @param {string} parent 
       * @returns {HTMLElement}
       */
      this.el = (query, parent) => parent ? parent.querySelector(query) : document.querySelector(query)
      /**
       * 
       * @param {string} query 
       * @param {string} parent 
       * @returns {HTMLElement[]}
       */
      this.all = (query, parent) => parent ? parent.querySelectorAll(query) : document.querySelectorAll(query)
      /**
       * 
       * @param {string} query 
       * @returns {HTMLElement}
       */
      this.create = query => document.createElement(query)

      /**
       * 
       * @param {object} json 
       * @returns {string}
       */
      this.filtersUrl = json => json.host + "/catalog/filters/?return=" + json.url

      /**
       * 
       * @param {string} brand 
       * @returns {string}
       */
      this.brandToUrl = brand => brand.split(" ").join("-").toLowerCase();
      this.skusPerPage = () => {
        const skusPP = json.config["skus_per_page_" + this.NAME] || json.config.skus_per_page || 40
        return parseInt(skusPP)
      }
      /**
       * 
       * @param {object} data 
       * @returns {string[]}
       */
      this.skus = data => data.skus.slice(0, this.skusPerPage())
      this.percent = rating => ((rating / 5) * 100).toFixed(2)
      this.id = name => name.split(" ").join("-").toLowerCase()
      /**
       * 
       * @param {number} num 
       * @returns {number[]}
       */
      this.num2List = num => Array.from(Array(num).keys())
      /**
       * 
       * @param {string} key 
       * @param {object} json 
       * @returns string
       */
      this.unite = (key, json) => `${key}=${json[key]}`
    }


    nameMap() {
      return {
        shop_premium_services: "premium service",
        shipped_from: "shipped from",
        country_local: this.config.country_name,
        jumia_global: "abroad",
        shop_express: "free delivery",
        "country_local--jumia_global": this.config.country_name + " & " + "abroad",
        "jumia_global--country_local": this.config.country_name + " & " + "abroad",
        brand: "brand",
        rating: "rating",
        price: "price",
        discount: "discount",
        search: "search",
        category: "category",
        page: "page",
        sort: "sort",
        tag: "tag",
        type: "type"
      }
    }

    shippedFroms(country) {
      return [
        {
          name: "Shipped from abroad",
          value: "jumia_global",
          class_name: "-global",
        },
        {
          name: "Shipped from " + country,
          value: "country_local",
          class_name: "-local",
        },
      ];
    }

    addAndRemove(toAdd, toRemove, className) {
      toAdd.forEach(el => el.classList.add(className))
      toRemove.forEach(el => el.classList.remove(className))
    }

    url(json, domain) {
      const catalog = json.search !== "" ? domain.catalogSearch : domain.catalog
      const category = json.category
      const brand = json.brand
      let link = catalog
      const search = json.search

      link += category !== "" ? `/${category}/`: ""
      link += brand !== "" ? `/${brand}/` : ""
      link += "?"
      link += search !== "" ? `q=${search}&` : ""

      const otherFilters = Object.keys(json)
      .filter(key => this.otherFilters(key, json))
      .map(key => this.unite(key, json))
      .join("&")

      const url = link + otherFilters
      return url
    }

    otherFilters(key, json) {
      return json[key] !== "" &&
      key !== "category" &&
      key !== "brand" &&
      key !== "search"
    }
  }

  class PubSub {
    constructor() {
      this.events = {}
    }

    subscribe(eventName, fn) {
      this.events[eventName] = this.events[eventName] || []
      this.events[eventName].push(fn)
    }

    unsubscribe(eventName, fn) {
      if (this.events[eventName]) {
        const idx = this.events[eventName].findIndex(fxn => fxn === fn)
        this.events[eventName].splice(idx, 1)
      }
    }

    emit(eventName, data) {
      if (this.events[eventName]) { this.events[eventName].forEach(fn => fn(data)) }
    }
  }

  class Database {
    constructor(config) {
      this.initialize(config)
    }

    initialize(config) {
      this.app = firebase.initializeApp(config, config.projectId)
      this.firestore = this.app.firestore()
    }

    getAll(collection, event) {
      const documents = {}
      return this.firestore.collection(collection).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => documents[doc.id] = doc.data())
        pubsub.emit(event, documents)
    });
    }

    getDoc(collection, docRef, event) {
      return this.firestore.collection(collection).doc(docRef)
      .get().then(doc => pubsub.emit(event, doc.exists ? doc.data() : {}))
      .catch(err => console.error(err))
    }

    setDoc(collection, docRef, data) {
      const ref = this.firestore.collection(collection).doc(docRef)
      return ref.set(data, { merge: true })
    }
  }

  class PreProcess {
    constructor() {
      this.initialize()
    }

    initialize() {
      this.span = util.create("span")
      this.span.className = "-loading -posabs -preloader"
      // window.addEventListener("load", this.cartSectionAdjustments.bind(this))
      this.cartSectionAdjustments()
    }

    cartSectionAdjustments() {
      this.addPreloaderToMainHeader() && this.proceed()
      util.isMobile && this.mobileLogoUpdate()
    }

    mobileLogoUpdate() {
      let logo = util.el(".main_header--nav-left--logo.-logo_cms>img")
      logo && logo.setAttribute("src", util.JUMIA_LOGO)
    }

    proceed() {
      let actions = util.el(".header-main>.actions")
      let cart = util.el("#cart")
      let account = util.el("#account")
      let help = util.el("#help")
      let logo = util.el(".header-main>.logo>a>img")
      
      logo && logo.setAttribute("src", util.JUMIA_LOGO)

      actions.innerHTML = ""
      actions.appendChild(account)
      actions.appendChild(help)
      actions.appendChild(cart)

      let searchBar = util.el(".osh-search-bar")
      let searchBtn = util.el("#header-search-submit")
      let searchFld = util.el(".osh-search-bar>.field-panel")

      searchBar.innerHTML = ""
      searchBar.appendChild(searchFld)
      searchBar.appendChild(searchBtn)

      let hello = util.el("#account.osh-dropdown .label")
      let hTxtC = hello.textContent
      hello.innerHTML = hTxtC === "Your" ? "<icon></icon><txt>Your</txt>" : "<icon></icon><txt>Hi,</txt>"

      var helpLabel = util.el("#help.osh-dropdown .label")
      helpLabel.innerHTML = ""
      

      this.span.classList.remove("-loading")
      this.span.style.display = "none"
    }

    addPreloaderToMainHeader() {
      let mainHeader = util.el(".osh-container.header-main")
      mainHeader && mainHeader.prepend(this.span)
      return mainHeader
    }
  }

  class ImageObserver {
    constructor(parent) {
      this.initialize(parent)
    }

    initialize(parent) {
      this.images = util.all(".lazy-image", parent)
      this.preloaders = util.all(".-preloader")

      this.images.forEach(this.lazyLoad.bind(this))
    }

    /**
     * 
     * @param {HTMLImageElement} image 
     */
    lazyLoad(image) {
      if (image.src !== undefined) {
        image.src = image.getAttribute("data-src")
        image.onload = () => this.afterLoad(image)
      } else this.afterLoad(image)
    }

    /**
     * 
     * @param {HTMLImageElement} image 
     */
    afterLoad(image) {
      image.classList.add("loaded")
      const preloader = util.el(".-preloader", image.parentElement)
      this.removeLoader(preloader)
      this.preloaders.forEach(this.removeLoader.bind(this))
    }
    removeLoader(el) {
      el.classList.remove("-loading")
      el.classList.add("-hide")
    }
  }

  class Controller {
    constructor(data4rmFirebase) {
      this.initialize(data4rmFirebase)
    }

    updateDomain(json) {
      const campaignBanner = util.isMobile 
      ? json.config.campaign_banner_mobile
      : json.config.campaign_banner_desktop

      const allProducts = json.config.all_products_catalog
      ? json.config.all_products_catalog
      : "all-products"

      const host = json.config.host + json.config.country_domain

      return {
        campaign: json.config.campaign,
        url: json.config.campaign_url,
        catalog: host + `/${allProducts}/`,
        catalogSearch: host + "/catalog",
        currency: json.config.currency,
        host,
        campaign_banner: campaignBanner,
        campaign_url: json.config.campaign_url
      }
    }


    initialize(json) {
      util.config = json.config

      this.json = json || {}
      this.domain = json.domain ? this.updateDomain(json) : {}
      
      this.config = json.config || {}
      this.itemsToRender = []
      this.imageObserver = null
      this.areFiltersInPlace = false

      
      this.appEl = util.el(util.APPID_QUERY)
      this.appEl.innerHTML = this.renderShells()

      this.products = util.el(".-products")
      this.tempHost = util.el(".-temporary-host")
      this.headerQuery = util.isMobile ? ".-filter-list" : ".-header"
      this.catalogQuery = util.isMobile ? ".-col.-filters" : ".-row.-catalog"
      this.header = util.el(this.headerQuery)
      this.catalog = util.el(this.catalogQuery)
      this.productsFound = util.el(".-catalog") || { style: { display: "block" } }
      

      this.htmlEl = util.el("html")
      this.filtersEl = util.el(".-filters")

      this.fetchLoaders = [this.header, this.filtersEl, this.htmlEl]

      util.urlParams.tag = json.config.campaign_tag
      this.campaign_url = json.config.campaign_url

      pubsub.subscribe(util.FILTER_UPDATED, this.filterUpdated.bind(this))
      pubsub.subscribe(util.UPDATE_URL, this.updateURL.bind(this))
      pubsub.subscribe(util.FREELINKS_BUILT, this.freelinkListener.bind(this))

      this.catalog = () => this.start(this.campaign_url)

      this.itemsToRender.map(fnName => {
        this[fnName]()
      })

      // If catalog isn't rendered, observe images here
      if (this.itemsToRender.indexOf(util.CATALOG) === -1) {
        this.imageObserver = new ImageObserver()
      }
    }

    title() {
      const titleElement = util.el(".-featurebox-title")
      titleElement.innerHTML = this.config.featurebox_title
    }

    banners() {
      const bannerParent = util.el(".-banner.-feature-box")
      const banner1Db = util.isMobile
        ? this.config.campaign_1_mdb
        : this.config.campaign_1_ddb
      const banner2Db = util.isMobile
        ? this.config.campaign_2_mdb
        : this.config.campaign_2_ddb
      const banner1Url = this.config.campaign_1_url
      const banner2Url = this.config.campaign_2_url
      const list = [
        { image: banner1Db, url: banner1Url },
        { image: banner2Db, url: banner2Url }
      ]
      bannerParent.innerHTML = list.map(this.bannerHTML.bind(this)).join("")
    }

    bannerHTML(banner) {
      return `<a href="${banner.url}" class="-posabs -bn"><span class="-posabs -preloader -loading"></span><img alt="banner" data-src="${banner.image}" class="lazy-image"/></a>`;
    }

    freelinks() {
      const frlinkParent = util.el(".-freelinks.-row")
      const freelinks = this.json.json_list.filter(datum => datum.initiative === util.FREELINK_NAME)
      frlinkParent.innerHTML = freelinks.map(this.freelinkHTML.bind(this)).join("")
      pubsub.emit(util.FREELINKS_BUILT, {})
    }

    freelinkHTML(freelink) {
      const tagAttribute = freelink.tag ? `data-tag="${freelink.tag}"` : "";
      return `<a href="${freelink.url}" ${tagAttribute} class="-inlineblock -vatop -freelink"><div class="-img -posrel"><span class="-posabs -preloader -loading"></span><img data-src="${freelink.image}" alt="" class="lazy-image"/></div><div class="-txt">${freelink.name}</div></a>`;
    }

    renderShells() {
      const ttStatus = this.config["display_featurebox_title"]
      const dbStatus = this.config["display_double_banner_" + util.NAME] || this.config["display_double_banner"]
      const flStatus = this.config["display_collection_icons_" + util.NAME] || this.config["display_collection_icons"]
      const ctStatus = this.config["display_catalog_" + util.NAME] || this.config["display_catalog"]

      ttStatus.toLowerCase() === "yes" && this.itemsToRender.push("title")
      dbStatus.toLowerCase() === "yes" && this.itemsToRender.push("banners")
      flStatus.toLowerCase() === "yes" && this.itemsToRender.push("freelinks")
      ctStatus.toLowerCase() === "yes" && this.itemsToRender.push("catalog")

      const skeletons = {
        title: () => `<div class="-featurebox-title"></div>`,
        banners: () => `<div class="-banner -row -posrel -feature-box"></div>`,
        freelinks: () => `<div class="-freelinks -row"></div>`,
        catalog: () => util.isMobile ? this.mobileCatalog() : this.desktopCatalog()
      }

      return this.itemsToRender.map(item => skeletons[item]()).join("")
    }

    desktopCatalog() {
      return `<div class="-temporary-host -hide"></div><div class="-header -posrel"><div class="-jumia-loader-wrap -posabs"><div class="-jumia-loader -posabs"><div class="-cart -posabs"></div><div class="-circle -posabs"><i class="-fl-star"></i></div></div></div><div class="-controls -posrel"><div class="-left -posabs">Results</div><form class="-center -posabs"><span class="-search-icn -center-el -posabs"></span ><input type="text" placeholder="Search products..." name="search" class="-search-input -center-el" required /><div class="-search-btn -center-el -cta">search</div></form><div class="-pagination -posabs"><span class="-col -prev"></span><div class="-col -status">- / -</div><span class="-col -next"></span ><input class="-col -num" type="number" name="page" value="1" /><div class="-inlineblock -vamiddle -to-page -cta -posrel"></div></div><div class="-right -posabs"><label class="-dpdw" for="dpdw-sort">Sort by: Popularity</label><div class="-dropdown"><div class="-option" data-query="" data-value="Sort by: Popularity">Popularity </div><div class="-option" data-query="newest" data-value="Sort by: Newest Arrivals" >Newest Arrivals </div><div class="-option" data-query="lowest-price" data-value="Sort by: Price: Low to High" >Price: Low to High </div><div class="-option" data-query="highest-price" data-value="Sort by: Price: High to Low" >Price: High to Low </div><div class="-option" data-query="rating" data-value="Sort by: Product Rating" >Product Rating </div></div></div></div></div><div class="-row -catalog"><div class="-col -w25 -inlineblock -vatop -filters -posrel"><div class="-jumia-loader-wrap -posabs -once"><div class="-jumia-loader -posabs"><div class="-cart -posabs"></div><div class="-circle -posabs"><i class="-fl-star"></i></div></div></div><div class="-filter -category"><div class="-title -posrel"><div class="-text -posabs">category</div><div class="-ctac -posabs" data-url="">reset</div></div><div class="-categories"></div></div><div class="-filter -brand"><div class="-title">brand</div><div class="-search -posrel"><span class="-search-icn"></span ><input type="search" placeholder="Search" /></div><div class="-list"></div></div><form class="-filter -product-rating"><div class="-title">product rating</div><div class="-list"></div></form><fieldset class="-filter -price"></fieldset><form class="-filter -discount-percentage"><div class="-title">discount percentage</div><div class="-list"></div></form><div class="-filter -express-shipping"><div class="-title">express shipping</div><div class="-list"></div></div><div class="-filter -shipped-from"><div class="-title">shipped from</div><div class="-list"></div></div><form class="-filter -tag"><div class="-title">collections</div><div class="-list"></div></form></div><div class="-col -w75 -inlineblock -vatop -filter-list-products -posrel" id="catalog-listing"><div class="-jumia-loader-wrap -posabs -once"><div class="-jumia-loader -posabs"><div class="-cart -posabs"></div><div class="-circle -posabs"><i class="-fl-star"></i></div></div></div><div class="-filter-list"><div class="-sub-header -posrel"><div class="-products-found -posabs">0 products found</div></div></div><div class="-products"></div></div></div>`
    }

    mobileCatalog() {
      return `<div class="-temporary-host -hide"></div><div class="-col -filters"><div class="-filters-trigger -posrel"><div class="-sort-by -posabs"><span class="-arrow -icon"></span><div class="-stack -icon"><span class="-step"></span><span class="-step"></span ><span class="-step"></span><span class="-step"></span></div></div><div class="-applied-filters -posabs"><div class="-all -posabs"></div></div><span class="-spinner -posabs"></span><div class="-trigger -posabs"><span class="-txt">Filters</span><span class="-arrow"></span></div></div><div class="-filter-shell"><form class="-center"><label class="-search-icn -center-el -posabs" for="sc"></label ><input id="sc" type="text" placeholder="Search products..." name="search" class="-search-input -center-el" required /><div class="-search-btn -center-el -cta">search</div></form><div class="-filter -category"><div class="-title -posrel"><div class="-text -posabs">category</div><div class="-ctac -posabs">reset</div></div><div class="-categories"></div></div><div class="-filter -brand"><div class="-title">brand</div><div class="-search -posrel"><span class="-search-icn"></span ><input type="search" placeholder="Search" /></div><div class="-list"></div></div><form class="-filter -product-rating"><div class="-title">product rating</div><div class="-list"></div></form><fieldset class="-filter -price"></fieldset><form class="-filter -discount-percentage"><div class="-title">discount percentage</div><div class="-list"></div></form><div class="-filter -express-shipping"><div class="-title">express shipping</div><div class="-list"></div></div><div class="-filter -shipped-from"><div class="-title">shipped from</div><div class="-list"><label class="md-checkbox" ><input type="checkbox" data-name="Shipped from abroad" name="shipped_from" value="jumia_global" /><span ><global class="-global">Shipped from abroad</global></span ></label ><label class="md-checkbox" ><input type="checkbox" data-name="Local Shipping" name="shipped_from" value="country_local" /><span>Shipped from Nigeria</span></label ></div></div><form class="-filter -tag"><div class="-title">collections</div><div class="-list"></div></form></div><div class="-right -posabs"><div class="-dropdown"><div class="-option" data-query="popularity" data-value="Sort by: Popularity" >Popularity </div><div class="-option" data-query="newest" data-value="Sort by: Newest Arrivals" >Newest Arrivals </div><div class="-option" data-query="lowest-price" data-value="Sort by: Price: Low to High" >Price: Low to High </div><div class="-option" data-query="highest-price" data-value="Sort by: Price: High to Low" >Price: High to Low </div><div class="-option" data-query="rating" data-value="Sort by: Product Rating" >Product Rating </div></div><label class="-dpdw" for="dpdw-sort">Sort by: Popularity</label></div></div><div class="-catalog -col -filter-list-products" id="catalog-listing"><div class="-filter-list -posrel"><div class="-jumia-loader-wrap -posabs"><div class="-jumia-loader -posabs"><div class="-cart -posabs"></div><div class="-circle -posabs"><i class="-fl-star"></i></div></div></div><div class="-sub-header -posrel"><div class="-pagination -posabs"><span class="-col -prev"></span><div class="-col -status">- / -</div><span class="-col -next"></span ><input class="-col -num" type="number" name="page" value="1" /><div class="-inlineblock -vamiddle -to-page -cta -posrel -jmp"><span class="-text -posabs -jmp"></span ><span class="-arrow -posabs -jmp"></span></div></div></div></div><div class="-products-found">0 products found</div><div class="-products"></div></div>`
    } 

    freelinkListener(data) {
      if (util.FREELINK_NAME === util.GIFT_FINDER) {
        const freelinks = util.el(".-freelinks")
        freelinks.addEventListener("click", this.handleFreelinks.bind(this))
      }
    }

    handleFreelinks(evt) {
      evt.preventDefault()
      const el = evt.target
      if (el.classList.contains("-freelink")) {
        const tag = el.getAttribute("data-tag")
        util.urlParams.tag = tag
        this.start()
      }
    }

    filterUpdated(data) {
      this.skeletonScreens("remove")
    }

    updateURL(data) {
      this.start()
    }

    urlBeautifier(directUrl) {
      let tempUrl = directUrl
      if (!directUrl) {
        util.urlParams = Object.keys(util.urlParams)
        .filter(key => key !== "filter")
        .reduce((acc, cur) => {
          acc[cur] = util.urlParams[cur]
          return acc
        }, {})
        tempUrl = util.url({...util.urlParams}, this.domain)
        tempUrl = tempUrl.split("//").join("/")
      }

      const linkObj = new URL(tempUrl)
      const pathnameSearch = linkObj.pathname + linkObj.search
      const url = linkObj.origin + pathnameSearch

      const filters = util.filtersUrl({ host: this.domain.host, url: pathnameSearch })
      
      return { url, filters }
    }

    start(directUrl) {
      util.isMobile ? this.fetch().mobile(directUrl) : this.fetch().desktop(directUrl)
    }

    fetch() {
      const scrape = url => fetch(url).then(res => res.text())

      const catBrandReducer = (acc, catBrand) => {
        const name = catBrand.textContent
        const link = catBrand.getAttribute("href")
        const isUmbrellaCat = catBrand.classList.contains("-phm")
        const isBold = catBrand.classList.contains("-m")
        acc[name] = { name, link, isUmbrellaCat, isBold }
        return acc
      }

      const skuDetails = data => {
        const rExp = new RegExp(/(\d+ résultats)|(\d+ products found)/)
        const list = rExp.exec(data)

        const found = list ? parseInt(list[0].split(" ")[0]) : 0
        let pages = Math.ceil(found / util.SKUS_PER_PAGE)
        pages = pages > util.MAX_PAGE ? util.MAX_PAGE : pages
        return { found, pages }
      }

      const brandCondition = (json) => {
        // url before the query question mark
        const urlB4Qmark = json.bIdx < json.qIdx
        // url is found in the link
        const urlFoundNLink = json.bIdx !== -1 || json.brand.classList.contains("_chkd")
        // is a brand with name
        const isWithName = json.name !== ""
        // is not another filter
        const isNotAnotherFilter = json.otherFilterIdx === -1
        return (
          urlB4Qmark && urlFoundNLink &&
          isWithName && isNotAnotherFilter
        )
      }

      const isolateBrands = brand => {
        const name = brand.textContent
        const link = brand.getAttribute("href")
        const test = util.brandToUrl(name)
        const bIdx = link.indexOf(test)
        let qIdx = link.indexOf("?")
        const hIdx = link.indexOf("#")
        if (qIdx === -1 && hIdx > -1) {
          qIdx = hIdx
        }

        const otherFilterIdx = link.indexOf("=" + name)
        return brandCondition({
          bIdx, qIdx, name,
          otherFilterIdx, brand
        })
      }
      
      const desktopExtract = data => {
        const cb = categoriesBrands(data)
        const sIdx = data.indexOf(util.DESKTOP_SIDX) + 17
        const eIdx = data.indexOf(util.DESKTOP_EIDX) + 1
        const json = data.substring(sIdx, eIdx)
        try {
          return {
            skus: JSON.parse(json).products,
            categories: cb.categories,
            brands: cb.brands,
            skuDetails: skuDetails(data)
          }
        } catch (error) {
          console.error(error)
          return { skus: [], categories: [], brands: [], skuDetails: [] }
        }
      }

      const mobileExtract = (data, type) => {
        const sIdx = data.indexOf(util.MOBILE_SIDX) + 25
        const eIdx = data.indexOf(util.MOBILE_EIDX);
        const json = data.substring(sIdx, eIdx)
        const pars = JSON.parse(json)

        if(type === util.PRODUCTS) util.skuDetails = skuDetails(data)

        try { return pars.viewData }
        catch (error) { return [] }
      }

      const categoriesBrands = data => {
        this.tempHost.innerHTML = data
        const catEls = util.all(".-me-start .-hov-bg-gy05", this.tempHost)
        const brdEls = util.all(".-me-start.-fsh0", this.tempHost)

        const categories = Array.from(catEls).reduce(catBrandReducer, {})
        const brFiltered = Array.from(brdEls).filter(isolateBrands)
        const brands = brFiltered.reduce(catBrandReducer, {})

        this.tempHost.innerHTML = ""
        return { categories, brands }
      }

      const passesFilter = datum => {
        const rcs = util.remContent.filter(rc => datum.categories.indexOf(rc) > -1)
        return rcs.length === 0 ? true : false
      }

      const tagData = () => this.json.json_list.filter(item => item.initiative === util.TAG)

      const processData = data => {
        data.skus = data.skus.filter(passesFilter)
        data.tags = tagData()
        data.country = this.json.config.country_name
        data.currency = this.json.config.currency
        return data
      }
      
      const sendData = data => {
        pubsub.emit(util.UPDATE_FILTER_UI, data)
        // console.log("total events", listAllEventListeners())
        return data
      }

      const hidePreloadersOfCatalogAndFilters = () => {
        const preloaders = util.all(".-once")
        preloaders.forEach(preloader => preloader.classList.add("-hide"))
      }

      const buildData = data => {
        this.products.innerHTML = util.skus(data).map(this.html.bind(this)).join("")
        this.imageObserver = new ImageObserver()
        // pubsub.emit(util.PRODUCTS_DISPLAYED, {})
        if (this.areFiltersInPlace === false) {
          hidePreloadersOfCatalogAndFilters()
          this.areFiltersInPlace = true
          Filters()
          util.isMobile && scrollListener()
        }
        return data
      }

      const isAtScrollEdge = products => products.scrollLeft + products.clientWidth >= products.scrollWidth

      const loadMore = () => {
        const hiddenProducts = util.all(".-product.-hide")
        util.num2List(5).map(num => {
          const fn = hiddenProducts[num]
          fn && fn.classList.remove("-hide")
        })
      }

      const scrollHandler = products => isAtScrollEdge(products) && loadMore()

      const scrollListener = () => {
        this.products.addEventListener("scroll", () => scrollHandler(this.products))
      }

      return {
        desktop: directUrl => {
          const beautified = this.urlBeautifier(directUrl)
          console.log("beautified from desktop", beautified, "directUrl", directUrl)
          this.skeletonScreens("add")
          return scrape(beautified.url)
          .then(desktopExtract)
          .then(processData)
          .then(buildData)
          .then(sendData)
        },
        mobile: directUrl => {
          const beautified = this.urlBeautifier(directUrl)
          console.log("beautified from mobile", beautified, "directUrl", directUrl)
          const mobileScraping = beautified => {
            return [
              { url: beautified.url, type: util.PRODUCTS },
              { url: beautified.filters, type: util.FILTERS }
            ].map(json => scrape(json.url).then(data => mobileExtract(data, json.type)))
          }

          const list = json => {
            const filters = json.data[1].filters
            return filters ? filters.find(item => item.id === json.type).options : []
          }

          const reducer = list => {
            return list.reduce((acc, category) => {
              const name = category.text
              const link = category.value.split("-")
              .filter(pieces => isNaN(pieces)).join("-")
              acc[name] = { name, link }
              return acc
            }, {})
          }

          const dataPrepping = data => {
            const cList = list({ data, type: util.CATEGORY })
            const bList = list({ data, type: util.BRAND })

            return {
              skus: data[0].products,
              categories: reducer(cList),
              brands: reducer(bList),
              skuDetails: util.skuDetails
            }
          }

          this.skeletonScreens("add")
          Promise.all(mobileScraping(beautified))
          .then(dataPrepping)
          .then(processData)
          .then(buildData)
          .then(sendData)
        }
      }
    }

    html (datum, idx) {
      if (datum.url === undefined) {
        datum.url = "/catalog/?q=" + datum.sku;
      }
      var oldprice_discount = datum.prices.discount
        ? `<div class="-price-discount"><div class="-pd -price -old -posrel"><div class="-text">${datum.prices.oldPrice}</div></div><div class="-pd -discount -posrel"><div class="-text">${datum.prices.discount}</div></div></div>`
        : "";
  
      var rating = datum.rating
        ? `<div class="-product_rating"><div class="-stars -radio-el -posrel -inlineblock -vamiddle"><div class="-in" style="width:${util.percent(
            datum.rating.average
          )}%"></div></div><div class="-count -inlineblock -vabaseline -posrel"><div class="-rt">(${
            datum.rating.totalRatings
          })</div></div></div>`
        : "";
  
      var express = datum.shopExpress
        ? `<div class="-express -list -posrel"><express></express></div>`
        : "";
  
      var free_shipping = datum.shopExpress
        ? `<div class="-free-shipping -posrel"><div class="-text">${
            datum.shopExpress.text ? datum.shopExpress.text : ""
          }</div></div>`
        : "";
  
      var global = datum.shopGlobal
        ? `<div class="-tag -posrel"><span class="-global">${datum.shopGlobal.name}</span></div>`
        : "";
  
      var stock = datum.stock
        ? `<div class="-stock"><div class="-txt">${
            datum.stock.text ? datum.stock.text : "0 stock left"
          }</div><div class="-stock-bar" style="width:${
            datum.stock.percent
          }%"></div></div>`
        : "";
  
      var product_class =
        util.isMobile && idx > 5 ? "-product -hide" : "-product";
      return `<a href="${this.domain.host}${
        datum.url
      }" class="${product_class}" target="_blank">
        <div class="-img -posrel">
          <span class="-posabs -preloader -loading"></span>
          ${this.badge(datum)}
          <img class="lazy-image" data-src="${datum.image}" alt="product"/>
        </div>
        <div class="-details">
          ${global}
          <div class="-name -posrel">
            <div class="-text">${datum.displayName}</div>
          </div>
          <div class="-price -new -posrel">
            <div class="-text">${datum.prices.price}</div>
          </div>
          ${oldprice_discount}
          ${rating}
          ${express}
          ${free_shipping}
          ${stock}
        </div>
        <div class="-cta -posrel">
          <div class="-text">add to cart</div>
        </div>
      </a>`;
    }

    badge(datum) {
      if (datum.badges) {
        var badges = Object.keys(datum.badges).map((key) => {
          var badge = datum.badges[key];
          return key === "main"
            ? `<span class="-badge -main -posabs -${util.id(badge.name)}">${
                badge.name
              }</span>`
            : `<img class="-badge -campaign -posabs lazy-image" data-src="${badge.image}" alt="badge"/>`;
        });
        return badges.join("");
      } else return "";
    }

    skeletonScreens(action) {
      this.fetchLoaders.map(el => el.classList[action]("-fetch-loading"))
    }

  }

  const Filters = function () {
    class FilterBar {
      constructor() {
        this.initialize()
      }

      initialize() {
        this.filtersTrigger = util.el(".-filters-trigger .-trigger")
        this.filters = util.el(".-col.-filters")
        this.sortTrigger = util.el(".-sort-by")
        this.sortDropDown = util.el(".-right")

        this.filtersTrigger.addEventListener("click", () => this.filters.classList.toggle("-open"))
        this.sortTrigger.addEventListener("click", this.toggle.bind(this))
      }

      toggle() {
        this.sortTrigger.classList.toggle("-show")
        this.sortDropDown.classList.toggle("-show")
      }
    }

    class Filter {
      constructor() {
        this.exclusions = ["mlp-promotional-page", "catalog", "all-products"]
        this.filterName = "filter"
        /**
         * 
         * @param {string} link 
         */
        this.catURL = link => {
          const pieces = link
          .split("/")
          .filter(piece => this.exclusions.indexOf(piece) === -1)
          .filter(piece => piece !== "")
          return pieces[0]
        }

        this.headerQuery = util.isMobile
        ? ".-filter-list .-sub-header"
        : ".-header .-controls"

        this.header = util.el(this.headerQuery)
        this.header.addEventListener("click", this.listen.bind(this))

        this.notify = () => pubsub.emit(util.UPDATE_URL, {})
        // this.notify = () => { console.log(util.urlParams) }
        this.updateParam = link => util.urlParams[this.filterName] = link
        this.assignParams = (from, to) => to = { ...to, ...from }
        this.resetParams = {
          brand: "",
          rating: "",
          price: "",
          discount: "",
          shop_premium_services: "",
          shipped_from: "",
          search: "",
          category: "",
          page: "",
          sort: "",
          tag: "",
          type: "",
        }
        this.isUiInPlace = false
      }

      listen(evt) {}
      listeners() {}
      updateUi() {}
      // assignParams(from, to) {
      //   // to = JSON.parse(JSON.stringify(from))
      //   to = { ...to, ...from }
      // }

      watch() {
        pubsub.subscribe(util.UPDATE_FILTER_UI, this.updateUi.bind(this))
      }

      urlParams(link) {
        util.urlParams[this.filterName] = link
        return util.urlParams
      }
    }

    // watch replaces init
    // getParam replaces process
    class AppliedFilters extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.all = util.el(".-applied-filters .-all")
        this.header.addEventListener("click", this.listen.bind(this))
        this.all.addEventListener("click", this.listen.bind(this))

        // this.watch = () => pubsub.subscribe(util.UPDATE_URL, this.updateParam)

        this.watch()
      }

      listen(evt) {
        const el = evt.target
        if (el.classList.contains("-applied-filter")) {
          this.clearParam(el)
          this.notify()
        }
      }

      clearParam(el) {
        const key = el.getAttribute("data-key")
        util.urlParams[key] = ""
      }

      updateUi() {
        const neededKeys = Object.keys(util.urlParams)
        .filter(this.unNeededKeys.bind(this))

        const neededObjs = neededKeys
        .map(this.keyValueObj.bind(this))

        const neededHTMLs = neededObjs
        .map(this.html.bind(this))
        .join("")

        this.all.innerHTML = neededHTMLs
      }

      unNeededKeys(key) {
        return util.urlParams[key] !== "" && key !== "tag"
      }

      keyValueObj(key) {
        return { key, value: util.urlParams[key] }
      }

      html(json) {
        const nameMap = util.nameMap()
        const idParam = json.key + "-" + json.value
        return `<div id="${idParam}" data-key="${json.key}" data-value="${json.value}" class="-applied-filter" data-name="${util.id(idParam)}">${nameMap[json.key]}: ${nameMap[json.value] || json.value}</div>`
      }
    }

    class CategoryFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.filterName = "category"
        this.categoriesEl = util.el(".-categories")
        this.resetBtn = util.el(".-filter.-category .-ctac")
        this.categoryWidget = util.el(".-filter .-categories")

        this.header.removeEventListener("click", this.listen.bind(this))

        this.watch()

        this.resetBtn.addEventListener("click", evt => {
          util.urlParams = this.resetParams
          this.notify()
        })
        this.categoryWidget.addEventListener("click", evt => {
          this.getParam(evt)
          this.notify()
        })
      }

      updateUi(data) {
        const categories = data.categories
        this.categoriesEl.innerHTML = Object.entries(categories)
        .map(this.html.bind(this)).join("")
        pubsub.emit(util.FILTER_UPDATED, {})
      }

      html(datum) {
        const name = datum[0]
        const url = util.isMobile ? datum[1].link : this.catURL(datum[1].link)
        const isUmbrellaCat = datum[1].isUmbrellaCat
        const isBold = datum[1].isBold
        const classList = ["-item"]
        classList.push(isUmbrellaCat ? "-umbrella-cat" : "")
        classList.push(isBold ? "-bold" : "")
        const className = classList.join(" ")
        return `<div data-url="${url}" id="${util.id(name)}" data-name="${name}" class="${className}">${name}</div>`
      }

      getParam(evt) {
        const url = evt.target.getAttribute("data-url")
        this.urlParams(url)
      }
    }

    class BrandFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.filterName = "brand"
        this.TYPE = "checkbox"
        this.brandsEl = util.el(".-filter.-brand .-list")
        this.searchEl = util.el(".-filter.-brand .-search input")
        this.brandsWidget = util.el(".-filter.-brand")
        this.list = []
        this.selection = []
        this.isABrand = evt => evt.target.getAttribute("type") === this.TYPE

        this.watch()

        this.header.removeEventListener("click", this.listen.bind(this))
        this.searchEl.addEventListener("keyup", evt => {
          const term = evt.target.value.toLowerCase()
          const brands = this.filteredBrands({ term, list: this.list })
          util.addAndRemove(this.list, brands, "-hide")
        })
        this.brandsWidget.addEventListener("click", evt => {
          if (this.isABrand(evt)) {
            this.getParam(evt.target.value)
            this.notify()
          }
        })
      }

      updateUi(data) {
        const brands = data.brands
        const checkd = this.checked()

        this.brandsEl.innerHTML = Object.entries(brands)
        .map(this.html.bind({ checkedBrIds: checkd.ids }))
        .join("")

        this.list = util.el(".-brand .md-checkbox", this.brandsEl)

        checkd.brands.map(brand => this.brandsEl.prepend(brand))
        pubsub.emit(util.FILTER_UPDATED, {})

        return this
      }

      checked() {
        const allBrands = util.all(".md-checkbox", this.brandsEl)
        const brands = Array.from(allBrands)
        .filter(brand => util.el('input[type="checkbox"]', brand).checked)
        return { brands, ids:brands.map(brand => brand.getAttribute("id")) }
      }

      html(datum) {
        const name = datum[0]
        const url = util.id(name)
        const newLabel = `<label class="md-checkbox" id="${url}"><input type="checkbox" value="${url}" /><span>${name}</span></label>`;
        const idx = this.checkedBrIds.indexOf(url)
        return idx === -1 ? newLabel : ""
      }

      getParam(term) {
        const isSelected = this.alreadySelected(term)
        isSelected.state
        ? this.selection.splice(isSelected.idx, 1)
        : this.selection.push(term)
        const value = this.selection.join("--")
        this.urlParams(value)
      }

      alreadySelected(term) {
        const idx = this.selection.indexOf(term)
        return { idx, state: idx !== -1 }
      }

      filteredBrands(json) {
        return Array.from(json.list).filter(brand => {
          const nameEl = util.el(".md-checkbox>span", brand)
          const name = nameEl.textContent.toLowerCase()
          return name.indexOf(json.term) !== -1
        })
      }
    }

    class TagFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }
      
      initialize() {
        this.filterName = "tag"
        this.TYPE = "radio"
        this.isATag = evt => evt.target.getAttribute("type") === this.TYPE
        this.header.removeEventListener("click", this.listen.bind(this))

        this.tagsEl = util.el(".-tag .-list")
        this.watch()
        this.tagsEl.addEventListener("click", evt => {
          if (this.isATag(evt)) {
            this.getParam(evt)
            this.notify()
          }
        })
      }

      updateUi(data) {
        if (this.isUiInPlace === false) {
          this.tagsEl.innerHTML = data.tags.map(this.html.bind(this)).join("")
          pubsub.emit(util.FILTER_UPDATED, {})
          this.isUiInPlace = true
        }
      }

      html(tag) {
        return `<div class="md-radio"><input type="radio" id="${util.id(tag.name)}" data-name="${tag.name}" name="tag" value="${tag.parameter}" /><label for="${util.id(tag.name)}"><div class="-txt -radio-el" style="background-color:${tag.bg_color};color:${tag.text_color}">${tag.name}</div></label></div>`;
      }

      getParam(evt) {
        const url = evt.target.value
        this.urlParams(url)
      }
    }

    class DiscountFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.filterName = "discount"
        this.TYPE = "radio"
        this.isDiscount = evt => evt.target.getAttribute("type") === this.TYPE
        this.header.removeEventListener("click", this.listen.bind(this))

        this.discountEl = util.el(".-discount-percentage .-list")

        this.watch()

        this.discountEl.addEventListener("click", evt => {
          if (this.isDiscount(evt)) {
            this.getParam(evt)
            this.notify()
          }
        })
      }

      updateUi() {
        if (this.isUiInPlace === false) {
          this.discountEl.innerHTML = util.discounts.map(this.html.bind(this)).join("")
          pubsub.emit(util.FILTER_UPDATED, {})
          this.isUiInPlace = true
        }
      }

      html(discount) {
        return `<div class="md-radio"><input type="radio" id="d${util.id(discount.name)}" name="discount" value="${discount.value}" /><label for="d${util.id(discount.name)}"><div class="-txt -radio-el">${discount.name}</div></label></div>`;
      }

      getParam(evt) {
        const url = evt.target.value
        this.urlParams(url)
      }
    }

    class RatingFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.filterName = "rating"
        this.TYPE = "radio"
        this.isRating = evt => evt.target.getAttribute("type") === this.TYPE
        this.header.removeEventListener("click", this.listen.bind(this))

        this.ratingEl = util.el(".-product-rating .-list")

        this.watch()
        this.ratingEl.addEventListener("click", evt => {
          if (this.isRating(evt)) {
            this.getParam(evt)
            this.notify()
          }
        })
      }

      updateUi() {
        if (this.isUiInPlace === false) {
          this.ratingEl.innerHTML = util.ratings.map(this.html.bind(this)).join("")
          pubsub.emit(util.FILTER_UPDATED, {})
          this.isUiInPlace = true
        }
      }

      html(rating) {
        return `<div class="md-radio"><input type="radio" id="${rating.name}" name="rating" value="${rating.value}" /><label for="${rating.name}"><div class="-stars -radio-el"><div class="-in" style="width:${rating.percent}"></div></div><div class="-txt -radio-el">& above</div></label></div>`;
      }

      getParam(evt) {
        const url = evt.target.value
        this.urlParams(url)
      }
    }

    class PriceFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.filterName = "price"
        this.isPrice = evt => evt.target.classList.contains("-ctac")
        this.header.removeEventListener("click", this.listen.bind(this))

        this.priceEl = util.el(".-filter.-price")

        this.watch()
        this.priceEl.addEventListener("click", evt => {
          if (this.isPrice(evt)) {
            this.getParam(evt)
            this.notify()
          }
        })
      }

      updateUi(data) {
        if (this.isUiInPlace === false) {
          this.priceEl.innerHTML = this.html(data.currency)
          pubsub.emit(util.FILTER_UPDATED, {})
          this.isUiInPlace = true
        }
      }

      html(currency) {
        return `<div class="-title -posrel"><div class="-text -posabs">price (${currency})</div><div class="-ctac -posabs">apply</div></div><div class="price-wrap"><div class="-pw -tb price-wrap-1"><label for="min-price">${currency}</label><input type="number" min="5" max="100000000" id="min-price" value="5" /></div><div class="-pw price-wrap_line">-</div><div class="-pw -tb price-wrap-2"><label for="max-price">${currency}</label><input type="number" min="5" max="100000000"id="max-price" value="100000000" /></div></div>`;
      }

      getParam(evt) {
        const minPrice = util.el("#min-price").value
        const maxPrice = util.el("#max-price").value
        this.urlParams(minPrice + "-" + maxPrice)
      }
    }

    class ShippedFromFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.filterName = "shipped_from"
        this.TYPE = "checkbox"
        this.checked = []

        this.isShippedFrom = evt => evt.target.getAttribute("type") === this.TYPE
        this.header.removeEventListener("click", this.listen.bind(this))

        this.shippedFromEl = util.el(".-shipped-from .-list")

        this.watch()
        this.shippedFromEl.addEventListener("click", evt => {
          if (this.isShippedFrom(evt)) {
            this.getParam(evt)
            this.notify()
          }
        })
      }

      updateUi(data) {
        if (this.isUiInPlace === false) {
          const shippedFroms = util.shippedFroms(data.country)
          this.shippedFromEl.innerHTML = shippedFroms
          .map(this.html.bind(this)).join("")
          pubsub.emit(util.FILTER_UPDATED, {})
          this.isUiInPlace = true
        }
      }

      html(shipped_from) {
        return `<label class="md-checkbox"><input type="checkbox" name="shipped_from" value="${shipped_from.value}" /><span><element class="${shipped_from.class_name}">${shipped_from.name}</element></span></label>`;
      }

      isChecked(value) {
        const idx = this.checked.indexOf(value)
        return { idx, state: idx !== -1 }
      }

      getParam(evt) {
        const value = evt.target.value
        const isChecked = this.isChecked(value)
        isChecked.state
        ? this.checked.splice(isChecked.idx, 1)
        : this.checked.push(value)
        const url = this.checked.join("--")
        this.urlParams(url)
      }
    }

    class ExpressFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.filterName = "shop_premium_services"
        this.TYPE = "checkbox"
        this.checked = []
        this.isExpress = evt => evt.target.getAttribute("type") === this.TYPE
        this.header.removeEventListener("click", this.listen.bind(this))

        this.expressEl = util.el(".-express-shipping .-list")

        this.watch()
        this.expressEl.addEventListener("click", evt => {
          if (this.isExpress(evt)) {
            this.getParam(evt)
            this.notify()
          }
        })
      }

      updateUi() {
        if (this.isUiInPlace === false) {
          this.expressEl.innerHTML = this.html()
          pubsub.emit(util.FILTER_UPDATED, {})
          this.isUiInPlace = true
        }
      }

      html() {
        return '<label class="md-checkbox"><input type="checkbox" name="shop_premium_services"value="shop_express" /><span><express></express></span></label>';
      }

      isChecked(value) {
        const idx = this.checked.indexOf(value)
        return { idx, state: idx !== -1 }
      }

      getParam(evt) {
        const value = evt.target.value
        const isChecked = this.isChecked(value)
        if (isChecked.state) {
          this.checked.splice(isChecked.idx, 1)
        } else {
          this.checked.push(value)
        }
        // isChecked.state
        // ? this.checked.slice(isChecked.idx, 1)
        // : this.checked.push(value)
        const url = this.checked.join("--")
        this.urlParams(url)
      }
    }

    class SortFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.filterName = "sort"
        this.sortEl = util.el(".-right")
        this.isSortFilter = evt => evt.target.classList.contains('-dpdw')
        this.isSortOption = evt => evt.target.classList.contains("-option")
        
        this.mobileCheck()
        this.watch()
      }

      mobileCheck() {
        if (util.isMobile) {
          this.header.removeEventListener("click", this.listen.bind(this))
          this.sortEl.addEventListener("click", this.listen.bind(this))
        }
      }

      listen(evt) {
        if (this.isSortFilter(evt)) {
          this.sortEl.classList.toggle("-show")
        }

        if (this.isSortOption(evt)) {
          this.sortEl.classList.remove("-show")
          const param = this.getParam(evt)
          this.notify()
        }
      }

      getParam(evt) {
        const url = evt.target.getAttribute("data-query")
        this.urlParams(url)
      }
    }

    class SearchFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.filterName = "search"
        this.searchInp = util.el(".-search-input")
        this.searchBtn = util.el(".-search-btn")
        this.filters = util.el(".-col.-filters")

        this.mainHeader = util.el(".main_header--nav-right")
        this.isSearch = evt => evt.target.classList.contains("-search-btn")

        this.mobileCheck()
        this.mainHeader && this.attachSearchIcon()
        this.watch()
      }

      attachSearchIcon() {
        const search = util.create("span")
        search.className = "-inline-block -vamiddle -search-icn -top-search"
        this.mainHeader.prepend(search)
        search.addEventListener("click", () => this.filters.classList.toggle("-open"))
      }

      listen(evt) {
        evt.preventDefault()
        if (evt.target.classList.contains("-search-btn")) {
          this.getParam()
          this.notify()
        }
      }

      mobileCheck() {
        if (util.isMobile) {
          this.header.removeEventListener("click", this.listen.bind(this))
          this.searchBtn.addEventListener("click", this.listen.bind(this))
        }
      }

      getParam() {
        const value = this.searchInp.value
        this.urlParams(value)
      }
    }

    class PaginationFilter extends Filter {
      constructor() {
        super()
        this.initialize()
      }

      initialize() {
        this.filterName = "page"
        this.skusFoundEl = util.el(".-products-found")
        this.pageStatxEl = util.el(".-status")
        this.pageNumbrEl = util.el(".-num")

        this.pageNo = 1

        this.isJmp2Page = evt => evt.target.classList.contains("-jmp")
        this.isNextPage = evt => evt.target.classList.contains("-next")
        this.isPrevPage = evt => evt.target.classList.contains("-prev")
        this.prodxFound = data => data.skuDetails.found + " products found"
        this.pageStatus = data => this.pageNo + " / " + data.skuDetails.pages

        this.watch()
      }

      updateUi(data) {
        this.skusFoundEl.innerHTML = this.prodxFound(data)
        this.pageStatxEl.innerHTML = this.pageStatus(data)
        this.pageNumbrEl.value = this.pageNo
      }

      listen(evt) {
        if (this.isPrevPage(evt)) {
          this.goToPrevPage()
          this.getParamAndNotify()
        }

        if (this.isNextPage(evt)) {
          this.goToNextPage()
          this.getParamAndNotify()
        }

        if (this.isJmp2Page(evt)) {
          this.jumpToPage()
          this.getParamAndNotify()
        }
      }

      jumpToPage() {
        let value = this.pageNumbrEl.value
        value = parseInt(value) > util.MAX_PAGE ? util.MAX_PAGE : value
        value = parseInt(value) < 1 ? 1 : value
        this.pageNo = value
      }

      goToPrevPage() {
        this.pageNo = this.pageNo === 1 ? 1 : parseInt(this.pageNo) - 1
      }

      goToNextPage() {
        this.pageNo = this.pageNo === util.MAX_PAGE
        ? util.MAX_PAGE
        : parseInt(this.pageNo) + 1
      }

      getParamAndNotify() {
        this.getParam()
        this.notify()
      }

      getParam() {
        this.urlParams(this.pageNo)
      }
    }

    new CategoryFilter();
    new BrandFilter();
    new TagFilter();
    new DiscountFilter();
    new RatingFilter();
    new PriceFilter();
    new ShippedFromFilter();
    new ExpressFilter();

    new SortFilter();
    new SearchFilter();
    new PaginationFilter();

    if (util.isMobile) {
      new FilterBar();
      new AppliedFilters();
    }
  }
  
  var pubsub = new PubSub()
  var util = new Util()
  var database = new Database(json.config);
  database.getDoc(util.COLLECTION, "data", util.DATA_ARRIVES)

  var preProcess = new PreProcess()

  pubsub.subscribe(util.DATA_ARRIVES, data => new Controller(data))

  return {
    pubsub,
    DATA_ARRIVES: util.DATA_ARRIVES,
    FETCHED_DATA: util.DATA_ARRIVES,
    ImageObserver,
    is_mobile: util.isMobile,
    PRODUCTS_DISPLAYED: util.PRODUCTS_DISPLAYED,
    getDocument: database.getDoc,
    saveDocument: database.setDoc,
    Database
  }
})

