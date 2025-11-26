import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/auth.models';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:5019/api/usuarios';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    getById(id: string): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    create(user: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, user);
    }

    update(id: string, user: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`, user);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
