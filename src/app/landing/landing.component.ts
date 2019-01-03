import { TestPaper } from '../test-paper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  testPaper: TestPaper[];
  subject: Number;
  url: String = 'http://aac8defa.ngrok.io/';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getPaper();
    // console.log(this.term);
  }
  getPaper() {
    this.http.get<TestPaper[]>(this.url + 'api/subject_detail').subscribe(res => {
      this.testPaper = res;
      console.log(this.testPaper);
    });
  }

  search () {
  this.router.navigate(['search_result', this.subject]);
  }
}
