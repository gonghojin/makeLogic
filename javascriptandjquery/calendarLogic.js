<!-- 날짜 포맷 형식을 변경을 위한 로직-->
var calendarLogic = {
    init: function () {

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
     * 날짜 타입 변경 2 - yyyymmddhhmmss
     *  ex) date.yyyymmddhhmmss
     *      return 20181108010644
     */
    getyyyymmddhhmmss: function () {
        Date.prototype.yyyymmdd = function () {
            var mm = this.getMonth() + 1;
            var dd = this.getDate();

            //
            return [this.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('');
        };

        Date.prototype.hhmmss = function () {
            var hh = this.getHours();
            var mm = this.getMinutes();
            var ss = this.getSeconds();

            return [(hh > 9 ? '' : '0') + hh,
                (mm > 9 ? '' : '0') + mm,
                (ss > 9 ? '' : '0') + ss,
            ].join('');
        };

        Date.prototype.yyyymmddhhmmss = function () {
            return this.yyyymmdd() + this.hhmmss();
        };

    }
}
calendarLogic.init();

