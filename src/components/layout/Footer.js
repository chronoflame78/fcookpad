import React from "react";
import '../../css/Footer.css';

export default class Footer extends React.Component {

render(){
    return(
        <footer className="footer">
        {/* <div class="footer-above-content">
            <div class="footer-text-and-btn">
                <div class="footer-inner-content">
                    <div class="footer-text">
                        <h5>BRING YOUR CREATIVE RECIPE TO LIFE</h5>
                        <h5 class="footer-bold-part">WITH MLEMMLEM</h5>
                    </div>
                    <div class="footer-create-btn-cont">
                        <a href="#">
                            <img class="footer-create-btn" src="/images/create-recipe.png" alt="Create Recipe"/>
                        </a>
                    </div>
                </div>
            </div>
        </div> */}
        <div className="footer-under-content">
            <div className="footer-logo-container">
                <img className="footer-logo" alt="" src="/images/Logo.png"/>
            </div>
            <div className="footer-contact-cont">
                <div className="footer-social-outer-cont">
                    <ul className="footer-social-container">
                        <li>
                            <a href="/">
                                <img  className="footer-fb-icon-cont" alt="" src="/images/facebook.png"/>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <img  className="footer-yt-icon-cont" alt="" src="/images/youtube.png"/>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <img  className="footer-ig-icon-cont" alt="" src="/images/instagram.png"/>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <img  className="footer-pr-icon-cont" alt="" src="/images/pinterest.png"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-mail-cont">mlemmlem@gmail.com</div>
                <div className="footer-bottom-links">
                    <div>
                        <a href="/policy">Policy</a>
                    </div>
                    <div className="footer-mid-link">
                        <a href="/">About us</a>   
                    </div>
                    <div>
                        <a href="/">Terms</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    );
}
        
}