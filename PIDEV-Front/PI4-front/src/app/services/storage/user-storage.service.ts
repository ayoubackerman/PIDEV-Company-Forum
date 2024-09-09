import { Injectable } from '@angular/core';

const TOKEN = "ecomm-user"
const USER = "ecom-user"
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor( ) { }

  public saveToken (token : string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }
  public saveUser (user : any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }
  
  static getToken():string{
    return localStorage.getItem(TOKEN) || "";
  }
  static getUser():any{
    return JSON.parse(localStorage.getItem(USER) || '{}');
  }
  
  
  static getUserId():string{
    const user = this.getUser();
    if(user==null){
      return '';

    }else{
      return user.userId;
    }
  }
  static getUserRole():string{
    const user = this.getUser();
    if(user==null){
      return '';

    }else{
      return user.role;
    }
  }
  static isAdminLogged():boolean{
    if(this.getToken===null){
      return false;

    }
    const Role:string = this.getUserRole();
    return Role == 'ADMIN'
  
    }
    static isCustumerLogged():boolean{
      if(this.getToken===null){
        return false;
  
      }
      const Role:string = this.getUserRole();
      return Role == 'CUSTUMER'
    
      }
      static signOut():void {
        window.localStorage.removeItem(TOKEN);
        window.localStorage.removeItem(USER);

      }


      static HasToken() : boolean {
        if(this.getToken()===null){
          return false ;
        }
        return true ;
      }

       static IsUserLoggedIn():boolean{
        if(this.getToken()===null) return false ;
        const role: string= this.getUserRole();
        return role=="USER";
      }
}
