//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;
let remainder = 0;

const numOfConfetti = 85;
const confettiBaseSize = 14;
let spinning = false;

$(document).ready(function () {
    $('#spin').on('click', spin);
});

let confetti = [];

function create(i) {
    var width = (Math.random() * 8) + confettiBaseSize;
    var height = width * 0.4;
    var colourIdx = Math.ceil(Math.random() * 3);
    var colour = "red";
    switch (colourIdx) {
        case 1:
            colour = "yellow";
            break;
        case 2:
            colour = "blue";
            break;
        default:
            colour = "red";
    }
    const $el = $('<div class="confetti-' + i + ' ' + colour + '"></div>').css({
        "width": width + "px",
        "height": height + "px",
        "top": -Math.random() * 200 + "%",
        "left": Math.random() * 100 + "%",
        "opacity": Math.random() + 0.5,
        "transform": "rotate(" + Math.random() * 360 + "deg)"
    }).appendTo('.wrapper');

    confetti.push($el);

    drop(i);
}

function drop(x) {
    $('.confetti-' + x).animate({
        top: "100%",
        left: "+=" + Math.random() * 15 + "%"
    }, Math.random() * 3000 + 3000, function () {
        reset(x);
    });
}

function reset(x) {
    $('.confetti-' + x).animate({
        "top": -Math.random() * 20 + "%",
        "left": "-=" + Math.random() * 15 + "%"
    }, 0, function () {
        drop(x);
    });
}

function spin() {
    if(spinning) return;
    spinning = true;
    //add 1 every click
    clicks++;

    var newDegree = degree * clicks;
    var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
    totalDegree = newDegree + extraDegree;
    remainder = totalDegree % 360;

    switch (true) {
        case remainder < 60:
            totalDegree = totalDegree - remainder;
            icon = 'star';
            break;
        case remainder < 120:
            totalDegree = totalDegree - remainder + 60;
            icon = 'heart';
            break;
        case remainder < 180:
            totalDegree = totalDegree - remainder + 120;
            icon = 'smile';
            break;
        case remainder < 240:
            totalDegree = totalDegree - remainder + 180;
            icon = 'quote';
            break;
        case remainder < 300:
            totalDegree = totalDegree - remainder + 240;
            icon = 'bell';
            break;
        case remainder < 360:
            totalDegree = totalDegree - remainder + 300;
            icon = 'bulb';
            break;
    }
    // remainder = totalDegree % 360;

    $('#wheel .sec').each(function () {
        var t = $(this);
        var noY = 0;

        var c = 0;
        var n = 700;
        var interval = setInterval(function () {
            c++;
            if (c === n) {
                clearInterval(interval);
            }

            var aoY = t.offset().top;

            if (aoY < 23.89) {
                $('#spin').addClass('spin');
                setTimeout(function () {
                    $('#spin').removeClass('spin');
                }, 100);
            }
        }, 1000);

        $('#inner-wheel').css({
            'transform': 'rotate(' + totalDegree + 'deg)'
        });

        noY = t.offset().top;


    });

    setTimeout(done, 6000);
}

function done() {
    spinning = false;
    let icon = '';
    // 0, 60, 120, 180, 240, 300, 360
    switch (true) {
        case remainder < 60:
            icon = 'bulb';
            break;
        case remainder < 120:
            icon = 'star';
            break;
        case remainder < 180:
            icon = 'heart';
            break;
        case remainder < 240:
            icon = 'smile';
            break;
        case remainder < 300:
            icon = 'quote';
            break;
        case remainder < 360:
            icon = 'bell';
            break;
    }

    setTimeout(fireAlert, 1000, [icon]);
}

function fireAlert(icon) {
    // Swal.fire(
    //     `${icon}`,
    //     'You clicked the button!',
    //     'success'
    // )

    for (var i = 0; i < numOfConfetti; i++) {
        create(i);
    }

    let htmlForIcon = '';
    let htmlForTitle = '<strong>HERE WE GO!</strong>';
    let htmlForMessage = `<div class="sad-message"><p>Here is a disappointing message</p></div>`;
    icon = icon[0];
    switch (icon) {
        case 'star':
            // USER TIMES - TEAM SWITCH!!!
            htmlForTitle = `<strong>TEAM REORG</strong>`;
            htmlForIcon = `<div class="sec"><span class="fa fa-user-times"></span></div>`;
            htmlForMessage = `
                <div class="sad-message">
                    <p>Your team's resources are being shifted onto other projects. The instructors will now switch up your team.</p>
                </div>
            `
            break;
        case 'heart':
            // BOOK OF THE DEAD - DELETE CODE BASE!
            htmlForTitle = `<strong>DELETE YOUR CODEBASE</strong>`;
            htmlForIcon = `<div class="sec"><span class="fa fa-book-dead"></span></div>`;
            htmlForMessage = `
                <div class="sad-message">
                    <p>Oh crap... SOMEBODY didn't commit their code and dropped their computer. Delete your code and start over.</p>
                </div>
            `;
            break;
        case 'smile':
            // BUGS IN THE CODE
            htmlForTitle = `<strong>BUGS IN THE CODE</strong>`;
            htmlForIcon = `<div class="sec"><span class="fa fa-bug"></span></div>`;
            htmlForMessage = `
                <div class="sad-message">
                    <p>Dang, your 3rd party who was 'helping' with your code didn't know what they were doing. Check your code in, your instructors are about to mess it up.</p>
                </div>
            `;
            break;
        case 'quote':
            // REPO SHIFT
            htmlForTitle = `<strong>CODEBASE SWAP</strong>`;
            htmlForIcon = `<div class="sec"><span class="fa fa-code-branch"></span></div>`;
            htmlForMessage = `
                <div class="sad-message">
                    <p>You are inheriting code from another team. Welcome to the real world kid.</p>
                </div>
            `;
            break;
        case 'bell':
            // CLIENT MEETING
            htmlForTitle = `<strong>EXPLAIN YOUR CODE</strong>`;
            htmlForIcon = `<div class="sec"><span class="fa fa-phone-volume"></span></div>`;
            htmlForMessage = `
                <div class="sad-message">
                    <p>Your client wants to know what the heck is going on. Your instructor is going to call you on the phone and ask you some questions about the project. </p>
                </div>
            `
            break;
        case 'bulb':
            // REQUIREMENTS CHANGE
            htmlForTitle = `<strong>REQUIREMENTS CHANGED</strong>`;
            htmlForIcon = `<div class="sec"><span class="fa fa-exchange-alt"></span></div>`;
            htmlForMessage = `
                <div class="sad-message">
                    <p>Client called. They want something different. Scope addendum is signed, so you are shifting gears. Your instructors will tell you what is different.</p>
                </div>
            `
            break;
    }

    htmlForIcon += htmlForMessage;

    Swal.fire({
        title: htmlForTitle,
        html: htmlForIcon,
        focusConfirm: false,
        confirmButtonText:
            `awesome...`,
        confirmButtonAriaLabel: 'Thumbs up, great!',
        backdrop: false
    }).then(closeModal)
}

function closeModal() {
    for (let index = 0; index < confetti.length; index++) {
        const item = confetti[index];
        item.remove();
        delete confetti[index];
    }
    confetti = [];
}