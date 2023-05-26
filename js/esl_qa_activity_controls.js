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
var questionIndex = 0;
var curQuestion = qa_data[0];
var questionActive = true;

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
  see_answer_button.addEventListener('click', nextQuestion);
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
  questionIndex = 0;
  nextQuestion();
  see_answer_button.style.display = 'block';
}

// Function to proceed to the next question
function nextQuestion() {
  showQuestion();
  questionContainer.style.display = 'block';
  curQuestion = qa_data.find(q => q.group === curGroup && q.question_index === questionIndex.toString());

  if (!curQuestion) {
    document.getElementById("current_group_name").innerHTML = "";
    promptNextGroup();
  } else {
    document.getElementById("question_text").innerHTML = curQuestion.question;
    document.getElementById("current_group_name").innerHTML = `${curGroup} - Question ${curQuestion.question_num}`;
    document.getElementById("question_image").src = `images/${curQuestion.image}.png`;
  }
}

// Function to show the question container
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

// Function to prompt for the next group
function promptNextGroup() {
  document.getElementById("question_text").innerHTML = "Select the next group!";
  see_answer_button.style.display = 'none';
  next_question_button.style.display = 'none';
  see_answer_button.addEventListener('click', nextQuestion);
}

// Function to show the answer container
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

// Event listeners for buttons
see_answer_button.addEventListener('click', showAnswer);
next_question_button.addEventListener('click', nextQuestion);

