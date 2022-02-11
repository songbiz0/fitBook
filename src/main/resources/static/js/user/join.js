const joinFormElem = document.querySelector('#joinForm');

const uidElem = document.querySelector('#uid');
const uidInput = uidElem.querySelector('input');

const upwElem = document.querySelector('#upw');
const upwInput = upwElem.querySelector('input');

const upwconElem = document.querySelector('#upwcon');
const upwconInput = upwconElem.querySelector('input');

const nmElem = document.querySelector('#nm');
const nmInput = nmElem.querySelector('input');

const emailElem = document.querySelector('#email');
const emailInput = emailElem.querySelector('input');

const emailconElem = document.querySelector('#emailcon');
const emailconInput = emailconElem.querySelector('input');

const emailConfBtnElem = document.querySelector('#emailConfBtn');
const emailCodeBtnElem = document.querySelector('#emailCodeBtn');
const joinCancelBtnElem = document.querySelector('#joinCancelBtn');

const idRegex = /^([a-zA-Z0-9]{4,15})$/;
const pwRegex = /^([a-zA-z0-9!@#$%^&*()_-]{4,20})$/;
const nmRegex = /^([가-힣]{2,5})$/;
const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

let idOk = false;
let pwOk = false;
let pwConOk = false;
let nmOk = false;
let emailOk = false;

const makeErrorBox = (elem, msg) => {
    elem.classList.add('error');
    elem.classList.remove('info');
    elem.querySelector('div').classList.remove('hidden');
    elem.querySelector('div').classList.remove('cinfo');
    elem.querySelector('div').classList.add('cerror');
    elem.querySelector('div').innerText = msg;
}

const makeInfoBox = (elem, msg) => {
    elem.classList.add('info');
    elem.classList.remove('error');
    elem.querySelector('div').classList.remove('hidden');
    elem.querySelector('div').classList.remove('cerror');
    elem.querySelector('div').classList.add('cinfo');
    elem.querySelector('div').innerText = msg;
}

uidInput.addEventListener('keyup', () => {
    if (!idRegex.test(uidInput.value)) {
        makeErrorBox(uidElem, '아이디는 영어, 숫자로 이루어진 4~15자여야 합니다.');
        idOk = false;
    } else {
        fetch(`/user/idChk/${uidInput.value}`)
            .then(res => res.json())
            .then(data => {
                if (data.result === 1) {
                    makeErrorBox(uidElem, '이미 등록되어 있는 아이디입니다.');
                    idOk = false;
                } else {
                    makeInfoBox(uidElem, '사용 가능한 아이디입니다.');
                    idOk = true;
                }
            });
    }
});

upwInput.addEventListener('keyup', () => {
    if (!pwRegex.test(upwInput.value)) {
        makeErrorBox(upwElem, '비밀번호는 영어, 숫자, 특수문자로 이루어진 4~20자여야 합니다.');
        pwOk = false;
    } else {
        makeInfoBox(upwElem, '사용 가능한 비밀번호입니다.');
        pwOk = true;
    }
});

upwconInput.addEventListener('keyup', () => {
    if (upwInput.value !== upwconInput.value) {
        makeErrorBox(upwconElem, '비밀번호가 일치하지 않습니다.');
        pwConOk = false;
    } else {
        makeInfoBox(upwconElem, '비밀번호가 일치합니다.');
        pwConOk = true;
    }
});

nmInput.addEventListener('keyup', () => {
    if (!nmRegex.test(nmInput.value)) {
        makeErrorBox(nmElem, '이름은 한글로 이루어진 2~5자여야 합니다.');
        nmOk = false;
    } else {
        makeInfoBox(nmElem, '사용 가능한 이름입니다.');
        nmOk = true;
    }
});

let emailCode = '';

emailConfBtnElem.addEventListener('click', e => {
    e.preventDefault();
    if(!emailRegex.test(emailInput.value)) {
        $('body').toast({
            class: 'error',
            message: '올바른 이메일 형식을 입력해주세요.'
        });
        return;
    }

    fetch(`/user/emailChk?email=${emailInput.value}`)
        .then(res => res.json())
        .then(data => {
            if(data.result === 0) {
                $('body').toast({
                    class: 'error',
                    message: '이미 존재하는 이메일이에요.'
                });
            } else {
                joinFormElem.classList.add('loading');

                fetch(`/email`, {
                    method: 'post',
                    body: JSON.stringify({email: emailInput.value}),
                    headers: {'Content-Type': 'application/json'}
                }).then(res => res.json())
                    .then(data => {
                        emailCode = data.resultString;
                        if (emailCode === undefined) {
                            $('body').toast({
                                class: 'error',
                                message: '이메일 전송에 실패했어요.'
                            });
                            joinFormElem.classList.remove('loading');
                        } else {
                            $('body').toast({
                                class: 'info',
                                message: '인증번호를 전송했어요.'
                            });
                            joinFormElem.classList.remove('loading');
                            emailInput.setAttribute('disabled', '');
                        }
                    }).catch(err => {
                    console.error(err);
                    $('body').toast({
                        class: 'error',
                        message: '이메일 전송에 실패했어요.'
                    });
                    joinFormElem.classList.remove('loading');
                });
            }
        }).catch(err => { console.error(err) });
});

let confirmedEmail = '';

emailCodeBtnElem.addEventListener('click', e => {
    e.preventDefault();
    if(emailCode === undefined) {
        $('body').toast({
            class: 'error',
            message: '먼저 인증코드를 전송해주세요.'
        });
        return;
    }
    if(emailconInput.value === emailCode) {
        $('body').toast({
            class: 'info',
            message: '이메일 인증에 성공했어요.'
        });
        confirmedEmail = emailInput.value;
        emailInput.classList.add('info');
        emailOk = true;
    } else {
        $('body').toast({
            class: 'error',
            message: '인증코드가 맞지 않아요.'
        });
    }
});

joinFormElem.addEventListener('submit', e => {
    if(!idOk || !pwOk || !pwConOk || !nmOk || !emailOk) {
        $('body').toast({
            class: 'error',
            message: '올바른 정보를 입력해주세요.'
        });
        e.preventDefault();
    }
    emailInput.setAttribute('readonly', '');
    emailInput.removeAttribute('disabled');
    if(emailInput.value !== confirmedEmail) {
        e.preventDefault();
    }
});

joinCancelBtnElem.addEventListener('click', e => {
    e.preventDefault();
    window.history.back();
});