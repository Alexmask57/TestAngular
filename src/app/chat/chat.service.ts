import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

class OllamaRequest {
  model: string;
  prompt: string;
  stream: boolean;
  format: string;
  constructor(model: string, prompt: string, format: string, stream: boolean) {
    this.model = model;
    this.prompt = prompt;
    // this.stream = stream;
    this.format = format;
  }
}

class OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  sendMessage(message: string){
    return this.httpClient.post<OllamaResponse | any>(environment.mistralApi, new OllamaRequest('mistral', message, 'json', true), {
      // headers: new HttpHeaders().set('responseType', 'text')
    });
  }
}
