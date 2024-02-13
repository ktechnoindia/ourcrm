import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss'],
})
export class SearchDropdownComponent  implements OnInit {
  @Input() value: string = '';
  @Input() size: string = '';
  constructor() { }

  ngOnInit() {}

}
