import {Hook, HookDecorator} from '@foal/core';

export function CorsHook(): HookDecorator {
    return Hook(() => response => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
        response.setHeader('Access-Control-Allow-Credentials', 'true');
    })
}
