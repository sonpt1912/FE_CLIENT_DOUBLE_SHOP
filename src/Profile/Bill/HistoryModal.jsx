import React from 'react';
import { Modal, Table, Tag } from 'antd';

const HistoryModal = ({ visible, onCancel, billHistory }) => {
 
  const columns = [
    {
      title: 'Thời Gian',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: 'Người Chỉnh Sửa',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Trạng Thái Đơn Hàng',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let statusColor = '';
        let statusText = '';
        switch (status) {
          case 0:
            statusColor = "#00CC00";
            statusText = 'Chờ xác nhận';
            break;
          case 1:
            statusColor = "#00CC00";
            statusText = 'Đã xác nhận';
            break;
          case 2:
            statusColor = "#00CC00";
            statusText = 'Chờ lấy hàng';
            break;
          case 3:
            statusColor = "#00CC00";
            statusText = 'Giao hàng';
            break;
          case 4:
            statusColor = "#FFC733";
            statusText = 'Hoàn thành';
            break;
          case 5:
            statusColor = "#FF5733";
            statusText = 'Đã hủy';
            break;
          case 6:
            statusColor =  "#FF5733";
            statusText = 'Trả hàng';
            break;
          case 7:
            statusColor = "#FFD700";
            statusText = 'Chỉnh sửa';
            break;
          default:
            statusColor = '';
            statusText = 'Không xác định';
        }
        return <Tag color={statusColor}>{statusText}</Tag>;
      },
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <Modal
      title="Lịch sử Hóa Đơn"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
    >
      <Table
        columns={columns}
        dataSource={billHistory}
        rowKey={(record) => record.id} 
      />
    </Modal>
  );
};

export default HistoryModal;
