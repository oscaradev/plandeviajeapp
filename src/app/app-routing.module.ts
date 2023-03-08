import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItinerarioComponent } from './pages/itinerario/itinerario.component';

const routes: Routes = [
  {
    path: 'itinerario',
    component: ItinerarioComponent
  },
  {
    path: '',
    redirectTo: 'itinerario',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'itinerario',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
