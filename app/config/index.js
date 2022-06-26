/**
 * Created by Max Gornostayev on 06/26/22
 *
 * config file that contains main params of the app
 *
 */

export default {
    isProduction: process.env.NODE_ENV === 'production',
    isDebug: true,
    urls: {
        stock: 'http://localhost:4000',
    }
};
