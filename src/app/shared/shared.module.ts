import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from './alert/alert.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { InputComponent } from './input/input.component';
import { LoaderComponent } from './loader/loader.component';
import { NavComponent } from './nav/nav.component';
import { ModalComponent } from './modal/modal.component';
 


@NgModule({
  declarations: [
    AlertComponent,
    ErrorMessageComponent,
    InputComponent,
    LoaderComponent,
    NavComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    AlertComponent,
    ErrorMessageComponent,
    InputComponent,
    LoaderComponent,
    NavComponent,
    ModalComponent
  ]
})
export class SharedModule { }
