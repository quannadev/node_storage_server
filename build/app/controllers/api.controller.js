"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@foal/core");
const services_1 = require("../services");
const storage_1 = require("@foal/storage");
const hooks_1 = require("../hooks");
let ApiController = class ApiController {
    constructor() {
    }
    index(ctx) {
        return new core_1.HttpResponseOK('Hello world!');
    }
    async sendText(ctx) {
        const { text } = ctx.request.body;
        if (text) {
            const res = await new services_1.ICQ(ctx.user).sendText(text);
            if (res) {
                return new core_1.HttpResponseOK(res);
            }
            return new core_1.HttpResponseBadRequest(res);
        }
        return new core_1.HttpResponseBadRequest({
            message: 'Missing data'
        });
    }
    async sendFile(ctx) {
        const images = ctx.request.body.files.images;
        if (images) {
            await new services_1.ICQ(ctx.user).uploadFile(images);
        }
        return new core_1.HttpResponseOK('OK');
    }
    async getMe(ctx) {
        const metrics = await new services_1.UserService().getMe(ctx.user._id);
        return new core_1.HttpResponseOK({
            user: ctx.user,
            metrics
        });
    }
    async getFiles(ctx) {
        const data = await new services_1.UserService().getFiles(ctx.user._id);
        return new core_1.HttpResponseOK(data);
    }
};
__decorate([
    core_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "index", null);
__decorate([
    core_1.Post('/send_text'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "sendText", null);
__decorate([
    core_1.Post('/send_file'),
    storage_1.ValidateMultipartFormDataBody({
        files: {
            images: {
                required: false,
                multiple: true
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "sendFile", null);
__decorate([
    core_1.Get('/me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getMe", null);
__decorate([
    core_1.Get('/me/files'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getFiles", null);
ApiController = __decorate([
    hooks_1.CorsHook(),
    hooks_1.Auth(),
    __metadata("design:paramtypes", [])
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map