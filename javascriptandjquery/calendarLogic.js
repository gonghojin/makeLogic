<!-- 날짜 포맷 형식을 변경을 위한 로직-->


/**
 * 날짜 문자 포맷 변경(ex 2018-06-08 <-> 20180608)\
 *
 * @param date : 포맷 변경할 기준 날짜
 * @returns {*}
 */
function convertDate(date) {
    var year;
    var month;
    var day;
    var result; // 변환 결과

    if (nvl(date, "") == "") {
        return date;
    }
    if (date.indexOf('-') == -1) { //'-' 포함 형식 날짜
        year = date.substr(0, 4);
        month = date.substr(4, 2);
        day = date.substr(6, 2);
        result = year + "-" + month + "-" + day;
    } else { // '-' 미포함 형식 날짜
        year = date.substr(0, 4);
        month = date.substr(5, 2);
        day = date.substr(8, 2);
        result = year + "" + month + "" + day;
    }

    return result;
}

/**
 * 
 * @param searchValue : 기준 날짜
 * @param replaceValue : 기준 날짜 +, - 할 수치
 * @returns {string} : 변환된 날짜
 */
function calcDate(searchValue, replaceValue) {
    var year = parseInt(searchValue.substr(0,4));// 년: substr으로 추출된 문자열 -> int타입
    var month = parseInt(searchValue.substr(0,4));// 월
    var day = parseInt(searchValue.substr(0,4));// 일

   var tempDate = new Date(year, month -1, day + replaceValue) // 보통 month가 0부터 시작하기 때문에 월을 구할 떄는 + 1을 하지만
                                            // 제대로 된 값이 들어오네??.. 상황 보고 변경
                                            // day 값이 -가 되어도 자동적으로 month 값에서 값 변경
    year = tempDate.getFullYear();

    month = tempDate.getMonth() + 1;
    month = (month < 10)? '0' + month: month; // ex)  2월 -> 02월

    day = day.getDate();
    day = (day < 10) ? '0' + day : day;

    return year + '' + month + '' + day;
}

/**
 * null 값 대체
 *
 * @param searchValue
 * @param replaceValue
 * @returns {string}
 */

function nvl(searchValue, replaceValue) {
    var result = "";

    try {
        var temp = $.trim(searchValue); // 앞뒤 공백 제거
        // null 값 시 대체값 변환
        if (!temp || temp == null || temp == "null" || temp == "undefiend" || temp == undefined || temp == "") {
            result = replaceValue
        } else {
            result = searchValue;
        }
    } catch (exeception) {
        result = replaceValue;
    }

    return result;
}