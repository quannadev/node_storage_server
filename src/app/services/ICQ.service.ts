import wretch, {Wretcher} from 'wretch';
import {Config} from '@foal/core';
import {
    FileUpload,
    IFileInfo
} from '../models/file-upload.model';
import {LoggerService} from './logger-service.service';

export interface ICQTextResponse {
    msgId: string;
    ok: boolean;
}

export interface ICQFileResponse {
    msgId: string;
    fileId: string;
    ok: boolean;
}

export interface ICQErrorResponse {
    ok: boolean;
    description: string;
}

export class ICQ {
    private client: Wretcher;
    private logger: LoggerService;
    private token: string = Config.get<string>('icq.token');
    private chatId: string = Config.get<string>('icq.chatId');

    constructor() {
        this.logger = new LoggerService();
        const uri = Config.get<string>('icq.uri');
        this.client = wretch(uri, {})
            .query({
                token : this.token,
                chatId: this.chatId
            })
            .polyfills({
                fetch   : require('node-fetch'),
                FormData: require('form-data')
            })
    }

    async sendText(text: string): Promise<ICQTextResponse | null> {
        return this.client.url('/messages/sendText').query({
            text: text
        }).get()
            .badRequest(error => {
                return error
            }).json(data => {
                return data as ICQTextResponse;
            }).catch(err => {
                return null
            })
    }

    async getFileInfo(fileId: string): Promise<IFileInfo | null> {
        return this.client.url('/files/getInfo')
            .query({
                fileId: fileId
            }).get().badRequest(error => {
                this.logger.error(`getFileInfo: ${error.text}`);
                return null
            }).json(data => {
                return data as IFileInfo
            }).catch(err => {
                return null
            })
    }
    async uploadFile(files: Buffer[]) {
        for (const file of files) {
            this.client.url('/messages/sendFile').formData({
                file: file
            }).post().badRequest(error => {
                this.logger.error(`uploadFile badRequest: ${error.text}`);
            }).json(async data => {
                const data_raw =  data as ICQFileResponse;
                console.log(`Raw Data: ${JSON.stringify(data_raw)}`);
                const fileUpload = await FileUpload.create({
                    fileId: data_raw.fileId,
                    msgId: data_raw.msgId
                });
                await fileUpload.getFileMetaData();
                await fileUpload.save();
                console.log(fileUpload);
            }).catch(error => {
                this.logger.error(`uploadFile: ${error}`);
            })
        }
    }
}
