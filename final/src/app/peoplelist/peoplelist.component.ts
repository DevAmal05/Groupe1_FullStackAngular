import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FirebaseOperation } from '@angular/fire/compat/database/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-peoplelist',
  templateUrl: './peoplelist.component.html',
  styleUrls: ['./peoplelist.component.css']
})
export class PeoplelistComponent implements OnInit {


   
  id:any
  errorMessage:string ='';
  errorMessage1:string =''; 
  Cin:string 
  Firstname:string
  Lastname:string
  Phone:string
  userforupdate: AngularFireList<any>
  data = {
    Cin: '',
    Firstname : '' ,

    Lastname :  '' ,
    Phone :  ''  
   } 
    id1: any;

userfordelete : AngularFireList<any>; 
listuser: User[] = [];
userList: AngularFireList<any>
 
  constructor(private router:Router, public dialog: MatDialog,
    private firebase: AngularFireDatabase,  private userService: UserService,
    private route: ActivatedRoute , 
      private db:AngularFireDatabase ) {

        this.userList = db.list('Users');

        this.userfordelete = this.firebase.list('Users');
      this.route.params.subscribe( params => {
        this.id = params
      });
      this.userforupdate = this.firebase.list('Users');
      this.id1 = this.route.snapshot.paramMap.get('id');
      console.log(this.id1)
       }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((results) => {
      
      this.listUser(results)
   
    })
  }

  
  listUser(entries: any[]){
    this.listuser = [];
    entries.forEach(element => {
     let y = element.payload.toJSON()
     y["$key"] = element.key
     this.listuser.push(y as User);
  })
  console.log(this.listuser);
  }

  openDialog(key: FirebaseOperation): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "voulez-vous vraiment supprimer ces données?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      
        this.userfordelete.remove(key);
      
     
      }
    });   
  } 

  
  
  edit(key: string){
    
    this.router.navigate(['updateuser/'+key])
  
  }
  
  

}
