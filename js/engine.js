/**
 * ENGINE.JS
 * Trái tim của trò chơi. Xử lý Game Loop, lắng nghe Input, kiểm soát trạng thái
 */

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');

        // Đảm bảo kích thước Canvas DOM nhận giá trị động từ CONFIG
        this.canvas.width = CONFIG.CANVAS_WIDTH;
        this.canvas.height = CONFIG.CANVAS_HEIGHT;

        this.ctx = this.canvas.getContext('2d');

        this.snake = new Snake();
        this.food = new Food();
        this.gameMap = new GameMap();

        this.ui = new UIManager(this);

        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.ui.updateHighScore(this.highScore);

        // State Machine
        this.isPlaying = false;
        this.lastRenderTime = 0;

        // Cấu hình hiện tại do người dùng chọn
        this.currentSpeed = CONFIG.DIFFICULTIES.EASY.baseSpeed;
        this.useDynamicSpeed = false;

        this.initControls();
    }

    initControls() {
        window.addEventListener('keydown', e => {
            if (!this.isPlaying) return;

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    this.snake.setDirection(0, -1);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    this.snake.setDirection(0, 1);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    this.snake.setDirection(-1, 0);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    this.snake.setDirection(1, 0);
                    break;
            }
        });
    }

    startGame(settings) {
        // Áp dụng Cài Đặt
        const diffConfig = CONFIG.DIFFICULTIES[settings.difficulty];
        this.currentSpeed = diffConfig.baseSpeed;
        this.useDynamicSpeed = settings.useDynamicSpeed;

        this.score = 0;
        this.ui.updateScore(this.score);

        // Reset & Khởi tạo Entities
        this.snake.reset();
        this.gameMap.reset();

        if (settings.useObstacles) {
            this.gameMap.generateObstacles(diffConfig.obstacleCount, this.snake.body);
        }

        this.food.spawn(this.snake.body, this.gameMap.obstacles);

        this.isPlaying = true;
        this.lastRenderTime = 0;

        // Kích hoạt Loop
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameOver() {
        this.isPlaying = false;
        this.snake.isDead = true;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
            this.ui.updateHighScore(this.highScore);
        }

        this.ui.showGameOver(this.score);
    }

    update() {
        this.snake.update();

        const head = this.snake.body[0];

        // 1. Kiểm tra kịch bản chết
        if (this.snake.checkWallCollision() ||
            this.snake.checkSelfCollision() ||
            this.gameMap.checkCollision(head)) {
            this.gameOver();
            return;
        }

        // 2. Chạm vi xử lý Mồi
        if (head.x === this.food.position.x && head.y === this.food.position.y) {
            // Rắn Ăn Mồi -> Tăng điểm
            this.score += 10;
            this.ui.updateScore(this.score);
            this.snake.foodsEaten++;

            // Sinh mồi mới
            this.food.spawn(this.snake.body, this.gameMap.obstacles);

            // Kiểm tra Tốc độ Nhanh (Dynamic Speed)
            if (this.useDynamicSpeed && this.snake.foodsEaten % CONFIG.DYNAMIC_SPEED.ITEMS_TO_INCREASE === 0) {
                const newSpeed = this.currentSpeed - CONFIG.DYNAMIC_SPEED.SPEED_DECREMENT;
                this.currentSpeed = Math.max(newSpeed, CONFIG.DYNAMIC_SPEED.MIN_SPEED);
            }

            // Lưu ý: Rắn ăn mồi thì không cắt đuôi (tự dài ra do nãy update() đã unshift luôn 1 cục đầu)
        } else {
            // Không ăn thì phải Cắt phần đuôi đi để bảo toàn độ dài
            this.snake.body.pop();
        }
    }

    draw() {
        // Xoá nền cũ
        this.ctx.fillStyle = CONFIG.COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Render từng Layer tuần tự
        this.gameMap.draw(this.ctx);
        this.food.draw(this.ctx);
        this.snake.draw(this.ctx);
    }

    gameLoop(currentTime) {
        if (!this.isPlaying) return;

        window.requestAnimationFrame(this.gameLoop.bind(this));

        const secondsSinceLastRender = currentTime - this.lastRenderTime;

        // So sánh với currentSpeed (ms)
        if (secondsSinceLastRender < this.currentSpeed) return;

        this.lastRenderTime = currentTime;

        this.update();
        if (this.isPlaying) this.draw();
    }
}

// Khởi chạy hệ thống sau khi DOM Load
window.onload = () => {
    new GameEngine();
};
