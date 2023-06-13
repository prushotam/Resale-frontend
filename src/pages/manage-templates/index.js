import React, { useEffect, useState } from "react";
import { useToasts } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { AddTemplateData, GetTemplateData, updateTemplateData } from './service'
import Main from '../../layout/Main';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './style.scss'


import link from '../../assets/link.svg';
import circlePlus from '../../assets/circle-plus.svg'

import addIcon from '../../assets/add-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'
import editIcon from '../../assets/edit-icon.svg'

import AddTemplate from './AddTemplate';

import Tooltip from '@mui/material/Tooltip';


function Page(props) {
  const Dispatch = useDispatch();
  const adminTemplate = useSelector((state) => state.adminTemplate);
  const { addToast } = useToasts();
  const [currentTemplate, setCurrentTemplate] = useState();
  const [state, setState] = useState({
    template_cat: 'document',
    index : null,
    template_type:'document'
  });
  const history = useHistory();

  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/super-admin-login");
    }
  }, []);

  useEffect(() => {
    Dispatch(GetTemplateData())
  }, [])
console.log(adminTemplate)
  useEffect(() => {
      if (adminTemplate?.templates?.length) {
        setCurrentTemplate(adminTemplate.templates[state.index])
        if( adminTemplate.templates[state.index]?.file){
          setState(() => ({ ...state, currentFile: adminTemplate.templates[state.index]?.file }))
        }else{
          setState(() => ({ ...state, currentTemplate: '', currentFile: '' }))

        }
       
      } else {
        setState(() => ({ ...state, currentTemplate: '', currentFile: '' }))
      }

    }
  , [state.template_type, state.index])




  useEffect(() => {
    if (adminTemplate.message) {
      if (adminTemplate.status == 'Success') {
        addToast(adminTemplate.message, { appearance: 'success' });
      } else {
        addToast(adminTemplate.message, { appearance: 'error' });
      }
    }
  }, [adminTemplate.message, adminTemplate.status])



  return (
    <Main 
    showLoader={false}
    showNav={!props?.showNav}
    showFooter={!props?.showFooter}
    showLogo={!props?.showLogo}
    showAdminFooter={!props?.showAdminFooter}
    showAdminNavbar={!props?.showAdminNavbar}
    >
      <div className="content row manage-home">

       {state.template_cat?.toLowerCase() == 'document' ? <div className="template-list col-2">
       { adminTemplate.templates?.map((ele,index)=>{
        return(
       <>
       {( ele.template_type == "MOU" || ele.template_type == "SALE_DEED" || ele.template_type == "OFFER_LETTER" || ele.template_type == "SALE_AGREEMENT" || ele.template_type == "DOCUMENT" ) && 
          <div className={`template-item ${state.template_type == 'DOCUMENT' && state.index == index ? 'active' : ''}`} onClick={() => {
            setState({
              ...state,
              template_type: 'DOCUMENT',
              index
            })
          }}>
            <img src="/imgs/document.png" className="doc-Image"/>
            <p>{ele.template_name}</p>
          </div>
          }
          </>
        )
        })}
         </div> : null}



        {state.template_cat?.toLowerCase() == 'email' ? <div className="template-list col-2">
       { adminTemplate.templates?.map((ele,index)=>{
        return(
       <>
       {ele.template_type == 'EMAIL' && 
          <div className={`template-item ${state.template_type == 'EMAIL' && state.index == index ? 'active' : ''}`} onClick={() => {
            setState({
              ...state,
              template_type: 'EMAIL',
              index
            })
          }}>
            <img src="/imgs/Email.svg" />
            <Tooltip placement="right-start" arrow title={ele.template_name}>
            <p>{ele.template_name}</p>

            </Tooltip>
          </div>
          }
          </>
        )
        })}
         </div> : null}




       {state.template_cat?.toLowerCase() == 'sms' ? <div className="template-list col-2">
       { adminTemplate.templates?.map((ele,index)=>{
        return(
       <>
       {ele.template_type == 'SMS' && 
          <div className={`template-item ${state.template_type == 'SMS' && state.index == index ? 'active' : ''}`} onClick={() => {
            setState({
              ...state,
              template_type: 'SMS',
              index
            })
          }}>
            <img src="/imgs/SMS.svg" />
            <p>{ele.template_name}</p>
          </div>
          }
          </>
        )
        })}
         </div> : null}
         

        <div className="template-area col-10">
          <div className="row">
            <div className="col-9">
              <div className="template-btns">
                <div className="btn-group-left">
                  <button className="btn btn-primary" onClick={() => {
                    setState({ ...state, isAddOpen: true })
                  }}> + Add Template</button>
                </div>
                <div className="btn-group-right">
                  <select className="form-select select-menu" onChange={(e) => setState({
                    ...state,
                    index:0,
                    template_cat: String(e.target.value).toLowerCase(),
                    template_type: String(e.target.value).toLowerCase() != 'document' ? String(e.target.value).toLowerCase() : null,
                  })}>
                    <option value="document">Document</option>
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

            <div className="editorWrapper">
                <CKEditor
                  editor={ClassicEditor}
                  data={state.currentFile}
                  readOnly={state.template_type === 'SMS'}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setState({ ...state, updateTemplate: true, currentFile: data })
                  }}
                />

              </div>
              <div className="template-btns">
                <div className="btn-group-right">
                  <button 
                  disabled={state.template_type === 'SMS'} onClick={
                    async () => {
                      await Dispatch(updateTemplateData({ ...currentTemplate, templateId: currentTemplate._id, file: state.currentFile }))
                      Dispatch(GetTemplateData())
                    }
                  }   
                  className={`templateBtn ${state.template_type === 'SMS' ? 'disabledButton' : ''}`}
                  >Save</button>
                </div>
              </div>
            </div>

            <div className="spotlist-area col-3">   
            <div className="spotlist-item">
                 <div className="title-bar">
                   <p className="title">Offer Letter</p>
                   <div className="icon-group">
                     <img className="icon" src={addIcon} />
                     <img className="icon" src={deleteIcon} />
                     <img className="icon" src={editIcon} />
                   </div>
                 </div>
                 <div className="description-area">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem elit</div>
               </div>
              <div className="plus-btn-wrap">
                <img src={circlePlus} className="plus-btn" />
              </div>
              {
                currentTemplate?.spotlight.map(item => {
                  return (<div className="spotlist-item">
                    <div className="title-bar">
                      <p className="title">{item.name}</p>

                      <div className="icon-group">
                        <img className="icon" src={addIcon} />
                        <img className="icon" src={deleteIcon} />
                        <img className="icon" src={editIcon} />
                      </div>
                    </div>
                    {/* <div className="description-area">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem elit</div> */}
                  </div>)
                })
              }
            </div>
          </div>
        </div>
      </div>
      <AddTemplate isOpen={state.isAddOpen} onClose={(e) => {
        setState({ ...state, isAddOpen: false })
      }}
        onSubmit={(data) => {
          Dispatch(AddTemplateData(data))
        }}
      />

    </Main>
  )

}

export default Page