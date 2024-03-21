import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";

const AddressDrawer = ({ visible, onClose }) => {

  const [currentDateTime, setCurrentDateTime] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Drawer
    title={     
        <div className="drawer-title">
          <div>{currentDateTime}</div>
        </div>
      }
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={500}
    >
      <Button type="primary" >
          Add
        </Button>
    </Drawer>
  );
};

export default AddressDrawer;
