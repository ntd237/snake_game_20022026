/**
 * MAP.JS
 * Chịu trách nhiệm quản lý hệ thống lưới và quản lý tập hợp các chướng ngại vật (Obstacles)
 * Sinh ngẫu nhiên các hình chữ nhật tuân thủ yêu cầu:
 * - Không sinh đè lên vị trí xuất phát của Rắn.
 * - Các hình dạng có chiều rộng/dài ngẫu nhiên >= 1.
 */

class GameMap {
    constructor() {
        this.obstacles = [];
    }

    // Xóa toàn bộ chướng ngại vật
    reset() {
        this.obstacles = [];
    }

    /**
     * Khởi tạo chướng ngại vật cho toàn bộ màn chơi dựa trên cấu hình độ khó.
     * @param {number} count Số lượng chướng ngại vật cần sinh
     * @param {Array} safeZone Mảng các tọa độ {x, y} được đánh dấu là vùng an toàn (Rắn bắt đầu)
     */
    generateObstacles(count, safeZone) {
        this.reset();
        let attempts = 0;
        const maxAttempts = count * 20;

        while (this.obstacles.length < count && attempts < maxAttempts) {
            attempts++;

            // Random kích thước (width x height) trong giới hạn Config
            const w = Math.floor(Math.random() * (CONFIG.OBSTACLES.MAX_SIZE - CONFIG.OBSTACLES.MIN_SIZE + 1)) + CONFIG.OBSTACLES.MIN_SIZE;
            const h = Math.floor(Math.random() * (CONFIG.OBSTACLES.MAX_SIZE - CONFIG.OBSTACLES.MIN_SIZE + 1)) + CONFIG.OBSTACLES.MIN_SIZE;

            // Random vị trí bắt đầu
            const startX = Math.floor(Math.random() * (CONFIG.TOTAL_BLOCKS_X - w));
            const startY = Math.floor(Math.random() * (CONFIG.TOTAL_BLOCKS_Y - h));

            const newObstacleCells = [];
            let isValid = true;

            // Kiểm tra từng block của chướng ngại vật này
            for (let x = startX; x < startX + w; x++) {
                for (let y = startY; y < startY + h; y++) {
                    const block = { x, y };
                    newObstacleCells.push(block);

                    // Kiểm tra xem block có đè lên safeZone (Rắn) không?
                    if (this._isCollisionWithArray(block, safeZone)) {
                        isValid = false;
                        break;
                    }

                    // Kiểm tra xem block có đè lên chướng ngại vật khác đã tạo không?
                    if (this._isCollisionWithArray(block, this.obstacles)) {
                        isValid = false;
                        break;
                    }
                }
                if (!isValid) break;
            }

            // Nếu an toàn, đẩy list các block vào obstacles tổng
            if (isValid) {
                this.obstacles.push(...newObstacleCells);
            }
        }
    }

    // Helper: Kiểm tra 1 block có trùng tọa độ trong 1 array {x,y} không
    _isCollisionWithArray(target, array) {
        return array.some(block => block.x === target.x && block.y === target.y);
    }

    /**
     * Kiểm tra va chạm với lưới chướng ngại vật
     */
    checkCollision(head) {
        return this._isCollisionWithArray(head, this.obstacles);
    }

    /**
     * Render toàn bộ chướng ngại vật ra Canvas
     */
    draw(ctx) {
        ctx.fillStyle = CONFIG.COLORS.OBSTACLE;
        this.obstacles.forEach(block => {
            ctx.fillRect(
                block.x * CONFIG.GRID_SIZE,
                block.y * CONFIG.GRID_SIZE,
                CONFIG.GRID_SIZE,
                CONFIG.GRID_SIZE
            );
            // Viền nhẹ cho chướng ngại vật bóng bẩy hơn
            ctx.strokeStyle = '#2b2b2b';
            ctx.strokeRect(
                block.x * CONFIG.GRID_SIZE,
                block.y * CONFIG.GRID_SIZE,
                CONFIG.GRID_SIZE,
                CONFIG.GRID_SIZE
            );
        });
    }
}
