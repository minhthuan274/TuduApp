import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule,
         ReactiveFormsModule } from '@angular/forms';

import { InputFieldComponent } from './input-field.component';
import { ErrorLabelComponent } from './error-label.component';

import { ErrorMessagesPipe }   from './error-messages.pipe';

@NgModule({
    declarations: [
      InputFieldComponent,
      ErrorLabelComponent,
      ErrorMessagesPipe
    ],
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule
    ],
    exports: [
      InputFieldComponent,
      ErrorLabelComponent
    ]
})
export class SharedModule {}
