import { Injectable } from '@angular/core';
import PouchDB from "pouchdb";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  db: any;
  readonly AUTH: string = "auth";
  private data: any = {};

  constructor() {
    this.db = new PouchDB('ivtest');
    [this.AUTH].forEach((key: string) => {
      this.get(key).then((data) => {
        this.data[key] = data;
      })
    });
  }

  async set(key: string, newValue: any) {
    this.data[key] = newValue;
    await this.db.put({
      _id: key,
      data: newValue
    });
  }

  async get(key: string) {
    try {
      const result = await this.db.get(key);
      return result.data;
    } catch {
      return null;
    }
  }

  value(key: string) {
    return this.data[key];
  }

  async clear(key: string) {
    const result = await this.db.get(key);
    await this.db.remove(result._id, result._rev);
  }
}
