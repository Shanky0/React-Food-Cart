import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';



const drawerWidth = 300;
var balance = 0;
var arr = [];
var count = 1;
const Navbar = (props) => {

    var [totalBalance, setTotalBalance] = useState(balance);
    var [cart, setCart] = useState(arr);
    var [items, setItems] = useState(0);

    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navItems = ['Break Your Fast', 'Time for Lunch', 'Can I have Snacks', 'Dinner', 'Burger and Beverages', 'More..'];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const addToCart = (e) => {

        const id = Number(e.target.closest(".cardContainer").id);
        let flag = true;
        if (e.target.tagName === "BUTTON") {
            cart.forEach((val) => {
                if (val.id === id) {
                    flag = false;
                    val.quantity++;
                    val.totalPrice += val.price;
                    setTotalBalance(totalBalance => Number(totalBalance) + val.price)
                }
            });
            if (flag) {
                data[id - 1].quantity++;
                data[id - 1].totalPrice += data[id - 1].price;
                arr.push(data[id - 1]);
                setCart(arr);
                setItems(items => items + 1);
                setTotalBalance(totalBalance => Number(totalBalance) + data[id - 1].price)
            }
        }
    }

    const empty = () => {
        arr = [];
        setCart([]);
        setItems(0)
        setTotalBalance(0);
    }


    const popUp = () => {
        document.querySelector("#cartDisplay").classList.toggle('active');
        count % 2 !== 0 ? document.querySelector('#pop').innerHTML = "<i class='fa-solid fa-angles-down'/>" : document.querySelector('#pop').innerHTML = "<i class='fa-solid fa-angles-up'/>"
        count++;
        document.querySelector('#pop').style = "font-size:4vh;color:red;padding:1vh 2vh;border:1px solid black;cursor:pointer;margin-left:4vh";
    }

    const checkout = () => {
        navigate('/checkout');
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
            <Box sx={{ height: "90vh", maxHeight: "92vh", marginBottom: "3vh" }}>
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
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <h1 style={{marginTop:"17vh",fontSize:"5vh",color:"tomato",textAlign:"center"}}> Our Menu </h1>
                <div id="cardDisplay" onClick={addToCart}>
                    {data.map((val, index) => {
                        return <Cards key={index} id={val.id} name={val.name} src={val.photograph} type={val.type} price={val.price} />
                    })}
                </div>
                <div id='cartDisplay'>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#eee", boxSizing: "border-box", width: "100%", height: "fit-content", maxHeight: "15vh" }}>
                        <div id="pop" style={{ width: "10%" }} onClick={popUp}>
                            <i class="fa-solid fa-angles-up" style={{ fontSize: "2vw", color: "red", padding: "1vh 2vh", border: "1px solid black", cursor: "pointer", marginLeft: "4vh" }} />
                        </div>
                        <div id='details' style={{ display: "flex", justifyContent: "space-evenly", width: "80%", alignItems: "center", fontSize: "1vw" }}>
                            <h1> Your Orders ( {items}) </h1>
                            <h1> Subtotal : ₹ {totalBalance}</h1>
                            <button style={{ backgroundColor: "tomato", color: "white", padding: ".5vw 2vw", fontSize: "1.5vw", cursor: "pointer" }} onClick={checkout}>Checkout</button>
                            <button style={{ backgroundColor: "red", color: "white", padding: ".5vw 2vw", fontSize: "1.5vw", cursor: "pointer" }} onClick={empty}>Empty Cart</button>
                        </div>
                    </div>

                    <div id='cartList'>
                        {cart.map((val, index) => {
                            return (
                                <CartCard key={index} id={val.id} name={val.name} src={val.photograph} type={val.type} totalPrice={val.totalPrice} quantity={val.quantity} totalBalance={totalBalance} setTotalBalance={setTotalBalance} arr={arr} setItems={setItems} />
                            )
                        })}
                    </div>

                </div>

            </Box>
        </>
    )
}

export default Navbar