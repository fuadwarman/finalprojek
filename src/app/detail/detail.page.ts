import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { RouterModule,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,HttpClientModule,RouterModule]
})
export class DetailPage implements OnInit {

  id: any;
  token = '';
  data: any = {};

  constructor(private route: ActivatedRoute,private storage: Storage,private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 

      this.loadData();
    });
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
  
      this.http.get(`mahasiswaif21.site/api/voting/${this.id}`, httpOptions)
        .subscribe((res: any) => {
          this.data = res.data.data;
        }, error => {
          console.log(error);
        });
  }

}
