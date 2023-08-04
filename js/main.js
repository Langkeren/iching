// noinspection JSUnresolvedReference,JSCheckFunctionSignatures

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
    const name = ['地', '山', '水', '风', '雷', '火', '泽', '天'];
    const first = parseInt(guaXiang[0]) + parseInt(guaXiang[1]) * 2
        + parseInt(guaXiang[2]) * 4;
    const last = parseInt(guaXiang[3]) + parseInt(guaXiang[4]) * 2
        + parseInt(guaXiang[5]) * 4;
    if (first === last) {
        return guaName + '为' + name[first];
    } else {
        return name[first] + name[last] + guaName;
    }
}

// 结果3天内有效
const EFFECT_MINUTES = 60 * 24 * 3
const randomKey = "randomKey"
let randomNumber = (new Date()).getTime();
function init(){
    route();
    // 随机数
    const cachedRandom = sessionGet(randomKey);
    if (cachedRandom != null){
        randomNumber = parseInt(cachedRandom)
    }else {
        randomNumber = Math.floor(randomNumber * Math.random());
        sessionSet(randomKey, randomNumber, EFFECT_MINUTES)
    }

    console.log("随机数: " + randomNumber)

    //
}


function route(){
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const gua = urlParams.get("gua")
    if (gua != null){
        showGua(gua)
    }
}

function getIndex(arrays, ...no){
    for (let i = 0; i < arrays.length; i++){
        if (no.includes(i)){
            continue
        }

        return i
    }
}

function toUnicode(str){
    let code = 1
    for (let i = 0; i < str.length; i++){
        code = i % 2 === 0 ? code & str.charCodeAt(i).toString(10) :
            code | str.charCodeAt(i).toString(10);

        code = code % 1000
    }
    return code;
}
function start(){
    const inputNumber = [document.getElementById("num1").value, document.getElementById("num2").value, document.getElementById("num3").value]
    console.log("用户输入", inputNumber);
    for (let i = 0; i < inputNumber.length; i++){
        const inStr = inputNumber[i]
        if (!inStr){
            const ram = Math.random()
            console.log("第" + (i+1) + "个数字缺失, 赋值随机数: " + ram)
            inputNumber[i] = ram
        }
        // 不是数字
        if (isNaN(inputNumber[i]) || isNaN(parseFloat(inputNumber[i]))){
            inputNumber[i] = toUnicode(inputNumber[i])
            console.log("第" + (i+1) + "个输入不是数字, 转为unionCode", inStr, inputNumber[i])
        }
    }
    const num1 = inputNumber[0] * randomNumber;
    const num2 = inputNumber[1] * randomNumber;
    const num3 = inputNumber[2] * randomNumber;
    const numberArray = [num1, num2, num3];
    const count = numberArray.length;
    console.log("生成随机数", numberArray);


    // 通过随机数决定那数字的属性
    const changeIndex = randomNumber % count;
    const skyIndex = getIndex(numberArray, changeIndex)
    const earthIndex = getIndex(numberArray, changeIndex, skyIndex)
    console.log("变, 天, 地: 索引", changeIndex, skyIndex, earthIndex)

    const guaSize = gua.length;
    const change = Math.round(numberArray[changeIndex]) % 6;
    const sky = Math.ceil(numberArray[skyIndex]) % guaSize;
    const earth = Math.floor(numberArray[earthIndex]) % guaSize;

    console.log("变爻, 天卦, 地卦: 位置", change, sky, earth)
    const predict = gua[sky].bit + gua[earth].bit
    console.log("本卦, 变爻为: ", predict, change)
    showGua(predict, change)
}

function showGua(predict, change){
    const info = guaInfo.gua.filter(e => e['gua-xiang'] === predict)[0]
    console.log('当前卦象', predict, info)
    if (info == null){
        return
    }

    globalInfo.selectedGua = info
    globalInfo.index = guaInfo.gua.indexOf(info)
    loadGua(predict)
    let result = "<p>本卦: " + guaData[predict] + " 卦";
    if (change != null){
        result += ", 变爻为" + (change + 1)  + " 爻。"

        // 之卦
        const currentYao = predict.charAt(change)
        const changeGua = predict.substring(0, change) + (1 - currentYao) + predict.substring(change + 1)
        console.log("之卦", changeGua)

        let currentUrl = window.location.href;
        currentUrl = currentUrl.split('&gua=')[0]
        console.log(currentUrl);
        if (currentUrl.includes("?")){
            currentUrl += "&gua=" + changeGua
        }else {
            currentUrl += "?gua=" + changeGua
        }
        result += "  之卦: <a href='" +  currentUrl + "' style='color: blueviolet'>" + guaData[changeGua] + "</a> 卦"
    }else {
        console.log("没有变爻")
    }

    result += "</p>"
    document.getElementById("result").innerHTML = result;
    document.getElementById("info").innerHTML = "<p>" + getGuaName(info["gua-xiang"], info["gua-name"]) + "</p>"
    document.getElementById("guaCi").innerHTML = "卦辞：<p>" + info['gua-detail'] + "</p>";

    let yaoCi = info['yao-detail'].join("<br/>")
    document.getElementById("yaoCi").innerHTML = "爻辞：<p>" + yaoCi + "</p>"


    const explainPretty = getExplainList(explainData[predict]).join("<br/>")
    document.getElementById("explain").innerHTML = "<p>" + explainPretty + "</p>"
}


