import React from 'react';
import profilePicture from "../../../static/assets/images/bio/IMG_8871.jpg";

export default function() {
    return (
        <div className="content-page-wrapper" >
            <div 
                className="leftColumn"
                style={{
                    background: "url(" + profilePicture + ") no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}></div>
            <div className="rightColumn about">
                <p>There is much to learn in the trial and error process of programming. Many of its principles can be applied to our daily lives.</p>
                <div className="aboutQuote">
                    <h1>"Failure is success in progress." </h1>
                    <h1>-Albert Einstein</h1>

                </div>
            </div>
        </div>
    )
}