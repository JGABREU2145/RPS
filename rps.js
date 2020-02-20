const inq = require('inquirer');

var user = [];
var comp = [];

let userScore = 0;
let compScore = 0;

const userChoice = () => {

    inq.prompt([
        {
            type: 'list',
            message: 'Which do you pick?',
            choices: [
                "Rock",
                "Paper",
                "Scissors"
            ],
            name: 'choice'
        }
    ])
    .then((answers) => {
        user.push(answers.choice);
        console.log(`You picked ${user}`);       
    })
    .then(() => {
        compChoice();
    })
};

const compChoice = () => {
    
    var choices = ["Rock", "Paper", "Scissors"];
    var pick = [Math.floor(Math.random() * choices.length)];
    comp.push(choices[pick]);
    console.log(`Computer picked ${comp}`);

    compare();
}

const compare = () => {
    var userAnswer = user.toString();
    var compAnswer = comp.toString();

    if(userAnswer === compAnswer) {
        console.log("It's a tie!")
    }
    else if(userAnswer === "Paper" && compAnswer === "Rock") {
        console.log("You Won!")
        userScore = userScore + 1;
    }
    else if(userAnswer === "Rock" && compAnswer === "Scissors") {
        console.log("You Won!")
        userScore = userScore + 1;
    }
    else if(userAnswer === "Scissors" && compAnswer === "Paper") {
        console.log("You Won!")
        userScore = userScore + 1;
    }
    else {
        console.log("You Lost!")
        compScore = compScore + 1;
    }

    console.log(`Your score: ${userScore}`);
    console.log(`Computer score: ${compScore}`);
    keepPlaying();
    
};

const keepPlaying = () => {
    inq.prompt([
        {
        type: "confirm",
        name: "tf",
        message: "Would you like to keep playing?"
        }
    ])
    .then((answers) => {
        if (answers.tf === true) {
            user.shift();
            comp.shift();

            userChoice();
        }
        else {
            return;
        };
    });
};

userChoice();