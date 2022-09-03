function forgotpassword(e){
    e.preventDefault();
    console.log(e.target.name);
    const form  =  new FormData(e.target);

    const userDetails ={
        email: form.get("email")
    }
    console.log(userDetails)
    axios.post('http://13.234.213.249:3000/password/forgotpassword',userDetails).then(response=>{
        if(response.status===201){
            document.body.innerHTML +='<div style="color:red;">Mail Successfully sent<div>'
        }else{
            throw new Error('Something Went Wrong!!!')
        }

    }).catch(err=>{
        document.body.innerHTML+=`<div style="color:red;">${err}<div>`;
    })
}