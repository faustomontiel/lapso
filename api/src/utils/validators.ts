
export function validateRegisterInput(username: any, email: any,password: any,confirmPassword: any) {
    //const user = await User.findById(req.user.id).select('-password');
    var valid = true;
    var errors = {
        usernameErr: "",emailErr:"",passwordErr:"",confirmPasswordErr: ""
    }
    if(username.trim() === '') {
        errors.usernameErr = 'Username must not be empty';
        valid = false;
    }
    if(email.trim() === '') {
        errors.emailErr = 'Email must not be empty';
        valid = false;
    }else{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.emailErr = 'Email must be a valid email adress'
            valid = false;
        }    
    }
    if(password === '') {
        errors.passwordErr = 'Password must not be empty';
        valid = false;
    }else if(password != confirmPassword){
            errors.confirmPasswordErr = 'Password must match'
            valid = false;
    }  

    return{
        errors,
        valid
    }
    

  }

  export function validateLoginInput (username :string, password :string)  {
    var valid = true;
    var errors = {
        usernameErr: "",passwordErr:"",generals:""
    }

    if (username.trim() === '') {
      errors.usernameErr = 'Username must not be empty';
      valid = false;
    }
    if (password.trim() === '') {
      errors.passwordErr = 'Password must not be empty';
      valid = false;
    }
  
    return {
        errors,
        valid
    };
  };