$('.ui.dropdown').dropdown();

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

//

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
