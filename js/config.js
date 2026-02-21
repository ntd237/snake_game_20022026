/**
 * CONFIG.JS
 * Cấu hình toàn bộ thông số, hằng số, quy tắc sinh chướng ngại vật và tốc độ
 */

const CONFIG = {
    // Canvas config
    CANVAS_WIDTH: 1660,
    CANVAS_HEIGHT: 880,
    GRID_SIZE: 20, // Kích thước 1 block

    // UI Colors (phải khớp với CSS)
    COLORS: {
        BACKGROUND: '#12121c',
        SNAKE_HEAD: '#00e676',
        SNAKE_BODY: '#00c853',
        FOOD: '#ff1744',
        OBSTACLE: '#424242'
    },

    // Thông số khó (Difficulties)
    DIFFICULTIES: {
        EASY: {
            baseSpeed: 150, // ms delay (càng nhỏ càng nhanh)
            obstacleCount: 50
        },
        NORMAL: {
            baseSpeed: 100,
            obstacleCount: 100
        },
        HARD: {
            baseSpeed: 50,
            obstacleCount: 200
        }
    },

    // Tốc độ động (Dynamic Speed)
    DYNAMIC_SPEED: {
        ITEMS_TO_INCREASE: 5, // Tăng tốc sau khi ăn 5 mồi
        SPEED_DECREMENT: 5,   // Giảm 5ms delay sau mỗi lần tăng (làm game chạy nhanh hơn)
        MIN_SPEED: 30         // Giới hạn max tốc độ (delay min là 30ms)
    },

    // Quy tắc sinh chướng ngại vật (Obstacles Rule)
    OBSTACLES: {
        MIN_SIZE: 1, // Kích thước tối thiểu là 1 block
        MAX_SIZE: 5  // Kích thước tối đa là 5 block (dọc/ngang)
    }
};

// Tính toán số lượng blocks trên 2 trục
CONFIG.TOTAL_BLOCKS_X = CONFIG.CANVAS_WIDTH / CONFIG.GRID_SIZE;
CONFIG.TOTAL_BLOCKS_Y = CONFIG.CANVAS_HEIGHT / CONFIG.GRID_SIZE;

// Ngăn cản Object Freeze nếu muốn sau này mở rộng, nhưng hiện tại ta có thể khóa cấu hình.
Object.freeze(CONFIG.DIFFICULTIES);
Object.freeze(CONFIG.COLORS);
