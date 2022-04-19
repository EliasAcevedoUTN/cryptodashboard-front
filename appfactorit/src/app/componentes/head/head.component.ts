import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  @Input() usuario : any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cerraSesion(){
    this.router.navigate(['/']);
  }

}
