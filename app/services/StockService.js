/**
 * Created by Max Gornostayev on 06/26/22
 *
 * This is a service to get stock data from streaming service.
 * Object of the data that is provided by service:
 * obj.ticker
 * obj.exchange
 * obj.price
 * obj.change
 * obj.change_percent
 * obj.last_trade_time
 * obj.dividend
 * obj.yield
 *
 */

import io from 'socket.io-client';
import config from '../config';

class StockService {
    /*
     * constructor
     * @param params - object: {onLoadData: func, onConnect: func, onDisconnect: func}
     */
    constructor(params = {}) {
        this.socket = null;
        this.onLoadData = params.onLoadData;
        this.onConnect = params.onConnect;
        this.onDisconnect = params.onDisconnect;
    }

    /*
     * this is function to connect to the streaming service
     * @param stockSymbol - string, example: AAPL
     */
    connect(stockSymbol) {
        this.disconnect();

        this.socket = io(config.urls.stock);
        this.socket.on('connect', () => {
            if (this.onConnect) {
                this.onConnect();
            }
            this.socket.on(stockSymbol, (jsonData) => {
                try {
                    const obj = JSON.parse(jsonData);
                    this.onLoadData(obj);
                } catch(error) {
                    this.disconnect();
                }
            });

            this.socket.emit('ticker', stockSymbol);
        });

        this.socket.on('disconnect', () => {
            this.socket = null;
            if (this.onDisconnect) {
                this.onDisconnect();
            }
        });
    }

    /*
     * this is function to disconnect from the streaming service
     */
    disconnect() {
        if (this.socket && this.socket.connected) {
            this.socket.disconnect();
        }
    }
}

export default StockService;
