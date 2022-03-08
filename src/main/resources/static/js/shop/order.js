$('.coupled.modal').modal({allowMultiple: true});

const shipManageBtnElem = document.querySelector('#shipManageBtn');
if (shipManageBtnElem) {
    shipManageBtnElem.addEventListener('click', e => {
        e.preventDefault();
        $('.first.modal').modal('show');
    });
}

//

const searchPostBtnElem = document.querySelector('#searchPostBtn');
const addrInputElem = document.querySelector('#addrInput');
const addrExtraInputElem = document.querySelector('#addrExtraInput');
const addrDetailInputElem = document.querySelector('#addrDetailInput');
const receiverNmInputElem = document.querySelector('#receiverNm');
const receiverPhoneInputElem = document.querySelector('#receiverPhone');

const putAddr = addr => {
    receiverNmInputElem.value = addr.user_nm;
    receiverPhoneInputElem.value = addr.phone;
    addrInputElem.value = `(${addr.post}) ${addr.addr}`;
    addrDetailInputElem.value = addr.addr_detail;
}

$('.ui.radio.checkbox').checkbox().checkbox({
    onChecked: () => {
        const checkedId = document.querySelector('.ui.radio.checkbox.checked').id;
        if (checkedId === 'customChk') {
            document.querySelectorAll('.addrInput').forEach(item => {
                item.value = '';
            })
        } else if (checkedId === 'repChk') {
            fetch('/shop/api/seladdr?param=rep')
                .then(res => res.json())
                .then(data => {
                    putAddr(data);
                }).catch(err => {
                makeErrorToast('등록된 기본 배송지가 없어요.');
                $('#customChk').checkbox('set checked');
            });
        } else if (checkedId === 'recentChk') {
            fetch('/shop/api/seladdr?param=latest')
                .then(res => res.json())
                .then(data => {
                    putAddr(data);
                }).catch(err => {
                makeErrorToast('최근 배송지가 없어요.');
                $('#customChk').checkbox('set checked');
            });
        }
    }
});

//

searchPostBtnElem.addEventListener('click', e => {
    e.preventDefault();
    sample6_execDaumPostcode();
});

let post = '';
let myAddr = '';

function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
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
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
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

//

const addrTbodyElem = document.querySelector('#addrTbody');
const addrNmInputElem = document.querySelector('#addrNmInput');
const userNmInputElem = document.querySelector('#userNmInput');
const addrModalInputElem = document.querySelector('#addrModalInput');
const addrDetailModalInputElem = document.querySelector('#addrDetailModalInput');
const addrExtraModalInputElem = document.querySelector('#addrExtraModalInput');
const phoneInputElem = document.querySelector('#phoneInput');
const searchPostModalBtnElem = document.querySelector('#searchPostModalBtn');

searchPostModalBtnElem.addEventListener('click', e => {
    e.preventDefault();
    addrFieldElem.classList.remove('error');
    sample7_execDaumPostcode();
});

