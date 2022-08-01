import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  addUserForm: FormGroup;

  errorMessage1:string ='';
  errorMessage:string ='';

 
  Cin:string
  Firstname:string
  Lastname:string
  Phone:string

  userList: AngularFireList<any> 
  constructor(private userService : UserService, public router:Router,
    private db:AngularFireDatabase) { 
      
      this.userList = db.list('Users')
    }

  ngOnInit(): void {
    this.addUserForm=new FormGroup({
      CIn: new FormControl('',[
        Validators.required,
      Validators.pattern("[0-9]+"),
        Validators.minLength(8)
      ]),
      fIrstname: new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z ]+"),
        Validators.minLength(3)
      ]),
      lAstname: new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z ]+"),
        Validators.minLength(3)
      ]),
      pHone: new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8),
        Validators.maxLength(13)
      ])
    
    });
  
  }
  onSubmit(){
    let create = 'false';
    
    this.userList.push({
  
    Cin: this.Cin ,
    Firstname: this.Firstname ,
    Lastname: this.Lastname ,
    Phone: this.Phone,
  
      }).then(added =>{
        this.router.navigate(['/peoplelist'])
      
      
     

}).catch(error=>{
console.error(error)
this.errorMessage1= error.messaage
console.log('error', error)
console.log(error.message)

})
  }

}
