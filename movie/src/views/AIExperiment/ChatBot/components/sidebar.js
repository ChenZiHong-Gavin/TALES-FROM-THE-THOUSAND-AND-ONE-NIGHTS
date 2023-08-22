import { useState, useContext, useEffect } from 'react';
import {
    MdClose,
    MdMenu,
    MdAdd,
    MdOutlineVpnKey,
} from 'react-icons/md';
import { ChatContext } from '../context/chatContext';
import { RobotFilled } from '@ant-design/icons';
import Modal from './modal';
import Setting from './setting';
import Styles from '../index.module.scss'

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const SideBar = () => {
    const [open, setOpen] = useState(true);
    const [, , clearMessages] = useContext(ChatContext);
    const [modalOpen, setModalOpen] = useState(false);

    function handleResize() {
        window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
    }

    useEffect(() => {
        handleResize();
    }, []);

    const clearChat = () => clearMessages();

    return (
        <section className={` ${open ? Styles['w-64'] : Styles['w-16']} ${Styles.sidebar}`}>
            <div className={`${Styles['sidebar__app-bar']}`}>
                <div className={`${Styles['sidebar__app-logo']} ${!open && Styles['scale-0']} ${Styles.hidden}`}>
                    <span className={`${Styles['w-8']} ${Styles['h-8']}`}>
                        {/* <img src={bot} alt='' /> */}
                        <RobotFilled />
                    </span>
                </div>
                <h1 className={`${Styles['sidebar__app-title']} ${!open && Styles['scale-0']} ${Styles.hidden}`}>
                    ChatGPT
                </h1>
                <div className={`${Styles['sidebar__btn-close']}`} onClick={() => setOpen(!open)}>
                    {open ? (
                        <MdClose className={Styles['sidebar__btn-icon']} />
                    ) : (
                        <MdMenu className={Styles['sidebar__btn-icon']} />
                    )}
                </div>
            </div>
            <div className={`${Styles.nav}`}>
                <span
                    className={`${Styles['border']} ${Styles['nav__item']} ${Styles['border-neutral-600']}`}
                    onClick={clearChat}>
                    <div className={`${Styles['nav__icons']}`}>
                        <MdAdd />
                    </div>
                    <h1 className={`${!open && Styles['hidden']}`}>New chat</h1>
                </span>
            </div>

            <div className={`${Styles['nav__bottom']}`}>
                <div onClick={() => setModalOpen(true)} className={`${Styles.nav}`}>
                    <span htmlFor='setting-modal' className={`${Styles['nav__item']}`}>
                        <div className={`${Styles['nav__icons']}`}>
                            <MdOutlineVpnKey />
                        </div>
                        <h1 className={`${!open && Styles['hidden']}`}>OpenAI Key</h1>
                    </span>
                </div>
            </div>
            <Modal title='Setting' modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </Modal>
        </section>
    );
};

export default SideBar;