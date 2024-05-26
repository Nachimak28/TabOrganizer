chrome.tabGroups.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(groups) {
    const groupNames = {};
    groups.forEach(group => {
        groupNames[group.id] = group.title || `Group ${group.id}`;
    });

    chrome.tabs.query({currentWindow: true}, function(tabs) {
        let tabData = "Group,URL\n"; // CSV header
        tabs.forEach(tab => {
            const groupName = tab.groupId > 0 ? groupNames[tab.groupId] : 'No Group';
            tabData += `"${groupName}","${tab.url}"\n`;
        });
        
        const blob = new Blob([tabData], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url,
            filename: 'tabs.csv'
        });
    });
});
