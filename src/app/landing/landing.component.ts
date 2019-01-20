import { TestPaper } from '../test-paper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @Input() testPapers: TestPaper[];
  subject: String;
  paperSelected: TestPaper;
  url: String = environment.url;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getPaper();
    // console.log(this.term);
  }
  getPaper() {
    this.http.get<TestPaper[]>(this.url + 'api/subject_detail').subscribe(res => {
      this.testPapers = res;
      console.log(this.testPapers);
    });
  }

  onPaperChange(subjectName: String) {
     this.paperSelected  = this.getSelectedPaperbyName(subjectName);
  }

  getSelectedPaperbyName(selectedName: String): TestPaper {
    return this.testPapers.find(testPaper => testPaper.SubjectName === selectedName);
  }

  search () {
  this.router.navigate(['search_result', this.paperSelected.Id, this.paperSelected.SubjectName]);
  }
}
