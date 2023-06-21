const { async } = require('regenerator-runtime');
const TronWeb = require('tronweb');

// Create a TRON web instance
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  privateKey: '50906b71117ceaeb5c5e225d5c9a02a02464db0481971136243b401007b19aad',
});
const account = 'THzbnFasHU6AsHfbKahznBNC3Ss591zwPS';
const recive_adress = 'TCt3hGtkpuT3rfhWb7ZvEoTyP9HeckaU1V';

async function get_balance()
{
  while (true)
  {
    const balance = await tronWeb.trx.getBalance(account);
    const trxAmount = tronWeb.fromSun(balance);
    //get time
    const now = new Date();

// Extract the individual time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the time components with leading zeros if necessary
    const formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
    console.log(formattedTime,'Balance :', trxAmount)
    if(trxAmount > 10)
    {
      try {
        const transaction = await tronWeb.transactionBuilder.sendTrx(
        recive_adress,
        trxAmount,
        account
        );

        // Sign the transaction
        const signedTransaction = await tronWeb.trx.sign(transaction);
        
        // Broadcast the transaction to the network
        const broadcastResult = await tronWeb.trx.sendRawTransaction(signedTransaction);

        console.log('Transaction sent:', broadcastResult);
      } 
    catch (error) 
    {
      console.error('Error occurred:', error);
    }
    }
     // Create the transaction object
  }
  
}

get_balance()


