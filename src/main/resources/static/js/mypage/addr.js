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

const addrNmFieldElem = document.querySelector('#addrNmField');
const userNmFieldElem = document.querySelector('#userNmField');
const addrFieldElem = document.querySelector('#addrField');
const addrDetailFieldElem = document.querySelector('#addrDetailField');
const phoneFieldElem = document.querySelector('#phoneField');

const searchPostBtnElem = document.querySelector('#searchPostBtn');
const addrNmInputElem = document.querySelector('#addrNmInput');
const userNmInputElem = document.querySelector('#userNmInput');
const addrInputElem = document.querySelector('#addrInput');
const addrDetailInputElem = document.querySelector('#addrDetailInput');
const addrExtraInputElem = document.querySelector('#addrExtraInput');
const phoneInputElem = document.querySelector('#phoneInput');
const isRepChkElem = document.querySelector('#isRepChk');
const addrTbodyElem = document.querySelector('#addrTbody');

const addrCancelBtnElem = document.querySelector('#addrCancelBtn');
const addrSubmitBtnElem = document.querySelector('#addrSubmitBtn');
const addShipBtnElem = document.querySelector('#addShipBtn');

const nmRegex = /^([가-힣]{2,5})$/;
const numRegex = /^[0-9]{9,11}$/;

let listLength = 0;
let param = '';
let iaddress = 0;

const getList = () => {
    fetch('/mypage/api/addrlist')
        .then(res => res.json())
        .then(data => {
            addrTbodyElem.innerHTML = '';
            listLength = data.length;

            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML =
                    `<td>${item.addr_nm}</td>
                     <td>${item.user_nm}</td>
                     <td>(${item.post}) ${item.addr}<br>${item.addr_detail}</td>
                     <td>${item.phone.substring(0,3) + '-' + item.phone.substring(3,7) + '-' + item.phone.substring(7,11)}</td>`;
                const td = document.createElement('td');
                const modBtn = document.createElement('button');
                const delBtn = document.createElement('button');
                modBtn.className = 'ui basic mini button';
                modBtn.innerText = '수정';
                delBtn.className = 'ui basic mini button';
                delBtn.innerText = '삭제';

                delBtn.addEventListener('click', () => {
                    if(confirm('정말 삭제하시겠습니까?')) {
                        fetch(`/mypage/api/addr?iaddress=` + item.iaddress, { method: 'delete' })
                            .then(res => res.json())
                            .then(data => {
                                if(data.result === 1) {
                                    makeInfoToast('주소지를 삭제했어요.');
                                    getList();
                                } else {
                                    makeErrorToast('주소지를 삭제하는데 실패했어요.');
                                }
                            }).catch(err => { console.error(err); });
                    }
                });

                modBtn.addEventListener('click', () => {
                    addrNmInputElem.value = item.addr_nm;
                    userNmInputElem.value = item.user_nm;
                    addrInputElem.value = '(' + item.post + ') ' + item.addr;
                    addrDetailInputElem.value = item.addr_detail;
                    phoneInputElem.value = item.phone;
                    if(item.isrep === 'Y') {
                        $('.ui.checkbox').checkbox('check').checkbox('set disabled');
                    } else {
                        $('.ui.checkbox').checkbox('uncheck').checkbox('set enabled');
                    }
                    param = 'mod';
                    iaddress = item.iaddress;

                    $('.ui.modal').modal('show');
                });

                if(item.isrep === 'N') {
                    td.appendChild(delBtn);
                }
                td.appendChild(modBtn);
                tr.appendChild(td);
                addrTbodyElem.appendChild(tr);
            });

            if(data.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML =
                    `<td rowspan="1" colspan="5" class="btline h100">
                        현재 등록된 배송지가 없습니다.
                     </td>`
                addrTbodyElem.appendChild(tr);
            }
        })
        .catch(err => { console.error(err); });
}

getList();

searchPostBtnElem.addEventListener('click', e => {
    e.preventDefault();
    sample6_execDaumPostcode();
});

let post = '';
let myAddr = '';

function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                addrExtraInputElem.classList.remove('hidden');
                addrExtraInputElem.value = extraAddr;

            } else {
                addrExtraInputElem.classList.add('hidden');
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            addrInputElem.value = '(' + data.zonecode + ') ' + addr;

            post = data.zonecode;
            myAddr = addr;

            // 커서를 상세주소 필드로 이동한다.
            addrDetailInputElem.value = '';
            addrDetailInputElem.focus();
        }
    }).open();
}

addrCancelBtnElem.addEventListener('click', () => {
    $('.ui.modal').modal('hide');
});

const makeErrorInput = (msg, inputElem, fieldElem) => {
    makeErrorToast(msg);
    inputElem.focus();
    fieldElem.classList.add('error');
    inputElem.addEventListener('keyup', () => {
        fieldElem.classList.remove('error');
    })
}

addrSubmitBtnElem.addEventListener('click', () => {
    if(addrNmInputElem.value === '') {
        makeErrorInput('배송지명을 입력해주세요.', addrNmInputElem, addrNmFieldElem);
        return;
    }
    if(addrNmInputElem.value.length > 10) {
        makeErrorInput('배송지명은 10자를 넘을 수 없습니다.', addrNmInputElem, addrNmFieldElem);
        return;
    }

    if(userNmInputElem.value === '') {
        makeErrorInput('받으실 분의 이름을 입력해주세요.', userNmInputElem, userNmFieldElem);
        return;
    }

    if(!nmRegex.test(userNmInputElem.value)) {
        makeErrorInput('이름은 한글로 이루어진 2~5자여야 합니다.', userNmInputElem, userNmFieldElem);
        return;
    }

    if(addrInputElem.value === '') {
        makeErrorInput('주소를 입력해주세요.', addrInputElem, addrFieldElem);
        searchPostBtnElem.addEventListener('click', () => {
            addrFieldElem.classList.remove('error');
        });
        return;
    }

    if(phoneInputElem.value === '') {
        makeErrorInput('연락처를 입력해주세요.', phoneInputElem, phoneFieldElem);
        return;
    }

    if(!numRegex.test(phoneInputElem.value)) {
        makeErrorInput('올바른 연락처를 입력해주세요.', phoneInputElem, phoneFieldElem);
        return;
    }

    fetch('/mypage/api/addr', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            iaddress,
            post,
            addr: myAddr,
            addr_detail: addrDetailInputElem.value + addrExtraInputElem.value,
            phone: phoneInputElem.value,
            addr_nm: addrNmInputElem.value,
            user_nm: userNmInputElem.value,
            isrep: $('.ui.checkbox').checkbox('is checked') ? 'Y' : 'N',
            param
        })
    }).then(res => res.json())
        .then(data => {
            if(data.result === 1) {
                getList();
                $('.ui.modal').modal('hide');
                makeInfoToast(param === 'ins' ? '새 배송지를 등록했어요.' : '배송지 정보를 수정했어요.');
            } else {
                makeErrorToast('배송지 등록을 완료하지 못했어요.');
            }
        })
        .catch(err => { console.error(err); });
});

addShipBtnElem.addEventListener('click', () => {
    if(listLength === 0) {
        $('.ui.checkbox').checkbox('check').checkbox('set disabled');
    } else {
        $('.ui.checkbox').checkbox('uncheck').checkbox('set enabled');
    }
    param = 'ins';

    addrNmInputElem.value = '';
    userNmInputElem.value = '';
    addrInputElem.value = '';
    addrDetailInputElem.value = '';
    phoneInputElem.value = '';

    $('.ui.modal')
        .modal('show')
    ;
});