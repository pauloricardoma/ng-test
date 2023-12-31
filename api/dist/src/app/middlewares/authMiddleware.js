"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.sendStatus(401);
    }
    const token = authorization.replace('Bearer', '').trim();
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        const { id, username, accountId } = data;
        request.user = {
            id,
            username,
            accountId,
        };
        return next();
    }
    catch (_a) {
        return response.sendStatus(401);
    }
}
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map