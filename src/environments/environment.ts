// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_URL = 'http://localhost:8080/';
export const environment = {
  production: false,
  base_url:"http://localhost:8080",
  content_type:"application/json",
  encryption_key:"7061737323313233",
  "400":"Invalid Data",
  addBinData:BASE_URL + "binSetup/addBinData",
  getBinData:BASE_URL + "binSetup/getBinDataList",
  addPlasticSetup:BASE_URL + "PlasticSetup/addPlasticProduct",
  getPlasticDetails:BASE_URL + "PlasticSetup/getPlasticDetails",
  addBinGroup:BASE_URL + "binGroupSetup/addBinGroupSetup",
  usagesUrl:"/usages",
  usageCountrySaveUrl:"/saveCountryGroup",
  usageCountryUpdateUrl:"",
  usageCountryfatchUrl:"/countryGroup",
  viewAcquiredNetworkUrl:"/viewAcquiringNetwork",
  usageDeliverySaveUrl:"/saveDeliveryChannelGroup",
  usageDeliveryUpdateUrl:"",
  usageDeliveryFatchUrl:"/deliveryChannelGroup",
  usageMerchantSaveUrl:"/merchantCategory",
  accessrightsurl:"/accessrights",
  accessrightssaveurl:"/save",
  getCurrencyData:BASE_URL + "binSetup/getCurrencyData",
  getBinDetails:BASE_URL + "binGroupSetup/getCmsBinList/",
  getPlasticCodelist:BASE_URL + "binGroupSetup/getPlasticCodelist",
  getBinGroupSetUpDetails:BASE_URL + "binGroupSetup/getBinGroupSetUpDetails",
  addBinGroupData:BASE_URL + "binGroupSetup/addBinGroupData",
  getBinGroupCode:BASE_URL+ "binGroupSetup/getBinGroupcodeDetails/",
  checkBinGroup:"check/",
  viewCardUsageSettingUrl:"/viewCardUsageSetting",
  viewFeeManagement:"/viewFeeManagement",
  viewLimitManagement:"/viewLimitManagement",
  viewMerchantCategory:"/viewMerchantCategory",
  viewAlertSetting:"/viewAlertSetting",
  

  pincodeRegex: /^\d{6}$/, 
  entity:/^[a-zA-Z,]+(\s{0,1}[a-zA-Z, ])*$/,
  known:"^([a-zA-Z'-.]+(?:\ [a-zA-Z'-.]+)?)$", 
  address:/^[a-zA-Z0-9\s,'-]*$/,  
  singleKnown:/^[a-zA-Z]*$/,
  mobile:/^(\+91|\+91\-|0)?[789]\d{9}$/,
  email:/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
  phone:/(^(1?)(\s?)([\s]?)((\(\d{3}\))|(\d{3}))([\s]?)([\s-]?)(\d{3})([\s-]?)(\d{4})+$)/,
  letterNumber : /^[0-9a-zA-Z]+$/,
  //alphanumericvalid6: /^.*(?=.{6,})[a-zA-Z0-9]+$/,
  threeNumber: /^\d{3}$/,
  alphaNumAt: /^[a-zA-Z0-9@]*$/,
  tendigitnumber: /^\d{10}$/,
  onlyNumber: /^[0-9]*$/,
  nospecialchar:/^[a-zA-Z0-9\s,'-]*$/
};


