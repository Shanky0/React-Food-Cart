import React from 'react';
import './Card.css';

const CartCard = ({ id, name, src, type, price }) => {
    return (
        <>
            <div className='cardContainer' id={id}>
                <div className='cardDetails'>
                    <h3>{name} </h3>
                    <p style={{ display: "flex", justifyContent: "start", alignItems: "center", margin: ".1vh 2vh" }}><img src={type === "veg" ? 'https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg' : 'http://infoseekershub.com/wp-content/uploads/2019/08/non-veg.jpg'} alt={type} style={{ width: "17px", marginRight: "1vh" }} /> <span style={{ fontSize: "1.8vh" }}>{type}</span></p>
                    <p style={{ fontSize: "2vh", margin: "1vh 2vh" }}> ₹ {price}</p>
                </div>
                <div className='cardImage'>
                    <img src={require(`../Images/${src}`)} alt="product" style={{ width: "100%", height: "100%", borderRightTopRadius: "1vh", borderRightBottomRadius: "1vh" }} />
                </div>
            </div>
        </>
    )
}

export default CartCard