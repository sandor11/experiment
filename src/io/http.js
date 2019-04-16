"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonResponse = (status) => (result) => ({
    statusCode: status,
    headers: {
        "Content-Type": "application/json"
    },
    body: result
});
//# sourceMappingURL=http.js.map