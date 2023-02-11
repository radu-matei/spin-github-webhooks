import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk";
import { WebhookEventName } from "@octokit/webhooks-types";
import { handleForkEvent, handleStarEvent } from "./handlers";
import { getSettings, verifySignature } from "./utils";

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
  let settings = await getSettings();

  // Verify the signature if there is a payload secret configured for the application.
  if (settings.payloadSecret) {
    if (!verifySignature(request, settings.payloadSecret)) {
      console.log("Unauthorized request to GitHub webhook endpoint");
      return {
        status: 401
      }
    }
  }

  let eventName = request.headers["x-github-event"] as WebhookEventName;
  console.log("Received: " + eventName);
  switch (eventName) {
    case "star":
      return await handleStarEvent(request, settings)

    case "fork":
      return await handleForkEvent(request, settings)


    default:
      return {
        status: 200,
      }
  }
}

