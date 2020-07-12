import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { EmailValidator } from '@angular/forms';
import 'rxjs/Rx';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //properties
  user: User ={
    firstName:'',
    lastName:'',
    email:''
  }
  users: User[];
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd:boolean=false;
  showUserForm: boolean=true;
  @ViewChild('userForm')form:any;
  data:any;
  constructor(private dataService:UserService) { }

  ngOnInit() {   
    
    this.dataService.getData().subscribe(data => {
      console.log(data);
    });
    this.dataService.getUsers().subscribe(users=>{
      this.users = users;
      this.loaded = true;
    });
    

    
    // this.showExtended = false;
  

  }
  // addUser() {

  //   this.user.isActive = true;
  //   this.user.registered = new Date();
  //   this.users.unshift(this.user);
  //   // clear 之前的所有填入form中的信息
  //   this.user = {
  //     firstName:'',
  //     lastName:'',
  //     // age:null,
  //     // address:{
  //     //   street:'',
  //     //   city:'',
  //     //   state:''
  //     // },
  //    email:''
  //   }
  // }

  toggleHide(user:User){
    user.hide = !user.hide;
    console.log(user.hide);
  }

  onSubmit({value,valid}:{value:User, valid:boolean}){
    if(!valid){
      console.log('Form is not valid');
    }else{
      value.isActive=true;
      value.registered = new Date();
      value.hide = true;
      this.dataService.addUser(value);
      this.form.reset();

    }
  }
 



}
