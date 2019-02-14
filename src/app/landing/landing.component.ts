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
    config.duration = 1000;
  }

  ngOnInit() {

  }
  search_paper () {
       this.router.navigate(['search_result']);

  }

  }




