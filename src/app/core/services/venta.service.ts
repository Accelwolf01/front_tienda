﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/business.models';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = '/api/ventas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  getById(id: string): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${id}`);
  }

  create(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, venta);
  }

  update(id: string, venta: Venta): Observable<Venta> {
    return this.http.put<Venta>(`${this.apiUrl}/${id}`, venta);
  }
}
