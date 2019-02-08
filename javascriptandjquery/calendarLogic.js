<!-- 날짜 포맷 형식을 변경을 위한 로직-->
var calendarLogic = {
    init: function () {
        var _this = this;
        _this.makeDateFormat();
    },
    /**
     * 날짜 문자 포맷 변경(ex 2018-06-08 <-> 20180608)\
     *
     * @param date : 포맷 변경할 기준 날짜
     * @returns {*}
     */
    convertDate: function (date) {
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
    },

    /**
     * 날짜 타입 변경 1
     *
     * @param data : datetime ex(2018-11-08 01:06:44)
     * @returns {string} : 2018-11-08 01:06
     */
    getDateFormat: function (data) {
        var myDate = new Date(data);
        // slice가 붙는 이유 : 12월은 012 - 12표출, 9월은 09표출
        return myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() + 1)).slice(-2) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + ('0' + (myDate.getMinutes())).slice(-2);

    },
    /**
     * "yyyy-mm-dd" 형식 체크
     * @param date
     */
    validationFormat_snale: function (date) {
        var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
        if (!date_pattern.test(form.name.value)) {
            return;
        }
    },

    /**
     format에 따른 날짜 툴력
     //2011년 09월 11일 오후 03시 45분 42초
     console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초"));

     //2011-09-11
     console.log(new Date().format("yyyy-MM-dd"));

     //'11 09.11
     console.log(new Date().format("'yy MM.dd"));

     //2011-09-11 일요일
     console.log(new Date().format("yyyy-MM-dd E"));

     //현재년도 : 2011
     console.log("현재년도 : " + new Date().format("yyyy"));

     *
     */
    makeDateFormat: function () {
        Date.prototype.format = function (f) {
            if (!this.valueOf()) return " ";

            var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            var d = this;

            return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function (x) {
                switch (x) {
                    case "yyyy":
                        return d.getFullYear();
                    case "yy":
                        return (d.getFullYear() % 1000).zf(2);
                    case "MM":
                        return (d.getMonth() + 1).zf(2);
                    case "dd":
                        return d.getDate().zf(2);
                    case "E":
                        return weekName[d.getDay()];
                    case "HH":
                        return d.getHours().zf(2);
                    case "hh":
                        return ((h = d.getHours() % 12) ? h : 12).zf(2);
                    case "mm":
                        return d.getMinutes().zf(2);
                    case "ss":
                        return d.getSeconds().zf(2);
                    case "a/p":
                        return d.getHours() < 12 ? "오전" : "오후";
                    default:
                        return $1;
                }
            });
        };

        String.prototype.string = function (len) {
            var s = '', i = 0;
            while (i++ < len) {
                s += this;
            }
            return s;
        };
        String.prototype.zf = function (len) {
            return "0".string(len - this.length) + this;
        };
        Number.prototype.zf = function (len) {
            return this.toString().zf(len);
        };
    }
}
calendarLogic.init();

