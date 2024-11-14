import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, filter, interval, last, map, of, switchMap, takeWhile, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoseService {

  private BASE_URL = "http://34.30.29.231:5000"

  constructor(
    private http: HttpClient
  ) { }

  getPoseVideo(sentence: string) {
    const headers = new HttpHeaders({
      'x-api-key': '2KgHckAuTVlKe6cUEvu4SoyPfGFCxnQ2KfqjAQVShxQ1yIBtGU'
    });

    const data: FormData = new FormData();
    data.append("frase", sentence);

    return this.http.post<any>(`${this.BASE_URL}/sign-process-video`, data, { headers }).pipe(
      switchMap(response => {
        const taskId = response.task_id;
        const taskStatusUrl = `${this.BASE_URL}/task-status-video/${taskId}`;

        return interval(500).pipe(
          switchMap(() =>
            this.http.get<any>(taskStatusUrl, { headers, observe: 'response' }).pipe(
              catchError(() => of(null))
            )
          ),
          takeWhile(response => !response || response.status !== 200 || !response.body.file_url, true),
          filter(response => !!response),
          map(response => response.body),
          last()
        );

      }),
      map(taskStatus => {
        return taskStatus.file_url
      }),
      catchError(error => {
        console.error('Erro na requisição:', error);
        return throwError(() => new Error(error));
      })
    );
  }

}
