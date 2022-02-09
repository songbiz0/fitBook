const uidElem = document.querySelector('#uid');
const uidInput = uidElem.querySelector('input');

uidInput.addEventListener('change', () => {
    if(uidInput.value.length <= 4) {
        uidElem.classList.add('error');
        uidElem.querySelector('div').classList.remove('hidden');
        uidElem.querySelector('div').classList.remove('cinfo');
        uidElem.querySelector('div').classList.add('cerror');
        uidElem.querySelector('div').innerText = '아이디를 5자 이상 입력해주세요.';
    } else {
        uidElem.classList.add('info');
        uidElem.querySelector('div').classList.remove('hidden');
        uidElem.querySelector('div').classList.remove('cerror');
        uidElem.querySelector('div').classList.add('cinfo');
        uidElem.querySelector('div').innerText = '사용 가능한 아이디입니다.';
    }
});