import {
    model,
    models,
    Schema,
    Document
} from 'mongoose';
import {ICQ} from '../services';
import {IUser} from './user.model';

const fileUploadSchema: Schema = new Schema({
    fileId  : {
        type    : String,
        required: true,
        unique  : true
    },
    msgId   : {
        type    : String,
        required: true
    },
    fileName: {
        type: String
    },
    size    : {
        type: Number
    },
    fileType: {
        type: String
    },
    url     : {
        type: String
    },
    owner   : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
}, {
    versionKey: false,
    timestamps: true
});

export interface IFileUpload extends Document {
    _id: Schema.Types.ObjectId;
    fileId: string;
    msgId: string;
    fileName: string;
    size: number;
    fileType: string;
    url: string;
    owner: IUser;
}

export interface IFileInfo {
    filename: string;
    size: number;
    type: string;
    url: string;
}

fileUploadSchema.methods.getFileMetaData = async function getFileInfo() {
    const fileInfo = await new ICQ(this).getFileInfo(this.fileId);
    if (fileInfo) {
        this.fileName = fileInfo.filename;
        this.size = fileInfo.size;
        this.fileType = fileInfo.type;
        this.url = fileInfo.url;
    }
}

export const FileUpload = models.FileUpload || model('FileUpload', fileUploadSchema);
