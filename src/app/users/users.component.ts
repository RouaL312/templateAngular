import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
interface User {
  cust_id?: string;
  join_date: string;
  customer_name: string;
  location: string;
  total_spent: string;
  last_order: string;
  isSelected: boolean;
}


const USERS: User[] = [];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  checkedUserList:any;

  isMasterSel:boolean;
  checkSingleItem:boolean=true;

  constructor(private modalService: NgbModal) {

    this.isMasterSel = false;

    this.updateCustomerListing();

    this.getCheckedItemList();
  }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalService.open(content);
  }


  page = 1;
  pageSize = 10;
  collectionSize = USERS.length;
  users!: User[];

  updateCustomerListing() {
    this.users = USERS
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  /* Check Uncheck all checkbox on main check box click*/

  checkUncheckAll() {
    for (var i = 0; i < this.users.length; i++) {
      this.users[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.users.every(function(item:any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedUserList = [];

    for (var i = 0; i < this.users.length; i++) {
      if(this.users[i].isSelected)
        this.checkedUserList.push(this.users[i]);
      else
        this.checkSingleItem = false
    }

    if(this.checkSingleItem) {
      this.isMasterSel = true;
    }
    this.checkedUserList = JSON.stringify(this.checkedUserList);
  }

}
