import {Hook, HookDecorator, HttpResponseUnauthorized} from '@foal/core';
import {UserService} from '../services';

export function Auth(): HookDecorator {
  return Hook(async (ctx, services) => {
      const auth = ctx.request.header('Authorization');
      if (auth){
            const token = auth.split(' ')[1];
            const user = await new UserService().decodeToken(token);
            if (user){
                ctx.user = user;
            }else {
                return new HttpResponseUnauthorized({
                    message: 'Token Invalid'
                })
            }
      }else {
          return new HttpResponseUnauthorized({
              message: 'UnAuth'
          })
      }

  });
}
