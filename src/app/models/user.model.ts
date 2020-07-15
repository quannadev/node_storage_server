import {Config, hashPassword} from '@foal/core';
import {model, models, Schema, Document} from 'mongoose';
import {IFileUpload} from './file-upload.model';
import {sign} from 'jsonwebtoken';

const userSchema: Schema = new Schema({
    email   : {
        required: true,
        type    : String,
        unique  : true
    },
    password: {
        required: true,
        type    : String,
    },
    role    : {
        type: String
    },
    files   : [
        {
            type: Schema.Types.ObjectId,
            ref : 'FileUpload'
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    email: string;
    password: string;
    role: Roles;
    files: IFileUpload[];
}

export enum Roles {
    admin = 'admin',
    user = 'user'
}

userSchema.methods.setPassword = async function (password: string) {
    this.password = await hashPassword(password);
};
userSchema.methods.getToken = async function getToken(): Promise<string | null> {
    const token = sign({
        id   : String(this._id),
        email: this.email
    }, Config.get<string>('settings.jwt.secret'), {
        expiresIn: '12h'
    });
    if (token) {
        return token
    }
    return null;
}

export const User = models.User || model('User', userSchema);
