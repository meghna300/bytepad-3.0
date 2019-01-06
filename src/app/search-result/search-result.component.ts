import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PaperUrl } from '../paper-url';
import { TestPaper } from '../test-paper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  url: String = environment.url;
  paperSelected: TestPaper;
  testPapers: TestPaper[];
  subjectId: String;
  subjectName: String;
  paperUrl: String;
  paper: any;
  paperDetail: {};
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
  ngOnInit() {
    this.subjectList();
    this.subjectId = this.route.snapshot.paramMap.get('id');
    this.subjectName = this.route.snapshot.paramMap.get('name');
    this.route.params.subscribe((params: Params) => {
      this.subjectId = params['id'];
      this.subjectName = params['name'];
      this.getPaper();
    });
    this.getPaper();

  }

  getPaper() {
    // this.subjectId = this.route.snapshot.paramMap.get('id');
     this.http.get(this.url + 'api/get_list_?subject_id=' + this.subjectId).subscribe(res => {
       this.paper = res;
       console.log(this.paper);
       this.paperUrl = this.paper.paperType;
       console.log(this.paperUrl);
     });

  }

  subjectList() {
    this.http.get<TestPaper[]>(this.url + 'api/subject_detail').subscribe(res => {
      this.testPapers = res;
      console.log(this.testPapers);
    });
  }

  onPaperChange(subjectName: String) {
    this.paperSelected = this.getSelectedPaperbyName(subjectName);
  }

  getSelectedPaperbyName(selectedName: String): TestPaper {
    return this.testPapers.find(testPaper => testPaper.subjectName === selectedName);
  }

  search() {
    this.router.navigate(['search_result', this.paperSelected.id, this.paperSelected.subjectName]);
  }

}
