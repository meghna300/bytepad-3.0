import { Component, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { PaperUrl } from '../paper-url';
import { TestPaper } from '../test-paper';
import { Router } from '@angular/router';
import { SubjectDetails } from '../test-paper';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {
    return items.filter(item => {
      const notMatchingField = Object.keys(filter)
        .find(key => item[key] !== filter[key]);

      return !notMatchingField; // true if matches all fields
    });
  }
}

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
  filter_paper: any;
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
       for ( this.i = 0; this.i < this.paper.length; this.i++) {
       this.fileUrl = this.paper[this.i].fileUrl;
       this.paperUrl = this.url + '/Papers/' + this.fileUrl;
       this.examTypeId = this.paper[this.i].examTypeId;
       this.sessionId = this.paper[this.i].sessionId;
       this.semesterType = this.paper[this.i].semesterType;
       this.paperType = this.paper[this.i].paperType;
       }
       switch (this.examTypeId) {
         case 1: {
           this.examType = 'ST-1';
           break;
         }
         case 2: {
           this.examType = 'ST-2';
           break;
         }
         case 3: {
           this.examType = 'PUT';
           break;
         }
         case 4: {
           this.examType = 'UT';
         }
       }

       switch (this.sessionId) {
         case 1: {
           this.session = '2014-2015';
           break;
         }
         case 2: {
           this.session = '2015-2016';
           break;
         }
         case 3: {
           this.session = '2016-2017';
           break;
         }
         case 4: {
           this.session = '2017-2018';
           break;
         }
         case 5: {
           this.session = '2018-2019';
         }
       }

       switch (this.semesterType) {
         case 1: {
           this.semester = 'even';
           break;
         }
         case 2: {
           this.semester = 'odd';
         }
       }
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
    if (this.paperSelected) {
      this.router.navigate(['search_result', this.paperSelected.id, this.paperSelected.subjectName]);
    } else {
      document.getElementById('modal').click();
    }
  }
  onPaperTypeChange(event) {
    this.filter_paperType = event;
    this.update_filter_paper();
  }
  onExamTypeChange(event) {
    this.filter_examType = event;
    this.update_filter_paper();
  }
  onSemTypeChange(event) {
    this.filter_semType = event;
    this.update_filter_paper();
  }
  onYearTypeChange(event) {
    this.filter_yearType = event;
    this.update_filter_paper();
  }
  update_filter_paper() {
    this.filter_paper = {
      paperType: this.filter_paperType,
      examTypeId: this.filter_examType,
      semesterType: this.filter_semType,
      sessionId: this.filter_yearType
    };
  }

}
