// npm install --global smee-client
// https://smee.io/
// smee --url https://smee.io/JTaHDEnckkZwVfty --target http://localhost:3001/github
import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { GithubService } from './github.service';
import { GitHubEvent, GitHubPayload } from './github.interface';
import { GithubGuard } from './github.guard';

@ApiTags('More')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post()
  @UseGuards(GithubGuard)
  @ApiExcludeEndpoint()
  webhookHandler(
    @Headers('x-github-event') githubEvent: GitHubEvent, // Header personalizado
    @Headers('X-Hub-Signature-256') signature: string, // Llave secreta encriptada
    @Body() body: GitHubPayload,
  ) {
    // console.log({ githubEvent });
    // console.log({ signature });
    this.githubService.handlePayload(githubEvent, body);
    return { githubEvent };
  }
}
