// This class handles the Cloudflare Calls API interactions
export class CallsApp {
    constructor(appId, appSecret, basePath = 'https://rtc.live.cloudflare.com/v1') {
        this.prefixPath = `${basePath}/apps/${appId}`;
        this.appSecret = appSecret;
    }

    async sendRequest(url, body, method = 'POST') {
        const request = {
            method: method,
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${this.appSecret}`
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(url, request);
        const result = await response.json();
        return result;
    }

    // ... rest of the CallsApp methods ...
} 