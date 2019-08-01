export async function Login(email,password){
     let result =  await fetch(process.env.REACT_APP_API_URL+"auth/login",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    return result;
}