const settings_toggles = {
    'view_once_media': 'Tek Görüntülenme Sınırını Aş',
    'keep_revoked_messages': 'Silinen Mesajları Koru',
    'keep_edited_messages': 'Düzenlenen Mesajları Koru',
    'indicate_sender_os': 'İşletim Sistemini Göster'
};

let active_settings = Object.fromEntries(Object.keys(settings_toggles).map(key => [key, true]));

const on_toggle = async (event) => {
    active_settings[event.target.id] = event.target.checked;
    chrome.storage.sync.set({settings: active_settings});
};

const add_setting_toggle = (setting_key, title) => {
    const item = document.createElement('div');
    item.setAttribute('class', 'setting-item');

    const label = document.createElement('label');
    if (setting_key === 'view_once_media') {
        label.textContent = title;
        label.style.fontSize = "14px"
        label.style.width = "84%"
        label.style.textAlign = "left"
        label.style.float = "left"

        const warningLink = document.createElement('a');
        warningLink.setAttribute('href', 'https://sourceb.in/VcLbdVH7XQ');
        warningLink.setAttribute('target', '_blank');
        warningLink.style.fontSize = '12px';
        warningLink.style.color = '#aaa';
        warningLink.textContent = "(Bozuksa düzeltmek için tıkla)";
        warningLink.style.width = "84%"
        warningLink.style.textAlign = "center"
        warningLink.style.float = "left"
        label.appendChild(warningLink);
    } else {
        label.setAttribute('for', setting_key);
        label.textContent = title;
        label.style.fontSize = "14px"
    }
    item.appendChild(label);

    const toggle_switch = document.createElement('div');
    toggle_switch.setAttribute('class', 'toggle-switch');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', setting_key);
    input.addEventListener('change', on_toggle);
    input.checked = active_settings[setting_key];
    toggle_switch.appendChild(input);

    const toggle_label = document.createElement('label');
    toggle_label.setAttribute('for', setting_key);
    toggle_label.setAttribute('class', 'switch-label');
    toggle_switch.appendChild(toggle_label);

    item.appendChild(toggle_switch);
    return item;
};

const settings_section = document.getElementById('settings_section');

chrome.storage.sync.get('settings').then(data => {
    active_settings = data.settings;
    for (const [setting_key, title] of Object.entries(settings_toggles)) {
        const item = add_setting_toggle(setting_key, title);
        settings_section.appendChild(item);
    }
});
