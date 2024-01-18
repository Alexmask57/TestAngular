import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {map, Observable} from "rxjs";

class CredentialsResponse{
  Description: string;
  Credential1: string;
  Credential2: string;
  Credential3: string;
}

class CredentialsRequest {
  Description: string;
  Credential1: string;
  Credential2: string;
  Credential3: string;

  constructor(description: string, credential1: string, credential2: string, credential3: string) {
    this.Description = description;
    this.Credential1 = credential1;
    this.Credential2 = credential2;
    this.Credential3 = credential3;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private httpClient: HttpClient) { }

  getCredentials(){
    return this.httpClient.get<CredentialsResponse[]>(`${environment.urlAuthApi}/credentials`);
  }

  getCredential(description: string){
    return this.httpClient.get<CredentialsResponse[]>(`${environment.urlAuthApi}/credentials`).pipe(
      map(res => {
        let credential = res.find(x => x.Description == description);
        if (!credential)
          return null;
        return credential;
      }
    ));
  }

  addCredentials(description: string, credential1: string = '', credential2: string = '', credential3: string = ''){
    let credentials = new CredentialsRequest(description, credential1, credential2, credential3);
    return this.httpClient.post(`${environment.urlAuthApi}/credentials`, credentials);
  }
}
