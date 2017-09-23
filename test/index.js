import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Export from './export';

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0
        };
        // rules of es7
        this.handleExportTab = ::this.handleExportTab;
    }

    handleExportTab() {
        this.setState({status: 0});
    }

    handleImportTab() {
        this.setState({status: 1});
    }

    render() {
        const {status} = this.state;
        return (
            <div style={{padding: '15px'}}>
                <div style={{marginBottom: '10px', fontSize: '24px'}}>模板导入导出Demo</div>
                <ul className="nav nav-tabs">
                    <li role="presentation" className={status===0 ? 'active': ''}>
                        <a href="#" onClick={this.handleExportTab}>模板导出</a>
                    </li>
                </ul>
                <Export/>
            </div>
        );
    }
}

ReactDOM.render(<Example/>, window.document.getElementById('test'));