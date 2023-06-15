import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule, HttpClientModule, FormsModule],
})
export class HomePage {
  email: string = "";
  password: string = "";
  public message = '';
  public error: boolean = false;
  token = '';

  constructor(private storage: Storage,private http: HttpClient, private router: Router) { }

  async init() {
    await this.storage.create();
    this.token = await this.storage.get('token');

    if (this.token != null) {
      this.router.navigate(['/main']);
    }
    // console.log(name);
  }

  ngOnInit() {
    this.init();
  }

  goAnOtherPage() {
    this.router.navigate(['/register'])
  }

  login() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let postData = {
      "email": this.email,
      "password": this.password
    }

    this.http.post("mahasiswaif21.site/api/login", postData, httpOptions)
      .subscribe(async (res : any) => {
        await this.storage.create();
        await this.storage.set('token', res.data.access_token);
        this.router.navigate(['/main']);
      }, err => {
        this.error = true;
        if (err.status == 422) {
        this.message = err.error.message;
      } else {
        this.message = err.error.data.error;
      }
      });
  }

}
