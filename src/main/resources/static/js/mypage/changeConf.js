const makeErrorToast = msg => {
    $(document).ready(() => {
            $('body').toast({
                class: 'error',
                message: msg
            });
        }
    );
}

const errElem = document.querySelector('#err');
if (errElem) {
    makeErrorToast('올바른 비밀번호를 입력해주세요.');
}