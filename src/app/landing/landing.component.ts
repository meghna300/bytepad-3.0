import { TestPaper } from '../test-paper';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { NgsRevealConfig } from 'ng-scrollreveal';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @Input() testPapers: TestPaper[];
  subject: String;
  SelectedPaper: String;
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

  getSelectedPaperbyName(selectedName: String): TestPaper {
    let found: TestPaper;
    this.testPapers.forEach(testPaper => {
      if (testPaper.subjectName === selectedName) {
        found = testPaper;
      }
    });
    return found;
  }

  search_paper () {
    this.paperSelected = this.getSelectedPaperbyName(this.subject);
    if (this.paperSelected) {
       this.router.navigate(['search_result', this.paperSelected.id], { queryParams: { subjectName: this.paperSelected.subjectName}});
    } else {
      document.getElementById('modal').click();
    }
  }

  searchFunction() {
    const filter = this.subject.toUpperCase();
    const div = document.getElementById('subjects');
    div.style.display = 'block';
    const li = div.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
     const  txtValue = li[i].textContent || li[i].innerText;
     if (txtValue.toUpperCase().indexOf(filter) > -1) {
       li[i].style.display = '' ;
       const search = document.getElementById('search');
       search.style.borderBottomLeftRadius = '0';
       search.style.borderBottomRightRadius = '0';
       search.style.borderTopRightRadius = '1em';
       search.style.borderTopLeftRadius = '1em';
      } else {
       li[i].style.display = 'none';
     }
     }
     if (!this.subject) {
       div.style.display = 'none';
       const search = document.getElementById('search');
       search.style.borderBottomLeftRadius = '2em';
       search.style.borderBottomRightRadius = '2em';
       search.style.borderTopRightRadius = '2em';
       search.style.borderTopLeftRadius = '2em';
     }
    }

    // onSelectPaper(selectedPaper: String) {
    //   this.subject = selectedPaper;
    //   console.log(this.subject);
    // }
    passValue(paper: String) {
      this.subject = paper;
      const ui = document.getElementById('subjects');
      ui.style.display = 'none';
      const search = document.getElementById('search');
      search.style.borderBottomLeftRadius = '2em';
      search.style.borderBottomRightRadius = '2em';
      search.style.borderTopRightRadius = '2em';
      search.style.borderTopLeftRadius = '2em';

    }
  }




