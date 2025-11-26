import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            usuario: ['', Validators.required],
            contraseña: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.loginForm.value)
            .pipe(first())
            .subscribe({
                next: (response) => {
                    // Redirigir según el rol del usuario
                    if (this.authService.isSystemAdmin()) {
                        // Administradores del sistema van al panel de administración
                        this.router.navigate(['/admin/dashboard']);
                    } else {
                        // Usuarios normales van al sistema regular
                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                        this.router.navigate([returnUrl]);
                    }
                },
                error: error => {
                    this.error = error.error?.message || 'Error de autenticación';
                    this.loading = false;
                }
            });
    }
}
