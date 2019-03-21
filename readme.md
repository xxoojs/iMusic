chrome扩展程序  chrome extensions

<!-- popup的开发模式 -->
{
    "name": "Hello Extensions",
    "description" : "Base Level Extension",
    "version": "1.0",
    "manifest_version": 2,
    "browser_action": {
        "default_popup": "hello.html",
        "default_icon": "hello_extensions.png"
    },
}

可以使用chrome扩展成的API，hello.html里即正常的HTML
chrome.runtime.onMessage.addListener(
    function(message, callback) {
        if (message == "runContentScript"){
            chrome.tabs.executeScript({
                file: 'contentScript.js'
            });
        }
    }
);



<!-- 自动执行的开发模式 -->
{  
    "name": "helloExtensions",
    "manifest_version": 2,
    "version": "1.0",
    "browser_action": {
        "default_popup": "hello.html",
        "default_icon": "hello_extensions.png"
    },
    "content_scripts": [  
        {  
            "matches": [
                "http://*/*",
                "https://*/*"
            ],
            "js": ["./myscript.js"],
            "run_at": "document_end"
        }  
    ]
}

myscript.js
这里的chrome无法用chrome扩展程序的API
alert(1);