import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList:AngularFireList<any> 

  constructor(private db:AngularFireDatabase) { 

    this.userList=db.list('Users');
  }

  createUser(user:User){

    this.userList.push({
      Cin:user.Cin,
      Firstname:user.Firstname,
      Lastname:user.Lastname,
      Phone:user.Phone

    }).catch(error =>{
      console.error(error)
    })

  }
  getUsers(): Observable<any>{
    return this.db.list('Users').snapshotChanges();
  }
  
  getUserById(id:any) : Observable<any>{
    return this.db.list('users', ref => ref.orderByKey().equalTo(id)).snapshotChanges();
  }}

