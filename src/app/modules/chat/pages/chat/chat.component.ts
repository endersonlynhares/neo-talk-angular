import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import * as PoseViewer from 'pose-viewer'
import {PoseService} from "../../../../services/pose.service";

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrl: 'chat.component.scss'
})
export class ChatComponent implements OnInit {
  poseData: any;

  chatForm: any;
  poseArrayBuffer: any;
  message: string = '';
  poseUrl: SafeResourceUrl | null = null;
  poseViewer: any;
  recognition: any;
  transcript: string = '';
  loadingContent: boolean = false;
  isListening: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone,
    private poseService: PoseService
  ) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('SpeechRecognition não é suportado neste navegador.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true; // Permite que o reconhecimento continue
    this.recognition.interimResults = false; // Resultados intermediários não são retornados

    this.recognition.onresult = (event: any) => {
      this.ngZone.run(() => {
        // Obter o último resultado
        const result = event.results[event.resultIndex];
        this.transcript = result[0].transcript;
        this.message += this.transcript; // Adiciona a transcrição à mensagem
      });
    };

    this.recognition.onerror = (event: any) => {
      alert(event.error)
      console.error('Erro no reconhecimento de voz:', event.error);
    };

    this.recognition.onend = () => {
      console.log('Reconhecimento de voz finalizado.');
      this.isListening = false;
    };
  }

  startListening() {
    this.message = ''
    this.transcript = ''
    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    this.isListening = false;
    this.recognition.stop();
    this.poseService.getPoseData(this.message).subscribe({
      next: (data) =>{
        this.poseData = URL.createObjectURL(data)
        this.poseViewer.setAttribute('src', this.poseData)
      },
      error: (err) =>{
        console.log(err)
      },
      complete: () =>{
        this.transcript = ''
      }
    })
  }

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
    this.poseViewer.setAttribute('src', `https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?spoken=pt&signed=psr&text=${this.message}`)
    this.message = ''
    this.transcript = ''
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
