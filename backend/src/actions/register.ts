import { Action } from "actionhero";
const { base64encode, base64decode } = require('nodejs-base64');
var MongoClient = require('mongodb').MongoClient;

abstract class AuthenticationAction extends Action {
  authenticated: boolean;
}
export class MyAction extends AuthenticationAction {
  constructor() {
    super();
    this.name = "register";
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

  
  async run(data) {
    // your logic here
    const datatemp=data.connection.params;
    //console.log(data);
    MongoClient.connect("mongodb://root:rootpassword@localhost:27017/admin", function (err, client) {
   
      if(err) throw err;  
        
        
        var db = client.db('admin');
          let encodedpass= base64encode(datatemp.password);
         db.collection('user1', function (err, collection) {
          //console.log('collection',collection);
          collection.insertOne({ name: datatemp.name, email: datatemp.email, password: encodedpass,address: datatemp.address,mobileno: datatemp.mobileno });
         collection.find().toArray(function(err, items) {
            if(err) throw err;    
            console.log(items);            
          });
        
    });
                
      });
    data.response.ok = true;
  }
}
