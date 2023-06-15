import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { RouterModule,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,HttpClientModule,RouterModule]
})
export class ProfilPage implements OnInit {
  token = '';
  data: any = {};

  constructor(private storage: Storage,private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    await this.storage.create();
            this.token = await this.storage.get('token');
            
            const httpOptions = {
              headers: new HttpHeaders({
                // 'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${this.token}`
              })
            };
        
            let postData = {}
        
            this.http.get("mahasiswaif21.site/api/user", httpOptions)
              .subscribe((res: any) => {
                this.data = res;
              }, error => {
                console.log(error);
              });

              
}

}
