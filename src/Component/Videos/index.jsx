import React, { Component } from 'react'
import { Modal, Button } from 'antd';

const VideoModal = ({ videoUrl, visible, onClose }) => {
  //console.log(videoUrl)
  return (
    <Modal
      title="处理情况展示"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
    >
      <video controls width="100%" height="auto" autoPlay="true">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Modal>
  );
};

// const VideoPlayer = () => {
//   const [modalVisible, setModalVisible] = React.useState(false);

//   const handleOpenModal = () => {
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <div>
//       <Button onClick={handleOpenModal}>播放视频</Button>
//       <VideoModal
//         videoUrl="/testvideo.mp4"  // 替换为实际视频链接
//         visible={modalVisible}
//         onClose={handleCloseModal}
//       />
//     </div>
//   );
// };

export default VideoModal;
