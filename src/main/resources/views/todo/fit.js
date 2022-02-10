$('.ui.dropdown').dropdown();

$('#q1NextBtn').on('click', () => {
    $('.q1').addClass('disnone');
    $('.q2').transition('fade up');
});

$('.rewBtn').on('click', () => {
    window.location.reload();
});

$('.q2NextBtn').on('click', () => {
    $('.q2').transition('hide');
    $('.q3').transition('fade up');
});

$('#q3NextBtn').on('click', () => {
    $('.q3').transition('hide');
    $('.result').transition('fade up');
});