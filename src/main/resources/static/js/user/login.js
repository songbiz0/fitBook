const loginBtnElem = document.querySelector('#loginBtn');

/*
const findIdBtnElem = document.querySelector('#findIdBtn');
findIdBtnElem.addEventListener('click', () => {
    $('.ui.modal.findId')
        .modal('show')
    ;
});
*/

const urlParams = new URLSearchParams(window.location.search);
$(document).ready(() => {
        if (urlParams.has('error')) {
            $('body').toast({
                    class: 'error',
                    message: '올바른 아이디와 비밀번호를 입력해주세요.'
                });
        }
    }
);

// 아이디 저장

 // 쿠키 저장하기
const setCookie = (cookie_name, value, days) => {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    const cookieValue = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookieValue;
}

 // 쿠키 얻어오기
const getCookie = cookie_name => {
    let x, y;
    const val = document.cookie.split(';');

    for(let i=0; i<val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        if(x === cookie_name) {
            return unescape(y);
        }
    }
}

const loginFormElem = document.querySelector('#loginForm');
const saveIdChkElem = loginFormElem.querySelector('#saveIdChk');
const chk = () => {
    if(saveIdChkElem.checked) {
        setCookie('c_userid', loginFormElem.uid.value, '100');
    } else {
        setCookie('c_userid', '', '100');
    }
}

loginBtnElem.addEventListener('click', () => {
    chk();
});

let id = getCookie('c_userid');
if(id === null || typeof id === 'undefined' || id === '') {
    id = '';
} else {
    loginFormElem.uid.value = id;
    saveIdChkElem.checked = true;
}