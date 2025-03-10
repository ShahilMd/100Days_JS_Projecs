function updateClock(){
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes')
const second =document.getElementById('seconds');
const ampm =document.getElementById('ampm');
const date = document.getElementById('date');
const time =new Date()

const oldHrs = time.getHours()
const newHrs= (oldHrs%12).toString().padStart(2,'0');
const newDate = time() 



const min = time.getMinutes().toString().padStart(2,'0')
const sec = time.getSeconds().toString().padStart(2,'0')

const amPM = oldHrs<=12 ? 'AM' :'PM'



hours.textContent=newHrs
minutes.textContent=min
second.textContent=sec
ampm.textContent=amPM
date.textContent=newDate


}

setInterval(updateClock)