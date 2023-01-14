import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	userForm = new FormGroup({
		'email': new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
		'password': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'name': new FormControl('', { nonNullable: true, validators: [Validators.required] })
	});

	constructor(private auth: AngularFireAuth, private router: Router) { }

	ngOnInit(): void { }

	registerUser() {
		if (this.userForm.valid) {
			const email = this.userForm.get('email')!.value;
			const password = this.userForm.get('password')!.value;
			this.auth.createUserWithEmailAndPassword(email, password).then(userCred => {
				this.router.navigate(['catches']);
			}).catch(error => console.log('An error has occured:', error));
		}
	}
}