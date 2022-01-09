import { CircularProgress, createTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';

const Coininfo = ({coin}) => {
const [historicaldata, sethistoricaldata] = useState();
const [days, setdays] = useState(1);
const{currency,symbol}=CryptoState();


const fetchHistoricaldata=async()=>{
const {data}=await axios.get(HistoricalChart(coin.id,days,currency))
sethistoricaldata(data.prices);
}

const useStyles=makeStyles((theme)=>({
    container:{
width:"75%",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
marginTop:20,
padding:40,
    }
}))

const classes=useStyles();
useEffect(() => {
    fetchHistoricaldata();
}, [currency,days])

const darktheme=createTheme({
    palette:{
    primary:{
        main:'#fff'
    },
    
    type:'dark'
    },
        })

    return (
        <ThemeProvider theme={darktheme}> 
            <div className={classes.container}>
{
    historicaldata?(
<CircularProgress 
style={{backgroundColor:"gold"}}
thickness={1}
size={250}

/>
    ):(
        
        <>

        </>
        )
}
            </div>
        </ThemeProvider>
    )
}

export default Coininfo
