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

const headerSearchElem = document.querySelector('#headerSearch');
if(headerSearchElem) {
    const headerSearchInputElem = headerSearchElem.querySelector('input');
    const headerSearchBtnElem = headerSearchElem.querySelector('button');

    headerSearchBtnElem.addEventListener('click', () => {
        const search = headerSearchInputElem.value;

        if (search.length === 0) {
            makeErrorToast('검색어를 입력해주세요.');
            headerSearchInputElem.focus();
            return;
        }

        location.href = '/shop/list?search=' + search;
    });

    headerSearchInputElem.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            headerSearchBtnElem.click();
        }
    });
}