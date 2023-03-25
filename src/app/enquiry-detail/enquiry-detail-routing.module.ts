import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnquiryDetailPage } from './enquiry-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EnquiryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiryDetailPageRoutingModule {}
