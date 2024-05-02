import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Profile.css'
import avt from './avt.jpg'
import User from '../API/User';
import { addSession } from '../Redux/Action/ActionSession';
import { useDispatch } from 'react-redux';
import { Table, Tabs, Button, Modal, Input, Select, Form } from 'antd';
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";

const { Column } = Table;

Profile.propTypes = {

};

function Profile(props) {
    const [form] = Form.useForm();
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [ngo, setNgo] = useState('')
    const [description, setDescription] = useState('');
    const [defaul, setDefaul] = useState(1)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [id, setId] = useState('')
    const [idAdd, setIdAdd] = useState('')
    const [cityData, setCityData] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [disData, setDisData] = useState([]);
    const [selectedDis, setSelectedDis] = useState('');
    const [selectedWar, setSelectedWar] = useState('');
    const [warData, setWarData] = useState([]);

    const handleCityChange = (value) => {
        setSelectedCity(value);
        const selectedCityCode = cityData.find(city => city.value === value)?.value;
        const selectedCityName = cityData.find(city => city.value === value)?.label;
        setCity(selectedCityName);
        dataDis(selectedCityCode);
        setSelectedDis("");
    };

    const handleDisChange = (value) => {
        setSelectedDis(value);
        const selectedDisCode = disData.find(dis => dis.value === value)?.value;
        const selectedDisName = disData.find(dis => dis.value === value)?.label;
        setDistrict(selectedDisName);

        dataWar(selectedDisCode);
        setSelectedWar("");
    };

    const handleWarChange = (value) => {
        setSelectedWar(value);
        const selectedWarName = warData.find(war => war.value === value)?.label;
        setWard(selectedWarName);
    };

    useEffect(() => {
        dataCity();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "city") {
            setCity(value);
        } else if (name === "dis") {
            selectedDis(value);
        } else if (name === "war") {
            setWard(value);
        } else if (name === "ngo") {
            setNgo(value);
        } else if (name === "description") {
            setDescription(value);


        } else if (name === "defaul") {
            setDefaul(parseInt(value));
        }

    };

    const dataCity = async () => {
        try {
            const response = await fetch(`https://vapi.vnappmob.com/api/province`).then((res) => { return res.json() }).then((data) => {
                setCityData(data.results.map(city => ({ label: city.province_name, value: city.province_id })));
            })
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };
    const dataDis = async (selectedCityCode) => {
        try {
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedCityCode}`);
            setDisData(response.data.results.map(city => ({ label: city.district_name, value: city.district_id })));

        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };
    const dataWar = async (selectedDisCode) => {
        try {

            const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDisCode}`);
            setWarData(response.data.results.map(city => ({ label: city.ward_name, value: city.ward_id })));
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };
    // Hàm này dùng để render html cho từng loại edit profile hoặc change password
    // Tùy theo người dùng chọn
    const [edit_status, set_edit_status] = useState('thong_tin_ca_nhan')
    const [showDangXuat, setShowDangXuat] = useState(false);

    const handler_Status = (value) => {
        set_edit_status(value)

    }

    const showModalDX = () => {
        setShowDangXuat(true);
    };

    const toggleModal = () => {
        setShowDangXuat(!showDangXuat); // Đảo ngược trạng thái hiển thị modal
    };

    const huyDangXuat = () => {
        setShowDangXuat(false);
    };

    const [user, set_user] = useState({})

    useEffect(() => {

        const fetchData = async () => {

            const response = await User.Get_User(sessionStorage.getItem('id_user'))

            set_user(response)

            set_name(response.fullname)

            set_username(response.username)

            set_email(response.email)

            set_password(response.password)
            set_new_password(response.password)
            set_compare_password(response.password)

        }

        fetchData()

    }, [])

    const [name, set_name] = useState('')
    const [username, set_username] = useState('')
    const [email, set_email] = useState('')
    const [sdt, set_sdt] = useState('')
    const [password, set_password] = useState('')
    const [new_password, set_new_password] = useState('')
    const [compare_password, set_compare_password] = useState('')

    const handler_update = async () => {

        const data = {
            _id: sessionStorage.getItem('id_user'),
            fullname: name,
            username: username,
            password: compare_password
        }

        await User.Put_User(data)

        window.location.reload()

    }

    const [activeTab, setActiveTab] = useState("choXacNhan", "choGiaoHang", "giaoHang", "hoanThanh", "huy", "tra");
    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="m-5 mt-5 pt-4" style={{ paddingBottom: '4rem' }}>

            <div className="group_profile w-100">
                <div style={{ height: "400px" }} className="group_setting mt-3">
                    <div style={{}} className="setting_left">
                        <div
                            className={edit_status === 'thong_tin_ca_nhan' ? 'setting_item setting_item_active' : 'setting_item'}
                            onClick={() => handler_Status('thong_tin_ca_nhan')}
                        >
                            <a className={edit_status === 'thong_tin_ca_nhan' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }}>Thông tin cá nhân</a>
                        </div>
                        <div className={edit_status === 'dia_chi' ? 'setting_item setting_item_active' : 'setting_item'}
                            onClick={() => handler_Status('dia_chi')}>
                            <a className={edit_status === 'dia_chi' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }}>Địa chỉ</a>
                        </div>
                        <div className={edit_status === 'lich_su' ? 'setting_item setting_item_active' : 'setting_item'}
                            onClick={() => handler_Status('lich_su')}>
                            <a className={edit_status === 'lich_su' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }}>Lịch sử đơn hàng</a>
                        </div>
                        <div className={edit_status === 'quen_mat_khau' ? 'setting_item setting_item_active' : 'setting_item'}
                            onClick={() => handler_Status('quen_mat_khau')}>
                            <a className={edit_status === 'quen_mat_khau' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }}>Đổi mật khẩu</a>
                        </div>
                        {/* <div className={edit_status === 'dang_xuat' ? 'setting_item setting_item_active' : 'setting_item'}
                            onClick={() => handler_Status('dang_xuat')}>
                            <a className={edit_status === 'dang_xuat' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }}>Đăng xuất</a>
                        </div> */}
                        <div className={edit_status === 'dang_xuat' ? 'setting_item setting_item_active' : 'setting_item'}>
                            <a className={edit_status === 'dang_xuat' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }} onClick={showModalDX}>Đăng xuất</a>
                            {/* <Button onClick={showModalDX}></Button> */}
                        </div>
                        <Modal
                            title="Thông báo"
                            style={{ height: "500px" }}
                            visible={showDangXuat}
                            onCancel={toggleModal}
                            footer={[
                                <Button key="cancel" onClick={toggleModal}>
                                    Không
                                </Button>,
                                <Button key="submit" type="primary" onClick={toggleModal}>
                                    Đồng ý
                                </Button>,
                            ]}
                        >
                            <h1 style={{ textAlign: "center" }}>Bạn có muốn đăng xuất không?</h1>
                        </Modal>
                    </div>
                    <div className="setting_right">
                        {
                            edit_status === 'thong_tin_ca_nhan' ? (
                                <div className="setting_edit_profile">
                                    {/* <div className="header_setting_edit d-flex justify-content-center pt-4 pb-4">
                                        <div className="d-flex">
                                            <img src={avt} alt="" className="image_header_setting_edit" />
                                            <div className="ml-4">
                                                <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Nguyen Kim Tien</span>
                                                <br />
                                                <a href="#" data-toggle="modal" data-target="#exampleModal">
                                                    Change Profile Photo</a>

                                                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">Change Profile Photo</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Họ và tên</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={"name"}
                                                onChange={(e) => set_name(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Tên tài khoản</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" disabled={true} value={"username"}
                                                onChange={(e) => set_username(e.target.value)} />
                                        </div>
                                    </div>
                                    {/* <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Email</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={email}
                                                onChange={(e) => set_email(e.target.value)} />
                                        </div>
                                    </div> */}
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Email</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" disabled={true} value={"email"}
                                                onChange={(e) => set_email(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Số điện thoại</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" disabled={true} value={"sdt"}
                                                onChange={(e) => set_sdt(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center pt-3 pb-4">
                                        <button className="btn btn-secondary" onClick={handler_update}>Lưu</button>
                                    </div>
                                </div>
                            ) : edit_status === 'lich_su' ? (
                                <div className="setting_history">
                                    <Tabs justify={"center"} tabBarStyle={{ justifyContent: "center" }} style={{ textAlign: "center", margin: "10px" }} activeKey={activeTab} onChange={handleTabChange}>
                                        <TabPane tab="Chờ xác nhận" key="choXacNhan">
                                            <Table
                                                className="text-center"
                                                pagination={{
                                                    showTotal: (totalPages) => `Số lượng Sản phẩm: ${totalPages} `,
                                                }}
                                            >
                                                <Column
                                                    title="STT"
                                                    dataIndex="index"
                                                    key="index"
                                                    render={(text, record, index) => index + 1}
                                                />
                                                <Column
                                                    title="Mã"
                                                    dataIndex={['productCode']}
                                                    key="productCode"
                                                />
                                                <Column
                                                    title="Tên"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Ngày"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Giá trị đơn hàng"
                                                    dataIndex={['quantity']}
                                                    key="quantity"
                                                />
                                            </Table>
                                        </TabPane>
                                        <TabPane tab="Chờ giao hàng" key="choGiaoHang">
                                            <Table
                                                className="text-center"
                                                pagination={{
                                                    showTotal: (totalPages) => `Số lượng Sản phẩm: ${totalPages} `,
                                                }}
                                            >
                                                <Column
                                                    title="STT"
                                                    dataIndex="index"
                                                    key="index"
                                                    render={(text, record, index) => index + 1}
                                                />
                                                <Column
                                                    title="Mã"
                                                    dataIndex={['productCode']}
                                                    key="productCode"
                                                />
                                                <Column
                                                    title="Tên"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Ngày"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Giá trị đơn hàng"
                                                    dataIndex={['quantity']}
                                                    key="quantity"
                                                />
                                            </Table>
                                        </TabPane>
                                        <TabPane tab="Giao hàng" key="giaoHang">
                                            <Table
                                                className="text-center"
                                                pagination={{
                                                    showTotal: (totalPages) => `Số lượng Sản phẩm: ${totalPages} `,
                                                }}
                                            >
                                                <Column
                                                    title="STT"
                                                    dataIndex="index"
                                                    key="index"
                                                    render={(text, record, index) => index + 1}
                                                />
                                                <Column
                                                    title="Mã"
                                                    dataIndex={['productCode']}
                                                    key="productCode"
                                                />
                                                <Column
                                                    title="Tên"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Ngày"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Giá trị đơn hàng"
                                                    dataIndex={['quantity']}
                                                    key="quantity"
                                                />
                                            </Table>
                                        </TabPane>
                                        <TabPane tab="Hoàn thành" key="hoanThanh">
                                            <Table
                                                className="text-center"
                                                pagination={{
                                                    showTotal: (totalPages) => `Số lượng Sản phẩm: ${totalPages} `,
                                                }}
                                            >
                                                <Column
                                                    title="STT"
                                                    dataIndex="index"
                                                    key="index"
                                                    render={(text, record, index) => index + 1}
                                                />
                                                <Column
                                                    title="Mã"
                                                    dataIndex={['productCode']}
                                                    key="productCode"
                                                />
                                                <Column
                                                    title="Tên"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Ngày"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Giá trị đơn hàng"
                                                    dataIndex={['quantity']}
                                                    key="quantity"
                                                />
                                            </Table>
                                        </TabPane>
                                        <TabPane tab="Hủy hàng" key="huy">
                                            <Table
                                                className="text-center"
                                                pagination={{
                                                    showTotal: (totalPages) => `Số lượng Sản phẩm: ${totalPages} `,
                                                }}
                                            >
                                                <Column
                                                    title="STT"
                                                    dataIndex="index"
                                                    key="index"
                                                    render={(text, record, index) => index + 1}
                                                />
                                                <Column
                                                    title="Mã"
                                                    dataIndex={['productCode']}
                                                    key="productCode"
                                                />
                                                <Column
                                                    title="Tên"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Ngày"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Giá trị đơn hàng"
                                                    dataIndex={['quantity']}
                                                    key="quantity"
                                                />
                                            </Table>
                                        </TabPane>
                                        <TabPane tab="Trả hàng" key="tra">
                                            <Table
                                                className="text-center"
                                                pagination={{
                                                    showTotal: (totalPages) => `Số lượng Sản phẩm: ${totalPages} `,
                                                }}
                                            >
                                                <Column
                                                    title="STT"
                                                    dataIndex="index"
                                                    key="index"
                                                    render={(text, record, index) => index + 1}
                                                />
                                                <Column
                                                    title="Mã"
                                                    dataIndex={['productCode']}
                                                    key="productCode"
                                                />
                                                <Column
                                                    title="Tên"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Ngày"
                                                    dataIndex={['productName']}
                                                    key="productName"
                                                />
                                                <Column
                                                    title="Giá trị đơn hàng"
                                                    dataIndex={['quantity']}
                                                    key="quantity"
                                                />
                                            </Table>
                                        </TabPane>
                                    </Tabs>
                                </div>
                            ) : edit_status === 'quen_mat_khau' ? (
                                <div className="setting_change_password">
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Mật khẩu cũ</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="password" value={password}
                                                onChange={(e) => set_password(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }} >Mật khẩu mới</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="password" value={new_password}
                                                onChange={(e) => set_new_password(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <span style={{ fontWeight: '600' }}>Nhập lại mật khẩu mới</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="password" value={compare_password}
                                                onChange={(e) => set_compare_password(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center pt-3 pb-4 align-items-center">
                                        <button className="btn btn-secondary" onClick={handler_update}>Lưu</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <h4 className='m-3' style={{ alignSelf: "flex-start" }}>Địa chỉ của tôi</h4>
                                        <div className='m-3'>
                                            <Button type="primary" shape="round" onClick={showModal}>
                                                Thêm mới địa chỉ
                                            </Button>
                                            <Modal title="Thêm mới địa chỉ" visible={isModalVisible} onCancel={handleCancel}
                                                footer={[
                                                    <Button key="cancel" onClick={handleCancel}>Hủy</Button>,
                                                    <Button key="ok" type="primary">Thêm</Button>,
                                                ]}>
                                                <form>
                                                    <div className='d-flex center mb-3'>
                                                        <label className='w-50'>Thành phố</label>
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            showSearch
                                                            placeholder="--- Chọn Tỉnh/Thành phố ---"
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                            filterSort={(optionA, optionB) =>
                                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                            }
                                                            options={cityData}
                                                            onChange={handleCityChange}
                                                            value={selectedCity}
                                                        />
                                                    </div>
                                                    <div className='d-flex center mb-3'>
                                                        <label className='w-50'>Huyện</label>
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            showSearch
                                                            placeholder="--- Chọn Quận/Huyện ---"
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                            // filterSort={(optionA, optionB) =>
                                                            //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                            // }
                                                            options={disData}
                                                            onChange={handleDisChange}
                                                            value={selectedDis}

                                                        />
                                                    </div>
                                                    <div className='d-flex center mb-3'>
                                                        <label className='w-50'>Xã</label>
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            showSearch
                                                            placeholder="--- Chọn Xã/Phường ---"
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                            filterSort={(optionA, optionB) =>
                                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                            }
                                                            options={warData}
                                                            onChange={handleWarChange}
                                                            value={selectedWar}
                                                        />
                                                    </div>
                                                    <div className='d-flex center mb-3'>
                                                        <label className='w-50'>Nhập địa chỉ chi tiết</label>
                                                        <Input
                                                            name="description"
                                                            value={description}
                                                            onChange={(e) => handleInputChange({ target: { name: 'description', value: e.target.value } })}
                                                        />
                                                    </div>
                                                </form>
                                            </Modal>
                                        </div>
                                    </div>
                                    <hr className="" style={{ marginTop: "0px", marginBottom: "0px" }} />
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px" }}>
                                            <p className='m-3'>Địa chỉ 1 | 0989xxxxxx<br />
                                                Phương Canh, Nam Từ Liêm, Hà Nội
                                            </p>
                                            <div style={{ textAlign: "center" }}>
                                                <Button type='primary' disabled>Mặc định</Button>
                                                <Button className='m-2' type='primary'>Cập nhật</Button>
                                                <Button>Xóa</Button>
                                            </div>
                                        </div>
                                        <hr className="" style={{ marginTop: "0px", marginBottom: "0px" }} />
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px" }}>
                                            <p className='m-3'>Địa chỉ 2 | 0868xxxxxx<br />
                                                Phúc lý, Bắc Từ Liêm, Hà Nội
                                            </p>
                                            <div style={{ textAlign: "center" }}>
                                                <Button type='primary' >Mặc định</Button>
                                                <Button className='m-2' type='primary'>Cập nhật</Button>
                                                <Button>Xóa</Button>
                                            </div>
                                        </div>
                                        <hr className="" style={{ marginTop: "0px", marginBottom: "0px" }} />
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px" }}>
                                            <p className='m-3'>Địa chỉ 3 | 0357xxxxxx<br />
                                                Núi trúc, Đống Đa, Hà Nội
                                            </p>
                                            <div style={{ textAlign: "center" }}>
                                                <Button type='primary'>Mặc định</Button>
                                                <Button className='m-2' type='primary'>Cập nhật</Button>
                                                <Button >Xóa</Button>
                                            </div>
                                        </div>
                                        <hr className="" style={{ marginTop: "0px", marginBottom: "0px" }} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;