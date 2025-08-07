export const mockMessage = {
    code: 0,
    error: "",
    message: "สำเร็จ",
    payload: Array.from({ length: 60 }, (_, i) => {
        const types = [
            {
                message: "มีอะไรให้ช่วยครับ",
                type: "chat",
                message_type: "text",
            },
            {
                message: "สวัสดี",
                type: "reply",
                message_type: "text",
            },
            {
                message: "https://allchat-dev-808ab.s3.ap-southeast-1.amazonaws.com/@UQgrM00004/20250723/1753235816438086300",
                type: "chat",
                message_type: "image",
            }
        ];
        const t = types[i % types.length];
        return {
            ...t,
            create_at: `2025-07-23T01:34:${(46 + i).toString().padStart(2, "0")}.016+00:00`
        };
    })
};


export const mockRooms =
{
    code: 0,
    error: "",
    message: "สำเร็จ",
    payload: Array.from({ length: 20 }, (_, i) => ({
        id: (i + 1).toString(),
        last_message: `สวัสดี ${i + 1}`,
        update_at: `2025-07-23T01:34:${(46 + i).toString().padStart(2, "0")}.016+00:00`
    }))
}

