import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { LoginComponent } from './login/login.component';
import { PeoplelistComponent } from './peoplelist/peoplelist.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'peoplelist',component:PeoplelistComponent},
  {path:'resetpassword',component:ResetpasswordComponent},
  {path:'adduser',component:AdduserComponent},
  {path:'updateuser/:id',component:UpdateuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
