import React, { useState } from "react";
import { Avatar, Button, Space, Tooltip, Progress } from "antd";
import { UserOutlined, EditTwoTone } from "@ant-design/icons";
import { storage, database } from "../../firebase";

// const

function ProfilePic({ setFileDetails, filePath }) {
  const [progressDetails, setProgressDetails] = useState({
    showProgressbar: false,
    progress: 0,
    loading: false,
  });

  const [url, setUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileDetails({ file, fileName: file.name });
    // console.log(file);
    if (file == null) return;
    const uploadTask = storage.ref(filePath).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setProgressDetails((prev) => {
          return { showProgressbar: true, progress, loading: true };
        });
      },
      () => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setUrl(url);
          setProgressDetails((prev) => {
            return { ...prev, showProgressbar: false, loading: false };
          });
        });
      }
    );
  };

  const handleClick_1 = () => {
    const profilePic = document.getElementById("profilePic");
    profilePic.click();
  };
  return (
    <Space align="baseline">
      <Space direction="vertical" align="baseline" size={1}>
        <Avatar size={60} src={url} icon={<UserOutlined />} />
        <input hidden id="profilePic" type="file" onChange={handleFileChange} />
        {progressDetails.showProgressbar && (
          <Progress
            style={{ width: "100px" }}
            percent={Math.round(progressDetails.progress * 100)}
          />
        )}
      </Space>

      {/* <Tooltip title="select a file">
       
      </Tooltip> */}
      <Button
        disabled={progressDetails.loading}
        ghost
        size="small"
        shape="circle"
        icon={<EditTwoTone />}
        onClick={handleClick_1}
      />
    </Space>
  );
}

export default ProfilePic;
