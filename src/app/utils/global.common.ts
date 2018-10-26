/**
 * 金额格式化
 * @param {*str} n
 */
const parseMone = (n) => {
    let _str = '';
    if (isNaN(n)) {
        return;
    }

    let re = /^[0-9]*[1-9][0-9]*$/; // 判断是不是整数

    if (re.test(n) || n == 0) { //eslint-disable-line
        if (n == 0) {//eslint-disable-line
            _str = n;
        } else {
            _str = parseNum(n) + '.00';
        }
    } else {
        let k = '.' + n.toString().split('.')[1]; // 截取小数
        if (k.length <= 2) {
            k += '0';
        }
        k = k.substr(0, 3);
        let h = JSON.parse(n.toString().split('.')[0]);
        _str = parseNum(h) + k;
    }
    return _str;
};

/**
 * 时间格式化
 * @param {*Date} time  new Date()
 * @param {*} fmt  //yyyy-MM-dd
 */
const format = (time, fmt) => {
    let o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        'S': time.getMilliseconds()// 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};
/**
 * 每3位加个','
 * @param {*} num
 */
const parseNum = (num) => {
    let list = new String(num).split('').reverse(); // eslint-disable-line no-new-wrappers
    for (var i = 0; i < list.length; i++) {
        if (i % 4 === 3) {
            list.splice(i, 0, ',');
        }
    }
    return list.reverse().join('');
};
/**
 *
 * @param {*文件上传支持的类型} item
 */
 const getFileType = (item) => {
    // 判断是否是图片
    let strFilter = ['jpeg', 'jpg', 'png', 'pic', 'bmp', 'gif'];
    let strPostfix;
    if (!item) {
        return null;
    }
    if (item.indexOf('.') > -1) {
        strPostfix = item.split('.').pop().toLowerCase();
        if (strFilter.includes(strPostfix)) {
            return 'image';
        } else if (['pdf'].includes(strPostfix)) {
            return 'pdf';
        } else if (['rar', 'zip'].includes(strPostfix)) {
            return 'package';
        } else {
            return false; // 不支持的文件类型
        }
    }
    return null;
};


/**
 *
 * @param {*改变图片大小} src
 * @param {*} size
 */
const changeImgSize = (src, size = '100x100') => {
    let i = src.lastIndexOf('.');
    return (src = src.substring(0, i) + '_' + size + src.substring(i));
};

/**
 * 密码加密处理
 */
import CryptoJS from './plugins/aes/aes-min.min.js';
import SHA256 from './plugins/sha256/sha256.min.js';
const encryption = (password, clientid, token) => {
    let _encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(SHA256(password)), CryptoJS.enc.Utf8.parse(clientid), {
        iv: CryptoJS.enc.Utf8.parse(token),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Iso10126
    });
    return CryptoJS.enc.Base64.stringify(_encrypted.ciphertext);
};

/**
 * 数据字典
 * @param {*options} obj
 * @param type  平台端数据字典还是 企业端 cdc，默认是平台端 dict
 */
// import Http from '../axios/index.js';
// let dictionarie = {
//     cdc: {}, // 企业专用  默认是企业
//     dict: {} // 平台专用 pingtai
// };
// export const Dictionarie = (code, isRefresh, type = 'cdc') => {
//     if (type !== 'cdc') {
//         type = 'dict';
//     }
//     if (dictionarie[type][code] && !isRefresh) {
//         return Promise.resolve(dictionarie[type][code]);
//     } else {
//         return new Promise((resolve, reject) => {
//             if (type === 'cdc') {
//                 Http('cdc.dict.findByCode', {
//                     dictNumber: code
//                 }).then(result => {
//                     let list = result.data || [];
//                     if (list.length) {
//                         dictionarie[type][code] = list.map(item => ({
//                             name: item.dictVal,
//                             key: item.dictVal,
//                             value: item.dictNumber,
//                             prop: item.dictNumber,
//                             id: item.code,
//                             parentCode: item.parentCode
//                         }));
//                         resolve(dictionarie[type][code]);
//                     }
//                 });
//             } else {
//                 Http('base.data.open.dictionaryAPI.findByCode', {
//                     code: code
//                 }).then(result => {
//                     let list = result.data.options || [];
//                     if (list.length) {
//                         dictionarie[type][code] = list.map(item => ({
//                             key: item.name,
//                             name: item.name,
//                             value: item.value,
//                             prop: item.value,
//                             id: item.id,
//                             parentCode: item.parentCode
//                         }));
//                         resolve(dictionarie[type][code]);
//                     }
//                 });
//             }
//         });
//     }
// };


/**
 ctrl+s 事件
 */
const ctrlS = (callback) => {
    let e:any = event || window.event;
    let currKey = 0;
    currKey = e.keyCode || e.which || e.charCode;
    if ((e.ctrlKey || e.metaKey) && currKey === 83) {
        // 阻止默认浏览器动作(W3C)
        if (window.event) {       // 这是IE浏览器
            e.returnValue = false;// 阻止默认事件
        }
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        callback && (callback());
    }
};

/**
 * 对象数组的深度拷贝.
 * source是原数据，extendObj是新增的键值对
 */
const objArrDeepCopy = (source, extendObj) => {
    var sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objArrDeepCopy(source[item], extendObj) : source[item];
        if (typeof extendObj === 'object' && !(sourceCopy instanceof Array)) {
            for (let param in extendObj) {
                sourceCopy[param] = extendObj[param];
            }
        }
    }
    return sourceCopy;
};

/**
 * 文件下载
 * @param {*下载链接} data
 * @param {*下载文件名} strFileName
 */
const downloadFile = (data, strFileName) => {
    // 判断是否支持download
    var isSupportDownload = 'download' in document.createElement('a');
    if (isSupportDownload) {
        let aLink = document.createElement('a');
        let evt = document.createEvent('MouseEvents');
        evt.initEvent('click', false, false); // initEvent 不加后两个参数在FF下会报错
        aLink.href = data + '?action=download';
        aLink.download = strFileName;
        aLink.dispatchEvent(evt);
    } else {
        window.open(data + '?action=download', '_blank');
    }
};



// 去掉多余空的children
const reverseData = (list, map) => {
    list.forEach(item => {
        if (map) {
            item.id = item[map.id];
            item.label = item[map.label];
        } else {
            item.id = item.id || item.no;
            item.label = item.label || item.name;
        }
        if (item.children && item.children.length) {
            reverseData(item.children, map);
        } else {
            delete item.children;
        }
    });
    return list;
};

function trim(str){

    return str.replace(/(^\s*)|(\s*$)/g, "");
    
    }
// 工具函数
export let Tools = {
    encryption,
    reverseData,
    //手机正则
    telReg: /^1[3|4|5|8|9][0-9]\d{4,8}$/,
    emailReg: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    getSelectValue (id, source = []) {
        let result = '';
        source.forEach(item => {
            let value = item.id || item.value || item.val;
            if (id === value) {
                result = item.text || item.label || item.name;
            }
        });
        return result;
    },
    clearAttr (obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                this.clearAttr(obj[key]);
            } else if (typeof obj[key] === 'string' && trim(obj[key]) === '') {
                delete obj[key];
            }
        }
    }
};
export default Tools;