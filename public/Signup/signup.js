function signup(e) {
    e.preventDefault();
    console.log(e.target.name);
    const form = new FormData(e.target);

    const signupDetails = {
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password")

    }
    console.log(signupDetails)
    axios.post('http://13.234.213.249:3000/user/signup',signupDetails).then(response=>{
        if(response.status===201){
            window.location.href = "../login/login.html" // chnage the page on successfull login
        }else{
            throw new Error('failed to login')
        }
    }).catch(err=>{
        document.body.innerHTML += `<div style="color: red;">${err} <div>`;
    })
    
}