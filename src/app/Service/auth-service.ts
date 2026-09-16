import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  isAuthenticated(): boolean{
    return !! localStorage.getItem('authToken')
  }
  login(email:string, password:string): boolean{
    if(email==='test@gmail.com' && password==='123456'){
    localStorage.setItem('authToken', 'logged-in')
    return true
    }
    return false
  }
  logout(): void{
    localStorage.removeItem('authToken')
  }
}
