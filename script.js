document.addEventListener("DOMContentLoaded", () => {
  // HTML elements
  const startQuizButton = document.getElementById("startQuiz");
  const closeQuizButton = document.getElementById("closeQuiz");
  const settingsButton = document.getElementById("settings");
  const settingsSection = document.querySelector(".settings");
  const num1Element = document.getElementById("num1");
  const num2Element = document.getElementById("num2");
  const operatorElement = document.getElementById("operator");
  const correctInput = document.getElementById("correct");
  const wrongInput = document.getElementById("wrong");
  const remarksInput = document.getElementById("remarks");
  const options = document.querySelectorAll(".option");

  // Variables
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let totalQuestions = 10; // Default to 10 questions
  let questions = [];
  let correctAnswer;
  let questionAnswered = false; // Track if the current question has been answered
  let quizStarted = false; // Flag to track quiz start status

  // Generate random number within a range
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Shuffle an array
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Generate questions based on settings
  const generateQuestions = () => {
    const level = document.querySelector("input[name='level']:checked").value;
    const operator = document.querySelector("input[name='operator']:checked").value;
    const maxDiff = parseInt(document.getElementById("maxDiff").value) || 5; // Default maxDiff to 5
    const customMin = parseInt(document.getElementById("customMin").value) || 1;
    const customMax = parseInt(document.getElementById("customMax").value) || 10;

    let range = { min: 1, max: 10 }; // Default to Level 1
    if (level === "2") {
        range = { min: 11, max: 100 };
    } else if (level === "custom") {
        if (customMax <= customMin) {
            alert("Custom Max should be greater than Min!");
            return; // Exit if invalid custom range
        }
        range = { min: customMin, max: customMax };
    }

    // Determine number of questions based on level
    if (level === "1") {
      totalQuestions = 10; // Level 1: 10 questions
    } else if (level === "2") {
      totalQuestions = 20; // Level 2: 20 questions
    } else if (level === "custom") {
      totalQuestions = parseInt(document.getElementById("numItems").value) || 10; // Custom: based on user input
    }

    // Clear existing questions before generating new ones
    questions = [];

    for (let i = 0; i < totalQuestions; i++) {
        const num1 = getRandomNumber(range.min, range.max);
        const num2 = getRandomNumber(range.min, range.max);
        let answer;

        // Calculate the correct answer based on operator
        if (operator === "+") answer = num1 + num2;
        if (operator === "-") answer = num1 - num2;
        if (operator === "*") answer = num1 * num2;

        // Generate unique choices
        const choices = new Set([answer]);
        let attempts = 0; // Limit attempts to avoid infinite loop
        while (choices.size < 4 && attempts < 50) {
            const randomChoice = getRandomNumber(answer - maxDiff, answer + maxDiff);
            if (randomChoice >= range.min && randomChoice <= range.max) {
                choices.add(randomChoice);
            }
            attempts++;
        }

        // If unable to generate sufficient choices, fill with random numbers
        while (choices.size < 4) {
            choices.add(getRandomNumber(range.min, range.max));
        }

        // Add the generated question to the questions array
        questions.push({
            num1,
            num2,
            operator,
            answer,
            choices: shuffleArray([...choices]),
        });
    }
  };

  // Display the current question
  const displayQuestion = () => {
      const question = questions[currentQuestionIndex];
      num1Element.textContent = question.num1;
      num2Element.textContent = question.num2;
      operatorElement.textContent = question.operator;
      correctAnswer = question.answer;
      questionAnswered = false; // Reset answered state

      options.forEach((option, index) => {
          option.textContent = question.choices[index];
          option.onclick = () => handleAnswer(option.textContent);
      });
  };

  // Handle answer selection
  const handleAnswer = (selectedAnswer) => {
    if (questionAnswered) return; // Prevent answering more than once

    if (parseInt(selectedAnswer) === correctAnswer) {
        correctAnswers++;
        remarksInput.value = "Right";
    } else {
        wrongAnswers++;
        remarksInput.value = "Wrong";
    }

    // Update score
    correctInput.value = correctAnswers;
    wrongInput.value = wrongAnswers;
    questionAnswered = true; // Mark this question as answered
  };

  // Start quiz
  const startQuiz = () => {
    if (quizStarted) return; // Prevent starting quiz if it's already started

    quizStarted = true; // Mark the quiz as started
    correctAnswers = 0;
    wrongAnswers = 0;
    currentQuestionIndex = 0;
    correctInput.value = 0;
    wrongInput.value = 0;
    remarksInput.value = "";

    try {
        generateQuestions();

        // Check if questions were successfully generated
        if (questions.length > 0) {
            displayQuestion();
            settingsSection.style.display = "none";
            startQuizButton.textContent = "Next"; // Change the button text to "Next"
            settingsButton.disabled = true; // Disable settings button during quiz
            closeQuizButton.textContent = "End"; // Change Cancel button text to "End"
        } else {
            alert("Failed to generate questions. Please check your settings.");
        }
    } catch (error) {
        alert("An error occurred while starting the quiz. Please try again.");
        console.error(error);
    }
};

  // Display the next question
  const nextQuestion = () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        remarksInput.value = ""; // Clear remarks for next question
    } else {
        endQuiz();
    }
  };

  // End quiz
  const endQuiz = () => {
    const grade = Math.round((correctAnswers / totalQuestions) * 100);
    remarksInput.value = `You scored ${correctAnswers} out of ${totalQuestions} (${grade}%)`;
    alert(`Quiz completed! Your score is ${correctAnswers} out of ${totalQuestions}`);

    // Update the input fields and disable buttons
    correctInput.value = correctAnswers;
    wrongInput.value = wrongAnswers;
    startQuizButton.disabled = true; // Disable the Next button after the quiz ends
    closeQuizButton.disabled = true; // Disable the End button
  };

  // Handle End button click
  const endQuizHandler = () => {
    endQuiz();
    closeQuizButton.textContent = "Quiz Closed";
    closeQuizButton.disabled = true; // Disable the End button after quiz ends
    settingsButton.disabled = false; // Enable settings button after quiz ends
  };

  // Reset quiz when settings are clicked
  const resetQuiz = () => {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    correctInput.value = 0;
    wrongInput.value = 0;
    remarksInput.value = "";
    startQuizButton.textContent = "Start Quiz"; // Reset Start Quiz button text
    closeQuizButton.textContent = "Cancel"; // Reset Cancel button text
    closeQuizButton.disabled = false; // Enable Cancel button
    startQuizButton.disabled = false; // Enable Start button
    quizStarted = false; // Reset quizStarted flag
  };

  // Event listeners
  startQuizButton.addEventListener("click", () => {
    if (startQuizButton.textContent === "Start Quiz") {
      startQuiz();
    } else {
      nextQuestion(); // Move to the next question when clicking Next
    }
  });

  closeQuizButton.addEventListener("click", endQuizHandler); // Changed to end the quiz
  settingsButton.addEventListener("click", () => {
      settingsSection.style.display =
          settingsSection.style.display === "none" ? "block" : "none";
      resetQuiz(); // Reset the quiz when settings are clicked
  });
});
