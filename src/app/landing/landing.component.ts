import { TestPaper } from '../test-paper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import * as $ from 'jquery';
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
  // search = $('#search');
  // results = $('#subject');
  // templateContent = $('#resultstemplate').content;
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
      console.log(this.testPapers);
    });
  }
  // onKeyUp() {
  //   while (this.results.children.length) {
  //     this.results.empty(this.results.firstChild);
  //   }
  //   const inputVal = new RegExp(this.search.value.trim(), 'i');
  //   const set = Array.prototype.reduce.call(this.templateContent.cloneNode(true).children, function searchFilter(frag, item, i) {
  //     if (inputVal.test(item.textContent) && frag.children.length < 6) {
  //       frag.appendChild(item);
  //     }
  //     return frag;
  //   }, document.createDocumentFragment());
  //   this.results.appendChild(set);
  // }

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



