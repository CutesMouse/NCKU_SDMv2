// 判斷有沒有包含順序
let URL = document.URL;
if (!URL.includes('?care=')) {
    window.open('comparison_s1.html', '_self')
}
let order = URL.split('?care=')[1].split('&')[0];
let data_saved = URL.includes('&') ? URL.substring(URL.indexOf('&')) : '';
let item;
let sel = undefined;

let calc_mode = "sn";

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
    if (p_w >= 0.46 && p_w <= 0.65 && p_h >= 0.44 && p_h <= 0.53) url = 'sn';
    // 雙標靶淋巴無轉移費用
    if (p_w >= 0.72 && p_w <= 0.92 && p_h >= 0.44 && p_h <= 0.53) url = "dn";
    // 雙標靶淋巴轉移費用
    if (p_w >= 0.72 && p_w <= 0.92 && p_h >= 0.76 && p_h <= 0.86) url = "dy";
    if (url !== undefined) {
        show_calc(url);
        window.open(`#${url}-calculator`, '_self');
        return true;
    }
    return false;
}

function show_calc(mode) {
    calc_mode = mode;
    document.querySelector('.calc_title').classList.remove('calc_hidden');
    resetCalc();
    switch (calc_mode) {
        case "sn":
            document.querySelector('#sn-calculator').classList.remove('calc_hidden');
            document.querySelector('.calc_ptr1').classList.add('single_color');
            document.querySelector('.calc_ptr1').innerHTML = "單標靶";
            document.querySelector('.calc_ptr2').classList.add('no_swift_color');
            document.querySelector('.calc_ptr2').innerHTML = "淋巴無轉移";
            break;
        case "dn":
            document.querySelector('#dn-calculator').classList.remove('calc_hidden');
            document.querySelector('.calc_ptr1').classList.add('double_color');
            document.querySelector('.calc_ptr1').innerHTML = "雙標靶";
            document.querySelector('.calc_ptr2').classList.add('no_swift_color');
            document.querySelector('.calc_ptr2').innerHTML = "淋巴無轉移";
            break;
        case "dy":
            document.querySelector('#dy-calculator').classList.remove('calc_hidden');
            document.querySelector('.calc_ptr1').classList.add('double_color');
            document.querySelector('.calc_ptr1').innerHTML = "雙標靶";
            document.querySelector('.calc_ptr2').classList.add('swift_color');
            document.querySelector('.calc_ptr2').innerHTML = "淋巴轉移";
            break;
    }
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

function reset_result() {
    document.querySelectorAll(`.${calc_mode}-result .lower`).forEach(item => item.classList.remove('lower'));
    document.querySelector(`.${calc_mode}-result`).classList.add('calc_hidden');
}

function resetCalc() {
    document.querySelector('#sn-calculator').classList.add('calc_hidden');
    document.querySelector('#dn-calculator').classList.add('calc_hidden');
    document.querySelector('#dy-calculator').classList.add('calc_hidden');
    document.querySelector('.calc_ptr1').classList.remove('double_color');
    document.querySelector('.calc_ptr2').classList.remove('swift_color');
}

function str(num) {
    num = Math.round(num);
    let result = "";
    while (num >= 1000) {
        let left = num % 1000;
        if (left < 10) result = "00"+left.toString() + result;
        else if (left < 100) result = "0"+left.toString() + result;
        else result = left.toString() + result;
        num /= 1000;
        num = Math.floor(num);
        result = ","+result;
    }
    result = num + result;
    return result;
}

function calc_sn() {
    reset_result();
    let weight = document.querySelector('#sn-weight').value;
    let vein = document.querySelector('#sn-vein').value;
    let surface = document.querySelector('#sn-surface').value;
    if (weight === '' || vein === '' || surface === '') {
        alert('請填寫完整資料!');
        return;
    }

    let v_18 = (vein / 440) * 8 * weight + (vein / 440) * 6 * 17 * weight;
    let v_1 = (vein / 440) * 6 * weight;

    let s_18 = surface * 18;
    let s_1 = surface;

    if (v_18 < s_18) document.querySelector('#sn-v_18').classList.add('lower');
    if (v_18 > s_18) document.querySelector('#sn-s_18').classList.add('lower');
    if (v_1 < s_1) document.querySelector('#sn-v_1').classList.add('lower');
    if (v_1 > s_1) document.querySelector('#sn-s_1').classList.add('lower');

    let d_18 = Math.abs(v_18 - s_18);
    let d_1 = Math.abs(v_1 - s_1);

    document.querySelector('#sn-v_18').innerHTML = str(v_18);
    document.querySelector('#sn-v_1').innerHTML = str(v_1);
    document.querySelector('#sn-s_18').innerHTML = str(s_18);
    document.querySelector('#sn-s_1').innerHTML = str(s_1);
    document.querySelector('#sn-d_18').innerHTML = str(d_18);
    document.querySelector('#sn-d_1').innerHTML = str(d_1);
    document.querySelector('.sn-result').classList.remove('calc_hidden');
}
function calc_dn() {
    reset_result();
    let weight = document.querySelector('#dn-weight').value;
    let vein = document.querySelector('#dn-vein').value;
    let hvein = document.querySelector('#dn-hvein').value;
    let surface = document.querySelector('#dn-surface').value;
    let dsurface = document.querySelector('#dn-dsurface').value;
    if (weight === '' || vein === '' || surface === '' || hvein === '' || dsurface === '') {
        alert('請填寫完整資料!');
        return;
    }

    let v_18 = (vein / 440) * 8 * weight + (vein / 440) * 6 * 17 * weight;
    let v_1 = (vein / 440) * 6 * weight;

    let s_18 = surface * 18;
    let s_1 = surface;

    let v2_18 = hvein * 18;
    let v2_1 = hvein * 1;

    let v3_18 = dsurface * 18;
    let v3_1 = dsurface * 1;

    if (v_18 < s_18) document.querySelector('#dn-v_18').classList.add('lower');
    if (v_18 > s_18) document.querySelector('#dn-s_18').classList.add('lower');
    if (v_1 < s_1) document.querySelector('#dn-v_1').classList.add('lower');
    if (v_1 > s_1) document.querySelector('#dn-s_1').classList.add('lower');

    let d_18 = Math.round(Math.abs(v_18 - s_18));
    let d_1 = Math.round(Math.abs(v_1 - s_1));

    document.querySelector('#dn-v_18').innerHTML = str(v_18);
    document.querySelector('#dn-v_1').innerHTML = str(v_1);
    document.querySelector('#dn-s_18').innerHTML = str(s_18);
    document.querySelector('#dn-s_1').innerHTML = str(s_1);
    document.querySelector('#dn-d_18').innerHTML = str(d_18);
    document.querySelector('#dn-d_1').innerHTML = str(d_1);
    document.querySelector('#dn-v2_18').innerHTML = str(v2_18);
    document.querySelector('#dn-v2_1').innerHTML = str(v2_1);
    document.querySelector('#dn-v3_18').innerHTML = str(v3_18);
    document.querySelector('#dn-v3_1').innerHTML = str(v3_1);
    document.querySelector('.dn-result').classList.remove('calc_hidden');
}
function calc_dy() {
    reset_result();
    let weight = document.querySelector('#dy-weight').value;
    let hvein = document.querySelector('#dy-hvein').value;
    if (weight === '' || hvein === '') {
        alert('請填寫完整資料!');
        return;
    }

    let v_18 = hvein * 18;
    let v_1 = hvein;

    document.querySelector('#dy-v_18').innerHTML = str(v_18);
    document.querySelector('#dy-v_1').innerHTML = str(v_1);
    document.querySelector('.dy-result').classList.remove('calc_hidden');
}