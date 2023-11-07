
export const environment = {
  production: false,
  apibaseurl: 'http://103.154.184.66:8000/masters/',
  apiactionurl:'http://103.154.184.66:8000/actions/',
  fetchallcountries:'getCountries', // Replace with your API's base URL
  fetchprice: 'prices', // Replace with the endpoint or route you want to use
  fetchallstate:'getStates',
  fetchalldistrict:'getDistricts',
  fetchroletypes:'getRoleTypes',
  fetchgsttypes:'getGSTTypes',
  fetchitemtype: 'getItemTypes',
  addcompany: 'saveCompany',
  fetchunits:'getUnits',
  fetchhsn:'getHSNNames',
  fetchcgtype:'getCGSTTypes',
  fetchsegment:'getSegments',
  fetchindustrytype:'getIndustryTypes',
  fetchbusinesstype:'getBusinessTypes',
  addcust:'customer',
  addvend:'vendor',
  additem: 'item',
  addgroup: 'saveItemGroups',
  addledger: 'saveLedger',
  addexecutive: 'saveExecutive',
  fetchexecutive:'getExecutives',
  fetchcustomertype:'getCustomertypes',
  fetchallcompany:'saveCompany',
  fetchallexecuitve:'saveExecutive',
  fetchallledger:'saveLedger',
  fetchallservice: 'saveservices',
  fetchallitem: 'get_items',
  fetchallitemgroups: 'getItemGroups',
  addservice: 'saveservices',
  addHsn: 'insert_hsn',
  addattribute : 'attribute',
  addbarcode:'barcode',
};
