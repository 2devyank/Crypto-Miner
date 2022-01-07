import React, {  createContext, useContext, useEffect, useState } from 'react'


const Crypto=createContext();
function CryptoContext({children}) {
const [symbol, setsymbol] = useState("Rs")
const [currency, setcurrency] = useState("INR")
useEffect(() => {
    if(currency==='INR')setsymbol("RS");
    else if(currency==="USD")setsymbol("$");
}, [currency])

    return (
    <Crypto.Provider value={{currency,setcurrency,symbol}}>
        {children}
        </Crypto.Provider>
        );
};

export default CryptoContext


export const CryptoState=()=>{
return useContext(Crypto);
}
