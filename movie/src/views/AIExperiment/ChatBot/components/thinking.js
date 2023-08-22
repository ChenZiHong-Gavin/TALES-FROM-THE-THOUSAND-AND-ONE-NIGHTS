import { MdComputer } from 'react-icons/md'
import Styles from '../index.module.scss'

// const Thinking = () => {
//   return (
//     <div className='message'>
//       <div className='message__wrapper flex'>
//         <div className="message__pic">
//           <MdComputer />
//         </div>
//         <div className='text-left message__createdAt'>
//           <div className="message__thinking">
//             thinking...
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


const Thinking = () => {
    return (
        <div className={Styles.message}>
            <div className={`${Styles.message__wrapper} ${Styles.flex}`}>
                <div className={Styles.message__pic}>
                    <MdComputer />
                </div>
                <div className={`${Styles["text-left"]} ${Styles.message__createdAt}`}>
                    <div className={Styles.message__thinking}>
                        thinking...
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thinking