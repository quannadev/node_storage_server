import {
    Context,
    Get,
    HttpResponseBadRequest,
    HttpResponseOK,
    Post
} from '@foal/core';
import {ICQ} from '../services';
import { ValidateMultipartFormDataBody } from '@foal/storage';
export class ApiController {
    private IcqService: ICQ;

    constructor() {
        this.IcqService = new ICQ();
    }

    @Get('/')
    index(ctx: Context) {
        return new HttpResponseOK('Hello world!');
    }

    @Post('/send_text')
    async sendText(ctx: Context) {
        const {text} = ctx.request.body;
        if (text) {
            const res = await this.IcqService.sendText(text);
            if (res) {
                return new HttpResponseOK(res);
            }
            return new HttpResponseBadRequest(res)
        }
        return new HttpResponseBadRequest({
            message: 'Missing data'
        })
    }
    @Post('/send_file')
    @ValidateMultipartFormDataBody({
        files: {
            images: { required: false, multiple: true }
        }
    })
    async sendFile(ctx: Context) {
        const images = ctx.request.body.files.images;
        if (images){
            const upload = await this.IcqService.uploadFile(images)
        }
        return new HttpResponseOK('OK')
    }
}
