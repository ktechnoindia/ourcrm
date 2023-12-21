import { Routes } from '@angular/router';
import { AuthGuard } from './interceptors/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'masterdashboard',
    pathMatch: 'full'
   // canActivate:[AuthGuard]
  },
  {
    path: 'quote-manager',
    loadComponent: () => import('./quote-manager/quote-manager.page').then(m => m.QuoteManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'bill-manager',
    loadComponent: () => import('./bill-manager/bill-manager.page').then(m => m.BillManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'stock-manager',
    loadComponent: () => import('./stock-manager/stock-manager.page').then(m => m.StockManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'account-manager',
    loadComponent: () => import('./account-manager/account-manager.page').then(m => m.AccountManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'amc-manager',
    loadComponent: () => import('./amc-manager/amc-manager.page').then(m => m.AmcManagerPage),
    canActivate:[AuthGuard]
  },

  { path: 'lead-manager', loadComponent: () => import('./lead-manager/lead-manager.page').then(m => m.LeadManagerPage),
  canActivate:[AuthGuard] },

  {
    path: 'sales-manager',
    loadComponent: () => import('./sales-manager/sales-manager.page').then(m => m.SalesManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'stock-manager',
    loadComponent: () => import('./stock-manager/stock-manager.page').then(m => m.StockManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'master',
    loadComponent: () => import('./master/master.page').then(m => m.MasterPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-prospect',
    loadComponent: () => import('./add-prospect/add-prospect.page').then(m => m.AddProspectPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-customer',
    loadComponent: () => import('./add-customer/add-customer.page').then(m => m.AddCustomerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-vendor',
    loadComponent: () => import('./add-vendor/add-vendor.page').then(m => m.AddVendorPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-service',
    loadComponent: () => import('./add-service/add-service.page').then(m => m.AddServicePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-item',
    loadComponent: () => import('./add-item/add-item.page').then(m => m.AddItemPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-executive',
    loadComponent: () => import('./add-executive/add-executive.page').then(m => m.AddExecutivePage),
    canActivate:[AuthGuard]
  },
 
  {
    path: 'sales',
    loadComponent: () => import('./sales/sales.page').then(m => m.SalesPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-lead',
    loadComponent: () => import('./add-lead/add-lead.page').then(m => m.AddLeadPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'follow-up',
    loadComponent: () => import('./follow-up/follow-up.page').then(m => m.FollowUpPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'transfer-lead',
    loadComponent: () => import('./transfer-lead/transfer-lead.page').then(m => m.TransferLeadPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-lead',
    loadComponent: () => import('./view-lead/view-lead.page').then(m => m.ViewLeadPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-sale',
    loadComponent: () => import('./add-sale/add-sale.page').then(m => m.AddSalePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-purchase',
    loadComponent: () => import('./add-purchase/add-purchase.page').then(m => m.AddPurchasePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-sale',
    loadComponent: () => import('./view-sale/view-sale.page').then(m => m.ViewSalePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-purchase',
    loadComponent: () => import('./view-purchase/view-purchase.page').then(m => m.ViewPurchasePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports.page').then(m => m.ReportsPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'challan-manager',
    loadComponent: () => import('./challan-manager/challan-manager.page').then(m => m.ChallanManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'dc-in',
    loadComponent: () => import('./dc-in/dc-in.page').then(m => m.DcInPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'dc-out',
    loadComponent: () => import('./dc-out/dc-out.page').then(m => m.DcOutPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'dc-out-report',
    loadComponent: () => import('./dc-out-report/dc-out-report.page').then(m => m.DcOutReportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'dc-in-report',
    loadComponent: () => import('./dc-in-report/dc-in-report.page').then(m => m.DcInReportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'hsn-manager',
    loadComponent: () => import('./hsn-manager/hsn-manager.page').then(m => m.HsnManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-quot',
    loadComponent: () => import('./add-quot/add-quot.page').then(m => m.AddQuotPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-quot',
    loadComponent: () => import('./view-quot/view-quot.page').then(m => m.ViewQuotPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'update-quot',
    loadComponent: () => import('./update-quot/update-quot.page').then(m => m.UpdateQuotPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'item-master',
    loadComponent: () => import('./item-master/item-master.page').then(m => m.ItemMasterPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'stock',
    loadComponent: () => import('./stock/stock.page').then(m => m.StockPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'pro-stock',
    loadComponent: () => import('./pro-stock/pro-stock.page').then(m => m.ProStockPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'createamc',
    loadComponent: () => import('./createamc/createamc.page').then(m => m.CreateamcPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'amcreport',
    loadComponent: () => import('./amcreport/amcreport.page').then(m => m.AmcreportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'pendingamc',
    loadComponent: () => import('./pendingamc/pendingamc.page').then(m => m.PendingamcPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'addaccount',
    loadComponent: () => import('./addaccount/addaccount.page').then(m => m.AddaccountPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'accountreport',
    loadComponent: () => import('./accountreport/accountreport.page').then(m => m.AccountreportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'itemledger',
    loadComponent: () => import('./item-ledger/item-ledger.page').then(m => m.ItemLedgerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'stockledger',
    loadComponent: () => import('./stock-ledger/stock-ledger.page').then(m => m.StockLedgerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'serviceledger',
    loadComponent: () => import('./service-ledger/service-ledger.page').then(m => m.ServiceLedgerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'groupwisereport',
    loadComponent: () => import('./group-wise-report/group-wise-report.page').then(m => m.GroupWiseReportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'editinfo',
    loadComponent: () => import('./editinfo/editinfo.page').then( m => m.EditinfoPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'usercreate',
    loadComponent: () => import('./usercreate/usercreate.page').then( m => m.UsercreatePage),
    canActivate:[AuthGuard]
  },
 
  {
    path: 'password',
    loadComponent: () => import('./password/password.page').then( m => m.PasswordPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'addgroup',
    loadComponent: () => import('./addgroup/addgroup.page').then( m => m.AddgroupPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'addattribute',
    loadComponent: () => import('./addattribute/addattribute.page').then( m => m.AddattributePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'barcode',
    loadComponent: () => import('./barcode/barcode.page').then( m => m.BarcodePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'roleofexicutive',
    loadComponent: () => import('./roleofexicutive/roleofexicutive.page').then( m => m.RoleofexicutivePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'transaction',
    loadComponent: () => import('./transaction/transaction.page').then( m => m.TransactionPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'gst',
    loadComponent: () => import('./gst/gst.page').then( m => m.GstPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'ledger',
    loadComponent: () => import('./ledger/ledger.page').then( m => m.LedgerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'createcompany',
    loadComponent: () => import('./createcompany/createcompany.page').then( m => m.CreatecompanyPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'opencompany',
    loadComponent: () => import('./opencompany/opencompany.page').then( m => m.OpencompanyPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'closecompany',
    loadComponent: () => import('./closecompany/closecompany.page').then( m => m.ClosecompanyPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'leaddashboard',
    loadComponent: () => import('./leaddashboard/leaddashboard.page').then( m => m.LeaddashboardPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'leadedit',
    loadComponent: () => import('./leadedit/leadedit.page').then( m => m.LeadeditPage),
    canActivate:[AuthGuard]
  },
  // {
  //   path: 'ccstep2',
  //   loadComponent: () => import('./ccstep2/ccstep2.page').then( m => m.Ccstep2Page)
  // },
  // {
  //   path: 'ccstep3',
  //   loadComponent: () => import('./ccstep3/ccstep3.page').then( m => m.Ccstep3Page)
  // },
  // {
  //   path: 'ccstep4',
  //   loadComponent: () => import('./ccstep4/ccstep4.page').then( m => m.Ccstep4Page)
  // },
  {
    path: 'quotedashboard',
    loadComponent: () => import('./quotedashboard/quotedashboard.page').then( m => m.QuotedashboardPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'createunit',
    loadComponent: () => import('./createunit/createunit.page').then( m => m.CreateunitPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewexicutive',
    loadComponent: () => import('./viewexicutive/viewexicutive.page').then( m => m.ViewexicutivePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewcustomer',
    loadComponent: () => import('./viewcustomer/viewcustomer.page').then( m => m.ViewcustomerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewsupplier',
    loadComponent: () => import('./viewsupplier/viewsupplier.page').then( m => m.ViewsupplierPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'masterdashboard',
    loadComponent: () => import('./masterdashboard/masterdashboard.page').then( m => m.MasterdashboardPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'transcationdashboard',
    loadComponent: () => import('./transcationdashboard/transcationdashboard.page').then( m => m.TranscationdashboardPage),
    canActivate:[AuthGuard]
  
  },
  {
    path: 'viewitem',
    loadComponent: () => import('./viewitem/viewitem.page').then( m => m.ViewitemPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewcompany',
    loadComponent: () => import('./viewcompany/viewcompany.page').then( m => m.ViewcompanyPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewservice',
    loadComponent: () => import('./viewservice/viewservice.page').then( m => m.ViewservicePage),
    canActivate:[AuthGuard]
  },

  {
    path: 'changepassword',
    loadComponent: () => import('./changepassword/changepassword.page').then( m => m.ChangepasswordPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewledger',
    loadComponent: () => import('./viewledger/viewledger.page').then( m => m.ViewledgerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'roleassign',
    loadComponent: () => import('./roleassign/roleassign.page').then( m => m.RoleassignPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'setting',
    loadComponent: () => import('./setting/setting.page').then( m => m.SettingPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'salesreturn',
    loadComponent: () => import('./salesreturn/salesreturn.page').then( m => m.SalesreturnPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'purchasereturn',
    loadComponent: () => import('./purchasereturn/purchasereturn.page').then( m => m.PurchasereturnPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-purchasereturn',
    loadComponent: () => import('./view-purchasereturn/view-purchasereturn.page').then( m => m.ViewPurchasereturnPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-salesreturn',
    loadComponent: () => import('./view-salesreturn/view-salesreturn.page').then( m => m.ViewSalesreturnPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment/payment.page').then( m => m.PaymentPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'receipt',
    loadComponent: () => import('./receipt/receipt.page').then( m => m.ReceiptPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'paymenttransaction-report',
    loadComponent: () => import('./paymenttransaction-report/paymenttransaction-report.page').then( m => m.PaymenttransactionReportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'receipttransaction-report',
    loadComponent: () => import('./receipttransaction-report/receipttransaction-report.page').then( m => m.ReceipttransactionReportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'accountdashboard',
    loadComponent: () => import('./accountdashboard/accountdashboard.page').then( m => m.AccountdashboardPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewroleassign',
    loadComponent: () => import('./viewroleassign/viewroleassign.page').then( m => m.ViewroleassignPage)
  },

  { path: 'lead-manager', loadComponent: () => import('./lead-manager/lead-manager.page').then(m => m.LeadManagerPage),
  canActivate:[AuthGuard] },

  {
    path: 'sales-manager',
    loadComponent: () => import('./sales-manager/sales-manager.page').then(m => m.SalesManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'stock-manager',
    loadComponent: () => import('./stock-manager/stock-manager.page').then(m => m.StockManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'master',
    loadComponent: () => import('./master/master.page').then(m => m.MasterPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-prospect',
    loadComponent: () => import('./add-prospect/add-prospect.page').then(m => m.AddProspectPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-customer',
    loadComponent: () => import('./add-customer/add-customer.page').then(m => m.AddCustomerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-vendor',
    loadComponent: () => import('./add-vendor/add-vendor.page').then(m => m.AddVendorPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-service',
    loadComponent: () => import('./add-service/add-service.page').then(m => m.AddServicePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-item',
    loadComponent: () => import('./add-item/add-item.page').then(m => m.AddItemPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-executive',
    loadComponent: () => import('./add-executive/add-executive.page').then(m => m.AddExecutivePage),
    canActivate:[AuthGuard]
  },
 
  {
    path: 'sales',
    loadComponent: () => import('./sales/sales.page').then(m => m.SalesPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-lead',
    loadComponent: () => import('./add-lead/add-lead.page').then(m => m.AddLeadPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'follow-up',
    loadComponent: () => import('./follow-up/follow-up.page').then(m => m.FollowUpPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'transfer-lead',
    loadComponent: () => import('./transfer-lead/transfer-lead.page').then(m => m.TransferLeadPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-lead',
    loadComponent: () => import('./view-lead/view-lead.page').then(m => m.ViewLeadPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-sale',
    loadComponent: () => import('./add-sale/add-sale.page').then(m => m.AddSalePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-purchase',
    loadComponent: () => import('./add-purchase/add-purchase.page').then(m => m.AddPurchasePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-sale',
    loadComponent: () => import('./view-sale/view-sale.page').then(m => m.ViewSalePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-purchase',
    loadComponent: () => import('./view-purchase/view-purchase.page').then(m => m.ViewPurchasePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports.page').then(m => m.ReportsPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'challan-manager',
    loadComponent: () => import('./challan-manager/challan-manager.page').then(m => m.ChallanManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'dc-in',
    loadComponent: () => import('./dc-in/dc-in.page').then(m => m.DcInPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'dc-out',
    loadComponent: () => import('./dc-out/dc-out.page').then(m => m.DcOutPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'dc-out-report',
    loadComponent: () => import('./dc-out-report/dc-out-report.page').then(m => m.DcOutReportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'dc-in-report',
    loadComponent: () => import('./dc-in-report/dc-in-report.page').then(m => m.DcInReportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'hsn-manager',
    loadComponent: () => import('./hsn-manager/hsn-manager.page').then(m => m.HsnManagerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-quot',
    loadComponent: () => import('./add-quot/add-quot.page').then(m => m.AddQuotPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-quot',
    loadComponent: () => import('./view-quot/view-quot.page').then(m => m.ViewQuotPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'update-quot',
    loadComponent: () => import('./update-quot/update-quot.page').then(m => m.UpdateQuotPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'item-master',
    loadComponent: () => import('./item-master/item-master.page').then(m => m.ItemMasterPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'stock',
    loadComponent: () => import('./stock/stock.page').then(m => m.StockPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'pro-stock',
    loadComponent: () => import('./pro-stock/pro-stock.page').then(m => m.ProStockPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'createamc',
    loadComponent: () => import('./createamc/createamc.page').then(m => m.CreateamcPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'amcreport',
    loadComponent: () => import('./amcreport/amcreport.page').then(m => m.AmcreportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'pendingamc',
    loadComponent: () => import('./pendingamc/pendingamc.page').then(m => m.PendingamcPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'addaccount',
    loadComponent: () => import('./addaccount/addaccount.page').then(m => m.AddaccountPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'accountreport',
    loadComponent: () => import('./accountreport/accountreport.page').then(m => m.AccountreportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'itemledger',
    loadComponent: () => import('./item-ledger/item-ledger.page').then(m => m.ItemLedgerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'stockledger',
    loadComponent: () => import('./stock-ledger/stock-ledger.page').then(m => m.StockLedgerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'serviceledger',
    loadComponent: () => import('./service-ledger/service-ledger.page').then(m => m.ServiceLedgerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'groupwisereport',
    loadComponent: () => import('./group-wise-report/group-wise-report.page').then(m => m.GroupWiseReportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'editinfo',
    loadComponent: () => import('./editinfo/editinfo.page').then( m => m.EditinfoPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'usercreate',
    loadComponent: () => import('./usercreate/usercreate.page').then( m => m.UsercreatePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewuser',
    loadComponent: () => import('./viewuser/viewuser.page').then( m => m.ViewUserPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'password',
    loadComponent: () => import('./password/password.page').then( m => m.PasswordPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'addgroup',
    loadComponent: () => import('./addgroup/addgroup.page').then( m => m.AddgroupPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'addattribute',
    loadComponent: () => import('./addattribute/addattribute.page').then( m => m.AddattributePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'barcode',
    loadComponent: () => import('./barcode/barcode.page').then( m => m.BarcodePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'roleofexicutive',
    loadComponent: () => import('./roleofexicutive/roleofexicutive.page').then( m => m.RoleofexicutivePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'transaction',
    loadComponent: () => import('./transaction/transaction.page').then( m => m.TransactionPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'gst',
    loadComponent: () => import('./gst/gst.page').then( m => m.GstPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'ledger',
    loadComponent: () => import('./ledger/ledger.page').then( m => m.LedgerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'createcompany',
    loadComponent: () => import('./createcompany/createcompany.page').then( m => m.CreatecompanyPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'opencompany',
    loadComponent: () => import('./opencompany/opencompany.page').then( m => m.OpencompanyPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'closecompany',
    loadComponent: () => import('./closecompany/closecompany.page').then( m => m.ClosecompanyPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'leaddashboard',
    loadComponent: () => import('./leaddashboard/leaddashboard.page').then( m => m.LeaddashboardPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'leadedit',
    loadComponent: () => import('./leadedit/leadedit.page').then( m => m.LeadeditPage),
    canActivate:[AuthGuard]
  },
  // {
  //   path: 'ccstep2',
  //   loadComponent: () => import('./ccstep2/ccstep2.page').then( m => m.Ccstep2Page)
  // },
  // {
  //   path: 'ccstep3',
  //   loadComponent: () => import('./ccstep3/ccstep3.page').then( m => m.Ccstep3Page)
  // },
  // {
  //   path: 'ccstep4',
  //   loadComponent: () => import('./ccstep4/ccstep4.page').then( m => m.Ccstep4Page)
  // },
  {
    path: 'quotedashboard',
    loadComponent: () => import('./quotedashboard/quotedashboard.page').then( m => m.QuotedashboardPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'createunit',
    loadComponent: () => import('./createunit/createunit.page').then( m => m.CreateunitPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewexicutive',
    loadComponent: () => import('./viewexicutive/viewexicutive.page').then( m => m.ViewexicutivePage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewcustomer',
    loadComponent: () => import('./viewcustomer/viewcustomer.page').then( m => m.ViewcustomerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewsupplier',
    loadComponent: () => import('./viewsupplier/viewsupplier.page').then( m => m.ViewsupplierPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'masterdashboard',
    loadComponent: () => import('./masterdashboard/masterdashboard.page').then( m => m.MasterdashboardPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'transcationdashboard',
    loadComponent: () => import('./transcationdashboard/transcationdashboard.page').then( m => m.TranscationdashboardPage),
    canActivate:[AuthGuard]
  
  },
  {
    path: 'viewitem',
    loadComponent: () => import('./viewitem/viewitem.page').then( m => m.ViewitemPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewcompany',
    loadComponent: () => import('./viewcompany/viewcompany.page').then( m => m.ViewcompanyPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewservice',
    loadComponent: () => import('./viewservice/viewservice.page').then( m => m.ViewservicePage),
    canActivate:[AuthGuard]
  },

  {
    path: 'changepassword',
    loadComponent: () => import('./changepassword/changepassword.page').then( m => m.ChangepasswordPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewledger',
    loadComponent: () => import('./viewledger/viewledger.page').then( m => m.ViewledgerPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'roleassign',
    loadComponent: () => import('./roleassign/roleassign.page').then( m => m.RoleassignPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'setting',
    loadComponent: () => import('./setting/setting.page').then( m => m.SettingPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'salesreturn',
    loadComponent: () => import('./salesreturn/salesreturn.page').then( m => m.SalesreturnPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'purchasereturn',
    loadComponent: () => import('./purchasereturn/purchasereturn.page').then( m => m.PurchasereturnPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-purchasereturn',
    loadComponent: () => import('./view-purchasereturn/view-purchasereturn.page').then( m => m.ViewPurchasereturnPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'view-salesreturn',
    loadComponent: () => import('./view-salesreturn/view-salesreturn.page').then( m => m.ViewSalesreturnPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment/payment.page').then( m => m.PaymentPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'receipt',
    loadComponent: () => import('./receipt/receipt.page').then( m => m.ReceiptPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'paymenttransaction-report',
    loadComponent: () => import('./paymenttransaction-report/paymenttransaction-report.page').then( m => m.PaymenttransactionReportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'receipttransaction-report',
    loadComponent: () => import('./receipttransaction-report/receipttransaction-report.page').then( m => m.ReceipttransactionReportPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'accountdashboard',
    loadComponent: () => import('./accountdashboard/accountdashboard.page').then( m => m.AccountdashboardPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'viewroleofexicutive',
    loadComponent: () => import('./viewroleofexicutive/viewroleofexicutive.page').then( m => m.ViewroleofexicutivePage)
  },
  {
    path: 'hsrpin',
    loadComponent: () => import('./hsrpin/hsrpin.page').then( m => m.HsrpinPage)
  },
  {
    path: 'hsrpout',
    loadComponent: () => import('./hsrpout/hsrpout.page').then( m => m.HsrpoutPage)
  },
  {
    path: 'pendinghsrp',
    loadComponent: () => import('./pendinghsrp/pendinghsrp.page').then( m => m.PendinghsrpPage)
  },
  {
    path: 'outstandingreport',
    loadComponent: () => import('./outstandingreport/outstandingreport.page').then( m => m.OutstandingreportPage)
  },
  {
    path: 'generalledger',
    loadComponent: () => import('./generalledger/generalledger.page').then( m => m.GeneralledgerPage)
  },






 







  








];