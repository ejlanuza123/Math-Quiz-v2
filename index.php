<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Mathematics</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Simple Mathematics</h1>
        
        <!-- Quiz Section  and style-->
        <div class="quiz">
            <div class="question">
                <span id="num1">0</span>
                <span id="operator">+</span>
                <span id="num2">0</span>
                <span>=</span>
                <span id="result">0</span>
            </div>

            <div class="options">
                <button id="optionA" class="option">A</button>
                <button id="optionB" class="option">B</button>
                <button id="optionC" class="option">C</button>
                <button id="optionD" class="option">D</button>
            </div>

            <div class="score">
                <div>
                    <p>Correct</p>
                    <input type="text" id="correct" disabled>
                </div>
                <div>
                    <p>Wrong</p>
                    <input type="text" id="wrong" disabled>
                </div>
            </div>

            <div class="remarks">
                <p>Remarks</p>
                <input type="text" id="remarks" disabled>
            </div>
        </div>

        <!-- Settings Section  -->
        <div class="settings">
            <h2>Settings</h2>

            <div class="level">
                <p>Level</p>
                <label><input type="radio" name="level" value="1" checked> Level 1 (1-10)</label>
                <label><input type="radio" name="level" value="2"> Level 2 (11-100)</label>
                <label>
                    <input type="radio" name="level" value="custom"> Custom Level
                    <input type="number" id="customMin" placeholder="Min" able>
                    <input type="number" id="customMax" placeholder="Max" able>
                </label>
            </div>

            <div class="operator">
                <p>Operator</p>
                <label><input type="radio" name="operator" value="+" checked> Addition</label>
                <label><input type="radio" name="operator" value="-"> Subtraction</label>
                <label><input type="radio" name="operator" value="*"> Multiplication</label>
            </div>

            <div class="other-settings">
                <label>
                    Number of Items:
                    <input type="number" id="numItems" value="10">
                </label>
                <label>
                    Max Difference of Choices:
                    <input type="number" id="maxDiff" value="10">
                </label>
            </div>
        </div>

        <!-- Control Buttons -->
        <div class="controls">
            <button id="startQuiz">Start Quiz</button>
            <button id="closeQuiz">Close</button>
            <button id="settings">Settings <<</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
