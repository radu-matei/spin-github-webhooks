import { HttpRequest } from "@fermyon/spin-sdk";
import { MessageAttachment } from "@slack/types";

let encoder = new TextEncoder();

export interface Settings {
  slackWebhookUrl: string;
  payloadSecret: string,
}

// Function that sends a Slack incoming webhook to a configured channel.
export async function sendToSlack(
  settings: Settings,
  title: string,
  text: string,
): Promise<void> {
  // Format a simple Slack message that contains the event details.
  let attachment: MessageAttachment = {
    title: title,
    text: text,
  };

  // Send the message to Slack.
  await fetch(settings.slackWebhookUrl, {
    method: "POST",
    body: new TextEncoder().encode(JSON.stringify(attachment)).buffer,
  });
}

// Function to verify the signature of the GitHub webhook payload.
export function verifySignature(req: HttpRequest, secret: string): boolean {
  const signature = req.headers["x-hub-signature-256"];
  if (signature === "" || signature === undefined) {
    return false;
  }

  if (req.body === undefined) {
    return false;
  }

  const hmac = crypto.createHmac("sha256", new TextEncoder().encode(secret).buffer);
  hmac.update(new Uint8Array(req.body))
  const computed = "sha256=" + Array.from(new Uint8Array(hmac.digest())).map((b) => b.toString(16).padStart(2, '0')).join('');

  return crypto.timingSafeEqual(encoder.encode(signature).buffer, encoder.encode(computed).buffer)
}


// Helper function to retrieve the application configuration.
export async function getSettings(): Promise<Settings> {
  return {
    slackWebhookUrl: spinSdk.config.get("slack_webhook_url"),
    payloadSecret: spinSdk.config.get("payload_secret")
  }
}
