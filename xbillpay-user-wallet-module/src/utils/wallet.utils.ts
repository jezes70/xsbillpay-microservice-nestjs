export class Utils{
   static  generateCreditCardNumber():number {
    const issuerDigit = '4';
    let cardNumber = issuerDigit;
    for (let i = 0; i < 15; i++) {
      cardNumber += Math.floor(Math.random() * 10);
    }
  

    const checksum = this.generateChecksum(cardNumber);
    cardNumber += checksum;
  
    return parseInt(cardNumber);
  }
  
 static  generateChecksum(cardNumber) {
    let sum = 0;
    let doubleUp = false;
  
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
  
      if (doubleUp) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      doubleUp = !doubleUp;
    }
  
    const checksum = (sum % 10 === 0) ? 0 : 10 - (sum % 10);
    return checksum.toString();
  }
  
}

  