import React from 'react';
AboutUs.propTypes = {

};
function AboutUs(props) {
    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">About Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="contact-main-page mt-20 mb-40 mb-md-40 mb-sm-40 mb-xs-40">
                <div className="container mb-60">
                    <div className="row">
                        <div className="col-lg-12">
                            <img src="https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/qrndqxjwp/2023_03_19/z41937132079502bad2c8c47dc228f8f0b37af5d8f2e62.jpg.webp" alt="About Us" width="800px" height="400px" style={{
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="about__item">
                                <h4>Our Story</h4>
                                <p>Our journey began with a simple yet powerful idea: to redefine fashion by offering the latest trends and styles at affordable prices. We believe that fashion should be accessible to everyone, regardless of budget or location.</p>
                                <p>With a passion for design and a commitment to quality, we set out to create a brand that resonates with people from all walks of life. Our goal is to inspire confidence and empower individuals to express themselves through their clothing.</p>
                                <p>Over the years, we have grown from a small boutique to a global brand, but our core values remain the same. We are dedicated to providing exceptional customer service and delivering stylish, high-quality clothing that our customers love.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="about__item">
                                <h4>What We Offer</h4>
                                <p>At our store, you'll find a diverse range of clothing options to suit every style and occasion. From trendy streetwear to chic evening wear, we have something for everyone.</p>
                                <p>Our collection is carefully curated to reflect the latest fashion trends while also offering timeless classics that never go out of style. Whether you're looking for a statement piece to elevate your wardrobe or everyday essentials, we have you covered.</p>
                                <p>In addition to clothing, we also offer a wide selection of accessories and footwear to complete your look. From stylish handbags to comfortable shoes, our accessories are designed to complement your outfit and enhance your style.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="about__item">
                                <h4>Why Choose Us</h4>
                                <p>When you shop with us, you're not just buying clothing; you're investing in quality and craftsmanship. We take pride in the quality of our products and ensure that every garment meets our high standards.</p>
                                <p>Customer satisfaction is our top priority, and we go above and beyond to ensure that every shopping experience with us is enjoyable and hassle-free. From easy navigation on our website to prompt customer support, we strive to exceed your expectations at every turn.</p>
                                <p>But don't just take our word for it - our loyal customers speak for themselves. With thousands of satisfied customers worldwide, we have built a reputation as a trusted name in the fashion industry.</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default AboutUs;
