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
}
