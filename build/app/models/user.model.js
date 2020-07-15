"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@foal/core");
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const userSchema = new mongoose_1.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        type: String
    },
    files: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'FileUpload'
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});
var Roles;
(function (Roles) {
    Roles["admin"] = "admin";
    Roles["user"] = "user";
})(Roles = exports.Roles || (exports.Roles = {}));
userSchema.methods.setPassword = async function (password) {
    this.password = await core_1.hashPassword(password);
};
userSchema.methods.getToken = async function getToken() {
    const token = jsonwebtoken_1.sign({
        id: String(this._id),
        email: this.email
    }, core_1.Config.get('settings.jwt.secret'), {
        expiresIn: '12h'
    });
    if (token) {
        return token;
    }
    return null;
};
exports.User = mongoose_1.models.User || mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.model.js.map