import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PropDataService {

  constructor(private http: HttpClient) { }

  async getData()
  {
    let URL = '/data/v1/action/find';
    let payload = {
      database: 'db',
      dataSource: 'Cluster0',
      collection: 'properties',
      sort: {Id: 1}
    }
    return this.http.post(URL, payload);
  }

  async deleteProperty(id: number) {
    let URL = '/data/v1/action/deleteOne';
    let payload = {
      database: 'db',
      dataSource: 'Cluster0',
      collection: 'properties',
      filter: {Id: id}
    }

    return this.http.post(URL, payload);
  }

  async addProperty(id: number, name: string, desc: string, size: string) {
    let URL = '/data/v1/action/insertOne';
    let payload = {
      database: 'db',
      dataSource: 'Cluster0',
      collection: 'properties',
      document: {
        Id: id,
        Name: name,
        desc: desc,
        size: size
      }
    }

    return this.http.post(URL, payload);

  }
}
