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
                            <li><a href="index.html">Trang chủ</a></li>
                            <li className="active">Về chúng tôi</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="contact-main-page mt-20 mb-40 mb-md-40 mb-sm-40 mb-xs-40">
                <div className="container mb-60">
                    <div className="row">
                        <div className="col-lg-12">
                            <img src="https://spacet-release.s3.ap-southeast-1.amazonaws.com/img/blog/2023-10-03/thoi-trang-chau-au-co-dien-ket-hop-voi-cach-trang-tri-co-dien-651beab8c9649b0ef5ad95a1.webp" alt="About Us" width="800px" height="400px" style={{
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
                                <h4>Câu chuyện của chúng tôi</h4>
                                <p>Hành trình của chúng tôi bắt đầu với một ý tưởng đơn giản nhưng mạnh mẽ: định nghĩa lại thời trang bằng cách cung cấp những xu hướng và phong cách mới nhất với giá cả phải chăng. Chúng tôi tin rằng mọi người đều có thể tiếp cận thời trang, bất kể ngân sách hay địa điểm.</p>
                               
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="about__item">
                                <h4>Bạn muốn yêu cầu gì</h4>
                                <p>Tại cửa hàng của chúng tôi, bạn sẽ tìm thấy nhiều lựa chọn quần áo đa dạng phù hợp với mọi phong cách và mọi dịp. Từ trang phục dạo phố thời thượng đến trang phục buổi tối sang trọng, chúng tôi đều có thứ gì đó dành cho tất cả mọi người.</p>
                              
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="about__item">
                                <h4>Tại sao nên chọn chúng tôi</h4>
                                <p>Khi mua sắm với chúng tôi, bạn không chỉ mua quần áo; bạn đang đầu tư vào chất lượng và sự khéo léo. Chúng tôi tự hào về chất lượng sản phẩm của mình và đảm bảo rằng mọi sản phẩm may mặc đều đáp ứng các tiêu chuẩn cao của chúng tôi.</p>
                               
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default AboutUs;
