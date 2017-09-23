import React from 'react';
import { jsonToSheet } from '../src/index';

class Export extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                name: '张三',
                age: 23,
                sex: '男',
                company: 'this is a big company',
                workNumber: 4567
            },{
                name: '张三1',
                age: 20,
                sex: '男',
                company: '鲜盒子',
                workNumber: 4567
            }],
            downloading: false,
            count: 1000,
        };
        this.handleExportData = ::this.handleExportData;
        this.handleExportMoreJsonData = ::this.handleExportMoreJsonData;
    }
    handleExportData() {
        const { data } = this.state;

        const options = {
            fileName: 'xian_test.xlsx',
        };
        jsonToSheet([data], options)
    }
    handleExportMoreJsonData() {
        console.log('hello');
        const self = this;
        // setting options
        const options = {
            fileName: '进货历史.xlsx',
            SheetNames: ['进货历史']
        };
        self.setState({downloading: true});
        let data = [];
        data.push([1,2,3,4,5,6,7,8,9,10]);
        setTimeout(()=>{
            for(let m = 0; m<self.state.count; m++){
                // insert element Loop
                let column = [];
                for(let n=0;n<10;n++){
                    const name = '第'　+ (m + 2)+ '行，第' + (n+1) + '列';
                    column.push(name);
                }
                data.push(column)
                console.log(data);
            }
            jsonToSheet([data], options);
            self.setState({downloading: false});
        }, 500);
    }

    render() {
        return (
            <div style={{padding: '15px'}}>
                <div style={{padding: '10px'}}/>
                <button className="btn btn-default" onClick={this.handleExportData}>数据导出</button>
                <div style={{padding: '10px'}}>通过json数据导出</div>
                <div style={{padding: '10px'}}/>
                <button
                    className="btn btn-default"
                    disabled={this.state.downloading}
                    onClick={this.handleExportMoreJsonData}
                >
                    {this.state.downloading ? "正在导出中":　"json数据大量导出"}
                </button>
                <div style={{padding: '10px'}}>通过json,导出10000条数据</div>
            </div>
        );
    }
}

export default Export;