import { Action ,api} from "actionhero";
var MongoClient = require('mongodb').MongoClient;
const { base64encode, base64decode } = require('nodejs-base64');
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
    this.authenticated = false;

    this.inputs = {
      email: {
        required: true,
        validator: this.emailValidator,
      },
      password: {
        required: true,
        validator: this.passwordValidator,
      },
    };
  }

  emailValidator(param) {
    if (param.indexOf("@") < 0) {
      throw new Error("that is not a valid email address");
    }
  }

  passwordValidator(param) {
    if (param.length <= 4) {
      throw new Error("password should be at least 4 letters long");
    }
  }

  async  run(data) {
   // await sleep(500);
 //return data.response.ok = 'GREAT';
      let email=data.connection.params.email;
      let password=data.connection.params.password;
    data.response.ok= MongoClient.connect("mongodb://root:rootpassword@localhost:27017/admin", function (err, client) {
   
      if(err) throw err;  
        
        var db = client.db('admin');
       // console.log(db);
         db.collection('user',  function (err, collection) {
             collection.find(
          { email: email }).toArray(function(err, items) {
            if(err) throw err;   

              if(base64decode(items[0].password) == password){
              //console.log('hhhhhhhhhhhhh');
                return true;
              }else{
               console.log(items[0].password);
                return false;
              }
             
             });           
          });
     
        
    });
             
     
      //console.log(data.connection._jwtTokenData);
     // api.ehitjInit.generateToken({id: 'DWP0001', email: 'test@example.com'}).then(tokenData => { 

   
  }
}
