import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { RouterModule,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
  standalone: true,
  imports: [RouterModule,HttpClientModule,IonicModule, CommonModule, FormsModule]
})
export class VotingPage implements OnInit {
  data : any[] = [];
  vote : any[] = [];
  token = '';
  count = 0;
  isVote = 'false';
  
  constructor(private alertController: AlertController,private storage: Storage,private http: HttpClient, private router: Router) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
      this.data = [];
      this.loadData();
  }

  goTo(id : any) {
    this.router.navigate(['/detail', id]);
  }

  setBreak(var1 : any,var2 : any) {
    if (var1 == var2) {
      return true;
    } else {
      return false
    }
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

            console.log(this.token);
        
            let postData = {}
        
            this.http.get("mahasiswaif21.site/api/category", httpOptions)
              .subscribe((res: any) => {
                console.log(res);
                this.data = res.data.data;
              }, error => {
                console.log(error);
              });

              this.http.get("mahasiswaif21.site/api/is-voting", httpOptions)
              .subscribe((res: any) => {
                // console.log(res);
                this.count = res.data.data;
              }, error => {
                console.log(error);
              });

              this.http.get("mahasiswaif21.site/api/vote-check", httpOptions)
              .subscribe((res: any) => {
                // console.log(res);
                this.vote = res.data.data;
              }, error => {
                console.log(error);
              });

              
}

async handleVote(id: any) {
  await this.storage.create();
  this.token = await this.storage.get('token');

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  };

  let postData = {}

  this.http.post(`mahasiswaif21.site/api/vote/${id}`,postData, httpOptions)
              .subscribe(res => {
                console.log(res);
                window.location.reload();
                // this.data = res.data.data.data;
              }, error => {
                console.log(error);
              });
};

async presentAlert(id : any) {
  const alert = await this.alertController.create({
    header: 'Voting',
    subHeader: '',
    message: 'Yakin ingin Voting ini ?',
    buttons: [
      {
          text: 'No',
          role: 'cancel',
      },
      {
          text: 'Yes',
          role: 'confirm',
          handler: async () => {
              await this.handleVote(id);
          },
      },
  ],
  });

  await alert.present();
}

async batalVote(id: any) {
  await this.storage.create();
  this.token = await this.storage.get('token');

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  };

  let postData = {}

  this.http.post(`mahasiswaif21.site/api/batal/${id}`,postData, httpOptions)
              .subscribe(res => {
                console.log(res);
                window.location.reload();
                // this.data = res.data.data.data;
              }, error => {
                console.log(error);
              });
};

async batal(id : any) {
  const alert = await this.alertController.create({
    header: 'Voting',
    subHeader: '',
    message: 'Yakin ingin Batal Voting ini ?',
    buttons: [
      {
          text: 'No',
          role: 'cancel',
      },
      {
          text: 'Yes',
          role: 'confirm',
          handler: async () => {
              await this.batalVote(id);
          },
      },
  ],
  });

  await alert.present();
}

}
