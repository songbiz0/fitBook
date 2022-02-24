$('.ui.dropdown').dropdown();

$('.ui.sidebar').sidebar('setting', 'transition', 'overlay');

const sidebarBtn = document.querySelector('.sidebar_toggle');
if(sidebarBtn) {
    sidebarBtn.addEventListener('click', () => {
        $('.ui.sidebar').sidebar('show');
    });
}

$('.ui.accordion')
    .accordion()
;

const applyBtn = document.querySelector('#applyBtn');
if(applyBtn) {
    applyBtn.addEventListener('click', () => {
        location.href = 'list.html';
    });
}

const cancelBtn = document.querySelector('#cancelBtn');
if(cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        $('.ui.sidebar').sidebar('hide');
    });
}

const cartBtn = document.querySelector('#cartBtn');
if(cartBtn) {
    cartBtn.addEventListener('click', () => {
        $('body')
            .toast({
                class: 'info',
                message: '상품을 장바구니에 담았어요.'
            });
    });
}

const getReview = document.querySelector('#goToProductReview');
if(getReview) {
    getReview.addEventListener('click', () => {
        window.scrollTo({top: document.querySelector('#productReview').offsetTop});
    });
}


const reviewWriteBtn = document.querySelector('#reviewWriteBtn');
if(reviewWriteBtn) {
    reviewWriteBtn.addEventListener('click', () => {
        $('.ui.modal').modal('show');
    });
}

