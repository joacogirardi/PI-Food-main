import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage (){
    return (
        <div>
            <h2>Hola</h2>
            <Link to='/home'>
                <button>
                    ingreso
                </button>
            </Link>
        </div>
    )
}