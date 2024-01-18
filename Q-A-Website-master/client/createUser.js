const auth = document.querySelector('.auth');
const submit = document.querySelector('.btnSign');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const userName = document.querySelector('#userName')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const showHide = document.querySelector('.showHide');



let form = {}

const Auth = async (form) => {
    let res = null;
    let data;
    try{
        const url = "http://localhost:4000/api/users/";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }

        res = await fetch(url,options)
        data = await res.json()
        console.log(data)
        // console.log(data.msg)
        

    }catch(err){
        console.log(err)
    }
    
    console.log(res.ok)
    if (res.ok) {
        const { token, user } = data;
        localStorage.setItem('token', token);
        // localStorage.setItem('userId', user.id);

        window.location.href = '/Home.html';
    } else {
        let div = document.createElement('div')
        let p = document.createElement('p')
        p.innerHTML = data.message
        div.className = 'alert'
        div.appendChild(p)
        auth.appendChild(div)
        setTimeout(()=>{
            div.remove()
        },2000)
        console.error(data.msg);
    }
    
    // if(data.status === 200){
    //     localStorage.setItem('user', data.user._id)
    //     window.location.href = '/Home.html'
    // }else{
    //     let div = document.createElement('div')
    //     let p = document.createElement('p')
    //     p.innerHTML = data.message
    //     div.className = 'alert'
    //     div.appendChild(p)
    //     auth.appendChild(div)
    //     setTimeout(()=>{
    //         div.remove()
    //     },2000)
    // }
}
submit.addEventListener('click',async(event)=>{  
    event.preventDefault();
    form = {
        firstName: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        email: email.value,
        password: password.value
    }
    await Auth(form)
})
showHide.addEventListener('click', async () => {
    password.type = password.type == 'text' ? 'password' : 'text';
    showHide.innerHTML = password.type == 'text' ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
})