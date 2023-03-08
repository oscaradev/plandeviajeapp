import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItinerarioComponent } from './pages/itinerario/itinerario.component';
import { PopupComponent } from './pages/popup/popup.component';

// Importación de módulo angular para uso drag & drop
import { DragDropModule } from '@angular/cdk/drag-drop';

//Importación para mostrar  fechas a español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-VE';
registerLocaleData(localeEs, 'es');

//Importación para uso de grid list
import { MatGridListModule } from '@angular/material/grid-list';

//Importación para iconos
import { MatIconModule } from '@angular/material/icon';

// Importación relacionada a Angular Material
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    AppComponent,
    ItinerarioComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
