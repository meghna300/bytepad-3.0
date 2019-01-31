import { Component, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TestPaper } from '../test-paper';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  url: String = environment.url;
  subject: String;
  paperSelected: TestPaper;
  testPapers: TestPaper[];
  subjectId: String;
  subjectName: String;
  fileUrl: String;
  examTypeId: number;
  examType: String;
  sessionId: number;
  session: String;
  paperType: String;
  semesterType: number;
  semester: String;
  paper: any;
  paperUrl: String;
  i: number;
  filter_examType: any;
  filter_yearType: any;
  filter_paperType: any;
  filter_semType: any;
  paperDetail: {};
  r: any;
  nopapers: boolean;
  filteredPapers: any[];
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
  ngOnInit() {
    this.subjectList();
    // this.subjectId = this.route.snapshot.paramMap.get('id');
    // this.subjectName = this.route.snapshot.queryParamMap.get('subjectName');
    // console.log(this.subjectId);
    // this.getPaper();
    this.route.params.subscribe((params: Params) => {
      this.subjectId = params['id'];
      this.getPaper();
    });
    this.route.queryParams.subscribe((params: Params) => {
      this.subjectName = params['subjectName'];
    });
    this.filter_examType = -1;
    this.filter_paperType = '-1';
    this.filter_semType = -1;
    this.filter_yearType = -1;
  }
  getPaper() {
    this.http.get(this.url + 'api/get_list_?subject_id=' + this.subjectId).subscribe(res => {
      this.paper = res;
      this.checkNoOfFilterPapers();
    });
  }
  subjectList() {
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

  search() {
    this.paperSelected = this.getSelectedPaperbyName(this.subject);
    if (this.paperSelected) {
      this.router.navigate(['search_result', this.paperSelected.id], { queryParams: { subjectName: this.paperSelected.subjectName } });
    } else {
      document.getElementById('modal').click();
    }
  }
  onPaperTypeChange(event) {
    this.filter_paperType = event;
    this.checkNoOfFilterPapers();
  }
  onExamTypeChange(event) {
    this.filter_examType = +event;
    this.checkNoOfFilterPapers();
  }
  onSemTypeChange(event) {
    this.filter_semType = +event;
    this.checkNoOfFilterPapers();
  }
  onYearTypeChange(event) {
    this.filter_yearType = +event;
    this.checkNoOfFilterPapers();
  }

  checkNoOfFilterPapers() {
    this.filteredPapers = [];
    this.nopapers = true;
    this.paper.forEach(p => {
      if ((this.filter_paperType === '-1' || p.paperType === this.filter_paperType)
      && (this.filter_examType === -1 || p.examTypeId === this.filter_examType)
      && (this.filter_semType === -1 || p.semesterType === this.filter_semType)
      && (this.filter_yearType === -1 || p.sessionId === this.filter_yearType)) {
        this.filteredPapers.push(p);
        this.nopapers = false;
      }
    });
  }
  searchFunction() {
    // const input = document.getElementById('search');
    const filter = this.subject.toUpperCase();
    const div = document.getElementById('subjects');
    div.style.display = 'block';
    const li = div.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
      const txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
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

  onSelectPaper(selectedPaper: String) {
    this.subject = selectedPaper;
  }
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
