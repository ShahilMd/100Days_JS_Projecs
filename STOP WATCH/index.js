
// Get DOM elements
let hoursInput = document.getElementById('hours');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');
const timerDisplay = document.getElementById('timer');
const timeOverDisplay = document.getElementById('timeOver');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let countdown;
let totalSeconds = 0;
let isRunning = false;


    // Format time as HH:MM:SS
    function formatData(totalSecs){
      const hours = Math.floor(totalSecs / 3600);
      const minutes = Math.floor((totalSecs % 3600) / 60);
      const seconds = totalSecs % 60

      return [hours,minutes,seconds].map(val => val<10 ? `0${val}`:val 
      ).join(':');
         
    }
    
    // Update the display
    function updateDisplay() {
        timerDisplay.textContent = formatData(totalSeconds);
    }
   // Start the timer
    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        let userHours = parseInt(hoursInput.value)||0;
        let userMinutes = parseInt(minutesInput.value)||0;
        let userSecond = parseInt(secondsInput.value)||0;
  
        
        if (totalSeconds === 0) {
          totalSeconds = (userHours * 3600 + userMinutes * 60 + userSecond);
      }
        countdown = setInterval(() => {
      
          totalSeconds--;
          if(totalSeconds<=0){
            clearInterval(countdown);
            
            timeOverDisplay.style.display='block'
            timerDisplay.style.display='none'
            isRunning = false;
            pauseBtn.textContent = 'Pause';
          }
          updateDisplay();
          
        }, 1000);
      }

  // Pause the timer
pauseBtn.addEventListener('click', () => {
  
  if (isRunning) {
    clearInterval(countdown);
    isRunning = false;
    pauseBtn.textContent = 'Resume';
  }else if(totalSeconds>0){
    startTimer();
    pauseBtn.textContent = 'Pause';
  }
})

  // Reset the timer
  resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    isRunning = false;
    totalSeconds = 0;
    timerDisplay.textContent = '00:00:00';
    updateDisplay();
  })

 // Event listeners
  startBtn.addEventListener('click',()=>{
            if(totalSeconds>0){
              return;
            }
            startBtn.disabled=false
            timeOverDisplay.style.display='none'
            timerDisplay.style.display='block';
            totalSeconds = 0;
            startTimer();
  
  })

 // Initialize display
 updateDisplay();

// Prevent form submission on enter key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault();
      startTimer();
  }
});

// Input validation to ensure only numbers are entered
[hoursInput, minutesInput, secondsInput].forEach(input => {
  input.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
      
      // Ensure values are within allowed ranges
      const value = parseInt(this.value) || 0;
      if (this.id === 'hours' && value > 99) this.value = '99';
      if ((this.id === 'minutes' || this.id === 'seconds') && value > 59) this.value = '59';
  });
});

