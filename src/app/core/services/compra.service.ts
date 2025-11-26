﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../models/business.models';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://localhost:5019/api/compras';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiUrl);
  }

  getById(id: string): Observable<Compra> {
    return this.http.get<Compra>(`${this.apiUrl}/${id}`);
  }

  create(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(this.apiUrl, compra);
  }
}