function sample7_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
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
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                addrExtraModalInputElem.classList.remove('hidden');
                addrExtraModalInputElem.value = extraAddr;

            } else {
                addrExtraModalInputElem.classList.add('hidden');
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            addrModalInputElem.value = '(' + data.zonecode + ') ' + addr;

            post = data.zonecode;
            myAddr = addr;

            // 커서를 상세주소 필드로 이동한다.
            addrDetailModalInputElem.value = '';
            addrDetailModalInputElem.focus();
        }
    }).open();
}

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
                    `<td><button id="selectBtn" class="ui basic mini button">선택</button></td>
                     <td>${item.addr_nm}</td>
                     <td>${item.user_nm}</td>
                     <td>(${item.post}) ${item.addr}<br>${item.addr_detail}</td>
                     <td>${item.phone.substring(0, 3) + '-' + item.phone.substring(3, 7) + '-' + item.phone.substring(7, 11)}</td>`;

                tr.querySelector('#selectBtn').addEventListener('click', () => {
                    putAddr(item);
                    $('#customChk').checkbox('set checked');
                    $('.modal').modal('hide');
                });

                const td = document.createElement('td');
                const modBtn = document.createElement('button');
                const delBtn = document.createElement('button');
                modBtn.className = 'ui basic mini button';
                modBtn.innerText = '수정';
                delBtn.className = 'ui basic mini button';
                delBtn.innerText = '삭제';

                delBtn.addEventListener('click', () => {
                    if (confirm('정말 삭제하시겠습니까?')) {
                        fetch(`/mypage/api/addr?iaddress=` + item.iaddress, {method: 'delete'})
                            .then(res => res.json())
                            .then(data => {
                                if (data.result === 1) {
                                    makeInfoToast('주소지를 삭제했어요.');
                                    getList();
                                } else {
                                    makeErrorToast('주소지를 삭제하는데 실패했어요.');
                                }
                            }).catch(err => {
                            console.error(err);
                        });
                    }
                });

                $('.second.modal').modal('attach events', modBtn);
                modBtn.addEventListener('click', () => {
                    addrNmInputElem.value = item.addr_nm;
                    userNmInputElem.value = item.user_nm;
                    addrModalInputElem.value = '(' + item.post + ') ' + item.addr;
                    addrDetailModalInputElem.value = item.addr_detail;
                    phoneInputElem.value = item.phone;
                    if (item.isrep === 'Y') {
                        $('#isRepChk').checkbox('check').checkbox('set disabled');
                    } else {
                        $('#isRepChk').checkbox('uncheck').checkbox('set enabled');
                    }
                    param = 'mod';
                    iaddress = item.iaddress;
                });

                if (item.isrep === 'N') {
                    td.appendChild(delBtn);
                }
                td.appendChild(modBtn);
                tr.appendChild(td);
                addrTbodyElem.appendChild(tr);
            });

            if (data.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML =
                    `<td rowspan="1" colspan="5" class="btline h100">
                        현재 등록된 배송지가 없습니다.
                     </td>`
                addrTbodyElem.appendChild(tr);
            }
        })
        .catch(err => {
            console.error(err);
        });
}

getList();

//

const nmRegex = /^([가-힣]{2,5})$/;
const numRegex = /^[0-9]{9,11}$/;

const addrCancelBtnElem = document.querySelector('#addrCancelBtn');
addrCancelBtnElem.addEventListener('click', () => {
    $('.ui.second.modal').modal('hide');
});

const makeErrorInput = (msg, inputElem, fieldElem) => {
    makeErrorToast(msg);
    inputElem.focus();
    fieldElem.classList.add('error');
    inputElem.addEventListener('keyup', () => {
        fieldElem.classList.remove('error');
    });
}

const addrSubmitBtnElem = document.querySelector('#addrSubmitBtn');

const addrNmFieldElem = document.querySelector('#addrNmField');
const userNmFieldElem = document.querySelector('#userNmField');
const addrFieldElem = document.querySelector('#addrField');
const phoneFieldElem = document.querySelector('#phoneField');

