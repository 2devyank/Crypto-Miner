import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { numberWithCommas } from './Banner/Carousel'

const CoinsTable = () => {
    const darktheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },

            type: 'dark'
        },
    })
    const [page, setpage] = useState(1)
    const [search, setsearch] = useState("")
    const [coins, setcoins] = useState([])
    const [loading, setloading] = useState(false)
    const { currency,symbol } = CryptoState();
    const navigate=useNavigate();
    const fetchcoins = async () => {
        setloading(true);
        const data = await axios.get(CoinList(currency));
        console.log(data.data);
        setcoins(data.data);
        setloading(false);
    }
    
//  const handlesearch=()=>{
//      return coins.filter(
//          (coin)=>
// coin.name.toLowerCase().includes(search)||coin.symbol.toLowerCase().includes(search)
//      );
//  };

// const handleSearch = () => {
//     return coins.filter( coin =>  coin.name.toLowerCase().includes(search) ||  coin.symbol.toLowerCase().includes(search)
//     );
//   };
const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
    useEffect(() => {
        fetchcoins();
    }, [currency])

const useStyles=makeStyles({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
},
})
const classes=useStyles();
    return (
        <ThemeProvider theme={darktheme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18 }}
                >
                    Cryptocurrency Prices By market Cap
                </Typography>
                <TextField
                    onChange={(e) => setsearch(e.target.value)}
                    label="Search for a cryptocurrency" variant="outlined" style={{ marginBottom: 20, width: "100%" }} />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h change", "Market Cap"].map((head) => (
                                            <TableCell key={head}
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700"
                                                }}
                                                align={head === "Coin" ? "" : "right"}

                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {handleSearch()
                                .slice((page-1)*10,(page-1)*10+10)
                                .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
<img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}} />
<div style={{display:"flex",flexDirection:"column"}}>
    <span style={{textTransform:"uppercase",fontSize:22}}>
{row.symbol}
    </span>
    <span style={{color:"darkgray"}}>
{row.name}
    </span>

</div>
                                                </TableCell>
                                                <TableCell align="right">
                                            {symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell align="right" style={{
    color:profit>0?"rgb(14,203,129)":"red",
    fontWeight:500,
}}>{profit && "+" }{row?.price_change_percentage_24h.toFixed(2)}%

                                                </TableCell>
                                                <TableCell align="right">
                                            {symbol}{" "}{numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                                </TableCell>
                                            </TableRow>
                                    )
                                })}
                              
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination
                style={{
                    display:"flex",
                    justifyContent:"center",
                    padding:20,
                    width:"100%",
                }}
                onChange={(_,value)=>{
                    setpage(value);
                window.scroll(0,450)
                }}
                count={(handleSearch()?.length/10).toFixed(0)}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable
