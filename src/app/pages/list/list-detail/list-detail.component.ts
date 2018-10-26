import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '@/service/api.service';
const URL = {
  detail: 'ypt.application.getApplication'
}
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  @Input() id;
  constructor(private api: ApiService) { }
  private form = {

  };
  getDetail(){
    this.api.post(URL.detail, {
      params: {
        id: this.id
      }
    }).then(result => {
      let data = result.data;
      this.form = data;
    });
  }
  ngOnInit() {
    this.getDetail();
  }

}
