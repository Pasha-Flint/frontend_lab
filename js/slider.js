"use strict";

let slider  = {
    curPos: 8,
    curBtn: 8,
    nextPos: 8,
    nextBtn: 8,
    curTitle: 8,
    nextTitle:8,
    size: 0
};

document.addEventListener("DOMContentLoaded", function () {
    slider.size = document.getElementsByClassName("item").length;
    getSlidePos();
    getTargetBtn();
    document.addEventListener("click", function (event) {
        getSlidePos();
        switch (event.target.classList[0]) {
            case "slider-btn":
                positionCheck();
                break;

            case "slider-btn-side":
                if (event.target.classList[1] === "left") {
                    slideToLeft();
                } else {
                    slideToRight();
                }
                break;
        }
    },false)
}, false)

function changeSlide() {
    document.querySelectorAll(".slider-title")[slider.curTitle].classList.add("hide");
    document.querySelectorAll(".slider-title")[slider.nextTitle].classList.remove("hide");
    document.querySelectorAll(".item")[slider.curPos].classList.add("item-prev");
    document.querySelectorAll(".item")[slider.nextPos].classList.remove("hide");
    document.querySelectorAll(".item")[slider.nextPos].classList.add("item-active");
    setTimeout(function () {
        document.querySelectorAll(".item")[slider.curPos].classList.add("hide");
        document.querySelectorAll(".item")[slider.curPos].classList.remove("item-prev");
        document.querySelectorAll(".item")[slider.nextPos].classList.remove("item-active");
        document.querySelectorAll(".slider-btn")[slider.nextBtn].classList.add("slider-btn-active");
        document.querySelectorAll(".slider-btn")[slider.curBtn].classList.remove("slider-btn-active");
    }, 250)
}

function getSlidePos() {
    let selectors = document.querySelectorAll(".item");
    for (let i = 0; i < selectors.length; i++) {
        if (!selectors[i].className.includes("hide")) {
            slider.curPos = i;
        }
    }
    slider.curTitle = slider.curBtn = slider.curPos;
    document.querySelectorAll(".slider-btn")[slider.curBtn].classList.add("slider-btn-active");
    document.querySelectorAll(".slider-title")[slider.curTitle].classList.remove("hide");
}

function getTargetBtn() {
    let position = document.getElementsByClassName("slider-btn");
    for (let i = 0; i < position.length; i++) {
        position[i].addEventListener("click", function () {
            slider.nextPos = slider.nextBtn = slider.nextTitle = i;
        }, false)
    }
}

function positionCheck() {
    if (slider.nextPos === slider.curPos) {
        slider.nextPos = slider.nextBtn = slider.nextTitle = 8;
    } else {
        changeSlide();
    }
}

function slideToLeft() {
    if (slider.curPos === 0) {
        slider.nextPos = slider.nextBtn = slider.nextTitle = slider.size - 1;
    } else {
        slider.nextPos = slider.nextBtn = slider.nextTitle = slider.curPos - 1;
    }
    changeSlide();
}

function slideToRight() {
    if (slider.curPos === (slider.size - 1)) {
        slider.nextPos = slider.nextBtn = slider.nextTitle = 0;
    } else {
        slider.nextPos = slider.nextBtn = slider.nextTitle = slider.curPos + 1;
    }
    changeSlide();
}