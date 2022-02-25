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

const leaveBtnElem = document.querySelector('#leaveBtn');
const upwInputElem = document.querySelector('#upwInput');
const leaveFormElem = document.querySelector('#leaveForm');
leaveBtnElem.addEventListener('click', e => {
    e.preventDefault();
    fetch('/mypage/api/pwchk', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ upw: upwInputElem.value })
    }).then(res => res.json())
        .then(data => {
            if(data.result === 0) {
                makeErrorToast('비밀번호가 맞지 않아요.');
            } else {
                if(confirm('정말 탈퇴하시겠습니까?\n보유중인 적립금은 사라집니다.')) {
                    leaveFormElem.submit();
                }
            }
        })
        .catch(err => console.error(err));
});