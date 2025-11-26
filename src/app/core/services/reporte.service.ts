﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reporte } from '../models/business.models';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost:5019/api/reportes';

  constructor(private http: HttpClient) { }

  getResumen(): Observable<Reporte> {
    return this.http.get<Reporte>(`${this.apiUrl}/resumen`);
  }
}
