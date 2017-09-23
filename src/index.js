/**
 * @description common method about xlsx
 * @author curry.liang
 * 注：本人尝试英文翻译，以下注释有问题请谅解
 */
import FileSaver from 'file-saver';
import { utils, write, read } from 'xlsx';
import _ from 'lodash';
/**
 * @description the two main methods of xlsx
 * make it to use next
 */
const { json_to_sheet, table_to_sheet } = utils;

/**
 * @description json to sheet
 * make json arrays to sheet of xlsx, it's usually to use when your data from your databases;
 */
const jsonToSheet = (datas, options) => {
    const opts = Object.assign({}, options, {style: 'json'});
    tSheet(datas, opts);
};

/**
 * @description xlsx to json
 * import a xlsx file and make it to json arrays and you can use it to insert into databases
 */
const sheetToJson = (file) => {
    return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsBinaryString(file);

            // excute when it was loaded
            reader.onload = (data) => {
                const binary = data.target.result;
                const wb = read(binary, {type: 'binary'});
                let res = [];

                // spread arrays and return sorted json arrays
                _.each(wb.SheetNames, (name) => {
                    const data = utils.sheet_to_json(wb.Sheets[name], {header:1});

                    // remove empty arrays 
                    const list = _([...data]).reverse().value();
                    let lastNullNum = 0;
                    _.find(list, (l) => {
                        if (l.length === 0) {
                            lastNullNum++;
                        }
                        return l.length !== 0;
                    });

                    res.push({[name]: _.slice(data, 0, data.length-lastNullNum)});
                });

                resolve(res);
            };

            reader.onerror = reject;
        }
    );
};

// the function of bytes to buff
const toBuff = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);

    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }

    return buf;
}

/**
 * @param datas　 multy datas  example [data1, data2]
 * @param opts　  setting namse  example['sheet1', 'sheet2],
 */
const tSheet = (datas, opts) => {
    const {fileName = 'download', SheetNames = [], style = 'json', writeOptions = {}} = opts;

    // process multy sheet
    let Sheets = {}, sNames = [];
    _.each(datas, (data, index) => {
        const sheetName = SheetNames[index] ? SheetNames[index]: ('sheet'+ index); //如果没有传名字，则给默认名字
        Sheets[sheetName] = (style==='json') ? json_to_sheet(data) : table_to_sheet(data);
        sNames.push(sheetName);
    });

    const ws = write({SheetNames: sNames, Sheets: Sheets}, {bookType: 'xlsx', type: 'binary'});

    const wsblob = new Blob([toBuff(ws)], {type: 'application/octet-stream'}); //创建二进制对象写入转换好的字节流
    FileSaver.saveAs(wsblob, fileName);
};

export { jsonToSheet, sheetToJson };