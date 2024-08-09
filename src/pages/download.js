export async function POST({ request }) {
    try {
        // Lấy dữ liệu từ form
        const formData = await request.formData();
        const tiktokLink = formData.get('tiktokLink');

        if (!tiktokLink) {
            return new Response(JSON.stringify({ error: 'TikTok link not provided' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Tạo URL cho API request
        const apiUrl = `https://toptop.huuhuybn.workers.dev/?link=${encodeURIComponent(tiktokLink)}`;

        // Gửi request tới API
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (result.code !== 0) {
            return new Response(JSON.stringify({ error: 'Failed to fetch video data' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Lấy thuộc tính cần thiết
        const { title, hdplay } = result.data;

        // Chuyển hướng đến trang hiển thị video với các thuộc tính cần thiết
        return Response.redirect(`https://tiktokmmo-4rw.pages.dev/downloader?title=${encodeURIComponent(title)}&hdplay=${encodeURIComponent(hdplay)}`, 302);
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: 'Failed to process request. Please try again later.' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
