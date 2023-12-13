import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordService {
  private readonly discordWebhookUrl =
    'https://discord.com/api/webhooks/1184572022500626523/zQCqdPFueicoELfK0cDrtdaZm7CeQGmvJTJPc6eawwr6kbq0APtfuNFGKyfkjUZeTuw_';

  async notify(message: string) {
    const body = { content: message };

    const resp = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      console.log('Error sending message to discord');
      return false;
    }

    return true;
  }
}
