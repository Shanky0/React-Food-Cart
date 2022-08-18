import React from 'react';
import './Card.css';
import data from './test.json';

const CartCard = ({ id, name, src, type, totalPrice, quantity, setTotalBalance, arr, setItems }) => {

    const add = (e) => {
        const id = Number(e.target.closest(".cardContainer").id);
        data[id - 1].quantity++;
        data[id - 1].totalPrice += data[id - 1].price;
        setTotalBalance(totalBalance => totalBalance + data[id - 1].price)
    }

    const sub = (e) => {
        const id = Number(e.target.closest(".cardContainer").id);
        if (data[id - 1].quantity <= 1) {
            data[id - 1].quantity = 1;
        } else {
            data[id - 1].quantity--;
            data[id - 1].totalPrice -= data[id - 1].price;
            setTotalBalance(totalBalance => totalBalance - data[id - 1].price)
        }
    }

    const del = (e) => {
        const id = Number(e.target.closest(".cardContainer").id);
        var ind;
        arr.forEach((val, index) => {
            if (val.id === id)
                ind = index;
        })
        arr.splice(ind, 1);
        setTotalBalance(totalBalance => totalBalance - (data[id - 1].quantity * data[id - 1].price));
        setItems(items => items - 1);
    }
    return (
        <>
            <div className='cardContainer' id={id}>
                <div className='cardDetails'>
                    <h3>{name} </h3>
                    <p style={{ display: "flex", justifyContent: "start", alignItems: "center", margin: ".1vh 2vh" }}><img src={type === "veg" ? 'https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg' : 'http://infoseekershub.com/wp-content/uploads/2019/08/non-veg.jpg'} alt={type} style={{ width: "17px", marginRight: "1vh" }} /> <span style={{ fontSize: "1.8vh" }}>{type}</span></p>
                    <p style={{ fontSize: "2.5vh", margin: "1vh 2vh" }}>Total Price : ₹ {totalPrice}</p>
                    <h2 style={{ marginLeft: "2vh" }}>  Quantity : {quantity}    </h2>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",marginTop:"2vh"}}>
                        <span style={{ fontSize: "3vh", padding: ".1vh 1vh", border: ".2vh solid", backgroundColor: "green", color: "white", cursor: "pointer" }} onClick={add}>+</span>
                        <span style={{ fontSize: "3vh", padding: ".1vh 1vh", border: ".2vh solid", marginLeft: "2vh", backgroundColor: "red", color: "white", cursor: "pointer" }} onClick={sub}>-</span>
                        <i class="fa-solid fa-trash-can" style={{ fontSize: "3vh", color: "red", cursor: "pointer" }} onClick={del}></i></div>
                </div>
                <div className='cardImage'>
                    <img src={require(`../Images/${src}`)} alt="product" style={{ width: "100%", height: "100%", borderRightTopRadius: "1vh", borderRightBottomRadius: "1vh" }} />
                </div>
            </div>
        </>
    )
}

export default CartCard