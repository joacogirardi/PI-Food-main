import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import '../styles/CardStyled.css';

// const H2 = styled.h2`
// padding: 20px;
// font-size: 15px;
// overflow: auto;
// `
const Img = styled.img`
border-top-left-radius: 25px;
border-top-right-radius: 25px;
`
// const H3 = styled.h3`
// font: -webkit-small-control;
// color: white;
// `


export default function Card ({image, name, diets, id}){
    return(
        <div className="align">

        <div class="container">
            <div class="box">
                <span></span>
                <div class="content">
                <Img src={image} alt='nf' width="400px" height="250px"/>
                <h2>{name}</h2>
                <h4 className="hh44">{diets}</h4>
                <Link to={'/recipes/' + id}>
                <h3>see details</h3>
                </Link>
            </div>
         </div>
        </div>

        </div>
    )
}


// {/* <div class="container">
//   <div class="box">
//     <span></span>
//     <div class="content">
//         <Img src={image} alt='nf' width="400px" height="250px"/>
//         <h2>{name}</h2>
//         <h4>{diets}</h4>
//         <Link to={'/recipes/' + id}>
//                 <h3>see details</h3>
//             </Link>
//     </div>
//   </div>
// </div> */}
  
        // <div className="CardStyled-div">
        //     <div>
        //     <Img src={image} alt='nf' width="400px" height="250px"/>
        //     <H2>{name}</H2>
        //     <H3>{diets}</H3>
        //     <Link to={'/recipes/' + id}>
        //         <h3>see details</h3>
        //     </Link>
        //     </div>
        // </div>