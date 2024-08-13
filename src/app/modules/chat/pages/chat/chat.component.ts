import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrl: 'chat.component.scss'
})
export class ChatComponent implements OnInit {
  chatForm: any;
  poseArrayBuffer: any;
  message: string = '';
  poseUrl: SafeResourceUrl | null = null;
  poseViewer: any;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    await customElements.whenDefined('pose-viewer').then(() => {
      const poseViewer = document.querySelector('pose-viewer#example');
      if (poseViewer) {
        console.log(poseViewer);
        poseViewer.setAttribute('src', `https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?spoken=pt&signed=psr&text=Olá, tudo bem?`);
        this.poseViewer = poseViewer;
      }
    });
  }

  translateText() {
    if (!this.message) return;

    this.poseViewer.setAttribute('src', `https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?spoken=pt&signed=psr&text=${this.message}`);
    // this.httpClient.get(`https://sign.mt/api/v1/spoken-text-to-signed-pose?spoken=pt&signed=psr&text=${this.message}`,
    //   {
    //     headers: {
    //     'Authorization': `${atob('TmVvVGFsa18yVWRYdVI5RWZnZ05hTm45cW5ZVHlWckp2YnB2UnN5cE5udkplS3Z4Q0E4b1E0')}`
    //     },
    //     responseType: 'arraybuffer'
    //   })
    //   .subscribe({
    //     next: (response: any) => {
    //       //response é um arraybuffer
    //       //criar um arquivo .pose a partir do arraybuffer
    //       const blob = new Blob([response], { type: 'application/octet-stream' });
    //       console.log(blob);
    //
    //       //criar uma url para o arquivo .pose
    //       this.poseUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    //       console.log(this.poseUrl);
    //     },
    //     error: (error: any) => {
    //       console.error(error);
    //     }
    //   });
  }

  protected readonly console = console;
}
