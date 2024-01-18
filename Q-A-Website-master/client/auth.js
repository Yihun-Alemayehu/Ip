const submit = document.querySelector('.btnSign');
const auth = document.querySelector('.auth');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const showHide = document.querySelector('.showHide');


let form;

const Auth =  async (form) => {
   
    console.log(form)
    // alert("hfdhgv")

    try {
        const response = await fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(form),
        });
        
        const data = await response.json();
        console.log(data)
        console.log(data);
        
        if (response.ok) {
            // Authentication successful
            const { token, user } = data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userName', user.display_name);

            // You can redirect to another page or update the UI as needed
            window.location.href = '/Home.html'; // Update with your actual redirect path
        } else {
            alert(data.msg);
            // let div = document.createElement('div')
            // let p = document.createElement('p')
            // p.innerHTML = data.msg;
            // div.className = 'alert'
            // div.appendChild(p)
            // auth.appendChild(div)
            // setTimeout(()=>{
            //     div.remove()
            // },2000)
            // console.error(data.msg);
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Handle other errors (network, server, etc.) in your UI
    }
};

submit.addEventListener('click',async(event)=>{  
     event.preventDefault();
    form = {
        email: email.value,
        password: password.value
    }
    await Auth(form)
})

showHide.addEventListener('click', async () => {
    password.type = password.type == 'text' ? 'password' : 'text';
    showHide.innerHTML = password.type == 'text' ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
})
