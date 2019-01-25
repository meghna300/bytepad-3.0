import { TestPaper } from '../test-paper';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { NgsRevealConfig } from 'ng-scrollreveal';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @Input() testPapers: TestPaper[];
  subject: String;
  paperSelected: TestPaper;
  url: String = environment.url;
  constructor(private http: HttpClient, private router: Router, config: NgsRevealConfig) {
    config.duration = 900;
  }

  ngOnInit() {
    this.getPaper();
    // console.log(this.term);
  }
  getPaper() {
    this.http.get<TestPaper[]>(this.url + 'api/subject_detail').subscribe(res => {
      this.testPapers = res;
    });
  }


  onPaperChange(subjectName: String) {
     this.paperSelected  = this.getSelectedPaperbyName(subjectName);
  }

  getSelectedPaperbyName(selectedName: String): TestPaper {
    return this.testPapers.find(testPaper => testPaper.subjectName === selectedName);
  }

  search_paper () {
    if (this.paperSelected) {
       this.router.navigate(['search_result', this.paperSelected.id, this.paperSelected.subjectName]);
    } else {
      document.getElementById('modal').click();
    }
  }
}



