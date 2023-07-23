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
        let p_h = e.offsetY / document.querySelector('.' + item + "-img").height;
        if (item === "fee" && img_url(p_w, p_h)) return;
        if (p_w >= 0.34 && p_w <= 0.66) select(item, 0);
        if (p_w > 0.66 && p_w <= 0.97) select(item, 1);
    });
}, false);

function select(title, id) {
    document.querySelectorAll('.comparison_s2_button').forEach(item => item.remove());
    document.querySelectorAll('.next').forEach(item => item.classList.remove('hidden'));
    sel = id;
    document.querySelector('.' + title + '-img').setAttribute('src', 'resources/comparison/determine/' + title + '_' + id + '.png')
}

function img_url(p_w, p_h) {
    let url = undefined;
    // 單標靶淋巴無轉移費用
    if (p_w >= 0.46 && p_w <= 0.65 && p_h >= 0.44 && p_h <= 0.53) url = "https://docs.google.com/spreadsheets/d/1xHeBhM9t0Es_rWqMNtRmgWV2U_UihbMyeGs8bhMAoHs/edit?usp=sharing";
    // 雙標靶淋巴無轉移費用
    if (p_w >= 0.72 && p_w <= 0.92 && p_h >= 0.44 && p_h <= 0.53) url = "https://docs.google.com/spreadsheets/d/1MEj2KW4EpReXw2dpDyoDhlLhbjVfEq8-OfCkopGZ6wg/edit?usp=sharing";
    // 雙標靶淋巴轉移費用
    if (p_w >= 0.72 && p_w <= 0.92 && p_h >= 0.76 && p_h <= 0.86) url = "https://docs.google.com/spreadsheets/d/18RQYx0WtjlEDUVbvXUAm0NtbEPx3W4uXX1L4aUaTh-4/edit?usp=sharing";
    if (url !== undefined) {
        window.open(url);
        return true;
    }
    return false;
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