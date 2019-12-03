export function checkDigitTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
export function getMyDateFormat(date:Date){
  return checkDigitTime(date.getHours()) + ":" + checkDigitTime(date.getMinutes()) + ":" + checkDigitTime(date.getSeconds());
}

