const questions = document.querySelector('.questions');
const userName = document.querySelector('.user__name');
const title = document.querySelector('.question__title');
const search = document.querySelector('.searchInput');


function checkUser(){
    if(!localStorage.getItem('token')){
      window.location.href = '/Login.html';
    }
  }
checkUser();

function updateUserName(){
const user = document.querySelector('#user');
const userName = localStorage.getItem('userName');
// console.log(userName);
user.innerHTML = userName;
}
updateUserName();


const logoutButton = document.querySelector("#isLogged")
logoutButton.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("am clicked")
    localStorage.setItem('token', "");
    localStorage.setItem('userId', "");
    localStorage.setItem('userName', "");
    window.location.href = '/Login.html';
})

let res;
let data;
try{
    const url = "http://localhost:4000/api/question/";
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify()
    }

    res = await fetch(url,options)
    data = await res.json()
    const allQuestions = data.data;
    console.log(data.data)
    allQuestions.map((question, index) => {
        search.addEventListener('input', () => {
            // console.log (search.value);
            if(question.question == search.value){
                console.log(question.question);
            }
        })
        console.log(index, question.question)

    })

    

    // Map the array to HTML elements
    const htmlElements = allQuestions.map(item => {
        // Create elements
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question__div');
  
        const hrElement = document.createElement('hr');
        hrElement.classList.add('question_hr');
  
        const anchorElement = document.createElement('a');
        anchorElement.classList.add('question__box');
        anchorElement.href = item.question_id;
  
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
  
        const userQuestionElement = document.createElement('span');
        userQuestionElement.classList.add('user_question');
  
        const avatarElement = document.createElement('img');
        avatarElement.classList.add('avatar');
        avatarElement.src = '/Images/avatar.png'; // Set your avatar image path
        avatarElement.alt = 'avatar';
  
        const userNameElement = document.createElement('p');
        userNameElement.classList.add('user__name');
        userNameElement.textContent = item.user_name;
  
        const titleElement = document.createElement('p');
        titleElement.classList.add('question__title');
        titleElement.textContent = item.question;
  
        const leadingIconElement = document.createElement('p');
        leadingIconElement.classList.add('leading__icon');
        leadingIconElement.textContent = '>';
  
        // Construct the elements hierarchy
        userQuestionElement.appendChild(avatarElement);
        userQuestionElement.appendChild(userNameElement);
  
        questionElement.appendChild(userQuestionElement);
        questionElement.appendChild(titleElement);
        questionElement.appendChild(leadingIconElement);
  
        anchorElement.appendChild(questionElement);
  
        questionDiv.appendChild(hrElement);
        questionDiv.appendChild(anchorElement);
  
        return questionDiv;
      });
  
    // Append the elements to the container
    htmlElements.forEach(element => {
        questions.appendChild(element);
        const questionPage = element.querySelector('.question__box');
        questionPage.addEventListener("click", async (event) => {

        event.preventDefault();
        const url = questionPage.href;
        // console.log(url)
        const question_id = url.substring(url.lastIndexOf('/') + 1);
        console.log(question_id);
        
        localStorage.setItem("question_id", question_id);
        window.location.href = "/Answer.html";
    })});   

}catch(err){
    console.log(err)
}

