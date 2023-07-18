// 判斷有沒有包含順序
let URL = document.URL;
if (!URL.includes('?care=')) {
    window.open('comparison_s1.html', '_self')
}
let order = URL.split('?care=')[1].split('&')[0];
let data_saved = URL.includes('&') ? URL.substring(URL.indexOf('&')) : '';
let item;
let sel = undefined;

switch (order[0]) {
    case 'f':
        item = "fee";
        break;
    case 'e':
        item = "effect";
        break;
    case 't':
        item = "time";
        break;
    case 's':
        item = "side_effect";
        break;
}
order = order.substring(1);


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#' + item).classList.remove('hidden');
    document.querySelector('.' + item + "-img").addEventListener('click', function (e) {
        let p_w = e.offsetX / document.querySelector('.' + item + "-img").width;
        if (p_w >= 0.34 && p_w <= 0.66) select(item, 0);
        if (p_w > 0.66 && p_w <= 0.97) select(item, 1);
    });
}, false);

//calc
function calc_money() {
    let fee = parseInt(document.querySelector('#a').value) * parseInt(document.querySelector('#b').value);
    document.querySelector('#fee_result').innerHTML = "費用: " + fee;
}

function select(title, id) {
    sel = id;
    document.querySelector('.' + title + '-img').setAttribute('src', 'resources/comparison/determine/' + title + '_' + id + '.png')
}

function submit() {
    //確認填寫狀況
    if (sel === undefined) {
        alert('請進行選擇！');
        return;
    }
    data_saved += "&" + item + "=" + sel;
    if (order.length === 0) {
        window.open('comparison_s3.html?' + data_saved.substring(1), '_self');
        return;
    }
    window.open('comparison_s2.html?care=' + order + data_saved, '_self');
}