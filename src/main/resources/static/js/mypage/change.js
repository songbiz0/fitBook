const makeErrorToast = msg => {
    $(document).ready(() => {
            $('body').toast({
                class: 'error',
                message: msg
            });
        }
    );
}

const makeInfoToast = msg => {
    $(document).ready(() => {
            $('body').toast({
                class: 'info',
                message: msg
            });
        }
    );
}

let pwChanged = false;
let nmChanged = false;
let emailChanged = false;

const pwChangeBtnElem = document.querySelector('#pwChangeBtn');
const pwInputElem = document.querySelector('#pwInput');
const pwInputConfElem = document.querySelector('#pwInputConf');

if(pwChangeBtnElem) {
    pwChangeBtnElem.addEventListener('click', e => {
        e.preventDefault();
        pwChangeBtnElem.classList.add('disnone');
        pwInputElem.classList.remove('disnone');
        pwInputConfElem.classList.remove('disnone');
        pwChanged = true;
    });
}

const nmChangeBtnElem = document.querySelector('#nmChangeBtn');
const fixedNmElem = document.querySelector('#fixedNm');
const nmInputElem = document.querySelector('#nmInput');

if(nmChangeBtnElem) {
    nmChangeBtnElem.addEventListener('click', e => {
        e.preventDefault();
        fixedNmElem.classList.add('disnone');
        nmChangeBtnElem.classList.add('disnone');
        nmInputElem.classList.remove('disnone');
        nmChanged = true;
    });
}

const emailChangeBtnElem = document.querySelector('#emailChangeBtn');
const fixedEmailElem = document.querySelector('#fixedEmail');
const emailInputElem = document.querySelector('#emailInput');
const emailCodeInputElem = document.querySelector('#emailCodeInput');

let emailCode = '';
let emailOk = false;

if(emailChangeBtnElem) {
    emailChangeBtnElem.addEventListener('click', e => {
        e.preventDefault();
        fixedEmailElem.classList.add('disnone');
        emailChangeBtnElem.classList.add('disnone');
        emailInputElem.classList.remove('disnone');
        emailConfBtnElem.classList.remove('disnone');
        emailCodeInputElem.classList.remove('disnone');
        emailCodeBtnElem.classList.remove('disnone');
        emailChanged = true;

        emailConfBtnElem.addEventListener('click', e => {
            e.preventDefault();
            if(emailInput.value === oldEmail) {
                makeErrorToast('?????? ???????????? ?????????.');
                return;
            }

            if(!emailRegex.test(emailInput.value)) {
                makeErrorToast('????????? ????????? ????????? ??????????????????.');
                return;
            }

            fetch(`/user/emailChk?email=${emailInput.value}`)
                .then(res => res.json())
                .then(data => {
                    if(data.result === 0) {
                        makeErrorToast('?????? ???????????? ??????????????????.');
                    } else {
                        changeFormElem.classList.add('loading');

                        fetch(`/email`, {
                            method: 'post',
                            body: JSON.stringify({email: emailInput.value}),
                            headers: {'Content-Type': 'application/json'}
                        }).then(res => res.json())
                            .then(data => {
                                emailCode = data.resultString;
                                if (emailCode === undefined) {
                                    makeErrorToast('????????? ????????? ???????????????.');
                                    changeFormElem.classList.remove('loading');
                                } else {
                                    makeInfoToast('??????????????? ???????????????.');
                                    changeFormElem.classList.remove('loading');
                                    emailInput.setAttribute('disabled', '');
                                }
                            }).catch(err => {
                            console.error(err);
                            makeErrorToast('????????? ????????? ???????????????.');
                            changeFormElem.classList.remove('loading');
                        });
                    }
                }).catch(err => { console.error(err) });
        });

        let confirmedEmail = '';

        emailCodeBtnElem.addEventListener('click', e => {
            e.preventDefault();
            if(emailCode === undefined) {
                makeErrorToast('?????? ??????????????? ??????????????????.');
                return;
            }
            if(emailCodeInput.value === emailCode) {
                makeInfoToast('????????? ????????? ???????????????.');
                confirmedEmail = emailInput.value;
                emailCodeInputElem.setAttribute('disabled', '');
                emailOk = true;
            } else {
                makeErrorToast('??????????????? ?????? ?????????.');
            }
        });
    });
}

