import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPages: number;
  @Input() itemsPerPage: number;
  @Output() changePage = new EventEmitter<number>();
  maxPages: number = 5;
  pages: number[] = new Array<number>();

  ngOnInit(): void {
    let limitBottom = (this.currentPage - Math.round((this.maxPages / 2)-1)) > 1 ?
      this.currentPage - Math.round(this.maxPages / 2) :
      1;
    let limitTop = this.totalPages;
    for (let i = limitBottom; i <= limitTop; i++) {
      this.pages.push(i);
    }
  }

  onChangePage(pageNumber: number) {
    if (pageNumber != 0 && pageNumber <= this.totalPages)
      this.changePage.emit(pageNumber);
  }

}
