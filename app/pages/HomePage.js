/**
 * Created by Max Gornostayev on 06/26/22
 *
 * @path: /
 *
 * home page that shows stock's data from streaming service
 *
 */

import React, {PureComponent} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StockService from '../services/StockService';
import * as actions from '../redux/actions/stock';
import '../styles/pageHome.scss';

class HomePage extends PureComponent {
    /*
     * constructor for react component
     */
    constructor(props) {
        super(props);

        const streamingParams = {
            onLoadData: (obj) => props.actions.loadData(obj),
            onConnect: () => props.actions.setConnectionStatus(true),
            onDisconnect: () => {
                props.actions.clearData();
                props.actions.setConnectionStatus(false);
            },
        };

        this.service = new StockService(streamingParams);

        this.state = {
            currentStock: 'AAPL',
        };
    }

    /*
     * handling when home page will be unmounted. we need to disconnect streaming service;
     */
    componentWillUnmount() {
        this.service.disconnect();
    }

    /*
     * handling function for changing stock button
     */
    changeStock() {
        if (this.state.currentStock) {
            this.service.connect(this.state.currentStock);
        }
    }

    /*
     * render function for rendering one ticker item
     */
    renderItem(item, index) {
        const isLast = index === 0;
        let className = 'item';
        if (isLast) {
            const { stockBeforeLastObj } = this.props;
            const isDown = stockBeforeLastObj.price > item.price;
            className += isDown ? ' red' : ' green';
        }
        return (
            <div key={index} className={className}>
                <div>{item.ticker}</div>
                <div>{item.price}</div>
                <div>{item.change_percent}%</div>
                <div className="item-time">{item.last_trade_time}</div>
            </div>
        );
    }

    /*
     * main render function
     */
    render() {
        const { isStockConnected, stockData } = this.props;
        return (
            <div className="root page-home">
                <h1>Stock Blotter</h1>
                <div className="container-form">
                    <input type="text" value={this.state.currentStock} onChange={(e) => this.setState({currentStock: e.target.value})} />
                    <button onClick={() => this.changeStock()}>{isStockConnected ? 'Change' : 'Connect'}</button>
                    {isStockConnected && <button className="red" onClick={() => this.service.disconnect()}>Disconnect</button>}
                </div>
                {stockData.length > 0 &&
                    <div className="container-stock">
                        <h4>{this.state.currentStock}</h4>
                        <div className="list">
                            <div className="header">
                                <div>Ticker</div>
                                <div>Price</div>
                                <div>Change</div>
                                <div className="item-time">Time</div>
                            </div>
                            {stockData.map((item, index) => this.renderItem(item, index))}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ stock }) => ({
    isStockConnected: stock.connectionStatus,
    stockData: stock.data,
    stockBeforeLastObj: stock.beforeLastObj,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
