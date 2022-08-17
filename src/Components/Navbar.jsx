import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import CartCard from './cartCard';
import Cards from './Cards';
import data from './test.json';



const drawerWidth = 300;
var balance = 0;
var arr = [];
var count = 1;
const Navbar = (props) => {

    var [totalBalance, setTotalBalance] = useState(balance);
    var [cart, setCart] = useState(arr);
    var [items, setItems] = useState(0);


    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navItems = ['Break Your Fast', 'Time for Lunch', 'Can I have Snacks', 'Dinner', 'Burger and Beverages', 'More..'];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const addToCart = (e) => {
        const id = Number(e.target.closest(".cardContainer").id);

        data.forEach((val) => {
            if (val.id === id) {
                arr.push(val);
                setCart(arr);
                setItems(items => items + 1);
            }
        });

    }

    const popUp = () => {
        document.querySelector("#cartDisplay").classList.toggle('active');
        count % 2 !== 0 ? document.querySelector('#pop').innerHTML = "<i class='fa-solid fa-angles-down'/>" : document.querySelector('#pop').innerHTML = "<i class='fa-solid fa-angles-up'/>"
        count++;
        document.querySelector('#pop').style = "font-size:4vh;color:red;padding:1vh 2vh;border:1px solid black;cursor:pointer;margin-left:4vh";
    }



    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ my: 2 }}>
                Order Now
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'start' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );





    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <>
            <Box sx={{ height: "100vh", maxHeight: "100vh" }}>
                <AppBar component="nav" sx={{ backgroundColor: "#eee" }} >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', margin: "auto", width: "75%" } }}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{ color: '#000', textAlign: "center", marginLeft: "3vh", fontSize: "2.5vh" }}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { sm: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <div id="cardDisplay" onClick={addToCart}>
                    {data.map((val) => {
                        return <Cards id={val.id} name={val.name} src={val.photograph} type={val.type} price={val.price} />
                    })}
                </div>
                <div id='cartDisplay'>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#eee", boxSizing: "border-box", width: "100%" }}>
                        <div id="pop" style={{ width: "10%" }} onClick={popUp}>
                            <i class="fa-solid fa-angles-up" style={{ fontSize: "4vh", color: "red", padding: "1vh 2vh", border: "1px solid black", cursor: "pointer", marginLeft: "4vh" }} />
                        </div>
                        <div id='details' style={{ display: "flex", justifyContent: "space-evenly", width: "80%" }}>
                            <h1> Your Orders ( {items}) </h1>
                            <h1> Subtotal : ₹ {totalBalance}</h1>
                            <button style={{ backgroundColor: "red", color: "white", padding: "1vh 2vh", fontSize: "2.5vh" }}>Checkout</button>
                        </div>
                    </div>

                    <div id='cartList' style={{ borderTop: "1px solid black", }}>
                        {cart.map((val) => {
                            return (
                                <CartCard  id={val.id} name={val.name} src={val.photograph} type={val.type} price={val.price} />
                            )
                        })}
                    </div>

                </div>

            </Box>
        </>
    )
}

export default Navbar