addrSubmitBtnElem.addEventListener('click', () => {
    if (addrNmInputElem.value === '') {
        makeErrorInput('배송지명을 입력해주세요.', addrNmInputElem, addrNmFieldElem);
        return;
    }
    if (addrNmInputElem.value.length > 10) {
        makeErrorInput('배송지명은 10자를 넘을 수 없습니다.', addrNmInputElem, addrNmFieldElem);
        return;
    }

    if (userNmInputElem.value === '') {
        makeErrorInput('받으실 분의 이름을 입력해주세요.', userNmInputElem, userNmFieldElem);
        return;
    }

    if (!nmRegex.test(userNmInputElem.value)) {
        makeErrorInput('이름은 한글로 이루어진 2~5자여야 합니다.', userNmInputElem, userNmFieldElem);
        return;
    }

    if (addrModalInputElem.value === '') {
        makeErrorInput('주소를 입력해주세요.', addrModalInputElem, addrFieldElem);
        searchPostModalBtnElem.addEventListener('click', () => {
            addrFieldElem.classList.remove('error');
        });
        return;
    }

    if (phoneInputElem.value === '') {
        makeErrorInput('연락처를 입력해주세요.', phoneInputElem, phoneFieldElem);
        return;
    }

    if (!numRegex.test(phoneInputElem.value)) {
        makeErrorInput('올바른 연락처를 입력해주세요.', phoneInputElem, phoneFieldElem);
        return;
    }

    const arr = addrModalInputElem.value.replaceAll('(', '').split(') ');
    post = arr[0];
    myAddr = arr[1];
    fetch('/mypage/api/addr', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            iaddress,
            post,
            addr: myAddr,
            addr_detail: addrDetailModalInputElem.value + addrExtraModalInputElem.value,
            phone: phoneInputElem.value,
            addr_nm: addrNmInputElem.value,
            user_nm: userNmInputElem.value,
            isrep: $('#isRepChk').checkbox('is checked') ? 'Y' : 'N',
            param
        })
    }).then(res => res.json())
        .then(data => {
            if (data.result === 1) {
                getList();
                $('.ui.second.modal').modal('hide');
                makeInfoToast(param === 'ins' ? '새 배송지를 등록했어요.' : '배송지 정보를 수정했어요.');
            } else {
                makeErrorToast('배송지 등록을 완료하지 못했어요.');
            }
        })
        .catch(err => {
            console.error(err);
        });
});

const addShipBtnElem = document.querySelector('#addShipBtn');
addShipBtnElem.addEventListener('click', () => {
    if (listLength >= 5) {
        makeErrorToast('배송지 정보는 최대 5개까지 저장할 수 있어요.');
        return;
    }

    if (listLength === 0) {
        $('#isRepChk').checkbox('check').checkbox('set disabled');
    } else {
        $('#isRepChk').checkbox('uncheck').checkbox('set enabled');
    }
    param = 'ins';

    addrNmInputElem.value = '';
    userNmInputElem.value = '';
    addrModalInputElem.value = '';
    addrDetailModalInputElem.value = '';
    phoneInputElem.value = '';
    addrExtraModalInputElem.classList.add('hidden');
    addrExtraModalInputElem.value = '';

    $('.ui.modal')
        .modal('show')
    ;
});

//

const totalPriceDivElem = document.querySelector('#totalPriceDiv');
const totalDiscountDivElem = document.querySelector('#totalDiscountDiv');
const totalAccumulateDivElem = document.querySelector('#totalAccumulateDiv');
const resultPriceBElems = document.querySelectorAll('.resultPriceB');
const discountBElems = document.querySelectorAll('.discountB');
const accumulatePElems = document.querySelectorAll('.accumulateP');

const spendPointInputElem = document.querySelector('#spendPointInput');

const setFinalPrice = () => {
    const finalPrice = priceSum - Number(spendPointInputElem.value);
    document.querySelector('#finalPriceDiv').innerText = finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
    if (finalPrice === 0) {
        $('#paymentWayDropdown').addClass('disabled');
    } else {
        $('#paymentWayDropdown').removeClass('disabled');
    }
}

let priceSum = 0;
resultPriceBElems.forEach(item => {
    priceSum += Number(item.getAttribute('name'));
});
totalPriceDivElem.innerText = priceSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
setFinalPrice();

let discountSum = 0;
discountBElems.forEach(item => {
    discountSum += Number(item.getAttribute('name'));
});
totalDiscountDivElem.innerText = '-' + discountSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';

let accumulateSum = 0;
accumulatePElems.forEach(item => {
    accumulateSum += Number(item.getAttribute('name'));
});
totalAccumulateDivElem.innerText = accumulateSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';

