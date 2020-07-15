import {Context, Get, HttpResponseBadRequest, HttpResponseOK, Post, ValidateBody} from '@foal/core';
import {UserService} from '../services';

export class AuthController {

    @Get('/')
    foo() {
        return new HttpResponseOK();
    }

    @Post('/sign_in')
    @ValidateBody({
        additionalProperties: false,
        properties          : {
            email   : {
                type: 'string',
                format: 'email'
            },
            password: {type: 'string'}
        },
        required            : [
            'email',
            'password'
        ],
        type                : 'object',
    })
    async doLogin(ctx: Context) {
        const {email, password} = ctx.request.body;
        const data = await new UserService().doLogin(email, password);
        if (data.status) {
            return new HttpResponseOK(data)
        }
        return new HttpResponseBadRequest(data)
    }
    @Post('/sign_up')
    @ValidateBody({
        additionalProperties: false,
        properties          : {
            email   : {
                type: 'string',
                format: 'email'
            },
            password: {type: 'string'}
        },
        required            : [
            'email',
            'password'
        ],
        type                : 'object',
    })
    async doSignUp(ctx: Context) {
        const {email, password, role} = ctx.request.body;
        const data = await new UserService().addUser(email, password, role);
        if (data.status) {
            return new HttpResponseOK(data)
        }
        return new HttpResponseBadRequest(data)
    }
}
