import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'

const Div = styled.div`
background-color: #2d6e008c;
display: inline-grid;
margin: 5px;
border-radius: 25px;
box-shadow: 0 8px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
justify-items: center;
`
const H2 = styled.h2`
padding: 20px;
font-size: 15px;
overflow: auto;
`
const Img = styled.img`
border-top-left-radius: 25px;
border-top-right-radius: 25px;
`



export default function Card ({image, name, diets, id}){
    return(
        <Div>
            <Img src={image} alt='nf' width="400px" height="250px"/>
            <H2>{name}</H2>
            <h3>{diets}</h3>
            <Link to={'/recipes/' + id}>
                <h3>see details</h3>
            </Link>
        </Div>
    )
}