import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';



@Injectable()
export class AuthenticationService {
    public token: string;
    public  loggedIn: boolean;
    loggedIncount: number;
    private headers: HttpHeaders;

    private readonly apiUrl = environment.apiUrl;
    private readonly baseUrl = environment.baseUrl;
    private warningMessage: string;

    constructor(private http: HttpClient, private zone: NgZone, private router: Router) {
        //append headers
        this.loggedIncount=0;
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/x-www-form-urlencoded');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('user'));
        this.token = currentUser && currentUser.token;


    }


    
    getLoggedIncount(val: number){
        return this.loggedIncount ;
    }

    setLoggedIncount(val: number){

        this.loggedIncount = val;
    }


    isLogin(){
        if (localStorage.getItem("user") === null) {
            this.loggedIn = false;
        }else{
            this.loggedIn = true;
        }
        return  this.loggedIn;
    }

    login(email: string, password: string): Observable<any> {


        
        return this.http.post(this.apiUrl+'user', { email: email, password: password }, { headers: this.headers } )
            .pipe(
                map((response: Response) => {
                    // login successful if there's a jwt token in the response

                    //console.log(response['payload'].id);
                    this.token = response['success'];
                    let email = response['payload'].id;
                    if (this.token) {
                        // store email and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('user', 
                            JSON.stringify({ email: email, token: this.token }));
                    }
                    return response;
                })
            );
    }

    register(username: string, email: string, password: string, address: string, mobileno: string,): Observable<any> {
        return this.http.post(this.apiUrl+'register', { email: email, name: username, 
                password: password,mobileno:mobileno,address:address }, { headers: this.headers } )
            .pipe(
                map((response: Response) => {
                    // register successful if there's a jwt token in the response
                    this.token = response['token'];
                    let email = response['email'];
                    if (this.token) {
                        // store email and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('user', 
                            JSON.stringify({ email: email, token: this.token }));
                    }
                    return response;
                })
            );
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.loggedIn = false;
        localStorage.removeItem('user');
        //this.authService.signOut();
    }

   

}