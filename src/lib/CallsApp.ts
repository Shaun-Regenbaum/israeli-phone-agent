export class CallsApp {
    private prefixPath: string;
    private appSecret: string;

    constructor(appId: string, appSecret: string, basePath = 'https://rtc.live.cloudflare.com/v1') {
        this.prefixPath = `${basePath}/apps/${appId}`;
        this.appSecret = appSecret;
    }

    async newSession() {
        const url = `${this.prefixPath}/sessions/new`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${this.appSecret}`
            }
        });
        return await response.json();
    }
} 