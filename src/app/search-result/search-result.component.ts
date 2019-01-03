import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  url: String = 'http://aac8defa.ngrok.io/';
  paper: {};
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getPaper();
  }

  getPaper() {
     const subject = this.route.snapshot.paramMap.get('id');
     this.http.get(this.url + 'api/get_list_?subject_id=' + subject).subscribe(res => {
       this.paper = res;
       console.log(this.paper);
     });

  }

}
