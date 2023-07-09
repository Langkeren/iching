const guaData = {'111111':'乾','011111':'夬','000000':'坤','010001':'屯','100010':'蒙','010111':'需','111010':'讼','000010': '师',
    '010000':'比','110111':'小畜','111011':'履','000111':'泰','111000':'否','111101':'同人','101111':'大有','000100':'谦',
    '001000':'豫','011001':'随','100110':'蛊','000011':'临','110000':'观','101001':'噬嗑','100101':'贲','100000':'剥',
    '000001':'复','111001':'无妄','100111':'大畜','100001':'颐','011110':'大过','010010':'坎','101101':'离','011100':'咸',
    '001110':'恒','111100':'遁','001111':'大壮','101000':'晋','000101':'明夷','110101':'家人','101011':'睽','010100':'蹇',
    '001010':'解','100011':'损','110001':'益','111110':'姤','011000':'萃','000110':'升','011010':'困','010110':'井',
    '011101':'革','101110':'鼎','001001':'震','100100':'艮','110100':'渐','001011':'归妹','001101':'丰','101100':'旅',
    '110110':'巽','011011':'兑','110010':'涣','010011':'节','110011':'中孚','001100':'小过','010101':'既济','101010':'未济'}

const gua = [
    {'bit':'000','gua':'坤'},
    {'bit':'111','gua':'乾'},
    {'bit':'011','gua':'兑'},
    {'bit':'101','gua':'离'},
    {'bit':'001','gua':'震'},
    {'bit':'110','gua':'巽'},
    {'bit':'010','gua':'坎'},
    {'bit':'100','gua':'艮'}
]

function getGuaName(guaXiang, guaName) {
    const name = ['地', '雷', '水', '泽', '山', '火', '风', '天'];
    const last = parseInt(guaXiang[0]) + parseInt(guaXiang[1]) * 2
        + parseInt(guaXiang[2]) * 4;
    const first = parseInt(guaXiang[3]) + parseInt(guaXiang[4]) * 2
        + parseInt(guaXiang[5]) * 4;
    if (first === last) {
        return guaName + '为' + name[first];
    } else {
        return name[first] + name[last] + guaName;
    }
}

function start(){
    const time = (new Date()).getTime();
    const num1 = Math.floor(document.getElementById("num1").value * time * Math.random());
    const num2 = Math.ceil(document.getElementById("num2").value * time * Math.random());
    const num3 = Math.floor(document.getElementById("num3").value * time * Math.random());


    console.log(num1, num2, num3);
    const change = num3 % 6;
    const guaSize = gua.length;
    const sky = num2 % guaSize;
    const earth = num1 % guaSize;

    const predict = gua[sky].bit + gua[earth].bit
    console.log(predict)

    const info = guaInfo.gua.filter(e => e['gua-xiang'] === predict)[0]
    console.log(info)
    document.getElementById("result").innerHTML = "<p>占卦结果: " + guaData[predict] + " 卦, 变爻为" + (change + 1)  + " 爻</p>"
    document.getElementById("info").innerHTML = "<p>" + getGuaName(info["gua-xiang"], info["gua-name"]) + "</p>"
    document.getElementById("guaCi").innerHTML = "卦辞：<p>" + info['gua-detail'] + "</p>";

    let yaoCi = info['yao-detail'].join("<br/>")
    document.getElementById("yaoCi").innerHTML = "爻辞：<p>" + yaoCi + "</p>"
    document.getElementById("explain").innerHTML = "<p>" + explainData[predict] + "</p>"
}
