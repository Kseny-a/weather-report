

let tempValue = 72;

const temp = document.getElementById('tempValue')
temp.innerText = tempValue
temp.style.color = tempColorByNum(tempValue)
const tempColorByNum = (value) => {
  let tempColor = '';
if (value > 80){
  tempColor = 'red'
} else if (value >= 70) {
  tempColor = 'orange'
} else if (value >= 60) {
  tempColor = 'yellow'
} else if (value >= 50) {
  tempColor = 'green'
} else {
  tempColor = 'teal'
}; 
  return tempColor
}