const pwRegex = /^([a-zA-z0-9!@#$%^&*()_-]{4,20})$/;
const nmRegex = /^([???-???]{2,5})$/;
const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const changeInfoCancelBtnElem = document.querySelector('#changeInfoCancelBtn');
if(changeInfoCancelBtnElem) {
changeInfoCancelBtnElem.addEventListener('click', e => {
    e.preventDefault();
    location.href = '/';
});
}

const changeFormElem = document.querySelector('#changeForm');

const nmElem = document.querySelector('#nm');
const nmInput = nmElem.querySelector('input');
const emailElem = document.querySelector('#email');
const emailInput = emailElem.querySelector('input');
const emailCodeElem = document.querySelector('#emailCode');
const emailCodeInput = emailCodeElem.querySelector('input');

const emailConfBtnElem = document.querySelector('#emailConfBtn');
const emailCodeBtnElem = document.querySelector('#emailCodeBtn');

const oldNm = nmInput.value;
const oldEmail = emailInput.value;

const pwFieldElem = document.querySelector('#pwField');
const pwConfFieldElem = document.querySelector('#pwConfField');

const changeInfoBtnElem = document.querySelector('#changeInfoBtn');

const makeErrorBox = (elem, input) => {
    elem.classList.add('error');
    input.addEventListener('keyup', () => {
        elem.classList.remove('error');
    });
}

pwInputElem.addEventListener('change', () => {
    fetch('/user/pw_chk', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ upw: pwInputElem.value })
    }).then(res => res.json)
        .then(data => {
            pwOk = data.result !== 1;
        }).catch(err => { console.error(err); });
});

if(changeInfoBtnElem) {
changeInfoBtnElem.addEventListener('click', e => {
    e.preventDefault();

    if(!nmChanged && !pwChanged && !emailChanged) {
        makeErrorToast('????????? ????????? ?????????.');
        return;
    }

    if(pwChanged) {
        if(!pwRegex.test(pwInputElem.value)) {
            makeErrorToast('??????????????? ??????, ??????, ??????????????? ???????????? 4~20????????? ??????.');
            makeErrorBox(pwFieldElem, pwInputElem);
            return;
        }

        if(!pwOk) {
            makeErrorToast('?????? ??????????????? ?????????.');
            makeErrorBox(pwFieldElem, pwInputElem);
            return;
        }

        if(pwInputElem.value !== pwInputConfElem.value) {
            makeErrorToast('??????????????? ???????????? ?????????');
            makeErrorBox(pwConfFieldElem, pwInputConfElem);
            return;
        }
    }

    if(nmChanged) {
        if(nmInputElem.value === oldNm) {
            makeErrorToast('?????? ????????? ?????????.');
            makeErrorBox(nmElem, nmInputElem);
            return;
        }

        if(!nmRegex.test(nmInputElem.value)) {
            makeErrorToast('????????? ????????? ???????????? 2~5????????? ??????.');
            makeErrorBox(nmElem, nmInputElem);
            return;
        }
    }

    if(emailChanged && !emailOk) {
        makeErrorToast('?????? ????????? ????????? ?????? ????????????.');
        makeErrorBox(emailCodeElem, emailCodeInputElem);
        return;
    }

    emailInput.setAttribute('readonly', '');
    emailInput.removeAttribute('disabled');

    if(!pwChanged) {
        pwInputElem.value = null;
    }
    if(!nmChanged) {
        nmInputElem.value = null;
    }
    if(!emailChanged) {
        emailInputElem.value = null;
    }

    changeFormElem.submit();
});
}