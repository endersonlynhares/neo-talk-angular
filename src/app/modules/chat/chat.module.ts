import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import {MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {MatProgressSpinner, MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PoseViewer} from "pose-viewer/dist/types/components/pose-viewer/pose-viewer";


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
    MatSuffix,
    MatProgressSpinnerModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatModule { }
