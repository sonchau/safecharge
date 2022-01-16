import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  
  const [clientUniqueId, setClientUniqueId] = useState('')
  const [sessionToken, setSessionToken] = useState('')


  useEffect(() => {  
    const script = document.createElement("script");  
    script.src = "https://cdn.safecharge.com/safecharge_resources/v1/websdk/safecharge.js";  
    script.async = true;  
    document.body.appendChild(script);  
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', clientUniqueId, sessionToken)
    const sfc = window.SafeCharge({
      env: 'int',
      merchantId: "9012250699377918566",
      sessionToken: sessionToken,
      merchantSiteId: "197458"
    });

    const paymentData = {
      "userTokenId": "803254",
      "clientUniqueId": clientUniqueId,
      "cardHolderName": "test",
      "paymentOption": {
        "card": {
          "CVV": "222",
          "cardHolderName": "test",
          "cardNumber": "4025478179661112",
          "expirationMonth": "3",
          "expirationYear": "2022",
        }
      },
      "billingAddress": {
        "email": "someone@somedomain.com",
        "country": "GB"
      },
      "sessionToken": sessionToken
    }
    console.log('before', paymentData)     
    sfc.createPayment(paymentData , function(res) {
      console.log(res);
      console.log('after', paymentData)  
    
    })
  }
  const handleChangeClientUniqueId = (event) => {
    setClientUniqueId( event.target.value);
  }
  const handleChangeSessionToken = (event) => {
    setSessionToken( event.target.value);
  }

  return (

    <form onSubmit={handleSubmit} className='App'>
      <div>        
        <label>
        clientUniqueId:
          <input type="text" value={clientUniqueId} onChange={handleChangeClientUniqueId} />
        </label>

      <div>
      <label>
      sessionToken:
          <input type="text" value={sessionToken} onChange={handleChangeSessionToken} />
        </label>

      </div>
      <input type="submit" value="Submit" /></div>
      </form>
  );
}

export default App;
