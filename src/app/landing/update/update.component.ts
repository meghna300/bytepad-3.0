import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  search_paper() {
    this.router.navigate(['search_result']);

  }
}
