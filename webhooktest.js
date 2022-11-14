import { DiscordRequest } from "./utils.js";


// Execute a webhook
export async function ExecuteWebhook(webhookId, webhookToken, data) {
    // API endpoint to execute webhook
    const endpoint = `webhooks/${webhookId}/${webhookToken}`;
    // execute webhook
    try {
        await DiscordRequest(endpoint, { method: 'POST', body: data });
    } catch (err) {
        console.error(err);
    }
}


// Test
const webhookId = process.env.WEBHOOK_ID;
const webhookToken = process.env.WEBHOOK_TOKEN;
const data = {
    content: '',
    username: '',
};

ExecuteWebhook(webhookId, webhookToken, data);