import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home/:userId',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'notifications/:userId',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'sub-admin',
    loadChildren: () => import('./sub-admin/sub-admin.module').then( m => m.SubAdminPageModule)
  },
  {
    path: 'enquiry-detail',
    loadChildren: () => import('./enquiry-detail/enquiry-detail.module').then( m => m.EnquiryDetailPageModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then( m => m.AnalyticsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
