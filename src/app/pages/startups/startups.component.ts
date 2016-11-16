import {Component, ViewEncapsulation} from '@angular/core';

import { StartupsService } from './startups.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'startups',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./startups.scss')],
  template: require('./startups.html'),
  providers: [StartupsService]
})
export class StartupsComponent {

  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      companyname: {
        title: 'Company Name',
        type: 'string'
      },
      stage: {
        title: 'Stage',
        type: 'string'
      },
      industries: {
        title: 'Indistries',
        type: 'string'
      },
      hqCity: {
        title: 'HQ City',
        type: 'string'
      },
      hqState: {
        title: 'HQ State',
        type: 'string'
      },
      founded: {
        title: 'Founded',
        type: 'string'
      },
      application: {
        title: 'Industry Application',
        type: 'string'
      },
      tags: {
        title: 'Tags',
        type: 'string'
      },
      program: {
        title: 'Program',
        type: 'string'
      },
      batch: {
        title: 'Batch',
        type: 'string'
      },
      investors: {
        title: 'Active Investors',
        type: 'string'
      }
      
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: StartupsService) {
    this.service.getData().then((data) => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSearch(query: string = ''): void {
    var arr : string[] = query.split(" ");
    
  //for (let entry of arr) {
  
    this.source.setFilter([
    // fields we want to include in the search
    {
      field: 'companyname',
      search: query
    },
    {
      field: 'stage',
      search: query
    },
    {
      field: 'industries',
      search: query
    },
    {
      field: 'hqCity',
      search: query
    },
    {
      field: 'hqState',
      search: query
    },
    {
      field: 'founded',
      search: query
    },
    {
      field: 'tags',
      search: query
    },
    {
      field: 'program',
      search: query
    },
    {
      field: 'batch',
      search: query
    },
    {
      field: 'investors',
      search: query
    }
    
  ], false);
  //} 
  // second parameter specifying whether to perform 'AND' or 'OR' search 
  // (meaning all columns should contain search query or at least one)
  // 'AND' by default, so changing to 'OR' by setting false here
  }
}
       /*columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      firstName: {
        title: 'First Name',
        type: 'string'
      },
      lastName: {
        title: 'Last Name',
        type: 'string'
      },
      username: {
        title: 'Username',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      },
      age: {
        title: 'Age',
        type: 'number'
      }
    }*/

    /*{
      field: 'id',
      search: query
    },
    {
      field: 'firstName',
      search: query
    },
    {
      field: 'lastName',
      search: query
    },
    {
      field: 'username',
      search: query
    },
    {
      field: 'email',
      search: query
    }*/