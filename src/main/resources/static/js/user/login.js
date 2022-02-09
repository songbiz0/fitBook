const loginBtnElem = document.querySelector('#loginBtn');

/*
if(loginBtnElem) {
    loginBtnElem.addEventListener('click', e => {
        e.preventDefault();
        $('body')
            .toast({
                class: 'error',
                message: '올바른 아이디를 입력해주세요.'
            });
    });
}
 */

const findIdBtnElem = document.querySelector('#findIdBtn');
findIdBtnElem.addEventListener('click', () => {
    $('.ui.modal.findId')
        .modal('show')
    ;
});