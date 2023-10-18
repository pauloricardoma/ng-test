"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '10');
    next();
};
//# sourceMappingURL=cors.js.map