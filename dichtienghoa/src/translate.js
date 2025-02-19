load("language_list.js");

async function dichTiengVietWebsite(textGoc, fromLang = null, toLang = "vi") {
    /**
     * Dịch văn bản bằng website dichtienghoa.com (phiên bản Javascript tương tự Baidu Translate).
     * Mặc định dịch từ tiếng Hoa sang tiếng Việt.
     *
     * Args:
     *     textGoc (string): Văn bản gốc cần dịch.
     *     fromLang (string, optional): Mã ngôn ngữ nguồn (ví dụ: 'zh' cho tiếng Hoa). Nếu null, để tự độngDetect. (Hiện tại không dùng detect language cho dichtienghoa.com)
     *     toLang (string): Mã ngôn ngữ đích, mặc định là 'vi' (tiếng Việt).
     *
     * Returns:
     *     string: Văn bản đã dịch sang tiếng Việt, hoặc null nếu có lỗi.
     */
    const url = "https://dichtienghoa.com/translate/ajax";
    const params = new URLSearchParams({
        "text": textGoc,
        "type": toLang // Loại dịch, mặc định là "vi" (tiếng Việt)
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const dataJson = await response.json();
        if (dataJson && dataJson.translation) {
            return dataJson.translation;
        } else {
            return null;
        }

    } catch (error) {
        console.error("Lỗi dịch thuật:", error);
        return null;
    }
}

async function execute(text, from, to, apiKey) {
    /**
     * Hàm thực thi dịch thuật, tương tự cấu trúc 'execute' của Baidu code.
     * apiKey không cần thiết cho dichtienghoa.com (để tương thích với params Baidu)
     */
    return await dichTiengVietWebsite(text, from, to);
}