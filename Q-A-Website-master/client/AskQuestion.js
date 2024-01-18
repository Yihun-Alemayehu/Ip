const question = document.querySelector('#title');
const questionDescription = document.querySelector('#question_desc');
const submit = document.querySelector(".question_post_btn");


submit.addEventListener('click', async (event) => {
    event.preventDefault();
    const form = {
        question : question.value,
        questionDescription : questionDescription.value,
        id : localStorage.getItem('userId')
    }
    console.log(form)
     
    try {
        const url = "http://localhost:4000/api/question/";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
        }
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            window.location.href = '/Home.html'; 
        } else {
            alert(data.msg);
        }

    } catch (err){
        console.log(err)
    }


})
const logoutButton = document.querySelector("#isLogged")
logoutButton.addEventListener('click', async (event) => {
  event.preventDefault();
  console.log("am clicked")
  localStorage.setItem('token', "");
  localStorage.setItem('userId', "");
  localStorage.setItem('userName', "");
  window.location.href = '/Login.html';
})
