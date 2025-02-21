function execute(text, from, to, apiKey) {
    const sourceLang = "zh"; // Chinese
    const targetLang = "vi"; // Vietnamese
    return translateContent(text, sourceLang, targetLang, 0);
}

function translateContent(text, from, to, retryCount) {
    if (retryCount > 2) return null; 

    const apiUrl = '/translatePost.do'; 
    const formData = new FormData();
    formData.append('text', text);
    formData.append('type', to); 

    let response = fetch(apiUrl, {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        let result = response.json();
        let trans = "";
        if (result && result.translation) {
            trans = result.translation;
            return Response.success(trans.trim()); 
        } else {
            return translateContent(text, from, to, retryCount + 1);
        }
    } else {
        return translateContent(text, from, to, retryCount + 1); 
    }
}

function detectLanguage(text) {
    // Hàm này không thực sự cần thiết cho dichtienghoa.com trong trường hợp này,
    // nhưng để giữ cấu trúc tương tự code mẫu, chúng ta tạo một hàm dummy
    // Vì chúng ta đang dịch từ tiếng Trung, nên có thể giả định ngôn ngữ là 'zh'
    return "zh"; // Chinese
}
const Response = {
    success: function(result) {
        return result;
    }
};
