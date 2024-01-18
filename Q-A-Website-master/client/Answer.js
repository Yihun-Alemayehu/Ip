const title = document.querySelector('#q_title');
const questionDescription = document.querySelector('#q_description');
const questions = document.querySelector('.questions');

const answer = document.querySelector('#question_desc');
const submit = document.querySelector(".question_post_btn");

let res;
let data;

let question_id = localStorage.getItem('question_id');
console.log(question_id);
//question thing
try{
    const url = `http://localhost:4000/api/question/${question_id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    res = await fetch(url,options)
    data = await res.json()
    console.log(data.msg)

    title.innerHTML = data.msg[0].question;
    questionDescription.innerHTML = data.msg[0].question_description;
    
}catch(err) {
    if (err){
        console.log(err)
    }
}

//Comment (Answers)
try{
    const url = `http://localhost:4000/api/answer/${question_id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    res = await fetch(url,options)
    data = await res.json()
    console.log(data.msg[0].answer)
    const allAnswers = data.msg;
    console.log(allAnswers)

    // Map the array to HTML elements
const htmlElements = allAnswers.map(item => {
    // Create elements

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question__div');

    const hrElement = document.createElement('hr');
    hrElement.classList.add('question_hr');

    const anchorElement = document.createElement('a');
    anchorElement.classList.add('question__box');
    anchorElement.href = "#";

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
    titleElement.textContent = item.answer;

    // const leadingIconElement = document.createElement('p');
    // leadingIconElement.classList.add('leading__icon');
    // leadingIconElement.textContent = '>';

    // Construct the elements hierarchy
    userQuestionElement.appendChild(avatarElement);
    userQuestionElement.appendChild(userNameElement);

    questionElement.appendChild(userQuestionElement);
    questionElement.appendChild(titleElement);
    // questionElement.appendChild(leadingIconElement);

    anchorElement.appendChild(questionElement);

    questionDiv.appendChild(hrElement);
    questionDiv.appendChild(anchorElement);
    
    return questionDiv;
});

// Append the elements to the container
htmlElements.forEach(element => {
    questions.appendChild(element);
});
}catch(err) {
    if (err){
        console.log(err)
    }
}

submit.addEventListener('click', async (event) => {
    event.preventDefault();
    const form = {
        answer : answer.value,
        user_id : localStorage.getItem('userId'),
        question_id : localStorage.getItem("question_id")
    }
    console.log(form)
     
    try {
        const url = "http://localhost:4000/api/answer/";
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
            window.location.href = '/Answer.html'; 
        } else {
            alert(data.msg);
        }

    } catch (err){
        console.log(err)
    }


})

function checkUser(){
    if(!localStorage.getItem('token')){
      window.location.href = '/Login.html';
    }
  }
checkUser();