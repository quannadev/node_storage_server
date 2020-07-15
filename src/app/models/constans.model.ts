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
}
