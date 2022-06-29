import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';

const Example = () => {
  const [isExec, setIsExec] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState({
    count: 0,
    info: '',
  });

  useEffect(() => {
    if (!isExec) return;

    getOrderData();
  }, [isExec]);

  const getOrderData = () => {
    const list = axios.get('');
    const storeData = axios.get('');

    Promise.all([list, storeData])
      .then((values) => {
        createRecords();
      })
      .catch((err) => {
        setIsExec(false);
      });
  };
  const createRecords = async () => {
    const res = await axios.get('').catch((err) => {
      setIsExec(false);
    });
    if (!res) return;
  };

  return (
    <>
      <div>
        <Button type="primary" onClick={() => setIsExec(!isExec)}>
          {isExec ? '停止执行' : '执行'}
        </Button>
        <div>
          <div>执行信息:</div>
          <div className="max-h-40">{`执行第${infoMsg.count}次，生成 ${infoMsg.info};`}</div>
        </div>
        <div>
          <div>错误信息:</div>
          <div>{errorMsg}</div>
        </div>
      </div>
    </>
  );
};

export default Example;
