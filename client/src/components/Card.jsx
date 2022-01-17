import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import '../styles/CardStyled.css';

const H5 = styled.h5`
margin: 1px;
position: relative;
background-color: #856a51;
color: #89bd43;
display: inline-flex;
padding: 6px;
border-radius: 15px;
bottom: 10px;
`
const Img = styled.img`
border-top-left-radius: 25px;
border-top-right-radius: 25px;
`
const H3 = styled.h3`
position: relative;
left: 159px;
`
const H4 = styled.h4`
margin: 6px;
color: #83b440;
background-color: #856a51;
padding: 4px;
position: relative;
bottom: 30px;
border-radius: 10px;
`

const H6 = styled.h6`
position: relative;
bottom: 15px;
color: #433731;
`



export default function Card ({image, name, diets, dishTypes, id}){
    return(
        <div className="align">

        <div class="container">
            <div class="box">
                <span></span>
                <div class="content">
                <Img src={image} alt='nf' width="400px" height="250px"/>
                <h2>{name}</h2>
                <H6>Diet type: </H6>
                <H4 className="hh44">{diets}</H4>
                <h6 className="infh6">Dish Type: </h6>
                <H5>{dishTypes}</H5>
                <Link to={'/recipes/' + id}>
                <H3>see details</H3>
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