import React from 'react';
import contactPagePicture from "../../../static/assets/images/auth/loginImage.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function() {
    return (
        <div className="content-page-wrapper">
            <div 
                className="leftColumn"
                style={{
                    background: "url(" + contactPagePicture + ") no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}></div>
            <div className="rightColumn">
                <div className="contact-bullet-points">
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="phone" />
                        </div>
                        <div className="text">555-555-5555</div>
                    </div>
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="envelope" />
                        </div>
                        <div className="text">example@example.com</div>
                    </div>
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="map-marked-alt" />
                        </div>
                        <div className="text">Lehi, UT</div>
                    </div>
                </div>
            </div>
        </div>
    )
}