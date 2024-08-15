const WebSocket = require('ws');
const axios = require('axios');

const initializeWebSocket = async () => {

    const wss = new WebSocket.Server({ port: 8003 });
    console.log('\x1b[42m%s\x1b[0m', `Websocket: Connect access on port ${8003}`)

    wss.on('connection', async (ws, req) => {

        const userIdMatch = req.url.match(/userId=(\d+)/);
        if (!userIdMatch) {
            console.error('Invalid URL: userId not found');
            ws.close();
            return;
        }

        const userId = parseInt(userIdMatch[1]);

        try {
            // const user = await UserService.getUser({ userId: userId });
            const user = await axios.get(`http://localhost:8000/api/v1/users/websocket/${userId}`);

            if (!user) {
                throw new Error(`User do not exist`);
            }
            const updateUser = await axios.put(`http://localhost:8000/api/v1/users/websocket/${userId}/online`, {
                isOnline: true
            })
            if (!user) {
                throw new Error(`User can not update online`);
            }

            console.log(`User has username:${user.data.data.username} connected`);

            // WebSocketService.onClose(ws, user);
            ws.on('close', async () => {
                console.log(`User has username:${user.data.data.username} disconnected`);
            });
        } catch (error) {
            console.error('Failed to update user activity:', error);
            ws.close();
        }
    });

    wss.on('close', () => {
        console.log('WebSocket server closed');
    });
}

initializeWebSocket()
