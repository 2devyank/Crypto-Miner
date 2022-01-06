import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
// import { dark } from '@material-ui/core/styles/createPalette';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const useStyles=makeStyles(()=>({
title:{
    flex:1,
    color:'gold',
    fontWeight:'bold',
    cursor:'pointer',
}
}))
function Header() {
    const navigate = useNavigate();
    const classes=useStyles()
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

       
        <AppBar color='transparent' position='static'>
<Container>
<Toolbar>
    <Typography onClick={()=>navigate("/")} variant="h6" className={classes.title}>Crypto miner</Typography>
    
        <Select variant='outlined' style={{
            width:100,
            height:30,
            marginRight:15
        }}>
     
          <MenuItem value={"USD"} >USD</MenuItem>
          <MenuItem  value={"INR"}>INR</MenuItem>
         
        </Select>
     
</Toolbar>
</Container>
        </AppBar>
        </ThemeProvider>
    )
    
}

export default Header
