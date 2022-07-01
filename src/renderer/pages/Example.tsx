import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';
const req_yiyan = () => {
  return axios.get('https://v.api.aa1.cn/api/yiyan/index.php');
};
const req_hot = () => {
  return axios.get('https://v.api.aa1.cn/api/topbaidu/index.php');
};
const Example = () => {
  const [isExec, setIsExec] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState({
    count: 0,
    info: '',
  });
  const [reqFuncs, setReqFuncs] = useState<Function[]>([]);

  useEffect(() => {
    if (!isExec) return;
    getOrderData();
    // console.log(req_hot, req_yiyan);
    // req_yiyan().then((res) => {
    //   console.log(res);
    // });
    // console.log(req_hot, req_yiyan, 111);
  }, [isExec]);

  // const addRequest = (req: Promise<unknown>) => {
  //   setReqFuncs([...reqFuncs, req]);
  // };

  const addRequestEvt = () => {
    setReqFuncs([...reqFuncs, req_yiyan, req_hot]);
  };

  const getOrderData = async () => {
    console.log('getOrderData');
    const reqArr: Promise<unknown>[] = [];
    reqFuncs.forEach((func) => {
      reqArr.push(func());
    });
    const values = await Promise.all(reqArr).catch((err) => {
      setIsExec(false);
    });
    setInfoMsg({
      count: infoMsg.count + 1,
      info: JSON.stringify(values) + '\n' + infoMsg.info,
    });
    console.log(values);
    setIsExec(false);
    // createRecords();
  };
  const createRecords = async () => {
    const res = await axios.get('').catch((err) => {
      setIsExec(false);
    });
    if (!res) return;
  };

  return (
    <>
      <div className="m-6">
        <Button type="primary" onClick={addRequestEvt} className="mr-4">
          新增请求
        </Button>
        <Button type="primary" onClick={() => setIsExec(!isExec)}>
          {isExec ? '停止执行' : '执行'}
        </Button>
        <div>
          <div>执行信息:</div>
          <div
            className="max-h-40"
            style={{ overflowY: 'auto' }}
          >{`执行第${infoMsg.count}次，生成 ${infoMsg.info};`}</div>
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
