var common = {
    /***
     * result Value
     * -1 :  no value
     * 1 :   ms browser
     * 2 : opr
     * 3 : chrome
     * 4 : safari
     * 5 :  firefox
     * @returns {number}
     */
    checkBroswer : function () {
        var agent = navigator.userAgent.toLowerCase(),
            name = navigator.appName,
            browser = -1;

        // MS 계열 브라우저를 구분
        if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
            browser = 1;
            /*if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
                agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
                browser += parseInt(agent[1]);
            } else { // IE 11+
                if(agent.indexOf('trident') > -1) { // IE 11
                    browser += 11;
                } else if(agent.indexOf('edge/') > -1) { // Edge
                    browser = 'edge';
                }
            }*/
        } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
            if(agent.indexOf('opr') > -1) { // Opera
                browser = 2;
            } else if(agent.indexOf('chrome') > -1) { // Chrome
                browser = 3;
            } else { // Safari
                browser = 4;
            }
        } else if(agent.indexOf('firefox') > -1) { // Firefox
            browser = 5;
        }

        return browser;
    },
    /**
     * 숫자값만 Valid [ex : 전화번호에 사용]
     */
    onlyNumber: function () {
        if ((event.keyCode < 48) || (event.keyCode > 57)) {
           // ms용
            if (this.checkBroswer() == 1) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    }
}
common