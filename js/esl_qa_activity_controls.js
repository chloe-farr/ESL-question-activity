// Selecting DOM elements
const questionContainer = document.querySelector('.question_container');
const answerContainer = document.querySelector('.answer_container');
const buttonElements = document.querySelectorAll('.group-button');

console.log(buttonElements.length);

// Looping through button elements
for (let i = 0; i < buttonElements.length; i++) {
  if (uniqueGroups[i]) {
    // Set text content and background image for each button based on uniqueGroups array
    buttonElements[i].textContent = uniqueGroups[i];
    let filename = "group_" + (i+1) + ".png";
    buttonElements[i].style.setProperty('--bg-image', `url(${filename})`);

    console.log(filename);
  } else {
    // Hide button if there is no corresponding group
    buttonElements[i].style.display = 'none';
  }
}

// Initialize variables
var curGroup = uniqueGroups[0];
var questionIndex = -1;
var curQuestion = qa_data[0];

// Hide question container initially
questionContainer.style.display = 'none';

// Call promptStart function
promptStart();

// Function to handle initial prompt
function promptStart() {
  document.getElementById("current_group_name").innerHTML = "Select the first group!";
  document.getElementById("question_text").innerHTML = "";
  see_answer_button.style.display = 'none';
  next_question_button.style.display = 'none';
}

// Function to start the activity
function startActivity() {
  // Show question container
  questionContainer.style.display = 'block';
  showQuestion();
}

// Function to handle group change
function changeGroup(group_index) {
  curGroup = uniqueGroups[group_index];
  console.log(curGroup);
  questionIndex = -1;
  nextQuestion();
  see_answer_button.style.display = 'block';
}

// Function to proceed to the next question
function nextQuestion() {
  console.log("qi before incrememt: " + questionIndex);
  questionIndex++;
  console.log("qi after increment: " + questionIndex);
  curQuestion = qa_data.find(q => q.group === curGroup && q.question_index === questionIndex.toString());
  console.log(curQuestion);
  if (!curQuestion) { //if a question doesn't exist, indicating the end of the question list
    document.getElementById("current_group_name").innerHTML = "";
    promptNextGroup();
  } else {
    showQuestion();
  }
}

function lastAnswer() { 
  questionIndex--;
  curQuestion = qa_data.find(q => q.group === curGroup && q.question_index === questionIndex.toString());
    document.getElementById("current_group_name").innerHTML = `${curGroup} - Question ${curQuestion.question_num}`;

  showAnswer();
}

// Function to show the question container
function showQuestion() {
  console.log("show question");
  questionContainer.style.display = 'block';
  answerContainer.style.display = 'none';
  see_answer_button.style.display = 'block';
  next_question_button.style.display = 'none';
  document.getElementById("question_text").innerHTML = curQuestion.question;
  document.getElementById("answer_text").innerHTML = "";
  document.getElementById("current_group_name").innerHTML = `${curGroup} - Question ${curQuestion.question_num}`;
  document.getElementById("question_image").src = `images/${curQuestion.image}.png`;

  activateGoBackButton();
  console.log("showing question: " + questionIndex);
}

// Function to prompt for the next group
function promptNextGroup() {
  document.getElementById("question_text").innerHTML = "Select the next group!";
  see_answer_button.style.display = 'none';
  next_question_button.style.display = 'none';
  see_answer_button.addEventListener('click', nextQuestion);
}

// Function to show the answer container
function showAnswer() {
  questionContainer.style.display = 'none';
  answerContainer.style.display = 'block';
  see_answer_button.style.display = 'none';
  next_question_button.style.display = 'block';
  document.getElementById("question_text").innerHTML = "";
  document.getElementById("answer_text").innerHTML = curQuestion.answer;
  activateGoBackButton();
  console.log("showing answer to: " + questionIndex);
}

function activateGoBackButton(){
  first_q_in_group = qa_data.find(q => q.group === curGroup && q.question_index === "0");
    console.log(first_q_in_group.question);

  if((document.getElementById("question_text").innerHTML === first_q_in_group.question)){
    go_back_button.style.display = 'none';
  } else{
    go_back_button.style.display = 'block';
  }
}

// Function to show the answer container
function goBack() {
  /*GO TO PREVIOUS ANSWER
  if the "next question" button was clicked, likely by accident, the following question will show
  with "go back", we want to show the answer to the previous question.
  */
  if (see_answer_button.style.display === 'block') { //ie the question is showing
    lastAnswer();
  } 
  /* SHOW THE ANSWER'S QUESTION
  if the "show answer" button was clicked, likely by accident, the answer to a question will show.
  //with "go_back", we want to show the question for that answer. This requires changing the qtext and qimage.
  */
  else{ //ie the answer is showing
    
    showQuestion();
  }
  console.log("went back to QI: " + questionIndex);
}

// Event listeners for buttons
see_answer_button.addEventListener('click', showAnswer);
next_question_button.addEventListener('click', nextQuestion);
go_back_button.addEventListener('click', goBack);

