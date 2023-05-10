const questionContainer = document.querySelector('.question_container');
const answerContainer = document.querySelector('.answer_container');

const buttonElements = document.querySelectorAll('.group-button');
console.log(buttonElements.length);
for (let i = 0; i < buttonElements.length; i++) {
  if (uniqueGroups[i]) {
    buttonElements[i].textContent = uniqueGroups[i];
    //let filename = "images/group_"+ (i+1)+".png";
    //buttonElements[i].style.backgroundImage = filename;
    //console.log(filename);
  } else {
    buttonElements[i].style.display = 'none';
  }
}

var curGroup = uniqueGroups[0];
var questionIndex = 0;
var curQuestion = qa_data[0];
var questionActive = true;

promptStart();
function promptStart(){
  document.getElementById("question_text").innerHTML = "Select the first group!";
  see_answer_button.style.display = 'none';
  next_question_button.style.display = 'none';
  see_answer_button.addEventListener('click', nextQuestion);
}


function startActivity(){
  // initialize the container state
  showQuestion();
}

function changeGroup(group_index){
  curGroup = uniqueGroups[group_index];
  console.log(curGroup);
  questionIndex=0;
  nextQuestion();
  see_answer_button.style.display = 'block';

}

function nextQuestion(){
  showQuestion();

  curQuestion = qa_data.find(q => q.group === curGroup && q.question_index === questionIndex.toString());
  if(!curQuestion){
    promptNextGroup();
  }else{
    document.getElementById("question_text").innerHTML = curQuestion.question;
  }
}

function showQuestion() {
  console.log("show question");
  if (!questionActive) {
    questionActive = true;
    questionContainer.style.display = 'block';
    answerContainer.style.display = 'none';
    see_answer_button.style.display = 'block';
    next_question_button.style.display = 'none';
  }
}

function promptNextGroup(){
  document.getElementById("question_text").innerHTML = "Select the next group!";
  see_answer_button.style.display = 'none';
  next_question_button.style.display = 'none';
  see_answer_button.addEventListener('click', nextQuestion);
}

function showAnswer() {
  if (questionActive) {
    questionActive = false;
    questionContainer.style.display = 'none';
    answerContainer.style.display = 'block';
    see_answer_button.style.display = 'none';
    next_question_button.style.display = 'block';
  }
    document.getElementById("answer_text").innerHTML = curQuestion.answer;
    questionIndex++;
}


// set up event listeners for the buttons
see_answer_button.addEventListener('click', showAnswer);
next_question_button.addEventListener('click', nextQuestion);

// initialize the container state

