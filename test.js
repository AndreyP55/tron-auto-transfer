const TronWeb = require('tronweb');

// Create a TRON web instance
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

// Set the private key of the sender's TRON address
const privateKey = '50906b71117ceaeb5c5e225d5c9a02a02464db0481971136243b401007b19aad';

// Set the contract address of the TRC-20 token
const tokenContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

// Set the recipient address
const recipientAddress = 'TCt3hGtkpuT3rfhWb7ZvEoTyP9HeckaU1V';

// Set the amount of tokens to send
const amount = 2450; // Adjust the amount as needed

async function sendTokens() {
    try {
      // Convert the private key to an address
      const address = tronWeb.address.fromPrivateKey(privateKey);
  
      // Set the TRON default address
      tronWeb.defaultAddress = address;
  
      // Get the contract instance
      const contract = await tronWeb.contract().at(tokenContractAddress);
  
      // Send the tokens
      const result = await contract.transfer(recipientAddress, amount).send();
  
      // Transaction successful
      console.log('Transaction successful!');
    } catch (error) {
      // Transaction failed
      console.error('Transaction failed:', error);
    }
  }
  
sendTokens();