let URL = document.URL;

if (!URL.includes('?')) {
    window.open('comparison_s1.html', '_self')
}

let data = URL.split('?')[1].split("&");
let content = [];
let status = {
    "fee": 0,
    "effect": 0,
    "time": 0,
    "side_effect": 0
}

for (let i = 0; i < data.length; i++) {
    let key = data[i].split('=')[0];
    let value = parseInt(data[i].split('=')[1]);
    status[key] = value;
    content.push(key);
}

function update_stats() {
    let ary = $('.slides').sortable("toArray");
    for (let i = 0; i < ary.length; i++) {
        let txt = "";
        let amount = ary.length - i;
        for (let j = 0; j < amount; j++) txt += "★";
        $('#'+ary[i]).attr('prefix', txt);
    }
}

$(function () {
    //let text = ["★★★","★★","★"];
    $('.slides').sortable({
        start: function (event, ui) {
            let start_pos = ui.item.index();
            ui.item.data('start_pos', start_pos);
        },
        update: function (event, ui) {
            update_stats();
        }
    }).disableSelection();

    Object.keys(status).forEach(item => {
        if (!content.includes(item)) $('#' + item).remove();
    });
    update_stats();

    $('.finish').click(function() {
        let ary = $('.slides').sortable('toArray');
        let order = "";
        let pts_0 = "";
        let pts_1 = "";
        for (let i = 0; i < ary.length; i++) {
            order += ary[i][0];
            let weight = ary.length - i;
            let p0 = 0;
            let p1 = 0;
            if (status[ary[i]]) p1 = weight;
            else p0 = weight;
            pts_1 += p1.toString();
            pts_0 += p0.toString();
        }
        window.open('comparison_result.html?order=' + order + "&pts_0=" + pts_0 + "&pts_1=" + pts_1, '_self');
    })
})