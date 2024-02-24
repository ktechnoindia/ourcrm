
export const environment = {
  production: false,
  apibaseurl: 'http://103.154.184.66:8000/masters/',
  apiactionurl: 'http://103.154.184.66:8000/',
  apiacturl: 'http://103.154.184.66:8000/',
  apiloginurl: 'http://103.154.184.66:8000/app1/',
  apideleteacturl: 'http://103.154.184.66:8000/',
  fetchallcountries: 'getCountries', // Replace with your API's base URL
  fetchprice: 'prices',
  fetchallstate: 'getStates',
  fetchalldistrict: 'getDistricts',
  fetchroletypes: 'getRoleTypes',
  fetchgsttypes: 'getGSTTypes',
  fetchunits: 'getUnits',
  fetchhsn: 'getHSNNames',
  fetchcgtype: 'getCGSTTypes',
  fetchsegment: 'getSegments',
  fetchindustrytype: 'getIndustryTypes',
  fetchbusinesstype: 'getBusinessTypes',
  fetchexecutive: 'getExecutives',
  fetchcustomertype: 'getCustomertypes',
  fetchleadsource: 'getLeadSources',
  fetchitemtype: 'getItemTypes',
  fetchstocktype: 'getStockTypes',
  addcust: 'masters/customer',
  addvend: 'masters/vendor',
  addsignup: 'get_signup',
  addlogin: 'appin',
  addledger: 'masters/saveLedger',
  addservice: 'masters/saveservices',
  addgst: 'gst',
  addexecutive: 'masters/saveExecutive',
  addcompany: 'masters/saveCompany',
  addroleofexecutive: 'masters/insert_insert_executive_roles',
  addaccount: 'accounts',
  additem: 'masters/insert_item',
  addgroup: 'masters/insert_group',
  additemgroup: 'masters/saveItemGroup',
  
  addunit: 'insert_units',
  addHsn: 'masters/insert_hsn',
  addcomapny: 'createcompany',
  fetchallitemgroups: 'getItemGroups',
  fetchallledegergroups:'getGroups',
  fetchallcust: 'masters/get_customers',
  fetchallvend: 'masters/get_vendors',
  fetchallitem: 'get_items/1/1',
  fetchallservice: 'masters/getservices',
  fetchallexecuitve: 'saveExecutive',
  fetchallcompany: 'masters/getcompanys',
  fetchallledger: 'masters/ledgers',
  addattribute: 'insert_attribute',
  adduser: 'adduser',
  addpass: 'password',
  fetchunit: 'get_units',
  fetchroleofexecutive: 'masters/get_insert_executive_roles',
  addroleassign: 'roleassign',
  deletecust: 'dcustomer',
  getlang: 'lang',
  toasttiming: 2000,
  deleteCustomer: 'dcustomer',
  deleteVendor: 'dvendor',
  deleteItem: 'ditem',
  deleteExecutive: 'dexecutive',
  deleteLedger: 'dlegder',
  addsales: 'sales/insert_sales',
  addpurchase: 'sales/insert_purchase',
  addbarcode: 'sales/barcode',
  fetchattribute: 'get_attributes',
  addsalesreturn: 'sales/insert_sale_return',
  addpurchasereturn: 'sales/insert_purchase_return',
  fetchallsales: 'sales/get_sales',
  fetchallpurchase: 'sales/get_purchase',
  fetchallsalesreturn: 'sales/get_sale_return',
  fetchallpurchasereturn: 'sales/get_purchase_return',
  fetchallItem: 'masters/get_all_items',
  fetchitemauto: 'masters/get_items',
  fetchpurchasebyid: 'sales/get_purchase_byid',
  addquantity: 'sales/quantity',
  fetchUserOutstanding: 'sales/user_outstanding',
  fetchVendorOutstanding: 'sales/vendor_outstanding',
  fetchBillWise: 'sales/vendor_billwise',
  fetchreceiptWise: 'sales/user_billwise',

  addcreateamc: 'amc/createamc',
  addamc: 'amc/insert_amc',
  fetchamc: 'amc/get_amc',
  addpayment: 'account/insert_payment',
  addrecepit: 'account/insert_receipt',
  fetchpayment: 'account/get_payment',
  fetchrecepit: 'account/get_receipt',
  recepitbill: 'account/get_sales_byid',
  paymentbill: 'account/get_payment_byid',
  addquote: 'quotation/insert_quotation',
  addupquote: 'quotation/saveupquote',
  fetchallquote: 'quotation/get_quotations',
  quoteno: 'quotation/viewinv.php',
  addlead: 'lms/insert_lead',
  addfollowup: 'lms/insert_lead_followup',
  editlead: 'lms/editlead',
  fetchallleads: 'lms/get_lead_by_company',
  fetchfollowup: 'lms/get_lead_followupx',
  adddcin: 'challan/insert_dcin',
  adddcout: 'challan/insert_dcout',
  fetchalldcin: 'challan/get_dcin',
  fetchalldcout: 'challan/get_dcout',
  addhsrpout: 'hsrp/insert_hsrpout',
  addhsrpin: 'hsrp/insert_hsrpin',
  fetchbyframeno:'action/get_purchase_eno',
  fetchrows:'accounts/get_rpt_config',

};




