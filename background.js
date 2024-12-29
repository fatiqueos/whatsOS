chrome.storage.sync.get('settings').then((data) => {
    if (data?.settings === undefined) {
        chrome.storage.sync.set({
            settings: {
                view_once_media: true,
                keep_revoked_messages: true,
                keep_edited_messages: true,
                indicate_sender_os: true,
                special_tags: false,
                blue_ticks: false,
                fullscreen: true
            }
        });
    }
});
