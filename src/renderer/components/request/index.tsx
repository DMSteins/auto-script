import React, { useState } from 'react';
import { Radio, Input, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import './index.scss';

const { TextArea } = Input;

const Request = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('get');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');

  const onMethodChange = (e: RadioChangeEvent) => {
    setMethod(e.target.value);
  };

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const sendRequest = () => {
    if (!url) return;
    if (method === 'get') {
      axios
        .get(url, {})
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setResponse(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="req-box">
      <div>
        <div className="flex flex-align-center">
          <Input
            className="req-input"
            placeholder="输入地址"
            onChange={onUrlChange}
          />
          <Button
            className="send-btn"
            type="primary"
            size="large"
            onClick={sendRequest}
          >
            发送请求
          </Button>
        </div>
      </div>
      <div>
        <div className="req-head-title">Method:</div>
        <Radio.Group onChange={onMethodChange} defaultValue="get">
          <Radio.Button value="get">GET</Radio.Button>
          <Radio.Button value="post">POST</Radio.Button>
        </Radio.Group>
      </div>
      {method === 'get' ? (
        ''
      ) : (
        <div>
          <div className="req-head-title">Body:</div>
          <TextArea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="输入请求体"
            autoSize={{ minRows: 5 }}
          />
        </div>
      )}

      <div>
        <div className="req-head-title">Response:</div>
        <div>{JSON.stringify(response)}</div>
      </div>
    </div>
  );
};

export default Request;
