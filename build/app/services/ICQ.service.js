"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wretch_1 = require("wretch");
const core_1 = require("@foal/core");
const file_upload_model_1 = require("../models/file-upload.model");
const logger_service_service_1 = require("./logger-service.service");
const user_model_1 = require("../models/user.model");
const models_1 = require("../models");
class ICQ {
    constructor(user) {
        this.token = process.env.ICQ_TOKEN || core_1.Config.get('icq.token');
        this.chatId = process.env.ICQ_CHATID || core_1.Config.get('icq.chatId');
        this.user = user;
        this.logger = new logger_service_service_1.LoggerService();
        const uri = process.env.ICQ_API || core_1.Config.get('icq.uri');
        this.client = wretch_1.default(uri, {})
            .query({
            token: this.token,
            chatId: this.chatId
        })
            .polyfills({
            fetch: require('node-fetch'),
            FormData: require('form-data')
        });
    }
    async sendText(text) {
        return this.client.url('/messages/sendText').query({
            text: text
        }).get()
            .badRequest(error => {
            return error;
        }).json(data => {
            return data;
        }).catch(err => {
            return null;
        });
    }
    async getFileInfo(fileId) {
        return this.client.url('/files/getInfo')
            .query({
            fileId: fileId
        }).get().badRequest(error => {
            this.logger.error(`getFileInfo: ${error.text}`);
            return null;
        }).json(data => {
            return data;
        }).catch(err => {
            return null;
        });
    }
    async uploadFile(files) {
        for (const file of files) {
            this.client.url('/messages/sendFile').formData({
                file: file
            }).post().badRequest(error => {
                this.logger.error(`uploadFile badRequest: ${error.text}`);
            }).json(async (data) => {
                const data_raw = data;
                const fileUpload = await file_upload_model_1.FileUpload.create({
                    fileId: data_raw.fileId,
                    msgId: data_raw.msgId,
                    owner: this.user
                });
                await user_model_1.User.findByIdAndUpdate(this.user._id, {
                    $push: { files: fileUpload._id },
                }, { new: true });
                await fileUpload.getFileMetaData();
                await fileUpload.save();
                await this.sendText(JSON.stringify({
                    id: fileUpload._id,
                    fileId: fileUpload.fileId,
                    owner: this.user.email
                }));
            }).catch(error => {
                this.logger.error(`uploadFile: ${error}`);
            });
            await models_1.Utils.sleep(300);
        }
    }
}
exports.ICQ = ICQ;
//# sourceMappingURL=ICQ.service.js.map