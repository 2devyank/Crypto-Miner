import { makeStyles } from '@material-ui/styles'
import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';

const useStyles=makeStyles((theme)=>({
carousel:{
    height:'50%',
    display:'flex',
    alignItems:'center'
},
carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    textDecoration:'none'
  },
}))
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const Carousel = () => {
    
    const [trending, settrending] = useState([])

    const {currency,symbol}=CryptoState();

    const classes=useStyles();
    
    const fetchTrendingcoins=async()=>{
        const {data}=await axios.get(TrendingCoins(currency));
console.log(data);
        settrending(data);
    }

    useEffect(() => {
        fetchTrendingcoins();
    }, [currency])

const responsive={
    0:{
items:2,
    },
    512:{
items:4,
    }
}

const items=trending.map((coin)=>{
    let profit=coin.price_change_percentage_24h>=0;
    return(
<Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
<img src={coin?.image} alt={coin.name} style={{marginBottom:10}} height="80"/>
<span >{coin?.symbol}
&nbsp;
<span style={{
    color:profit>0?"rgb(14,203,129)":"red",
    fontWeight:500,
}}>
{profit && "+" }{coin?.price_change_percentage_24h.toFixed(2)}%
    </span>


</span>
<span>
    {symbol}{" "}{numberWithCommas(coin?.current_price.toFixed(2))}
</span>
</Link>
    );
})
    return (
        <div className={classes.carousel}>
            <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={5000}
            disableDotsControls
            responsive={responsive}
            autoPlay
            items={items}
            disableButtonsControls
            
            />
        </div>
    )
}

export default Carousel
