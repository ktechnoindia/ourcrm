import { Routes } from '@angular/router';
import { ViewExecutivePage } from './view-executive/view-executive.page';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'quote-manager',
    loadComponent: () => import('./quote-manager/quote-manager.page').then(m => m.QuoteManagerPage)
  },
  {
    path: 'bill-manager',
    loadComponent: () => import('./bill-manager/bill-manager.page').then(m => m.BillManagerPage)
  },
  {
    path: 'stock-manager',
    loadComponent: () => import('./stock-manager/stock-manager.page').then(m => m.StockManagerPage)
  },
  {
    path: 'account-manager',
    loadComponent: () => import('./account-manager/account-manager.page').then(m => m.AccountManagerPage)
  },
  {
    path: 'amc-manager',
    loadComponent: () => import('./amc-manager/amc-manager.page').then(m => m.AmcManagerPage)
  },
  {
    path: 'view-executive',
    component: ViewExecutivePage,
  },
  { path: 'lead-manager', loadComponent: () => import('./lead-manager/lead-manager.page').then(m => m.LeadManagerPage) },

  {
    path: 'sales-manager',
    loadComponent: () => import('./sales-manager/sales-manager.page').then(m => m.SalesManagerPage)
  },
  {
    path: 'stock-manager',
    loadComponent: () => import('./stock-manager/stock-manager.page').then(m => m.StockManagerPage)
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
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'master',
    loadComponent: () => import('./master/master.page').then(m => m.MasterPage)
  },
  {
    path: 'add-prospect',
    loadComponent: () => import('./add-prospect/add-prospect.page').then(m => m.AddProspectPage)
  },
  {
    path: 'add-customer',
    loadComponent: () => import('./add-customer/add-customer.page').then(m => m.AddCustomerPage)
  },
  {
    path: 'add-vendor',
    loadComponent: () => import('./add-vendor/add-vendor.page').then(m => m.AddVendorPage)
  },
  {
    path: 'add-service',
    loadComponent: () => import('./add-service/add-service.page').then(m => m.AddServicePage)
  },
  {
    path: 'add-item',
    loadComponent: () => import('./add-item/add-item.page').then(m => m.AddItemPage)
  },
  {
    path: 'add-executive',
    loadComponent: () => import('./add-executive/add-executive.page').then(m => m.AddExecutivePage)
  },
  {
    path: 'purchase',
    loadComponent: () => import('./purchase/purchase.page').then(m => m.PurchasePage)
  },
  {
    path: 'sales',
    loadComponent: () => import('./sales/sales.page').then(m => m.SalesPage)
  },
  {
    path: 'add-lead',
    loadComponent: () => import('./add-lead/add-lead.page').then(m => m.AddLeadPage)
  },
  {
    path: 'follow-up',
    loadComponent: () => import('./follow-up/follow-up.page').then(m => m.FollowUpPage)
  },
  {
    path: 'transfer-lead',
    loadComponent: () => import('./transfer-lead/transfer-lead.page').then(m => m.TransferLeadPage)
  },
  {
    path: 'view-lead',
    loadComponent: () => import('./view-lead/view-lead.page').then(m => m.ViewLeadPage)
  },
  {
    path: 'add-sale',
    loadComponent: () => import('./add-sale/add-sale.page').then(m => m.AddSalePage)
  },
  {
    path: 'add-purchase',
    loadComponent: () => import('./add-purchase/add-purchase.page').then(m => m.AddPurchasePage)
  },
  {
    path: 'view-sale',
    loadComponent: () => import('./view-sale/view-sale.page').then(m => m.ViewSalePage)
  },
  {
    path: 'view-purchase',
    loadComponent: () => import('./view-purchase/view-purchase.page').then(m => m.ViewPurchasePage)
  },
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports.page').then(m => m.ReportsPage)
  },
  {
    path: 'challan-manager',
    loadComponent: () => import('./challan-manager/challan-manager.page').then(m => m.ChallanManagerPage)
  },
  {
    path: 'dc-in',
    loadComponent: () => import('./dc-in/dc-in.page').then(m => m.DcInPage)
  },
  {
    path: 'dc-out',
    loadComponent: () => import('./dc-out/dc-out.page').then(m => m.DcOutPage)
  },
  {
    path: 'dc-out-report',
    loadComponent: () => import('./dc-out-report/dc-out-report.page').then(m => m.DcOutReportPage)
  },
  {
    path: 'dc-in-report',
    loadComponent: () => import('./dc-in-report/dc-in-report.page').then(m => m.DcInReportPage)
  },
  {
    path: 'hsn-manager',
    loadComponent: () => import('./hsn-manager/hsn-manager.page').then(m => m.HsnManagerPage)
  },
  {
    path: 'add-quot',
    loadComponent: () => import('./add-quot/add-quot.page').then(m => m.AddQuotPage)
  },
  {
    path: 'view-quot',
    loadComponent: () => import('./view-quot/view-quot.page').then(m => m.ViewQuotPage)
  },
  {
    path: 'view-executive',
    loadComponent: () => import('./view-executive/view-executive.page').then(m => m.ViewExecutivePage)
  },
  {
    path: 'update-quot',
    loadComponent: () => import('./update-quot/update-quot.page').then(m => m.UpdateQuotPage)
  },
  {
    path: 'item-master',
    loadComponent: () => import('./item-master/item-master.page').then(m => m.ItemMasterPage)
  },
  {
    path: 'stock',
    loadComponent: () => import('./stock/stock.page').then(m => m.StockPage)
  },
  {
    path: 'pro-stock',
    loadComponent: () => import('./pro-stock/pro-stock.page').then(m => m.ProStockPage)
  },
  {
    path: 'createamc',
    loadComponent: () => import('./createamc/createamc.page').then(m => m.CreateamcPage)
  },
  {
    path: 'amcreport',
    loadComponent: () => import('./amcreport/amcreport.page').then(m => m.AmcreportPage)
  },
  {
    path: 'pendingamc',
    loadComponent: () => import('./pendingamc/pendingamc.page').then(m => m.PendingamcPage)
  },
  {
    path: 'addaccount',
    loadComponent: () => import('./addaccount/addaccount.page').then(m => m.AddaccountPage)
  },
  {
    path: 'accountreport',
    loadComponent: () => import('./accountreport/accountreport.page').then(m => m.AccountreportPage)
  },
  {
    path: 'itemledger',
    loadComponent: () => import('./item-ledger/item-ledger.page').then(m => m.ItemLedgerPage)
  },
  {
    path: 'stockledger',
    loadComponent: () => import('./stock-ledger/stock-ledger.page').then(m => m.StockLedgerPage)
  },
  {
    path: 'serviceledger',
    loadComponent: () => import('./service-ledger/service-ledger.page').then(m => m.ServiceLedgerPage)
  },
  {
    path: 'groupwisereport',
    loadComponent: () => import('./group-wise-report/group-wise-report.page').then(m => m.GroupWiseReportPage)
  },  {
    path: 'editinfo',
    loadComponent: () => import('./editinfo/editinfo.page').then( m => m.EditinfoPage)
  },
  {
    path: 'usercreate',
    loadComponent: () => import('./usercreate/usercreate.page').then( m => m.UsercreatePage)
  },
  {
    path: 'useredit',
    loadComponent: () => import('./useredit/useredit.page').then( m => m.UsereditPage)
  },
  {
    path: 'password',
    loadComponent: () => import('./password/password.page').then( m => m.PasswordPage)
  },
  {
    path: 'addgroup',
    loadComponent: () => import('./addgroup/addgroup.page').then( m => m.AddgroupPage)
  },
  {
    path: 'addattribute',
    loadComponent: () => import('./addattribute/addattribute.page').then( m => m.AddattributePage)
  },
  {
    path: 'barcode',
    loadComponent: () => import('./barcode/barcode.page').then( m => m.BarcodePage)
  },
  {
    path: 'roleofexicutive',
    loadComponent: () => import('./roleofexicutive/roleofexicutive.page').then( m => m.RoleofexicutivePage)
  },
  {
    path: 'transaction',
    loadComponent: () => import('./transaction/transaction.page').then( m => m.TransactionPage)
  },
  {
    path: 'gst',
    loadComponent: () => import('./gst/gst.page').then( m => m.GstPage)
  },
  {
    path: 'ledger',
    loadComponent: () => import('./ledger/ledger.page').then( m => m.LedgerPage)
  },
  {
    path: 'createcompany',
    loadComponent: () => import('./createcompany/createcompany.page').then( m => m.CreatecompanyPage)
  },
  {
    path: 'opencompany',
    loadComponent: () => import('./opencompany/opencompany.page').then( m => m.OpencompanyPage)
  },
  {
    path: 'closecompany',
    loadComponent: () => import('./closecompany/closecompany.page').then( m => m.ClosecompanyPage)
  },
  {
    path: 'leadedit',
    loadComponent: () => import('./leadedit/leadedit.page').then( m => m.LeadeditPage)
  },







];