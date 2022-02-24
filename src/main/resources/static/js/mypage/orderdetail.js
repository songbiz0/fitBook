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

const orderCancelBtnElem = document.querySelector('#orderCancelBtn');
const refundBtnElem = document.querySelector('#refundBtn');
const confirmOrderBtnElem = document.querySelector('#confirmOrderBtn');
const refundCancelBtnElem = document.querySelector('#refundCancelBtn');
const dataElem = document.querySelector('#data');

const iorder = dataElem.dataset.iorder;
const orderstatus = dataElem.dataset.orderstatus;
const preorder = dataElem.dataset.preorder;

if(orderCancelBtnElem) {
    orderCancelBtnElem.addEventListener('click', () => {
        if (confirm('주문을 취소하시겠습니까?')) {
            fetch('/mypage/api/orderchange', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    iorder,
                    order_status: '취소완료',
                    param: 'orderChange'
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.result === 0) {
                        makeErrorToast('주문 취소에 실패했어요.');
                    } else {
                        alert('주문을 취소했습니다.');
                        location.reload();
                    }
                })
                .catch(err => console.error(err));
        }
    });
}

if(refundBtnElem) {
refundBtnElem.addEventListener('click', () => {
    if(confirm('환불을 신청하시겠습니까?')) {
        fetch('/mypage/api/orderchange', {
            method: 'post',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                iorder,
                order_status: '환불신청',
                pre_order_status: orderstatus,
                param: 'refund'
            })
        }).then(res => res.json())
            .then(data => {
                if(data.result === 0) {
                    makeErrorToast('환불 신청에 실패했어요.');
                } else {
                    alert('환불 신청이 완료되었습니다.');
                    location.reload();
                }
            })
            .catch(err => console.error(err));
    }
});
}

if(confirmOrderBtnElem) {
confirmOrderBtnElem.addEventListener('click', () => {
    if(confirm('상품을 구매 확정하시겠습니까?')) {
        fetch('/mypage/api/orderchange', {
            method: 'post',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                iorder,
                order_status: '구매확정',
                param: 'confirmOrder'
            })
        }).then(res => res.json())
            .then(data => {
                if(data.result === 0) {
                    makeErrorToast('구매 확정에 실패했어요.');
                } else {
                    alert('상품을 구매 확정했습니다.');
                    location.reload();
                }
            })
            .catch(err => console.error(err));
    }
});
}

if(refundCancelBtnElem) {
refundCancelBtnElem.addEventListener('click', () => {
    if(confirm('환불 신청을 취소하시겠습니까?')) {
        fetch('/mypage/api/orderchange', {
            method: 'post',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                iorder,
                order_status: preorder,
                param: 'refundCancel'
            })
        }).then(res => res.json())
            .then(data => {
                if(data.result === 0) {
                    makeErrorToast('환불 신청 취소에 실패했어요.');
                } else {
                    alert('환불 신청을 취소했습니다.');
                    location.reload();
                }
            })
            .catch(err => console.error(err));
    }
});
}