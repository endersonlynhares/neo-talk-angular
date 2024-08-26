import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PoseService {
  private BASE_URL = "https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?spoken=pt&signed=psr&text"
  constructor(
    private http: HttpClient
  ) { }

  getPoseData(sentence: string){
    return this.http.get<any>(`${this.BASE_URL}=${sentence}`, { responseType: 'blob' as 'json' })
  }

}
