function select(id) {
    document.querySelectorAll('.comparison_s1_button').forEach(item => item.remove());
    document.querySelectorAll('.next').forEach(item => item.classList.remove('hidden'));
    let selected = undefined;
    switch (id) {
        case 0:
            selected = "#fee";
            break;
        case 1:
            selected = "#effect";
            break;
        case 2:
            selected = "#time";
            break;
        case 3:
            selected = "#side_effect";
            break;
    }
    if (document.querySelector(selected).classList.contains('selected')) {
        document.querySelector(selected).classList.remove('selected');
        return;
    }
    document.querySelector(selected).classList.add('selected');
}

function submit() {
    let care = "";
    let care_element = document.querySelectorAll('.selected');
    if (care_element.length === 0) {
        alert('請選擇選項!');
        return;
    }
    care_element.forEach(item => care += (item.id[0]));
    window.open('comparison_s2.html?care='+care, '_self');
}