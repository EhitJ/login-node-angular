import { Action ,api} from "actionhero";

// Connect to the db

abstract class AuthenticationAction extends Action {
  authenticated: boolean;
}

export class MyAction extends AuthenticationAction {

  constructor() {
    super();
    this.name = "user";
    this.description = "an actionhero action";
    this.outputExample = {};
    this.authenticated = true;
  }

  async run(data) {
    //return data.response.ok = 'GREAT';
  
      //console.log(data.connection._jwtTokenData);
      api.ehitjInit.generateToken({id: 'DWP0001', email: 'test@example.com'}).then(tokenData => { return data.response.ok = tokenData});

   
  }
}
