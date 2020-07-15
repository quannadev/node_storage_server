export interface APIResponse<T> {
    status: boolean;
    message: string;
    data: T;
}

export class Utils {

    static apiResDefault<T>(data: T, message?: string): APIResponse<T> {
        return {
            status : false,
            message: message ? message : '',
            data
        }
    }
    static async sleep(ms: number): Promise<void> {
        new Promise(resolve => setTimeout(resolve, ms))
    }
    static bytesToSize(bytes: number) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
        return Math.round(bytes / Math.pow(1024, i)) + '' + sizes[i];
    }
}
