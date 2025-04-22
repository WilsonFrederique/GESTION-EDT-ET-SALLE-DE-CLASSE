import './RightSidebar.css';

import { TbPointFilled } from "react-icons/tb";

import Profil from '../../../../assets/images/Profil.png'
import Voiture from '../../../../assets/images/voiture.jpg'
import Voiture1 from '../../../../assets/images/voiture1.jpg'
import Voiture2 from '../../../../assets/images/voiture2.jpg'
import Voiture3 from '../../../../assets/images/voiture3.jpg'
import Voiture4 from '../../../../assets/images/voiture4.jpg'
import Voiture5 from '../../../../assets/images/voiture5.jpg'
import Voiture6 from '../../../../assets/images/voiture6.jpg'
import Voiture7 from '../../../../assets/images/voiture7.jpg'

const RightSidebar = () => {
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={Profil} alt="profil1" className='profil1' />
        <h3>Wall Fred <TbPointFilled className='dot' /></h3>
        <p className='p-message'>Hey, There i am Wall Fred using chat app</p>
      </div>

      <hr />

      <div className="rs-media">
        <p className='p-message'>Media</p>
        <div>
          <img src={Voiture} alt="sendImg" className='msg-img' />
          <img src={Voiture1} alt="sendImg" className='msg-img' />
          <img src={Voiture2} alt="sendImg" className='msg-img' />
          <img src={Voiture3} alt="sendImg" className='msg-img' />
          <img src={Voiture4} alt="sendImg" className='msg-img' />
          <img src={Voiture5} alt="sendImg" className='msg-img' />
          <img src={Voiture6} alt="sendImg" className='msg-img' />
          <img src={Voiture7} alt="sendImg" className='msg-img' />
          <img src={Voiture7} alt="sendImg" className='msg-img' />
          <img src={Voiture5} alt="sendImg" className='msg-img' />
          <img src={Voiture6} alt="sendImg" className='msg-img' />
          <img src={Voiture7} alt="sendImg" className='msg-img' />
        </div>
      </div>
    </div>
  )
}

export default RightSidebar