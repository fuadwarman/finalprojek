import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { RouterModule,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [RouterModule,IonicModule, CommonModule, FormsModule,HttpClientModule]
})
export class MainPage implements OnInit {

  public message = '';
  public error: boolean = false;
  public token = '';

  constructor(private storage: Storage,private http: HttpClient, private router: Router) { }

  async ngOnInit() {
  }

  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'Yes',
      role: 'confirm',
      handler: async () => {
        await this.logout(); 
      },
    },
  ];

  async logout() {
    await this.storage.create();
    this.token = await this.storage.get('token');
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token}`
      })
    };

    let postData = {}

    this.http.post("mahasiswaif21.site/api/logout", postData, httpOptions)
      .subscribe(async (res) => {
        await this.storage.clear();
        this.router.navigate(['']);
      }, error => {
        this.error = true;
        this.message = error.error.message;
      });
  }


}
