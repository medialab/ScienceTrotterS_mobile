import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * Cache configuration.
   * @type {{ttl: number; delayType: string}}
   */
  requestConfig = {
    'ttl': 5,
    'delayType': 'all'
  };

  apiUrl = environment.endpoint.data
  assetsUrl = environment.endpoint.assets

  constructor(
    private http: HttpClient,
    // private cache: CacheService
  ) {}

  /**
   * Traite une requête HTTP /GET.
   *
   * @param target - Une route valide de l'api.
   * @param withCache - True ou false pour le traitement via cache.
   * @returns {Observable<Object>}
   */
  fetch(url: string) {
    const request = this.http.get(url)
    return request.toPromise();
  }

  async get(target: string) {
    const requestUrl = this.getRequestUri(target);
    try {
      const resp: any = await this.fetch(requestUrl);
      if (resp.success) {
        return resp.data;
      }
    } catch(err) {
      console.log(err);
      return null;
    }
  }

  /**
   * get image/audio blob from server.
   *
   * @param url
   * @returns {Observable<T>}
   */

  getFile(url: string) {
    return this.http.get(url,{ responseType: 'blob' }).toPromise();
  }


  /**
   * Construit une url vers un asset.
   *
   * @param target - un asset.
   * @returns {string}
   */
  getAssetsUri(target: string) {
    return this.assetsUrl + target;
  }

  /**
   * Construit une url vers un route de l'api.
   *
   * @param target - Une route valide de l'api.
   * @returns {string}
   */
  getRequestUri(target: string) {
    return this.apiUrl + target;
  }
}
