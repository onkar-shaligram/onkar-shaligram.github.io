var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };


//Blinking effect

function blink () {
 document.getElementById('donate').style.color = 'red';
 setTimeout('setBlink()', 700);
};

function setBlink() {
  document.getElementById('donate').style.color = 'blue';
  setTimeout('blink()', 700);
}



"use strict";

const menuButton = document.getElementById("menuBtn");
const closeButton = document.getElementById("closeBtn");
const sideNav = document.getElementById("sideNav");
const afterSubmit = document.getElementById("submitSuccess");
const navBarLinks = document.querySelectorAll(".navBar__link");
const form = document.getElementById("ajaxForm");
const successMessage = document.getElementById("successMsg");

const gRecaptchaWidget = document.getElementById("g-recaptcha");

let gRecaptchaWidgetID;

const RC2KEY = '6LcS4uoUAAAAALmgIfa1VjpO-SpYs1WOEPntFNRA';
let doSubmit = false;

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 550,
  easing: 'easeInOutQuad',
  updateURL: false // Update the URL on scroll
});

// Toggle Side Menu

function toggleSideMenu(event) {
  sideNav.classList.toggle("isActive");
}

menuButton.addEventListener("click", toggleSideMenu);

closeButton.addEventListener("click", toggleSideMenu);

navBarLinks.forEach(link =>
  link.addEventListener("click", toggleSideMenu)
);

// Form Submission using AJAX


form.addEventListener("submit", function(event) {
  
  event.preventDefault();
  const url = this.action;

  if (doSubmit) {
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(new FormData(form)).toString(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    })
      .then(response => {
        form.reset(gRecaptchaWidgetID);
        successMessage.textContent = "Message Sent!";
        afterSubmit.style.opacity = "1";
        window.setTimeout(function () {
          afterSubmit.style.opacity = "0";
        }, 4000);
        grecaptcha.reset(gRecaptchaWidgetID);
      })
      .catch(error => {
        alert("Something went wrong!!");
      });
  } else {
    successMessage.textContent = "Please complete the captcha!";
    afterSubmit.style.opacity = "1";
    window.setTimeout(function () {
      afterSubmit.style.opacity = "0";
    }, 4000);

  }

});

// Google Recaptcha 
function reCaptchaVerify(response) {
  if (response === grecaptcha.getResponse()) {
    doSubmit = true;
  }
}

function reCaptchaExpired() {
  /* do something when it expires */
  doSubmit = false;
}


function reCaptchaCallback() {
  /* this must be in the global scope for google to get access */
  gRecaptchaWidgetID = grecaptcha.render(gRecaptchaWidget, {
    'sitekey': RC2KEY,
    'callback': reCaptchaVerify,
    'expired-callback': reCaptchaExpired,
    'theme': 'light',
  });
}

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});