spendPointInputElem.addEventListener('change', () => {
    $('#spendAllChk').checkbox('set unchecked');
    if (Number(spendPointInputElem.value) > Number(spendPointInputElem.getAttribute('name'))) {
        alert('사용 적립금은 현재 적립금을 넘을 수 없습니다.');
        spendPointInputElem.value = spendPointInputElem.getAttribute('name');
    } else if (Number(spendPointInputElem.value) > priceSum) {
        alert('사용 적립금은 결제 예정 금액을 넘을 수 없습니다.');
        spendPointInputElem.value = priceSum;
    }
    setFinalPrice();
});

$('#spendAllChk').checkbox({
    onChecked: () => {
        if (Number(spendPointInputElem.getAttribute('name')) > priceSum) {
            alert('사용 적립금은 결제 예정 금액을 넘을 수 없습니다.');
            spendPointInputElem.value = priceSum;
        } else {
            spendPointInputElem.value = spendPointInputElem.getAttribute('name');
        }
        setFinalPrice();
    }
});

//

const orderBtnElem = document.querySelector('#orderBtn');

const receiverNmFieldElem = document.querySelector('#receiverNmField');
const addrOrderFieldElem = document.querySelector('#addrOrderField');
const phoneOrderFieldElem = document.querySelector('#phoneOrderField');
const receiverPhoneElem = document.querySelector('#receiverPhone');
const shipmentMessageElem = document.querySelector('#shipmentMessage');

orderBtnElem.addEventListener('click', e => {
    e.preventDefault();

    if (receiverNmInputElem.value === '') {
        makeErrorInput('받으실 분의 이름을 입력해주세요.', receiverNmInputElem, receiverNmFieldElem);
        return;
    }

    if (!nmRegex.test(receiverNmInputElem.value)) {
        makeErrorInput('이름은 한글로 이루어진 2~5자여야 합니다.', receiverNmInputElem, receiverNmFieldElem);
        return;
    }

    if (addrInputElem.value === '') {
        makeErrorInput('주소를 입력해주세요.', addrInputElem, addrOrderFieldElem);
        searchPostBtnElem.addEventListener('click', () => {
            addrOrderFieldElem.classList.remove('error');
        });
        return;
    }

    if (receiverPhoneElem.value === '') {
        makeErrorInput('연락처를 입력해주세요.', receiverPhoneElem, phoneOrderFieldElem);
        return;
    }

    if (!numRegex.test(receiverPhoneElem.value)) {
        makeErrorInput('올바른 연락처를 입력해주세요.', receiverPhoneElem, phoneOrderFieldElem);
        return;
    }

    if ($('#paymentWayDropdown').dropdown('get text') === '결제 방법' && !document.querySelector('#paymentWayDropdown').classList.contains('disabled')) {
        makeErrorToast('결제 방법을 선택해주세요.');
        return;
    }

    if ($('#paymentWayDropdown').dropdown('get text') === '무통장입금' || !document.querySelector('#paymentWayDropdown').classList.contains('disabled')) {
        const form = document.createElement('form');
        form.method = 'post';
        form.action = '/shop/order';
        const arr = addrInputElem.value.replace('(', '').split(') ');
        const post = arr[0];
        const addr = arr[1];
        const productTrElems = document.querySelectorAll('.productTr');
        const idetailArr = [];
        productTrElems.forEach(item => {
            idetailArr.push(item.getAttribute('name'));
        });
        const spentPoint = spendPointInputElem.value;

        const body = {
            receiver_nm: receiverNmInputElem.value,
            receiver_post: post,
            receiver_addr: addr,
            receiver_addr_detail: addrDetailInputElem.value + addrExtraInputElem.value,
            receiver_phone: receiverPhoneInputElem.value,
            shipment_message: shipmentMessageElem.value,

            spent_point: spentPoint === '' ? 0 : spentPoint,
            payment_way: $('#paymentWayDropdown').dropdown('get text'),
            idetailList: JSON.stringify(idetailArr)
        }

        for(const key in body) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = body[key];

            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
    }
});