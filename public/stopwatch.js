var clockbtn = document.getElementsByClassName('clockbutton')[0];
var clocknormal = document.getElementsByClassName('clocknormal')[0];
var clockdown = document.getElementsByClassName('clockdown')[0];
var clockup = document.getElementsByClassName('clockup')[0];
var timer = document.getElementsByClassName('timer')[0];
var clockcount = document.querySelector('.clockcount span');
var clocknormalmb = document.getElementsByClassName('clocknormalmb')[0];
var clockdownmb = document.getElementsByClassName('clockdownmb')[0];
var clockupmb = document.getElementsByClassName('clockupmb')[0];
var timermb = document.getElementsByClassName('timermb')[0];
var clockcountmb = document.querySelector('.clockcountmb span');
var challengemask = document.getElementsByClassName('challenge-mask')[0];
var blogfirst = document.getElementsByClassName('blogfirst')[0];
var blogfirstclock = document.getElementsByClassName('challenge-blogclock')[0];
var blogsecone = document.getElementsByClassName('blogsecone')[0];
var blogsectwo = document.getElementsByClassName('blogsectwo')[0];
var blogsubform = document.getElementsByClassName('challenge-subform')[0];
var bloginput = document.getElementsByClassName('challenge-input')[0];
var blogcheck = document.getElementsByClassName('challenge-check')[0];
var timeout = null,
  timeoutmb = null,
  blogId = null,
  timedown = null,
  timeup = null,
  successId = null;
var regEmail =
  /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
var BlogAllId = document.querySelectorAll('[data-rate-id]');
clockbtn.onmousedown = function () {
  clockeventdown(clockcount, clocknormal, clockdown, clockup, timer);
};
clockbtn.onmouseup = function () {
  clockeventup(clockcount, clocknormal, clockdown, clockup, timer);
};
clockbtn.ontouchstart = function () {
  clockeventdown(clockcountmb, clocknormalmb, clockdownmb, clockupmb, timermb);
};
clockbtn.ontouchend = function () {
  clockeventup(clockcountmb, clocknormalmb, clockdownmb, clockupmb, timermb);
};
function clockeventdown(item, normal, down, up, timearr) {
  if (item.innerText === '0,00') {
    timeout = setInterval(() => {
      if (item.innerText === '7,20') {
        item.innerText = '0,00';
      }
      var code = (parseFloat(item.innerText.replace(',', '.')) + 0.01).toFixed(
        2
      );
      var newcode = code.toString().replace('.', ',');
      item.innerText = `${newcode}`;
      timearr.style.transform = `rotate(${parseFloat(
        item.innerText.replace(',', '.') * 100 - 45
      )}deg)`;
    }, 10);
  } else {
    item.innerText = '0,00';
    timearr.style.transform = 'rotate(-45deg)';
    clockbtn.innerText = 'Premere a lungo';
    clockbtn.style.background = '#026FD1';
  }
  normal.style.display = 'none';
  down.style.display = 'none';
  up.style.display = 'block';
  timedown = setTimeout(() => {
    normal.style.display = 'none';
    down.style.display = 'block';
    up.style.display = 'none';
    clearTimeout(timedown);
  }, 150);
}
function clockeventup(item, normal, down, up) {
  timeup = setTimeout(() => {
    normal.style.display = 'block';
    down.style.display = 'none';
    up.style.display = 'none';
    clearTimeout(timeup);
  }, 200);
  if (item.innerText !== '0,00') {
    clockbtn.innerText = 'Noch Einmal';
    clockbtn.style.background = '#B7B7B7';
    var time_code = item.innerText.replace(/\,/, '.');
    var post_code = Number(time_code);
    postData('/game_stopwatch/timelim/action', {
      time_limit: post_code,
    }).then((res) => {
      var newres = JSON.parse(res);
      console.log(newres);
      blogId = newres.msg;
      showblog(item);
    });
  }
  clearInterval(timeout);
  timeout = null;
}
function showblog(item) {
  setTimeout(() => {
    if (item.innerText === '1,11') {
      challengemask.style.display = 'block';
      blogfirst.style.display = 'block';
      blogfirstclock.style.display = 'flex';
      successId = 1;
    }
    if (item.innerText === '3,33' || item.innerText === '5,25') {
      challengemask.style.display = 'block';
      blogfirst.style.display = 'block';
      blogfirstclock.style.display = 'none';
      successId = null;
    }
  }, 1000);
}
blogsubform.onclick = function () {
  if (regEmail.test(bloginput.value) && blogcheck.checked) {
    bloginput.style.border = '1px solid #ccc';
    postData('/game_stopwatch/timelim/email', {
      email: bloginput.value,
      id: blogId,
    }).then((res) => {
      if (successId === 1) {
        blogfirst.style.display = 'none';
        blogsectwo.style.display = 'block';
      } else {
        blogfirst.style.display = 'none';
        blogsecone.style.display = 'block';
      }
    });
  } else {
    if (!regEmail.test(bloginput.value)) {
      bloginput.style.border = '1px solid red';
    }
  }
};
function closeblog() {
  challengemask.style.display = 'none';
  blogfirst.style.display = 'none';
  blogfirstclock.style.display = 'none';
  blogsecone.style.display = 'none';
  blogsectwo.style.display = 'none';
}
function postData(url, data) {
  return new Promise((resolve, reject) => {
    var formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('post', url);
    xhr.send(formData);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr.response);
      } else if (xhr.status == 500) {
        reject(xhr);
      }
    };
  });
}
