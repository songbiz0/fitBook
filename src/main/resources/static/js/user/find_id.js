const findIdForm = document.querySelector('#findIdForm');
const findIdCancelBtnElem = document.querySelector('#findIdCancelBtn');
const findIdBtnElem = document.querySelector('#findIdBtn');
const emailInputElem = document.querySelector('#emailInput');

const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

findIdCancelBtnElem.addEventListener('click', e => {
    e.preventDefault();
    window.history.back();
});

findIdBtnElem.addEventListener('click', e => {
    e.preventDefault();
    const emailInputValue = emailInputElem.value;
    if(!emailRegex.test(emailInputValue)) {
        $('body').toast({
            class: 'error',
            message: '올바른 이메일 형식을 입력해주세요.'
        });
        return;
    }

    fetch(`/user/find_id/${emailInputValue}`)
        .then(res => res.json())
        .then(data => {
            location.href=`/user/find_id_result?uid=${data.resultString}`;
        }).catch(err => {
            console.error(err);
    })
});
