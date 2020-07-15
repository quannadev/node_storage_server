import {
    Context,
    Get,
    HttpResponseBadRequest,
    HttpResponseOK,
    Post
} from '@foal/core';
import {ICQ, UserService} from '../services';
import {ValidateMultipartFormDataBody} from '@foal/storage';
import {Auth, CorsHook} from '../hooks';

@CorsHook()
@Auth()
export class ApiController {

    constructor() {
    }

    @Get('/')
    index(ctx: Context) {
        return new HttpResponseOK('Hello world!');
    }

    @Post('/send_text')
    async sendText(ctx: Context) {
        const {text} = ctx.request.body;
        if (text) {
            const res = await new ICQ(ctx.user).sendText(text);
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
            images: {
                required: false,
                multiple: true
            }
        }
    })
    async sendFile(ctx: Context) {
        const images = ctx.request.body.files.images;
        if (images) {
            await new ICQ(ctx.user).uploadFile(images);
        }
        return new HttpResponseOK('OK')
    }

    @Get('/me')
    async getMe(ctx: Context) {
        const metrics = await new UserService().getMe(ctx.user._id);
        return new HttpResponseOK({
            user: ctx.user,
            metrics
        })
    }

    @Get('/me/files')
    async getFiles(ctx: Context) {
        const data = await new UserService().getFiles(ctx.user._id);
        return new HttpResponseOK(data)
    }
}
