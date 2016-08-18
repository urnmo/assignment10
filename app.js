
//add elements to display in DOM via AJAX

//write a function to do so
let finalAnswer = null;


function guessBtn() {

    let answerBox = document.querySelector('.userAnswer');

    if (answerBox.value === finalAnswer) {
        console.log('correct');
        // Create DOM elements and append them.
        let parent = document.querySelector('div');
        let correct = document.createElement('h2');
        correct.textContent = "CORRECT!"
        correct.classList.add('reveal1');
        parent.appendChild(correct);
        let theTell = document.createElement('p');
        theTell.classList.add('reveal3');
        theTell.textContent = finalAnswer;
        let alex = document.querySelector('#happyAlex')
        alex.classList.remove('hidden');
        window.setTimeout(function () {
            reset();
            getQuestions();
        }, 2000);
        //adopt child
        parent.appendChild(theTell);

    } else {
        console.log('wrrrrrooooooooong!');
        let parent = document.querySelector('div');
        let wrong = document.createElement('h2');
        wrong.textContent = "WROOOOOOOONG!";
        wrong.classList.add('reveal');
        parent.appendChild(wrong);
        document.createElement('p');
        let theTell = document.createElement('p');
        theTell.classList.add('reveal2');
        theTell.textContent = finalAnswer;
        parent.appendChild(theTell);
        let alex = document.querySelector('#sadAlex');

        alex.classList.remove('hidden');
        window.setTimeout(function () {
            reset();
            getQuestions();
        }, 2000);
    }
}

function getQuestions() {
    console.log('adding a question');

    //create AJAX request

    let request = new XMLHttpRequest();
    //where to get request from?
    request.open('GET', 'http://jservice.io/api/random');

    //what to do with the request you recieve?

    request.addEventListener('load', function () {
        //parse the info into object
        let delivery = JSON.parse(request.responseText);
        console.log(delivery[0]);
        //dig through the object
        let questionField = delivery[0].question;
        console.log(questionField);
        finalAnswer = delivery[0].answer;
        console.log(finalAnswer);

        // Create DOM elements and append them.
        let theAsk = document.querySelector('.question');
        theAsk.textContent = questionField;
        let parent = document.querySelector('div');

    });
    request.send();

}

window.addEventListener('load', function () {
    getQuestions();
    let guessButton = document.querySelector('.guess');
    guessButton.addEventListener('click', guessBtn)

    let rtnbtn = document.querySelector('.userAnswer');
    rtnbtn.addEventListener("keydown", function () {
        if (event.key === "Enter") {
            guessBtn();
        }
    })
})


function reset() {


    // let alex = document.querySelector('#sadAlex')
    // alex.classList.add('hidden');

    document.querySelector('.question').textContent = "";
    document.querySelector('#sadAlex').classList.add('hidden');
    document.querySelector('#happyAlex').classList.add('hidden');
    if (document.querySelector('.reveal1') !== null) {
        document.querySelector('.reveal1').textContent = "";
    };
    if (document.querySelector('.reveal3') !== null) {
        document.querySelector('.reveal3').textContent = "";
    };
    if (document.querySelector('.reveal') !== null) {
        document.querySelector('.reveal').textContent = "";
    };
    if (document.querySelector('.reveal2') !== null) {
        document.querySelector('.reveal2').textContent = "";
    };
    if (document.querySelector('.userAnswer') !== null) {
        document.querySelector('.userAnswer').value = "";
    }
}










