"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static apiResDefault(data, message) {
        return {
            status: false,
            message: message ? message : '',
            data
        };
    }
    static async sleep(ms) {
        new Promise(resolve => setTimeout(resolve, ms));
    }
    static bytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0)
            return '0 Byte';
        const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
        return Math.round(bytes / Math.pow(1024, i)) + '' + sizes[i];
    }
}
exports.Utils = Utils;
//# sourceMappingURL=constans.model.js.map