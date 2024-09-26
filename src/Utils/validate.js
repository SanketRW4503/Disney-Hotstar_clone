

export const validatedataLogin= (email,password,signIn,name)=>{



    if(signIn && name==="") return "Enter Your Name";

    if(email==="") return "Enter Email Id";

    if(password==="") return "Enter Password";

    const isEmailvalid=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    const isPassWordValid= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password);

    if(isEmailvalid===false) return "Email is not valid";
    if(isPassWordValid===false) return "Password is not valid";
    
    return null;

}