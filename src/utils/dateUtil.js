/**
 * 日期工具类
 * @Autor linzs
 * @Date 2018/01/29
 */
class dateUtil {

    /**
     * 日期格式化
     * @Param fmt 
     *          格式要求：完整格式为yyyyMMdd HHmmssS，可灵活选取日期格式
     * @Param value
     *          时间戳格式值
     */
    static format(fmt, value) {
        var dt = new Date(value);
        var o = {           
            "M+" : dt.getMonth()+1, //月份           
            "d+" : dt.getDate(), //日           
            "h+" : dt.getHours()%12 == 0 ? 12 : dt.getHours()%12, //小时           
            "H+" : dt.getHours(), //小时           
            "m+" : dt.getMinutes(), //分           
            "s+" : dt.getSeconds(), //秒           
            "q+" : Math.floor((dt.getMonth()+3)/3), //季度           
            "S" : dt.getMilliseconds() //毫秒           
        };           
        var week = {           
            "0" : "/u65e5",           
            "1" : "/u4e00",           
            "2" : "/u4e8c",           
            "3" : "/u4e09",           
            "4" : "/u56db",           
            "5" : "/u4e94",           
            "6" : "/u516d"          
        };           
        if(/(y+)/.test(fmt)){           
            fmt=fmt.replace(RegExp.$1, (dt.getFullYear()+"").substr(4 - RegExp.$1.length));           
        }           
        if(/(E+)/.test(fmt)){           
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[dt.getDay()+""]);           
        }           
        for(var k in o){           
            if(new RegExp("("+ k +")").test(fmt)){           
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
            }           
        }           
        return fmt; 
    }
}

export default dateUtil;