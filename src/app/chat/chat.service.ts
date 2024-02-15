import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

class OllamaRequest {
  model: string;
  prompt: string;
  stream: boolean;
  format: string;

  constructor(model: string, prompt: string, format: string = '', stream: boolean = false) {
    this.model = model;
    this.prompt = prompt;
    // this.stream = stream;
    // this.format = format;
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

  constructor(private httpClient: HttpClient) {
  }

  sendMessage(message: string) {
    return this.httpClient.post(
      environment.mistralApi,
      new OllamaRequest('mistral', message),
      {
        observe: "events",
        responseType: "text",
        reportProgress: true
      }
    );
  }
}
