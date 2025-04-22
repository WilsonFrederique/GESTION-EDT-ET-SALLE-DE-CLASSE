import './ChartBox.css';

import { TbHelpHexagon } from "react-icons/tb";
import { CiImageOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";

import Profil from '../../../../assets/images/Profil.png'
import Voiture from '../../../../assets/images/voiture.jpg'

const ChartBox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={Profil} alt="profil1" className='profil1' />
        <p>Wall Fred</p>
        <TbHelpHexagon />
      </div>


      <div className="chat-msg">
        <div className="s-msg">
          <p className="msg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur, quae.</p>
          <div>
            <img src={Profil} alt="profil1" className='profil1' />
            <p>2:30 PM</p>
          </div>
        </div>
        <div className="s-msg">
          <img src={Voiture} alt="sendImg" className='msg-img' />
          <div>
            <img src={Profil} alt="profil1" className='profil1' />
            <p>2:30 PM</p>
          </div>
        </div>

        <div className="r-msg">
          <p className="msg">Bonjour, Lorem ipsum dolor sit amet consectetur..</p>
          <div>
            <img src={Profil} alt="profil1" className='profil1' />
            <p>2:30 PM</p>
          </div>
        </div>
      </div>


      <div className="chat-input">
        <input type="text" className='input' placeholder='Send a message' />
        <input type="file" id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor='image'>
          <CiImageOn />
        </label>
        <IoMdSend />
      </div>
    </div>
  )
}

export default ChartBox