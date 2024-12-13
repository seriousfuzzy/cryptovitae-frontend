import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PinataService {
  private pinataUrl = environment.pinata.url;
  private pinataApiKey = environment.pinata.ApiKey;
  private pinataSecretApiKey = environment.pinata.ApiSecret;

  constructor(private http: HttpClient) {}

  private uploadImage(imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', imageFile);

    const headers = new HttpHeaders({
      pinata_api_key: this.pinataApiKey,
      pinata_secret_api_key: this.pinataSecretApiKey,
    });

    return this.http.post(`${this.pinataUrl}/pinning/pinFileToIPFS`, formData, {
      headers,
    });
  }

  private uploadJson(jsonData: any): Observable<any> {
    const headers = new HttpHeaders({
      pinata_api_key: this.pinataApiKey,
      pinata_secret_api_key: this.pinataSecretApiKey,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.pinataUrl}/pinning/pinJSONToIPFS`, jsonData, {
      headers,
    });
  }

  public uploadNft(imageFile: File, nftAttributes: any): Observable<any> {
    return this.uploadImage(imageFile).pipe(
      switchMap((imageResponse) => {
        const imageCid = imageResponse.IpfsHash;
        const tokenUri = `ipfs://${imageCid}`;

        const jsonData = {
          ...nftAttributes,
          image: tokenUri,
        };

        return this.uploadJson(jsonData).pipe(
          map((jsonResponse) => {
            return {
              imageCid,
              jsonCid: jsonResponse.IpfsHash,
              tokenUri: `ipfs://${jsonResponse.IpfsHash}`,
            };
          })
        );
      })
    );
  }
}
