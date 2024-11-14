import {Component, NgZone, OnInit} from '@angular/core';
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
  poseUrl: any = null;
  poseViewer: any;
  recognition: any;
  transcript: string = '';
  loadingContent: boolean = false;
  isListening: boolean = false;

  constructor(
    private ngZone: NgZone,
    private poseService: PoseService
  ) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('SpeechRecognition não é suportado neste navegador.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      this.ngZone.run(() => {
        const result = event.results[event.resultIndex];
        this.transcript = result[0].transcript;
        this.message += this.transcript;
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
    this.loadingContent = true

    this.poseService.getPoseVideo(this.message).subscribe({
      next: (response) => {
        this.poseViewer.setAttribute('src', response)
        this.poseViewer.load()
        this.poseViewer.play()

        fetch(response)
        .then(response => response.blob())
        .then(blob => {
          const videoBlobUrl = URL.createObjectURL(blob);
          const a = document.querySelector(".button_download") as HTMLAnchorElement
          a.href = videoBlobUrl;
          a.download = 'pose_video.mp4';
        })
      },
      error: (err) =>{
        console.log(err)
      },
      complete: () =>{
        this.transcript = ''
        this.loadingContent = false
      }
    })
  }

  async ngOnInit() {
    await customElements.whenDefined('pose-viewer').then(() => {
      const poseViewer = document.querySelector('#pose_viewer') as HTMLVideoElement;
      if (poseViewer) {
        this.poseViewer = poseViewer;
      }
    });
  }
}
