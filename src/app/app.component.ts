import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataTableBodyComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles: [`
    h3 {
      color: dodgerblue;
    }
  `]
})
export class AppComponent {
  
  previousNameFilter:String='';
  previousGenderFilter:String=''
  temp=[];
  filterByName(event)
  {
    const filter = event.target.value;
    this.previousNameFilter = filter;
    this.temp = this.filterRows(filter, this.previousGenderFilter);
    console.log("BYName",this.temp);
    this.rows=this.temp;

  }

  filterByGender(event)
  {
    const filter = event.target.value;
    this.previousGenderFilter = filter;
    this.temp = this.filterRows(this.previousNameFilter,filter );
    console.log("By gender",this.temp);
    this.rows=this.temp;
  }

  filterRows(nameFilter, genderFilter):any
  {
    console.log("nameFilter, genderFilter",nameFilter, genderFilter);
    
    nameFilter = nameFilter.toLowerCase();
    genderFilter = genderFilter.toLowerCase();
    return this.originalRows.filter(row => {
      const isPartialNameMatch = row.name.toLowerCase().indexOf(nameFilter) !== -1 || !nameFilter;
      console.log("isPartialNameMatch",isPartialNameMatch);
      const isPartialGenderMatch = row.gender.toLowerCase().indexOf(genderFilter) !== -1 || !genderFilter;
      console.log("isPartialGenderMatch",isPartialGenderMatch);
      return isPartialNameMatch && isPartialGenderMatch
    });
  }
  rows = [];
  joke = 'knock knock';
  selected = [];
  originalRows = []
  fiteredRows = []
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
  showFilter:boolean = true;
  constructor() {
    this.fetch((data) => {
      this.rows = data.splice(0, 20);
      this.originalRows = [...this.rows];
    });
  }

  

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onRowsSelect({selected}){
    console.log(selected);
  }

  showAll()
  {
    this.rows = this.originalRows;
    this.showFilter = true;
  }
  showSelected()
  {
    
    this.rows= this.selected;
    console.log("slected are",this.rows);
    this.showFilter = false;
  }

}
