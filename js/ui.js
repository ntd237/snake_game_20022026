/**
 * UI.JS
 * Quản lý toàn bộ giao tiếp với DOM: Nút bấm, Modals, Cập nhật Điểm
 */

class UIManager {
    constructor(engineInstance) {
        this.engine = engineInstance;

        // DOM Elements
        this.startModal = document.getElementById('startModal');
        this.gameOverModal = document.getElementById('gameOverModal');

        this.scoreEl = document.getElementById('currentScore');
        this.highScoreEl = document.getElementById('highScore');
        this.finalScoreEl = document.getElementById('finalScore');

        this.btnStart = document.getElementById('btnStart');
        this.btnRestart = document.getElementById('btnRestart');

        // Settings Elements
        this.diffRadios = document.querySelectorAll('input[name="difficulty"]');
        this.toggleObstacles = document.getElementById('toggle-obstacles');
        this.toggleDynamic = document.getElementById('toggle-dynamic-speed');

        this.initEvents();
    }

    initEvents() {
        this.btnStart.addEventListener('click', () => {
            this.handleStartGame();
        });

        this.btnRestart.addEventListener('click', () => {
            this.gameOverModal.classList.remove('active');
            this.startModal.classList.add('active'); // Quay lại menu chính để setup lại
        });
    }

    handleStartGame() {
        // Thu thập cài đặt (Settings)
        let selectedDiff = 'EASY';
        this.diffRadios.forEach(radio => {
            if (radio.checked) selectedDiff = radio.value;
        });

        const useObstacles = this.toggleObstacles.checked;
        const useDynamicSpeed = this.toggleDynamic.checked;

        // Đóng Modal Start
        this.startModal.classList.remove('active');

        // Bắt đầu Game thông qua Engine
        this.engine.startGame({
            difficulty: selectedDiff,
            useObstacles: useObstacles,
            useDynamicSpeed: useDynamicSpeed
        });
    }

    updateScore(score) {
        this.scoreEl.innerText = score;
    }

    updateHighScore(highScore) {
        this.highScoreEl.innerText = highScore;
    }

    showGameOver(finalScore) {
        this.finalScoreEl.innerText = finalScore;
        this.gameOverModal.classList.add('active');
    }
}
