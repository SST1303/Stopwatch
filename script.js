class Stopwatch{
    constructor(){
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;

        //get DOM elements
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.millisecondsElement = document.getElementById('milliseconds');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.display = document.querySelector('.display');

        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());

        this.updateDisplay(); //initialize display
    }

    start() {
        if(!this.isRunning){
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.updateTime(), 10);
            this.isRunning = true;

            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;

            this.display.classList.add('running'); //add running animation
        }
    }

    stop(){
        if(this.isRunning){
            clearInterval(this.timerInterval);
            this.isRunning = false;

            this.startBtn.disabled = false;
            this.stopBtn.disabled = true;

            this.display.classList.remove('running'); //remove running animation
        }
    }

    reset(){
        this.stop();
        this.elapsedTime = 0;
        this.updateDisplay();
    }

    updateTime(){
        this.elapsedTime = Date.now() - this.startTime;
        this.updateDisplay();
    }

    updateDisplay(){
        const totalMilliseconds = Math.floor(this.elapsedTime);
        const minutes = Math.floor(totalMilliseconds / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

        //format numbers
        this.minutesElement.textContent = this.formatTime(minutes);
        this.secondsElement.textContent = this.formatTime(seconds);
        this.millisecondsElement.textContent = this.formatTime(milliseconds);
    }

    formatTime(value){
        return value.toString().padStart(2, '0');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});

//add keyboard shortcuts
document.addEventListener('keydown', (event) => {
    switch(event.code){
        case 'Space':
            event.preventDefault();
            const startBtn = document.getElementById('startBtn');
            const stopBtn = document.getElementById('stopBtn');

            if(!startBtn.disabled){
                startBtn.click();
            }else if (!stopBtn.disabled){
                stopBtn.click();
            }
            break;

        case 'KeyR':
            event.preventDefault();
            document.getElementById('resetBtn').click();
            break;
    }
});