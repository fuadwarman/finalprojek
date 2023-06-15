import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class RegisterPage implements OnInit {
  name: string = "";
  email: string = "";
  password: string = "";
  public message = '';
  public error: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  register() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let postData = {
      "name": this.name,
      "email": this.email,
      "password": this.password
    }

    this.http.post("mahasiswaif21.site/api/register", postData, httpOptions)
      .subscribe(res => {
        this.router.navigate(['']);
      }, error => {
        this.error = true;
        this.message = error.error.message;
      });
  }

}
