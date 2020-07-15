import {IUser, Roles, User} from '../models/user.model';
import {FileUpload, IFileUpload} from '../models/file-upload.model';
import {APIResponse, Utils} from '../models/constans.model';
import {decode} from 'jsonwebtoken';
import {verifyPassword} from '@foal/core';

export interface UserResponse {
    user: IUser | null;
    token: string;
}

export class UserService {
    constructor() {
    }

    async findUserByEmail(email: string): Promise<IUser | undefined> {
        return User.findOne({
            email: email
        })
    }

    async addUser(email: string, password: string, role?: Roles): Promise<APIResponse<UserResponse>> {
        const data_res = Utils.apiResDefault<UserResponse>({
            user : null,
            token: ''
        }, 'Email exits');
        if (await this.findUserByEmail(email)) return data_res;
        else {
            const newUser = await User.create({
                email   : email,
                password: password,
                role    : role ? role : Roles.user
            });
            await newUser.setPassword(password);
            await newUser.save();
            return this.doLogin(email, password);
        }

    }

    async updateUser(id: string, password: string, role: Roles): Promise<IUser | null> {
        const user = await User.findOne(id);
        if (user) {
            await user.setPassword(password);
            user.role = role;
            await user.save();
            return user;
        }
        return null;
    }

    async delUser(id: string): Promise<APIResponse<null>> {
        const data_res = Utils.apiResDefault<null>(null);
        data_res.message = 'User not found';
        const user = await User.findOneAndDelete(id);
        if (user) {
            data_res.status = true;
            data_res.message = 'Success';
            return data_res;
        }
        return data_res;
    }

    async getFiles(id: string): Promise<IFileUpload[]> {
        const user = await User.findById(id).populate('files');
        if (user) {
            return user.files;
        }
        return []
    }

    async getMe(id: string) {
        const files = await FileUpload.find({
            owner: id,
        })
        if (files.length > 0){
            const fileSize = files.reduce((a,b) => {
                return a + b.size
            }, 0);
            const total_size = Utils.bytesToSize(fileSize);
            return {
                files: files.length,
                size: total_size
            }
        }
    }

    async decodeToken(token: string): Promise<IUser | undefined> {
        const payload = decode(token, {
            json: true
        });
        if (payload) {
            const {id} = payload;
            return User.findById(id);
        }
    }

    async doLogin(email: string, password: string): Promise<APIResponse<UserResponse>> {
        const data_res = Utils.apiResDefault<UserResponse>({
            user : null,
            token: ''
        }, 'email or password invalid');
        const user = await User.findOne({email: email});
        if (user && await verifyPassword(password, user.password)) {
            const token = await user.getToken();
            data_res.status = true;
            data_res.message = 'Success';
            data_res.data = {
                user,
                token
            }
        }
        return data_res;
    }
}
