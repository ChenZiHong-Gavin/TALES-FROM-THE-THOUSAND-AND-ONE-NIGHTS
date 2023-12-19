import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/sidebar.js';
import ChatView from './components/chatview.js';
import { useEffect, useState } from 'react';
import Modal from './components/modal';
import Setting from './components/setting';
// import SCSSStyle from './index.module.scss'
import Styles from './index.module.scss'



const ChatBot = () => {
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {

  }, []);

  useEffect(() => {
    const apiKey = window.localStorage.getItem('api-key');
    if (!apiKey) {
      setModalOpen(true);
    }
  }, []);
  return (
    <div className={Styles.chatBotPage}>
      <ChatContextProvider>
        <Modal title='Setting' modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Modal>
        <div
          className={
            `${Styles.flex} ${Styles.transition} ${Styles["duration-500"]} ${Styles["ease-in-out"]}}`
          }
        >
          <SideBar />
          <ChatView />
        </div>
      </ChatContextProvider>
    </div>
  );
};

export default ChatBot;