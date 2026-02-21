/**
 * ENTITIES.JS
 * Quản lý đối tượng Rắn (Snake) và Mồi (Food)
 */

class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        // Rắn khởi đầu ở trung tâm màn hình, độ dài 3 block
        const midX = Math.floor(CONFIG.TOTAL_BLOCKS_X / 2);
        const midY = Math.floor(CONFIG.TOTAL_BLOCKS_Y / 2);
        this.body = [
            { x: midX, y: midY },
            { x: midX - 1, y: midY },
            { x: midX - 2, y: midY }
        ];
        this.direction = { x: 1, y: 0 }; // Di chuyển sang phải
        this.nextDirection = { x: 1, y: 0 }; // Buffer phím bấm
        this.isDead = false;

        // Thống kê hỗ trợ tính Tốc độ Động
        this.foodsEaten = 0;
    }

    setDirection(dx, dy) {
        // Ngăn rắn tự cắn mình khi rẽ ngoặt 180 độ
        if (this.direction.x !== 0 && dx !== 0) return;
        if (this.direction.y !== 0 && dy !== 0) return;

        this.nextDirection = { x: dx, y: dy };
    }

    update() {
        if (this.isDead) return;

        this.direction = { ...this.nextDirection };

        // Cập nhật vị trí đầu mới
        const newHead = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };

        // Bất luận ăn hay không, gắn đầu mới vào
        this.body.unshift(newHead);

        // Lưu ý: Việc chặt đuôi (pop) sẽ được quyết định bên trong Engine 
        // tùy thuộc vào việc Head có trùng tọa độ Food hay không.
    }

    // Cắn phải thân mình
    checkSelfCollision() {
        const head = this.body[0];
        // Quét từ lóng thứ 2 (index 1) trở đi vì index 0 là head
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) return true;
        }
        return false;
    }

    // Đâm vào tường
    checkWallCollision() {
        const head = this.body[0];
        return (
            head.x < 0 || head.x >= CONFIG.TOTAL_BLOCKS_X ||
            head.y < 0 || head.y >= CONFIG.TOTAL_BLOCKS_Y
        );
    }

    draw(ctx) {
        this.body.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? CONFIG.COLORS.SNAKE_HEAD : CONFIG.COLORS.SNAKE_BODY;
            ctx.fillRect(
                segment.x * CONFIG.GRID_SIZE,
                segment.y * CONFIG.GRID_SIZE,
                CONFIG.GRID_SIZE,
                CONFIG.GRID_SIZE
            );

            // Vẽ viền cho lóng rắn nhìn rõ ràng hơn
            ctx.strokeStyle = '#000';
            ctx.strokeRect(
                segment.x * CONFIG.GRID_SIZE,
                segment.y * CONFIG.GRID_SIZE,
                CONFIG.GRID_SIZE,
                CONFIG.GRID_SIZE
            );
        });
    }
}

class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
    }

    // Random vị trí không đè lên Rắn và Chướng ngại vật
    spawn(snakeBody, obstacles) {
        let valid = false;
        while (!valid) {
            this.position = {
                x: Math.floor(Math.random() * CONFIG.TOTAL_BLOCKS_X),
                y: Math.floor(Math.random() * CONFIG.TOTAL_BLOCKS_Y)
            };

            // Hàm hỗ trợ kiểm tra mảng
            const checkCollision = (target, array) => array.some(item => item.x === target.x && item.y === target.y);

            // Phải không trùng snake body và obstacles
            if (!checkCollision(this.position, snakeBody) && !checkCollision(this.position, obstacles)) {
                valid = true;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = CONFIG.COLORS.FOOD;
        // Có thể vẽ hình tròn cho đẹp
        ctx.beginPath();
        ctx.arc(
            this.position.x * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2,
            this.position.y * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2,
            CONFIG.GRID_SIZE / 2 - 2,
            0,
            2 * Math.PI
        );
        ctx.fill();

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}
