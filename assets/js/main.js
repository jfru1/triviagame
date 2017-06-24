$(document).ready(function (){

//each question is an object, each set of questions is stored in an array. more sets could be added, perhaps stratified difficulties or different topics.
var questionset1 = [
	{
		id: 1,
		question: "What year was Mega Man releaed in America?",
		answers: ["1984", "1992", "1987", "1989"],
		correctAnswer: 3
	},
	{
		id: 2,
		question: "As of 2017, the Classic brance of the property contains how many games?",
		answers: ["Seven", "Ten", "Five", "Twelve"],
		correctAnswer: 2
	},
	{
		id: 3,
		question: "Mega Man's color scheme is:",
		answers: ["Grey and red", "Blue and purple", "Blue and cyan", "Cyan and puce"],
		correctAnswer: 3
	},
	{
		id: 4,
		question: "Dr. Wily has been the final antagonist of how many classic games?",
		answers: ["One", "Six", "Seven", "Ten"],
		correctAnswer: 4
	},
	{
		id: 5,
		question: "Introduced in Mega Man 3, Mega Man's canine companion is named:",
		answers: ["Drag", "Rush", "Beat", "Treble"],
		correctAnswer: 2
	},
	{
		id: 6,
		question: "Mega Man gained the ability to charge his arm cannon in which game?",
		answers: ["Mega Man: The Power Fighters", "Mega Man 4", "Mega Man 2", "Mega Man 8"],
		correctAnswer: 2
	},
	{
		id: 7,
		question: "Mega Man's creator, Dr. Light, is styled in the likeness of what famous inventor?",
		answers: ["Albert Einstein", "John Goodenough", "Nikola Tesla", "Thomas Edison"],
		correctAnswer: 4
	},
	{
		id: 8,
		question: "What year do Mega Man 2 and all proceeding games take place in?",
		answers: ["2017", "199X", "200X", "20XX"],
		correctAnswer: 4
	},
	{
		id: 9,
		question: "Mega Man's given first name is:",
		answers: ["Blues", "Roll", "Rock", "Bass"],
		correctAnswer: 3
	},
	{
		id: 10,
		question: "How many Robot Masters have appeared in the Classic series games?",
		answers: ["79", "66", "82", "90"],
		correctAnswer: 3
	},
	{
		id: 11,
		question: "Which Mega Man game uniquely featured a score counter?",
		answers: ["Mega Man 6", "Mega Man 1", "Mega Man 8", "Mega Man 9"],
		correctAnswer: 2
	},
	{
		id: 12,
		question: "Which Robot Master is notorious for being the only enemy weak to his own weapon?",
		answers: ["Dive Man", "Metal Man", "Proto Man", "Astro Man"],
		correctAnswer: 2
	},
]

var quizVars = {
	correct: 0,
	incorrect: 0,
	questionCount: 0,
	questionInterval: null,
	startQuiz: function (){
		$(".startButton").on("click", function (){
			$(".startBox").remove();
			$(".timerMsg").show();
			$(".progressWrapper").empty();

			// cool idea picked up from looking at examples, creates a box for each question that can be replaced with a colored one depending on user answer
			for (var i = 0; i < questionset1.length; i++) {
				$(".progressWrapper").append("<div class='progressDivs' data-qid='"+questionset1[i].id+"'>")
			}
			$(".startButton").hide();
			quizVars.displayQuestion();
		})
	},
	displayQuestion: function(){
		// this function displays all questions. starts by clearing the last question and resetting any changed colors. 
		var counter = 15;

		$(".bottomBox").empty();
		$(".timerWrap>h3").css("color", "#2e3345");


		// brings up a question and answers if there are some remaining in the array
		if (questionset1[quizVars.questionCount] !== undefined){

			var correctA = questionset1[quizVars.questionCount].correctAnswer;
			$(".quizTimer").html(counter);
			var questionTimer = setInterval(startTimer, 1000);

			function startTimer (){
				//this whole function serves to keep the timer running and dictates its behaviors when numbers reach a certain value
				$(".quizTimer").html(counter)
				// tick tock
				counter--;
				if (counter < 0){
					clearInterval(questionTimer);
					$("[data-qid='"+questionset1[quizVars.questionCount].id+"']").addClass("incorrect");
					$(".bottomBox").html("Time's Up! The correct Answer is "+questionset1[quizVars.questionCount].answers[correctA-1]);
					quizVars.incorrect++;
					quizVars.questionInterval = setInterval(quizVars.nextQuestion, 2000);		
				}
				if (counter < 10){
					$(".timerWrap>h3").css("color", "#ffa500");
				}
				if (counter < 5){
					$(".timerWrap>h3").css("color", "#ff0000")
				} 
			}
			// draws question on textbox and then draws answer choices
			$(".question").append(questionset1[quizVars.questionCount].question);
			for (var i = 0; i < questionset1[quizVars.questionCount].answers.length; i++){
				var $answer = $("<div class='answer' id="+(i+1)+">");
				$("#answerField").append($answer);
				$($answer).append(questionset1[quizVars.questionCount].answers[i]);
			}

		} else {

			// if no more questions jump to end screen.
			quizVars.endScreen();
				
		}
			// on click, this function activates and determines if the answer is correct. it increments the correct/incorrect counter and shows user 
			// choice and loads next question
			$(".answer").on("click", function(){
				
				// a good quality of life suggestion i found on the net. it keeps the user from logging in multiple clicks!
				$(".answer").unbind("click");

				// this stops the timer
				clearInterval(questionTimer);

				if (correctA === parseInt($(this).attr("id"))){
					// this makes the answer light up as green!
					$(this).addClass("correct");

					// display feedback, tell user that he's correct, then increase correct count by 1, finally, change the little bar on the left
					// to green.
					$(".bottomBox").html("Your answer is correct!");
					quizVars.correct++;
					$("[data-qid='"+questionset1[quizVars.questionCount].id+"']").addClass("correct");

					// next question after 2 seconds
					quizVars.questionInterval = setInterval(quizVars.nextQuestion, 2000);	 
				} else {
					$(this).addClass("incorrect");
					// answer is wrong, so print the correct answer, change color of progressDivsress blip to red. increase incorrect answer count by 1
					$(".bottomBox").html("Answer incorrect! The answer is "+questionset1[quizVars.questionCount].answers[correctA-1]);
					quizVars.incorrect++;
					$("[data-qid='"+questionset1[quizVars.questionCount].id+"']").addClass("incorrect");

					//a new question is loaded after a two second delay
					quizVars.questionInterval = setInterval(quizVars.nextQuestion, 2000);		
				}
			})
	},
	nextQuestion: function(){
		clearInterval(quizVars.questionInterval);
		$(".question").empty();
		$("#answerField").empty();
		$(".bottomBox").empty();
		quizVars.questionCount++;
		quizVars.displayQuestion();
	},
	endScreen: function(){
		// Show closing message with the score and percentage written out. Show the game start button again with a new value. 
		// Reset certain variables.
		$(".content").prepend("<div class='startBox'>");
		$(".startBox").append(`
								  <h2>Quiz completed, here are your results:</h2>
								  <p>You correctly answered ${quizVars.correct} out of 
								  ${questionset1.length} questions correctly. Your score is 
								  ${Math.floor(quizVars.correct/questionset1.length * 100)}%.</p>
								`);
		$(".startButton").show().html("Retake Quiz?");
		$(".quizTimer").html("");
		quizVars.questionCount = 0; 
		quizVars.correct = 0;
		quizVars.incorrect = 0;
	},
}
quizVars.startQuiz();
});
//Joe Frew, trivia game, 6/2017