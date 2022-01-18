import React from "react";
import { Link } from "react-router-dom";
import '../styles/LandingStyle.css'

export default function LandingPage (){
    return (
        <div className="bgfl">
            <h2 className="wlc">Welcome</h2>
            <h5 className="infap">Recipes API</h5>
            <a class="coolBeans" href="/home">Go Home</a>
        </div>
    )
}