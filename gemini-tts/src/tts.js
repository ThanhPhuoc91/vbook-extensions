load("voice_list.js");
javascript
async function execute(text, voice) {
    let voiceInfo = voices.find(function (e) {
        return e.id == voice;
    });
    let lang = "vi";
    if (voiceInfo) {
        lang = voiceInfo.language;
    }
    let response = await fetch("https://gemini.google.com/_/BardChatUi/data/batchexecute", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "",
        },
        body: "f.req=" + encodeURIComponent(getPayloadData(text, lang)) + "&at=" + SNlM0e
    });
    if (response.ok) {
        let responseText = await response.text();
        let data = /([["wrb.fr".*?"generic"]])/.exec(responseText)[1].trim();
        const jsonArray = JSON.parse(data);
        const contentArray = JSON.parse(jsonArray[0][2]);

        // Return base64
        return Response.success(contentArray[0]);
    }
    return null;
}
