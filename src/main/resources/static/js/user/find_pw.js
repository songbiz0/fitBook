const findPwFormElem = document.querySelector('#findPwForm');
const uidInputElem = document.querySelector('#uidInput');
const emailInputElem = document.querySelector('#emailInput');
const findPwCancelBtnElem = document.querySelector('#findPwCancelBtn');
const findPwBtnElem = document.querySelector('#findPwBtn');

const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

findPwCancelBtnElem.addEventListener('click', e => {
    e.preventDefault();
    window.history.back();
});

findPwBtnElem.addEventListener('click', e => {
    e.preventDefault();
    const emailInputValue = emailInputElem.value;
    if(!emailRegex.test(emailInputValue)) {
        $('body').toast({
            class: 'error',
            message: '올바른 이메일 형식을 입력해주세요.'
        });
        return;
    }

    fetch(`/user/find_pw/find?uid=${uidInputElem.value}&email=${emailInputValue}`)
        .then(res => res.json())
        .then(data => {
            if(data.result === 0) {
                $('body').toast({
                    class: 'error',
                    message: '해당하는 회원 정보가 없어요.'
                });
            } else {
                findPwFormElem.classList.add('loading');
                fetch(`/findPw`, {
                    method: 'post',
                    body: JSON.stringify({
                        email : emailInputValue,
                        uid : uidInputElem.value
                    }),
                    headers: { 'Content-Type': 'application/json' }
                    }).then(res => res.json())
                    .then(data => {
                        if(data.result === 0) {
                            findPwFormElem.classList.remove('lading');
                            $('body').toast({
                                class: 'error',
                                message: '비밀번호 변경에 실패했어요.'
                            });
                        } else {
                            findPwFormElem.classList.remove('lading');
                            location.href='/user/find_pw_result';
                        }
                    }).catch(err => { console.log(err) });
            }
        }).catch(err => { console.error(err) });
});