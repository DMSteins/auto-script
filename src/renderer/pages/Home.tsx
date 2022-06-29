import { useState } from 'react';
import { Button, Modal } from 'antd';
import RequestCpt from '../components/request';

const Home = () => {
  const [visible, setVisible] = useState(false);
  const addRequest = () => {
    setVisible(true);
  };
  return (
    <div>
      <Button type="primary" shape="round" size="large" onClick={addRequest}>
        新增请求
      </Button>

      <Modal
        title="新增请求"
        centered
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <RequestCpt />
      </Modal>
    </div>
  );
};

export default Home;
