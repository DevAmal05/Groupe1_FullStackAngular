import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

   
id:any
errorMessage:string ='';
formGroup: FormGroup;
errorMessage1:string ='';

Cin:string 
Firstname:string
Lastname:string
Phone:string
userdetails:any= []

userforupdate: AngularFireList<any>

data = {
  Cin: '',
  Firstname : '' ,

  Lastname :  '' ,
  Phone :  ''  
 } 
  id1: any;
  constructor(private router:Router,private firebase: AngularFireDatabase,
    private route: ActivatedRoute, private userService: UserService) { 
    this.route.params.subscribe( params => {
      this.id = params
    });
    this.userforupdate = this.firebase.list('Users');
    
    this.id1 = this.route.snapshot.paramMap.get('id');
    console.log(this.id1)
  }

  ngOnInit(): void {
    this.formGroup=new FormGroup({
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
    this.userService.getUserById(this.id1).subscribe((results) => {
      
      this.getuser(results)
    
    })

  }

  getuser(entries: any[]){
   
    this.userdetails = [];
  
    entries.forEach(element => {
       
       
      let y = element.payload.toJSON()
      y["$key"] = element.key
      this.userdetails.push(y as User);

      this.data.Cin = this.userdetails[0]['Cin'] 
      this.data.Firstname = this.userdetails[0]['Firstname'] 
      this.data.Lastname = this.userdetails[0]['Lastname'] 
      this.data.Phone = this.userdetails[0]['Phone'] 
     
   })
   console.log("res");
   console.log(this.data.Lastname);
   console.log(this.userdetails);
   }

  onSubmit1() {
  
    let create = 'false';
    
     console.log(this.data.Cin);
     this.userforupdate.update(this.id1 , {
      Cin :  this.data.Cin ,
      Firstname : this.data.Firstname  ,
      Lastname :  this.data.Lastname ,
      Phone :  this.data.Phone
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
