import React, { useState } from 'react';
import { Radio, Input, Button, notification } from 'antd';
import type { RadioChangeEvent } from 'antd';
import axios from 'axios';
import './index.scss';

const { TextArea } = Input;

const Request = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('get');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [name, setName] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  const onMethodChange = (e: RadioChangeEvent) => {
    setMethod(e.target.value);
  };

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const sendRequest = () => {
    if (!url) return;
    const config = {
      // headers: { 'Content-Type': 'application/json' },
      timeout: 30000,
    };
    setIsRequesting(true);
    if (method === 'get') {
      axios
        .get(url, config)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setResponse(res.data);
          }
        })
        .catch((err) => {
          notification.error({
            message: (err.response && err.response.data) || err.message,
          });
        })
        .finally(() => {
          setIsRequesting(false);
        });
    } else {
      axios
        .post(url, config)
        .then((res) => {
          if (res.status === 200) {
            setResponse(res.data);
          }
        })
        .catch((err) => {
          notification.error({
            message: (err.response && err.response.data) || err.message,
          });
        })
        .finally(() => {
          setIsRequesting(false);
        });
    }
  };

  const saveRequest = () => {
    let json = {
      url,
      method,
      body,
      name: name || url,
    };
    window.electron.ipcRenderer.saveFile('ipc-save-json', json);
  };

  return (
    <div className="req-box">
      <div>
        <Input
          className="req-input mb-4"
          placeholder="输入描述"
          onChange={onNameChange}
        />
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
            loading={isRequesting}
          >
            发送请求
          </Button>
          <Button
            className="send-btn"
            type="primary"
            size="large"
            onClick={saveRequest}
          >
            保存请求
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
          <div className="req-head-title m-4 text-red-100">Body:</div>
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
        <div>{response && JSON.stringify(response)}</div>
      </div>
    </div>
  );
};

export default Request;
