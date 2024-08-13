import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import {MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatInput,
    MatIcon,
    MatFormField,
    MatPrefix,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatLabel,
    MatIconButton,
    MatSuffix
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatModule { }
