import * as crypto from 'crypto';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request } from 'express';

const WEBHOOK_SECRET = '$P4L4bR45Up3RS3CR3T4%'; //dotenv

@Injectable()
export class GithubGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    try {
      const signature = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');

      const xHubSignature = req.header('x-hub-signature-256') ?? '';

      const trusted = Buffer.from(`sha256=${signature}`, 'ascii');
      const untrusted = Buffer.from(xHubSignature, 'ascii');
      return crypto.timingSafeEqual(trusted, untrusted);
    } catch (error) {
      return false;
    }
  }
}
