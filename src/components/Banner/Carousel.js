import { makeStyles } from '@material-ui/styles'
import  axios  from 'axios';
import React from 'react'
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';

const useStyles=makeStyles((theme)=>({
carousel:{
    height:'50%',
    display:'flex',
    alignItems:'center'
}
}))
const Carousel = () => {
    const {currency}=CryptoState();
    const classes=useStyles();
    const fetchTrendingcoins=async()=>{
        const {data}=await axios.get(TrendingCoins(currency))
    }
    return (
        <div className={classes.carousel}>
            
        </div>
    )
}

export default Carousel
