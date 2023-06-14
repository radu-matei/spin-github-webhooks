# GitHub webhooks with Spin and Fermyon Cloud

This repository is a demonstration for building [GitHub webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks)
in TypeScript using Spin and Fermyon Cloud.

## Local development

- [Spin](https://developer.fermyon.com/spin)
- [the Spin JavaScript toolchain](https://developer.fermyon.com/spin/javascript-components)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- free [GitHub](https://github.com) and [Slack](https://slack.com) accounts
- a free [Fermyon Cloud](https://cloud.fermyon.com) account

When running or deploying, you need to set the [Slack webhook URL](https://api.slack.com/messaging/webhooks)
and the [GitHub payload secret](https://docs.github.com/en/webhooks-and-events/webhooks/securing-your-webhooks)
as configuration variables. See `spin.toml` and [the documentation for config](https://developer.fermyon.com/cloud/variables).

```bash
$ npm install
$ spin build
spin deploy --variable payload_secret=$PAYLOAD_SECRET --variable slack_webhook_url=$SLACK_WEBHOOK_URL
Uploading github-stars-webhook version 0.1.0+r6ed768d9...
Deploying...
Waiting for application to become ready...... ready
Available Routes:
   github-star-webhook: https://github-stars-webhook-<your-url>.fermyon.app (wildcard)
```

[Create a GitHub webhook for the `star created or deleted` event](https://docs.github.com/en/developers/webhooks-and-events/webhooks/creating-webhooks)
using the URL returned by the `spin deploy` command.
Then, on every star event, the application will send a message to your
configured Slack channel:

