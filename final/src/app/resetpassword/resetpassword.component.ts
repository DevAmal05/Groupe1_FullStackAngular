import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  errorMessage: any;
email:string

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  resetpassword(email:string)
  {
this.authservice.resetPassword(email).then(
  ()=>{
    this.router.navigate(['/'])
  },
  (error) =>{
    this.errorMessage=error
  }
)
  }

}
