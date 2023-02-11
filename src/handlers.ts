import { HttpRequest, HttpResponse } from "@fermyon/spin-sdk";
import { StarCreatedEvent, StarDeletedEvent, ForkEvent } from "@octokit/webhooks-types";
import { sendToSlack, Settings } from "./utils";

let decoder = new TextDecoder();

export async function handleStarEvent(req: HttpRequest, settings: Settings): Promise<HttpResponse> {
  let body = JSON.parse(decoder.decode(req.body));
  switch (body.action) {
    case "created":
      {
        let event = body as StarCreatedEvent;
        console.log(`Star created event from ${event.sender.login} for ${event.repository.full_name}. Star count ${event.repository.stargazers_count}.`);
        let title = `New star to repository ${event.repository.full_name} from ${event.sender.login}!`;
        let text = `:star:${event.sender.login} just starred your repository ${event.repository.full_name}!
The repository now has ${event.repository.stargazers_count} stargazers, see them all at https://github.com/${event.repository.full_name}/stargazers :star:!`;

        await sendToSlack(settings, title, text);
        return {
          status: 200
        }
      }

    case "deleted":
      {
        let event = body as StarDeletedEvent;
        console.log(`Star deleted event from ${event.sender.login} for ${event.repository.full_name}. Star count ${event.repository.stargazers_count}.`);
        let title = `${event.sender.login} unstarred your repository ${event.repository.full_name}`;

        await sendToSlack(settings, title, title);
        return {
          status: 200
        }
      }

    default:
      {
        console.log("Unknown star event: " + body.action);
        return {
          status: 404
        }
      }
  }
}


export async function handleForkEvent(req: HttpRequest, settings: Settings): Promise<HttpResponse> {
  let event = JSON.parse(decoder.decode(req.body)) as ForkEvent;
  console.log(`Fork created event from ${event.sender.login} for ${event.repository.full_name}. Fork count ${event.repository.forks_count}.`);
  let title = `${event.sender.login} just forked your repository ${event.repository.full_name}!`;

  await sendToSlack(settings, title, title);
  return {
    status: 200
  }
}
