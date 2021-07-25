const h1 = document.querySelector('h1');
const rt = document.querySelector('#reset');
const select = document.querySelector('#select');
const span = document.createElement('span');
const result = document.querySelector('#result');
const section = document.querySelector('.section');

let winningpoint = parseInt(select.value);
let isGameOver = false;
rt.innerHTML = 'Reset';

const bt4 = document.createElement('button');

bt4.innerText = "Delete the card";
bt4.style.backgroundColor = 'red';
bt4.style.color = 'white';

bt4.style.position = 'relative';
bt4.style.top = '2em';
bt4.style.left = '55em';
bt4.style.borderRadius = '1.5em';
section.append(bt4)


section.addEventListener('click', (evt) => { // and event object is passed by default and to capture it you need a placeholder variable or in this case an event object. 
    evt.target.previousElementSibling.nodeName === 'DIV' && evt.target.parentElement.remove();
})


result.append(span);

select.addEventListener('change', function () {

    winningpoint = parseInt(this.value);
    reset();
    // here we are resetting the winningpoint because when we update the winning point we want the game to restart with the winning point mentioned.
    // the reset logic of the winning point is handled by the the logic mentioned below.
    //here we are passing an anonymous function as the call back hence we execute it inside.
});


p1 = { // this is an object literal that we are using.
    str: "Player 1",
    playerCount: 0,
    button: document.querySelector('#one'),
    display: document.querySelector('#p1display'),
    text: function () {
        this.button.innerHTML = '+ Player One';
    }
}


p2 = {
    str: "Player 2",
    playerCount: 0,
    button: document.querySelector('#two'),
    display: document.querySelector('#p2display'),
    text: function () { // binds this reference to the owner of the function which is this function.
        this.button.innerHTML = '+ Player Two';
    }

}


p3 = {
    str: "Player 3",
    playerCount: 0,
    button: document.querySelector('#three'),
    display: document.querySelector('#p3display'),
    text: function () {
        this.button.innerHTML = '+ Player Three';
    }

}


p1.text()
p2.text()
p3.text()


function updateScores(player, ...opponent) { // REST params gives us an actual array which have all the array methods.

    if (!isGameOver) {

        player.playerCount += 1;

        player.display.innerText = player.playerCount;

        for (let opp; opp <= opponent.length; opp++) {
            opponent[opp].display.textContent = opponent[opp].playerCount;
        }

        let playOne = player.playerCount;
        let playTwo = opponent[0].playerCount;
        let playThree = opponent[1].playerCount;

        if (player.playerCount === winningpoint) {

            isGameOver = true;
            winningpoint = parseInt(select.value);
            player.button.disabled = true;
            player.display.classList.add('has-text-success');

            for (let opp of opponent) {
                opp.button.disabled = true;
                opp.display.classList.add('has-text-danger');
            }

            if (playOne > playTwo) span.innerHTML = `-<b style='font-weight:400;'>${player.str} wins </b>`;
            else if (playOne < playTwo) span.innerHTML = `-<b style='font-weight:400;'>${opponent[0].str} wins</b>`;
            else if (playThree) span.innerHTML = `-<b style='font-weight:400;'>${opponent[1].str} wins</b>`
        }

        else if (player.playerCount === opponent[0].playerCount && player.playerCount === winningpoint - 1) {
            winningpoint++

        }

        else if (player.playerCount === opponent[1].playerCount && player.playerCount === winningpoint - 1) {
            winningpoint++
        }

    }
}


p1.button.addEventListener('click', () => { //addEventListener() accepts a callback as its second argument.
    updateScores(p1, p3, p2);

});


p2.button.addEventListener('click', () => {
    updateScores(p2, p3, p1);

});


p3.button.addEventListener('click', () => {
    updateScores(p3, p2, p1);

});


rt.addEventListener('click', reset);

function reset() { // we make this function global as we want to call it quite a few times.

    for (let player of [p1, p2, p3]) { // p1 and p2 object is stored in an array hence used for of... loop. 

        player.playerCount = 0;
        player.display.textContent = 0;
        isGameOver = false;
        player.button.disabled = false;
        player.display.classList.remove('has-text-success', 'has-text-danger');
        span.innerHTML = "";

    }

}




