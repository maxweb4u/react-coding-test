import { expect } from 'chai';
import StockService from '../../services/StockService';

describe('Service logic - StockService', () => {
    let service = null;
    let items = [];
    let isConnected = false;

    beforeEach(() => {
        service = new StockService({
            onLoadData: (obj) => items.unshift(obj),
            onConnect: () => {
                isConnected = true;
            },
            onDisconnect: () => {
                items = [];
                isConnected = false;
            },
        });
    });

    afterEach(() => {
        items = [];
        isConnected = false;
        service.disconnect();
    });

    it('should connect', (done) => {
        service.connect('AAPL');
        setTimeout(() => {
            expect(isConnected).to.true;
            done();
        }, 100);
    });

    it('should get one item', (done) => {
        service.connect('AAPL');
        setTimeout(() => {
            expect(items.length).to.eq(1);
            done();
        }, 5000);
    });

    it('should disconnect', (done) => {
        service.connect('AAPL');
        setTimeout(() => {
            service.disconnect();
            expect(isConnected).to.false;
            done();
        }, 100);
    });
});
