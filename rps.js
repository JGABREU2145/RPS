const inq = require('inquirer');

// Arrays where the choices of the user and computer are kept for each round
var user = [];
var comp = [];

//Inital values for the scores that are incremented in the compare() function
let userScore = 0;
let compScore = 0;
let maxScore = 0;

//Initializing funciton prompting the user for their choice of series
const bestOf = () => {
    inq.prompt([
        {
            type: "list",
            name: "bestOf",
            message: "What series would you like to play?",
            choices: [
                "Best of 3",
                "Best of 5",
                "Best of 7"
            ]
        }
    ])
    .then((answers) => {
        let gameType = answers.bestOf;

        // Conditional statements that set the max score to be reached 
        //for the series chosen
        if(gameType == "Best of 3") {
            maxScore = 2
        }
        else if (gameType == "Best of 5") {
            maxScore = 3
        }
        else if (gameType == "Best of 7") {
            maxScore = 4
        }
    })
    .then(()=> {
        userChoice();
    })
};

// Function that prompts the user for their choice of rock, paper or scissors.
const userChoice = () => {

    inq.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Which do you pick?',
            choices: [
                "Rock",
                "Paper",
                "Scissors"
            ],
        }
    ])
    .then((answers) => {
        // Push the users choice to the user variable 
        // to be displayed
        user.push(answers.choice);
        console.log(`You picked ${user}`);       
    })
    .then(() => {
        compChoice();
    })
};

//Function that randomly generates the computers choice
const compChoice = () => {
    
    var choices = ["Rock", "Paper", "Scissors"];
    var pick = [Math.floor(Math.random() * choices.length)];

    //Push the generated choice to the comp array
    comp.push(choices[pick]);
    console.log(`Computer picked ${comp}`);

    compare();
};

//Function that decides if the user or computer win the round
const compare = () => {
    //Convert the user and comp arrays to strings
    var userAnswer = user.toString();
    var compAnswer = comp.toString();

    if(userAnswer === compAnswer) {
        console.log("It's a tie!")
    }
    else if(userAnswer === "Paper" && compAnswer === "Rock") {
        console.log("You won this round!")
        userScore = userScore + 1;
    }
    else if(userAnswer === "Rock" && compAnswer === "Scissors") {
        console.log("You won this round!")
        userScore = userScore + 1;
    }
    else if(userAnswer === "Scissors" && compAnswer === "Paper") {
        console.log("You won this round!")
        userScore = userScore + 1;
    }
    else {
        console.log("Computer won this round!")
        compScore = compScore + 1;
    }

    // Display the current games score
    console.log(`Your score: ${userScore}`);
    console.log(`Computer score: ${compScore}`);

    if (userScore === maxScore) {
        console.log("You won the series!")
        //Calls function to check if the user wants to keep playing
        //after the series has been finished
        return keepPlaying();
    }
    else if (compScore === maxScore) {
        console.log("Computer won the series! Better luck next time!")
        return keepPlaying();
    }

    //Removes the games choices from the previous game after completed
    user.shift();
    comp.shift();

    //Prompt the user again after each round until series max score is reached
    userChoice();
    
};

// Function that takes in a boolean response to 
// allow the user to continue playing
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
            // If the user wants to keep playing we need to 
            // remove the previous games choices once again
            user.shift();
            comp.shift();

            //Reset the scores so that they don't stack
            userScore = 0;
            compScore = 0;

            bestOf();
        }
        else {
            return;
        };
    });
};

// Call the bestOf() function to start the game
bestOf();