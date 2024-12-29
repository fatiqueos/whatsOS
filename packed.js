/* global require */
window.plus_main = () => {
    class Hook {
        constructor() {
            this.is_registered = false;
        }
    
        register() {
            this.is_registered = true;
        }
    
        unregister() {
            this.is_registered = false;
        }
    }
    

    function set_key_json_recursive(obj, key, value) {
        for (let [current_key, current_value] of Object.entries(obj)) {
            if (current_key === key) {
                obj[current_key] = value;
            } else if (typeof current_value === 'object') {
                obj[current_key] = set_key_json_recursive(current_value, key, value);
            }
        }
        return obj;
    }
    

    const WA_MODULES = {
        PROCESS_EDIT_MESSAGE: 'WAWebDBProcessEditProtocolMsgs',
        PROCESS_RENDERABLE_MESSAGES: 'WAWebMessageProcessRenderable',
        MESSAGES_RENDERER: 'WAWebMessageMeta.react',
        PROTOBUF_HOOK: 'decodeProtobuf',
        SEND_MESSAGE: 'WAWebSendMsgRecordAction',
        QUERY_GROUP: 'WAWebGroupMsgSendUtils',
        OPEN_CHAT: 'useWAWebSetModelValue',
        HANDLE_RECEIPT: 'WAWebHandleDirectChatReceipt',
        RECEIPT_BATCHER: 'WAWebMessageReceiptBatcher',
        WEB_ACK: 'WAWebAck',
        WID_FACTORY: 'WAWebWidFactory',
        SERVER_PROPS: 'WAWebServerPropConstants',
    };
    
    let MODULES = {
        PROCESS_EDIT_MESSAGE: undefined,
        PROCESS_RENDERABLE_MESSAGES: undefined,
        MESSAGES_RENDERER: undefined,
        PROTOBUF_HOOK: undefined,
        SEND_MESSAGE: undefined,
        QUERY_GROUP: undefined,
        OPEN_CHAT: undefined,
        HANDLE_RECEIPT: undefined,
        RECEIPT_BATCHER: undefined,
        WEB_ACK: undefined,
        WID_FACTORY: undefined,
        SERVER_PROPS: undefined,
    };
    

    const initialize_modules = () => {
        MODULES = {
            PROCESS_EDIT_MESSAGE: require(WA_MODULES.PROCESS_EDIT_MESSAGE),
            PROCESS_RENDERABLE_MESSAGES: require(WA_MODULES.PROCESS_RENDERABLE_MESSAGES),
            MESSAGES_RENDERER: require(WA_MODULES.MESSAGES_RENDERER),
            PROTOBUF_HOOK: require(WA_MODULES.PROTOBUF_HOOK),
            QUERY_GROUP: require(WA_MODULES.QUERY_GROUP),
            SEND_MESSAGE: require(WA_MODULES.SEND_MESSAGE),
            OPEN_CHAT: require(WA_MODULES.OPEN_CHAT),
            HANDLE_RECEIPT: require(WA_MODULES.HANDLE_RECEIPT),
            RECEIPT_BATCHER: require(WA_MODULES.RECEIPT_BATCHER),
            WEB_ACK: require(WA_MODULES.WEB_ACK),
            WID_FACTORY: require(WA_MODULES.WID_FACTORY),
            SERVER_PROPS: require(WA_MODULES.SERVER_PROPS),
        };
        console.log('Modules have been loaded successfully!');
    };
    

    class SettingsHook extends Hook {
        constructor() {
            super();
            this.original_multicats = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_multicats = MODULES.SERVER_PROPS.MULTICAST_LIMIT_GLOBAL;
            MODULES.SERVER_PROPS.MULTICAST_LIMIT_GLOBAL = Infinity;
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            MODULES.SERVER_PROPS.MULTICAST_LIMIT_GLOBAL = this.original_multicats;
        }
    
    }
    

    const APPLE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="14" height="14" viewBox="0 0 814 1000" fill="#23a55a"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>';
    const ANDROID_SVG = '<svg aria-label="Mobile" height="14" width="14" viewBox="0 0 1000 1500" fill="#23a55a"><path d="M 187 0 L 813 0 C 916.277 0 1000 83.723 1000 187 L 1000 1313 C 1000 1416.277 916.277 1500 813 1500 L 187 1500 C 83.723 1500 0 1416.277 0 1313 L 0 187 C 0 83.723 83.723 0 187 0 Z M 125 1000 L 875 1000 L 875 250 L 125 250 Z M 500 1125 C 430.964 1125 375 1180.964 375 1250 C 375 1319.036 430.964 1375 500 1375 C 569.036 1375 625 1319.036 625 1250 C 625 1180.964 569.036 1125 500 1125 Z"></path></svg>';
    const DESKTOP_SVG = '<svg aria-label="Web" height="17" width="17" viewBox="0 0 24 24" fill="#23a55a"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z"></path></svg></span>';
    const get_svg_by_id = (id) => {
        return id.length > 22 ? ANDROID_SVG : id.substring(0, 2) === '3A' ? APPLE_SVG : DESKTOP_SVG;
    };
    
    class HookRendered extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_function = MODULES.MESSAGES_RENDERER.Meta;
            const original_function = this.original_function;
            MODULES.MESSAGES_RENDERER.Meta = function () {
                const ret = original_function(...arguments);
                HookRendered.device_handler(arguments[0]?.msg);
                return ret;
            };
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.MESSAGES_RENDERER.Meta = this.original_function;
        }
    
        static device_handler(message) {
            const message_elements = document.querySelectorAll(`[data-id="${message.id._serialized}"]`);
            if (message_elements.length !== 1) {
                return;
            }
            const message_parts = Array.from(message_elements[0].childNodes[0].childNodes);
            const message_box = message_parts.find((element) => element.innerText.includes(':'));
            if (message_box?.childNodes?.length < 2) {
                return;
            }
            const insert_into = message_box.childNodes[message_box.childNodes.length - 1];
            if (Array.from(insert_into.childNodes).some((element) => element.tagName === 'SVG')) {
                return;
            }
            const div_svg = document.createElement('svg');
            div_svg.innerHTML = get_svg_by_id(message.id.id);
            insert_into.prepend(div_svg);
        }
    }
    

    const REVOKE_SUBTYPES = ['sender_revoke', 'admin_revoke'];
    
    class RenderableMessageHook extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_function = MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages;
            const original_function = this.original_function;
            MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages = function () {
                arguments[0] = arguments[0].filter((message) => {
                    console.log(message);
                    return !RenderableMessageHook.handle_message(message);
                });
                return original_function(...arguments);
            };
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages = this.original_function;
        }
    
        static handle_message(message) {
            let should_ignore = false;
            should_ignore |= RenderableMessageHook.revoke_handler(message);
            return should_ignore;
        }
    
        static revoke_handler(message) {
            if (!REVOKE_SUBTYPES.includes(message?.subtype)) {
                return false;
            }
            message.type = 'chat';
            message.body = '🚫 | Mesaj silindi!';
            message.quotedStanzaID = message.protocolMessageKey.id;
            message.quotedParticipant = message.protocolMessageKey?.participant || message.from;
            message.quotedMsg = {
                'type': 'chat',
            };
            delete message.protocolMessageKey;
            delete message.subtype;
            return false;
        }
    }
    

    class EditMessageHook extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_function = MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs;
            const original_function = this.original_function;
            MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs = function () {
                arguments[0] = arguments[0].filter((message) => {
                    console.log(message);
                    return !EditMessageHook.handle_edited_message(message, ...arguments);
                });
    
                return original_function(...arguments);
            };
            MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsg = MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs;
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsgs = this.original_function;
            MODULES.PROCESS_EDIT_MESSAGE.processEditProtocolMsg = this.original_function;
        }
    
        static handle_edited_message() {
            const message = arguments[0];
            message.type = 'chat';
            message.body = `✏️ | Mesaj düzenlendi: ${message?.body || message?.caption}`;
            if (!message.protocolMessageKey) {
                return true;
            }
            message.quotedStanzaID = message.protocolMessageKey.id;
            message.quotedParticipant = message.protocolMessageKey?.participant || message.from;
            message.quotedMsg = {
                type: 'chat',
            };
            delete message.latestEditMsgKey;
            delete message.protocolMessageKey;
            delete message.subtype;
            delete message.editMsgType;
            delete message.latestEditSenderTimestampMs;
            MODULES.PROCESS_RENDERABLE_MESSAGES.processRenderableMessages(
                [message],
                window.webpackChunkwhatsapp_web_client?.length > 0 ? arguments[1] : {
                    'author': message.from,
                    'type': 'chat',
                    'externalId': message.id.id,
                    'edit': -1,
                    'isHsm': false,
                    'chat': message.id.remote,
                },
                null,
                {verifiedLevel: 'unknown'},
                null,
                0,
                arguments[2] === undefined ? arguments[1] : arguments[2]
            );
            return true;
        }
    }
    

    class ProtobufHook extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_function = MODULES.PROTOBUF_HOOK.decodeProtobuf;
            const original_function = MODULES.PROTOBUF_HOOK.decodeProtobuf;
            MODULES.PROTOBUF_HOOK.decodeProtobuf = function () {
                let message = original_function(...arguments);
                return set_key_json_recursive(message, 'viewOnce', false);
            };
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.PROTOBUF_HOOK.decodeProtobuf = this.original_function;
        }
    }
    

    class HookSendMessage extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            const filters = {
                '@everyone': 'participants',
                '@admins': 'admins',
            };
    
            this.original_function = MODULES.SEND_MESSAGE.sendMsgRecord;
            const original_function = this.original_function;
            MODULES.SEND_MESSAGE.sendMsgRecord = async function (message) {
                if (typeof message?.body === 'string') {
                    for (const [tag, filter] of Object.entries(filters)) {
                        if (message.body.includes(tag)) {
                            message = await HookSendMessage.handle_tag_all_message(message, filter);
                        }
                    }
                }
                return original_function(message);
            };
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.SEND_MESSAGE.sendMsgRecord = this.original_function;
        }
    
        static async handle_tag_all_message (message, filter) {
            if (message.id.remote.server !== 'g.us') {
                return message;
            }
            const group_metadata = await MODULES.QUERY_GROUP.getParticipantRecord(message.id.remote.toString());
            for (const participant of group_metadata[filter]) {
                message.mentionedJidList.push(MODULES.WID_FACTORY.createWid(participant));
            }
            return message;
        }
    }
    

    class HookReceipts extends Hook {
        constructor() {
            super();
            this.original_function = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
            this.original_function = MODULES.HANDLE_RECEIPT.handleChatSimpleReceipt;
            const original_function = this.original_function;
            MODULES.HANDLE_RECEIPT.handleChatSimpleReceipt = function (receipt) {
                if (receipt?.from?.server === 'c.us' && receipt?.ack === MODULES.WEB_ACK.ACK.READ) {
                    const msg_keys = [];
                    for (const msg of receipt.externalIds) {
                        msg_keys.push(`true_${receipt.from._serialized}_${msg}`);
                    }
                    MODULES.RECEIPT_BATCHER.receiptBatcher.acceptOtherReceipt({
                        ack: MODULES.WEB_ACK.ACK.READ,
                        ts: receipt.ts,
                        receiverId: receipt.from,
                        msgKeys: msg_keys,
                        isSender: false
                    });
                }
                return original_function(...arguments);
            };
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
            MODULES.HANDLE_RECEIPT.handleChatSimpleReceipt = this.original_function;
        }
    }
    

    class FullscreenHook extends Hook {
        FULLSCREEN_CSS = `
            div[id="app"]>div>div[tabindex="-1"] {
                min-width: 100% !important;
                height: 100% !important;
                top: 0 !important;
            }
        `;
    
        constructor() {
            super();
            this.style = null;
            this.observer = null;
        }
    
        register() {
            if (this.is_registered) {
                return;
            }
            super.register();
    
            this.apply_fullscreen();
            this.setup_observer();
        }
    
        unregister() {
            if (!this.is_registered) {
                return;
            }
            super.unregister();
    
            if (this.style && this.style.parentNode) {
                this.style.parentNode.removeChild(this.style);
            }
    
            if (this.observer) {
                this.observer.disconnect();
            }
    
            this.style = null;
            this.observer = null;
        }
    
        apply_fullscreen() {
            const targetElement = document.querySelector('div[id="app"]>div>div[tabindex="-1"]');
            if (targetElement) {
                if (!this.style) {
                    this.style = document.createElement('style');
                    document.head.appendChild(this.style);
                }
                this.style.textContent = this.FULLSCREEN_CSS;
            }
        }
    
        setup_observer() {
            this.observer = new MutationObserver((mutations) => {
                for (let mutation of mutations) {
                    if (mutation.type === 'childList') {
                        this.apply_fullscreen();
                    }
                }
            });
    
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    

    const hooks = {
        view_once_media: new ProtobufHook(),
        keep_revoked_messages: new RenderableMessageHook(),
        keep_edited_messages: new EditMessageHook(),
        indicate_sender_os: new HookRendered(),
        special_tags: new HookSendMessage(),
        blue_ticks: new HookReceipts(),
        fullscreen: new FullscreenHook(),
        settings_hook: new SettingsHook()
    };
    
    function handle_settings_update() {
        for (const [setting_name, hook] of Object.entries(hooks)) {
            if (active_settings[setting_name] === false) {
                hook.unregister();
            } else {
                hook.register();
            }
        }
    }
    
    let active_settings = {};
    
    
    window.addEventListener('message', function (event) {
        const message = event.data;
        if (message.settings !== undefined) {
            active_settings = message.settings;
            handle_settings_update();
        }
    });
    
    
    const start = () => {
        initialize_modules();
        for (const [setting_name, hook] of Object.entries(hooks)) {
            if (active_settings[setting_name] !== false) {
                hook.register();
            }
        }
    };
    
    
    console.log('WhatsApp-Plus loaded successfully!');
    // TODO: Solve it the right way. This is a temporary solution.
    const load_and_start = async () => {
        while (Object.values(WA_MODULES).find(m => require(m) === null) !== undefined) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        start();
    };
    setTimeout(load_and_start, 1000);
    
};
if (!window.is_plus_loaded) {
    window.is_plus_loaded = true;
    window.plus_main();
}