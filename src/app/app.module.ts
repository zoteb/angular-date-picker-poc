import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {FkdsDatePickerComponent} from './components/fkds-date-picker/fkds-date-picker.component'
import {FkdsDateFIeldComponent} from './components/fkds-date-field/fkds-date-field.component'
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent,FkdsDatePickerComponent,FkdsDateFIeldComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
