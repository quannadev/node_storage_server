"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const file_upload_model_1 = require("../models/file-upload.model");
const constans_model_1 = require("../models/constans.model");
const jsonwebtoken_1 = require("jsonwebtoken");
const core_1 = require("@foal/core");
class UserService {
    constructor() {
    }
    async findUserByEmail(email) {
        return user_model_1.User.findOne({
            email: email
        });
    }
    async addUser(email, password, role) {
        const data_res = constans_model_1.Utils.apiResDefault({
            user: null,
            token: ''
        }, 'Email exits');
        if (await this.findUserByEmail(email))
            return data_res;
        else {
            const newUser = await user_model_1.User.create({
                email: email,
                password: password,
                role: role ? role : user_model_1.Roles.user
            });
            await newUser.setPassword(password);
            await newUser.save();
            return this.doLogin(email, password);
        }
    }
    async updateUser(id, password, role) {
        const user = await user_model_1.User.findOne(id);
        if (user) {
            await user.setPassword(password);
            user.role = role;
            await user.save();
            return user;
        }
        return null;
    }
    async delUser(id) {
        const data_res = constans_model_1.Utils.apiResDefault(null);
        data_res.message = 'User not found';
        const user = await user_model_1.User.findOneAndDelete(id);
        if (user) {
            data_res.status = true;
            data_res.message = 'Success';
            return data_res;
        }
        return data_res;
    }
    async getFiles(id) {
        const user = await user_model_1.User.findById(id).populate('files');
        if (user) {
            return user.files;
        }
        return [];
    }
    async getMe(id) {
        const files = await file_upload_model_1.FileUpload.find({
            owner: id,
        });
        if (files.length > 0) {
            const fileSize = files.reduce((a, b) => {
                return a + b.size;
            }, 0);
            const total_size = constans_model_1.Utils.bytesToSize(fileSize);
            return {
                files: files.length,
                size: total_size
            };
        }
    }
    async decodeToken(token) {
        const payload = jsonwebtoken_1.decode(token, {
            json: true
        });
        if (payload) {
            const { id } = payload;
            return user_model_1.User.findById(id);
        }
    }
    async doLogin(email, password) {
        const data_res = constans_model_1.Utils.apiResDefault({
            user: null,
            token: ''
        }, 'email or password invalid');
        const user = await user_model_1.User.findOne({ email: email });
        if (user && await core_1.verifyPassword(password, user.password)) {
            const token = await user.getToken();
            data_res.status = true;
            data_res.message = 'Success';
            data_res.data = {
                user,
                token
            };
        }
        return data_res;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map