import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubAdminPage } from './sub-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SubAdminPage
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then( m => m.ViewPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubAdminPageRoutingModule {}
