import { config, constants, gfConfig } from "./core/constants";
import { Controller } from "./core/controller"; 
import { iRemoteData } from "./core/types/index";
import { Util } from "./core/util"; 

start()

function start() {

  const wind = window as any

  const gtag = wind.gtag
  // Note: "about" in the line below is important to prevent fetch of config document
  const fbox = wind.Featurebox({ config }, "about") 
  
  const databaseOperations = () => {
    const database = new fbox.Database(gfConfig)
    database.getAll(constants.COLLECTION, constants.DOCSEVENT)
  }
  
  databaseOperations() 
  
  fbox.pubsub.subscribe(constants.DOCSEVENT, (data: any) => {
    let remoteData = {
      categories: [],
      about: [],
      config: {
        countryLocale: "",
        desktopBanner: "",
        mobileAppBanner: "",
        mlp: "",
        currency: "",
        domain: "",
        currencyPosition: ""
      }
    }
    
    const keys = Object.keys(data)
    keys.map(key => {
      switch (key) {
        case constants.ABOUT: remoteData.about = data[key].list
          break;
        case constants.CONFIG: remoteData.config = data[key]
          break;
        default: remoteData.categories = data[key].list
          break;
      }
    })
    new Controller(remoteData, fbox)
  })
  
}


// fbox.pubsub.subscribe(fbox.FETCHED_DATA, (data: any) => {
//   // const remoteData:IRemoteData = data as IRemoteData
//   // controller = new Controller(remoteData, fbox)
//   // const calendar:any[] = controller.getData(constants.NAME)
//   // const times: number[] = controller.times(calendar)
//   // console.log("data is", data)
// })