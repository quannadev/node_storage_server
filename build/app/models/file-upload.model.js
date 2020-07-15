"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const services_1 = require("../services");
const fileUploadSchema = new mongoose_1.Schema({
    fileId: {
        type: String,
        required: true,
        unique: true
    },
    msgId: {
        type: String,
        required: true
    },
    fileName: {
        type: String
    },
    size: {
        type: Number
    },
    fileType: {
        type: String
    },
    url: {
        type: String
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true
});
fileUploadSchema.methods.getFileMetaData = async function getFileInfo() {
    const fileInfo = await new services_1.ICQ(this).getFileInfo(this.fileId);
    if (fileInfo) {
        this.fileName = fileInfo.filename;
        this.size = fileInfo.size;
        this.fileType = fileInfo.type;
        this.url = fileInfo.url;
    }
};
exports.FileUpload = mongoose_1.models.FileUpload || mongoose_1.model('FileUpload', fileUploadSchema);
//# sourceMappingURL=file-upload.model.js.map