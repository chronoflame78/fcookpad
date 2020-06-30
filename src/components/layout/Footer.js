import React from "react";
import '../../css/Footer.css';

export default class Footer extends React.Component {

render(){
    return(
        <footer class="footer">
        <div class="footer-above-content">
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
        </div>
        <div class="footer-under-content">
            <div class="footer-logo-container">
                <img class="footer-logo" src="/images/Logo.png"/>
            </div>
            <div class="footer-contact-cont">
                <div class="footer-social-outer-cont">
                    <ul class="footer-social-container">
                        <li>
                            <a href="#">
                                <img  class="footer-fb-icon-cont" src="/images/facebook.png"/>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img  class="footer-yt-icon-cont" src="/images/youtube.png"/>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img  class="footer-ig-icon-cont" src="/images/instagram.png"/>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img  class="footer-pr-icon-cont" src="/images/pinterest.png"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="footer-mail-cont">mlemmlem@gmail.com</div>
                <div class="footer-bottom-links">
                    <div>
                        <a href="#">Policy</a>
                    </div>
                    <div class="footer-mid-link">
                        <a href="#">About us</a>   
                    </div>
                    <div>
                        <a href="#">Terms</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    );
}
        
}