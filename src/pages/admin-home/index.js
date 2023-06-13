import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getData } from './service'
import Main from '../../layout/Main';


// import './style.scss'


import link from '../../assets/link.svg';
import circlePlus from '../../assets/circle-plus.svg'

import addIcon from '../../assets/add-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'
import editIcon from '../../assets/edit-icon.svg'




function Page(props) {
  const dispatch = useDispatch();
  const adminProperties = useSelector((state) => state.adminProperties);
  return (
    <Main>
     
      <div className="content row manage-home">
        <div className="template-list col-2">
          <div className="template-item">
            <img src="/imgs/offer-letter.png" alt="offer-letter"/>
            <p>Offer Letter</p>
          </div>

          <div className="template-item">
            <img src="/imgs/mou.png" alt="template" />
            <p>MOU</p>
          </div>

          <div className="template-item">
            <img src="/imgs/sale-agreement.png" alt="item" />
            <p>Sale Agreement</p>
          </div>
          <div className="template-item">
            <img src="/imgs/sale-deed.png" alt="item"/>
            <p>Sale Deed</p>
          </div>
        </div>

        <div className="template-area col-10">
          <div className="row">
            <div className="col-9">
              <div className="template-btns">
                <div className="btn-group-left">
                  <button className="btn btn-primary" onClick={() => {
                    console.log('hellow world')
                    dispatch(getData())
                  }}> + Add Template</button>
                </div>
                <div className="btn-group-right">
                  <button className="btn btn-link"> <img src={link} alt="pic" /> Link Property</button>
                  <button className="btn btn-primary">Category</button>
                </div>
              </div>
              <textarea></textarea>
              <div className="template-btns">
                <div className="btn-group-left">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Save as draft
                    </label>
                  </div>
                </div>
                <div className="btn-group-right">
                  <button className="btn btn-primary">Save a copy</button>
                </div>
              </div>
            </div>

            <div className="spotlist-area col-3">
              <div className="plus-btn-wrap">
                <img src={circlePlus} alt="pic" className="plus-btn" />
              </div>

              <div className="spotlist-item">
                <div className="title-bar">
                  <p className="title">Spotlight title</p>
                  <div className="icon-group">
                    <img className="icon" src={addIcon} alt="icon"/>
                    <img className="icon" src={deleteIcon} alt="icon"/>
                    <img className="icon" src={editIcon} alt="icon"/>
                  </div>
                </div>
                <div className="description-area">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem elit</div>
              </div>

              <div className="spotlist-item">
                <div className="title-bar">
                  <p className="title">Spotlight title</p>
                  <div className="icon-group">
                    <img className="icon" src={addIcon} alt="icon"/>
                    <img className="icon" src={deleteIcon} alt="icon"/>
                    <img className="icon" src={editIcon} alt="icon"/>
                  </div>
                </div>
                <div className="description-area">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem elit</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Main>
  )

}

export default Page