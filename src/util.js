export const validation=(email,setError)=>{
    let valid=true;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)){
            setError("")
        }
        else{
            setError("Enter email in correct format")
            valid=false
        }
    return valid;   
    }    


export const signupValidation=(userInput,setError)=>{
    let valid=true;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(userInput.firstName.trim()){
        setError(prev=>({...prev,firstNameError:""}))
    } 
    else{
        setError(prev=>({...prev,firstNameError:"firstName is Required"}))
        valid=false
    }
    if(userInput.lastName.trim()){
        setError(prev=>({...prev,lastNameError:""}))
    } 
    else{
        setError(prev=>({...prev,lastNameError:"lastName is Required"}))
        valid=false
    }
    if(userInput.email.trim()){
        if(re.test(userInput.email)){
            setError(prev=>({...prev,emailError:""}))
        }
        else{
            setError(prev=>({...prev,emailError:"Enter email in correct format"}))
            valid=false
        }
    }
    else{
        setError(prev=>({...prev,emailError:"email is Required"}))
            valid=false
    }
    if(userInput.password.trim()){
        setError(prev=>({...prev,passwordError:""}))
    } 
    else{
        setError(prev=>({...prev,passwordError:"firstName is Required"}))
        valid=false
    }
    if(userInput.confirmPassword.trim()){
        if(userInput.confirmPassword===userInput.password){
            setError(prev=>({...prev,confirmPasswordError:""}))
        }else{
            setError(prev=>({...prev,confirmPasswordError:"password doesn't match"}))
        }
        
    } 
    else{
        setError(prev=>({...prev,confirmPasswordError:"firstName is Required"}))
        valid=false
    }
    
    return valid;
}