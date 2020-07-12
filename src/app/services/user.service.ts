import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';
import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:User[];
  data:Observable<any>;
  constructor() { 
    this.users = [
      {
        firstName: 'Henry',
        lastName: 'Hu',
        email:'Henryhu@gamil.com',
        isActive:true,
        registered:new Date('01/02/2019 08:30:00'),
        hide: true
      },
      {
        firstName: 'Sherry',
        lastName: 'Li',
        email:'SherryLi@gmail.com',
        isActive:false,
        registered:new Date('01/12/2017 09:40:00'),
        hide:true
      },
      {
        firstName: 'David',
        lastName: 'Jones',
        isActive:true,
        email:'DavidJones@gmail.com',
        registered:new Date('01/22/2008 11:30:00'),
        hide:true
      }
    ];    
  }
  getData(): Observable<any> {
    this.data = new Observable(observer=> {
      setTimeout(()=>{
        observer.next(1);
      },1000);
      setTimeout(()=>{
        observer.next(2);
      },2000);
      setTimeout(()=>{
        observer.next(3);
      },3000);
      setTimeout(()=>{
        observer.next(4);
      },4000);
    })

    return this.data
  }


  getUsers(): Observable<User[]>{
    console.log('Fetching users from services....')
    return of(this.users);
  }
  addUser(user:User){
    this.users.unshift(user);
  }
}
