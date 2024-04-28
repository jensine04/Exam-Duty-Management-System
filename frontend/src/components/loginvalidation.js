function Validation(username,password){
    let error ={}
    if (username===""){
        error.username="Username should not be empty"
        console.log(error.username)
    }
    else{
        error.username=""
    }
    if (password===""){
        error.password="Password should not be empty"
    }
    else{
        error.password=""
    }
    return error;

}
export default Validation;