import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'lead-manager', loadChildren: () => import('./lead-manager/lead-manager.module').then(m => m.LeadManagerModule) },
  { path: 'quote-manager', loadChildren: () => import('./quote-manager/quote-manager.module').then(m => m.QuoteManagerModule) },
  { path: 'bill-manager', loadChildren: () => import('./bill-manager/bill-manager.module').then(m => m.BillManagerModule) },
  { path: 'stock-manager', loadChildren: () => import('./stock-manager/stock-manager.module').then(m => m.StockManagerModule) },
  { path: 'account-manager', loadChildren: () => import('./account-manager/account-manager.module').then(m => m.AccountManagerModule) },
  { path: 'amc-manager', loadChildren: () => import('./amc-manager/amc-manager.module').then(m => m.AmcManagerModule) },
  { path: '', redirectTo: '/lead-manager', pathMatch: 'full' },
  {
    path: 'sales-manager',
    loadComponent: () => import('./sales-manager/sales-manager.page').then( m => m.SalesManagerPage)
  },
  {
    path: 'stock-manager',
    loadComponent: () => import('./stock-manager/stock-manager.page').then( m => m.StockManagerPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'master',
    loadComponent: () => import('./master/master.page').then( m => m.MasterPage)
  },
  {
    path: 'add-prospect',
    loadComponent: () => import('./add-prospect/add-prospect.page').then( m => m.AddProspectPage)
  },
  {
    path: 'add-customer',
    loadComponent: () => import('./add-customer/add-customer.page').then( m => m.AddCustomerPage)
  },
  {
    path: 'add-vendor',
    loadComponent: () => import('./add-vendor/add-vendor.page').then( m => m.AddVendorPage)
  },
  {
    path: 'add-service',
    loadComponent: () => import('./add-service/add-service.page').then( m => m.AddServicePage)
  },
  {
    path: 'add-item',
    loadComponent: () => import('./add-item/add-item.page').then( m => m.AddItemPage)
  },
  {
    path: 'add-executive',
    loadComponent: () => import('./add-executive/add-executive.page').then( m => m.AddExecutivePage)
  },
  {
    path: 'purchase',
    loadComponent: () => import('./purchase/purchase.page').then( m => m.PurchasePage)
  },
  {
    path: 'sales',
    loadComponent: () => import('./sales/sales.page').then( m => m.SalesPage)
  },
  {
    path: 'add-lead',
    loadComponent: () => import('./add-lead/add-lead.page').then( m => m.AddLeadPage)
  },
  {
    path: 'follow-up',
    loadComponent: () => import('./follow-up/follow-up.page').then( m => m.FollowUpPage)
  },
  {
    path: 'transfer-lead',
    loadComponent: () => import('./transfer-lead/transfer-lead.page').then( m => m.TransferLeadPage)
  },
  {
    path: 'view-lead',
    loadComponent: () => import('./view-lead/view-lead.page').then( m => m.ViewLeadPage)
  },
  {
    path: 'add-sale',
    loadComponent: () => import('./add-sale/add-sale.page').then( m => m.AddSalePage)
  },
  {
    path: 'add-purchase',
    loadComponent: () => import('./add-purchase/add-purchase.page').then( m => m.AddPurchasePage)
  },
  {
    path: 'view-sale',
    loadComponent: () => import('./view-sale/view-sale.page').then( m => m.ViewSalePage)
  },
  {
    path: 'view-purchase',
    loadComponent: () => import('./view-purchase/view-purchase.page').then( m => m.ViewPurchasePage)
  },
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports.page').then( m => m.ReportsPage)
  },

];
