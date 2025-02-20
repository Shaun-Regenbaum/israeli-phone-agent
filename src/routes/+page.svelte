<script lang="ts">
    import { onMount } from 'svelte';
    import { CallsApp } from '$lib/CallsApp';

    let roomId = '';
    let shareableLink = '';

    const appId = '84ba57f0442c0ebf58f1808bfcacdc6b';
    const appSecret = '5043ed068add4a262847185ecd69ca031939a77c1a02de9e6a87c0b2bb4deac5';

    async function createRoom() {
        const callsApp = new CallsApp(appId, appSecret);
        const session = await callsApp.newSession();
        roomId = session.sessionId;
        shareableLink = `${window.location.origin}?room=${roomId}`;
    }

    onMount(() => {
        // Check if we're joining an existing room
        const urlParams = new URLSearchParams(window.location.search);
        const existingRoomId = urlParams.get('room');
        if (existingRoomId) {
            roomId = existingRoomId;
            shareableLink = window.location.href;
        }
    });
</script>

<div class="container">
    <button on:click={createRoom} disabled={roomId}>Create Room</button>

    {#if shareableLink}
        <div class="share-link">
            <input readonly value={shareableLink} />
            <button on:click={() => navigator.clipboard.writeText(shareableLink)}>
                Copy Link
            </button>
        </div>
    {/if}
</div>

<style>
    .container {
        padding: 2rem;
        max-width: 600px;
        margin: 0 auto;
    }

    .share-link {
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
    }

    input {
        flex: 1;
        padding: 0.5rem;
    }

    button {
        padding: 0.5rem 1rem;
    }
</style>
