"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Routes = {
    setup(app) {
        app.get('/', (req, res) => {
            res.send('<h1>Hallo Welt!</h1>');
        });
    },
};
exports.default = Routes;
