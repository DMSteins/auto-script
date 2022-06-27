import { Button } from 'antd';
import RequestCpt from './components/request/index';

const Home = () => {
  return (
    <div>
      <Button type="primary" shape="round" size="large" onClick={() => {}}>
        新增请求
      </Button>
      <RequestCpt />
    </div>
  );
};

export default Home;
