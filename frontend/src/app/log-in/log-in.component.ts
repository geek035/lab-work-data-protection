import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataRequestService } from '../server-services/user-data-request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogINComponent {
  logForm!: FormGroup;
  #subcription: Subscription | undefined;

  constructor(
    private readonly userDataRequestService: UserDataRequestService) {  }

  ngOnInit() {
    this.logForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() { 
    const username = this.logForm.controls['username'].value;
    const password = this.logForm.controls['password'].value

    console.log(username);
    console.log(password);

    this.#subcription = this.userDataRequestService
      .getUserData(username, password).subscribe({
        next: (responce) => {  },
        error: (responce) => {  },
        
      });

  }
}
