# GitHub webhooks with Spin and Fermyon Cloud

This repository is a demonstration for building [GitHub webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks)
in TypeScript using Spin and Fermyon Cloud.

## Local development

- [Spin](https://developer.fermyon.com/spin)
- [the Spin JavaScript toolchain](https://developer.fermyon.com/spin/javascript-components)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- free [GitHub](https://github.com) and [Slack](https://slack.com) accounts
- a free [Fermyon Cloud](https://cloud.fermyon.com) account

Create a `settings.json` file using the [Slack webhook URL](https://api.slack.com/messaging/webhooks)
based on the template in `settings-template.json`, then build and deploy the
application to [Fermyon Cloud](https://fermyon.com/cloud):

```bash
$ npm install
$ spin build
$ spin deploy
$ spin deploy
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

![Slack message](./docs/slack-message.png)
