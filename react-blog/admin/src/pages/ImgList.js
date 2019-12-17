import React, { useState, useEffect } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import qiniu from 'qiniu';
import key from '../config/key';
import axios from 'axios'
import servicePath from '../config/apiUrl'

function ImgList(props) {

  const [token, setToken] = useState({ token: '' })
  const [imgType, setImgType] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState([])
  //异步获取admin例表
  useEffect(() => {
    let isUnmounted = false;
    const fetchData = async () => {
      const result = await axios({ method: "get", url: servicePath.getImgList, withCredentials: true })
        .then((res) => {
          if (res.data.data === '没有登录') {
            localStorage.clear('openId')
            localStorage.clear('userInfo')
            props.history.push('/login')
            return
          } else {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].uid = '-' + (i + 1)
              res.data.data[i].name = res.data.data[i].img_title
              res.data.data[i].status = res.data.data[i].img_status === 0 ? 'error' : 'done'
              res.data.data[i].url = res.data.data[i].img_url
            }
            return res.data.data
          }
        })
      if (!isUnmounted) {
        setFileList(result)
      }
    }
    fetchData()
    return () => {
      isUnmounted = true;
    }
  }, [props.history])

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const fetchData = async () => {
    const result = await axios({ method: "get", url: servicePath.getImgList, withCredentials: true })
      .then((res) => {
        if (res.data.data === '没有登录') {
          localStorage.clear('openId')
          localStorage.clear('userInfo')
          props.history.push('/login')
          return
        } else {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].uid = '-' + (i + 1)
            res.data.data[i].name = res.data.data[i].img_title
            res.data.data[i].status = res.data.data[i].img_status === 0 ? 'error' : 'done'
            res.data.data[i].url = res.data.data[i].img_url
          }
          return res.data.data
        }
      })
    setFileList(result)
  }
  const handlePreview = (file) => {
    setPreviewVisible(true)
    setPreviewImage(file.url)
  }

  const handleChange = (file) => {
    const { uid, name, status, type, response = {} } = file.file
    const fileItem = {
      uid: uid,
      name,
      status,
      url: key.BASE_QINIU_URL + (response.hash || '')
    }
    setImgType(type !== undefined ? type : imgType)
    if (response.hash !== undefined) {
      let params = {
        imgTitle: name,
        imgUrl: key.BASE_QINIU_URL + (response.hash || ''),
        addTime: Math.round(new Date() / 1000),
        imgType: imgType,
        imgStatus: status === 'done' ? 1 : 0
      }
      axios({ method: "post", url: servicePath.addImg, data: params, withCredentials: true })
        .then(res => {
          if (res.data.data === '添加成功') {
            message.success(res.data.data)
            fetchData()
          } else {
            message.error(res.data.data)
          }
        })
    }
    let i = fileList.length
    if (fileList.length === 0) {
      let list = [...fileList, fileItem]
      setFileList(list)
    } else {
      if (uid === fileList[i - 1].uid) {
        fileList.pop()
        let list = [...fileList, fileItem]
        setFileList(list)
      } else {
        let list = [...fileList, fileItem]
        setFileList(list)
      }
    }
  }
  const handleUpload = () => {
    let mac = new qiniu.auth.digest.Mac(key.ACCESS_KEY, key.SECRET_KEY)
    var options = {
      scope: 'hzsnq', //就是你的对象存储空间名
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    setToken({ token: uploadToken })
  }
  const handleCancel = () => {
    setPreviewVisible(false)
  }
  const handRemove = (file) => {
    let index = fileList.findIndex(item => {
      return item.uid === file.uid;
    });
    let params = {
      id: fileList[index].id
    }
    axios({ method: "post", url: servicePath.deleteImgById, data: params, withCredentials: true })
      .then(res => {
        if (res.data.data === '删除成功') {
          message.success(res.data.data)
          fileList.splice(index, 1)
          let list = [...fileList]
          setFileList(list)
          fetchData()
        } else {
          message.error(res.data.data)
        }
      })
  }
  return (
    <div className="clearfix">
      <Upload
        action={key.QINIU_SERVER}
        data={token}
        listType="picture-card"
        className='upload-list-inline'
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={handleUpload}
        onChange={handleChange}
        onRemove={handRemove}
      >
        {uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default ImgList