/**
 * 源数据为一行, 需要格式化
 * @param explains raw data
 * @returns {*[]} pretty string
 */
function getExplainList(explains){
    let tmp = ''
    const all = []
    for (let i = 0; i < explains.length; i++){
        if (explains[i] === '爻' && (i+1) < explains.length && explains[i+1] === '辞'){
            const len = tmp.length
            const prev = tmp.substring(0, len - 2)
            all.push(prev + "<br/>")
            tmp = "<br/>"
            // 忽略下一个'辞'字
            i++;
        }else {
            tmp += explains[i]
        }
    }

    all.push(tmp)

    return all
}



const globalInfo = {
    gua: guaInfo.gua,
    index: 0,
    selectedGua: null
};
function loadGua(guaXiang) {
    for (let y = 6; y > 0; --y) {
        const yao = $('#yao' + y + ' .yinyang');
        if (yao.hasClass('yin') && guaXiang[6-y] === '1') {
            yao.removeClass('yin', 1000).addClass('yang');
        } else if (yao.hasClass('yang') && guaXiang[6-y] === '0') {
            yao.addClass('yin', 1000).removeClass('yang');
        }
    }

    const name = globalInfo.selectedGua['gua-name'];
    $('#back-title').text(name);
    $('#gua-number').text(globalInfo.index + 1);
    $('#gua-name').text(getGuaName(guaXiang, name));
    $('#gua-detail').text(globalInfo.selectedGua['gua-detail']);
}

let showDetail = false
$(document).ready(function () {
    $('.yao').hover(function () {
        let yaoDetail;
        if (globalInfo.selectedGua === null) {
            return;
        }
        $('.yao, #back-title').addClass('unhover');
        $(this).removeClass('unhover');

        const id = 5 - $(this).index();
        const idStrList = ['初', '二', '三', '四', '五', '上'];
        const yinYang = globalInfo.selectedGua['gua-xiang'][id] === '1' ? '九' : '六';
        if (id === 0 || id === 5) {
            yaoDetail = idStrList[id] + yinYang;
        } else {
            yaoDetail = yinYang + idStrList[id];
        }
        yaoDetail += '：' + globalInfo.selectedGua['yao-detail'][id];
        $('#yao-detail').css('top', $(this).offset().top).text(yaoDetail)
            .show();
    }, function () {
        $('.yao, #back-title').removeClass('unhover');
        $('#yao-detail').hide();

    }).click(function () {
        if (globalInfo.selectedGua === null) {
            return;
        }
        const id =  $(this).index();
        let guaXiang = globalInfo.selectedGua['gua-xiang'];
        let changeBit = guaXiang[id];
        changeBit = changeBit === '1' ? '0' : '1';
        guaXiang = guaXiang.substr(0, id) + changeBit + guaXiang.substr(id + 1);
        // loadGua(guaXiang);
        showGua(guaXiang, id)
        // location.hash = guaXiang;
        $('.yao, #back-title').removeClass('unhover');
        $('#yao-detail').hide();
    });


    $('#show-detail').click(function (){
        showDetail = !showDetail
        if (showDetail){
            // $('#show-detail').text("收起详解")
            $('.up-arrow').css("display", "block")
            $('.down-arrow').css("display", "none")
            $('#result').css("display", "block")
            $('#changeGua').css("display", "block")
            $('#explains-all').css("display", "block")
        }else {
            // $('#show-detail').text("详解")
            $('.up-arrow').css("display", "none")
            $('.down-arrow').css("display", "block")
            $('#result').css("display", "none")
            $('#changeGua').css("display", "none")
            $('#explains-all').css("display", "none")
        }
    })
});