"use strict";

let data = {
    numbers: [],
    letters:[],
    names: {},
    chosen: "0",
    list: [],
    temp: 0
};

document.addEventListener("DOMContentLoaded", function() {
    generator();

    document.addEventListener("click", function (event) {

        switch(event.target.className.slice(4)) {

            case "generate":
                generator();
                break;

            case "reset":
                document.location.reload();
                break;

            case "letter":
                selectLetter(event);
                break;

            case "select":
                selectOption();
                break;
        }
    },false);

}, false);

function generator() {
    clearBtns();
    clearResult();
    randomizer();
    generateBtns();
}

function randomizer() {
    data.numbers = [];
    rand26();
    do {
        arrayFill();
    } while (data.numbers.length < 5);
}

function rand26() {
    data.temp = Math.floor(Math.random() * 26) + 1;
}

function arrayFill() {
    data.numbers.forEach(function (item) {
        rand26();
        do {
            rand26();
        } while (data.temp === item);
    })
    data.numbers.push(data.temp);
}

function clearResult() {
    document.querySelector("#resultBox").innerHTML = '';
}

function generateBtns() {
    data.letters = [];
    let lettersTable = ["a", "b", "c", "d", "e", "f", "g",
        "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z"];

    for (let j = 0; j < 5; j++) {
        for (let i = -1; i !== data.numbers[j]; i++) {
            data.letters[j] = lettersTable[i];
        }
    }

    for (let i = 0; i < data.letters.length; i++) {
        document.querySelectorAll(".letter")[i].innerHTML = data.letters[i].toUpperCase();
    }
    data.numbers = [];
    data.letters = [];
}

function selectLetter(event) {
    data.chosen = event.target.innerHTML;
    clearBtns();
    event.target.style = "box-shadow: 0 0 0 2px #fff";
}

function clearBtns() {
    for (let i = 0; i < 5; i++) {
        document.querySelectorAll(".letter")[i].style = "box-shadow: none";
    }
}

function selectOption() {
    clearBtns();
    requestData();
}

function foundNames() {
    clearResult();

    if (data.chosen === "0") {
        document.querySelector("#resultBox").innerHTML = 'Please select option';
    } else {
        data.list = [];
        for (let i = 0; i < data.names.length; i++) {
            let tested = data.names[i].name[0];
            if (tested === data.chosen) {
                data.list.push(data.names[i].name);
            }
        }

        if (data.list.length > 0) {
            for (let i = 0; i < data.list.length; i++) {
                document.querySelector("#resultBox").innerHTML += data.list[i] + '<br>';
            }
        } else {
            document.querySelector("#resultBox").innerHTML = 'No matches were found. Sorry &#58;&#40;';
        }
        data.list = [];
        data.chosen = "0";
    }
}

function requestData() {
    fetch('https://raw.githubusercontent.com/Pasha-Flint/frontend_lab/master/data/list.json')
        .then((response) => {
            return response.json();
        })
        .then((dataObj) => {
            data.names = dataObj;
            foundNames();
            data.names = {};
        });
}