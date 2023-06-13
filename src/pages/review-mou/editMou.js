import React , {useEffect} from "react";
import { Button } from '@mui/material'
import Main from "../../layout/Main";
import { useLocation, useHistory } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSelector } from "react-redux";


import "./style.scss";

const EditMou = (props) => {
  const history = useHistory()
  const location = useLocation();
  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";
  const propertyId = useSelector((state)=> state?.buyerHomeData?.selectedProperty?._id) || '';
  const pid = location.search.split("=")[1]

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }else{
      if(!propertyId) history.push("/user-home");
      else if(pid != propertyId) history.push(`/edit-mou?pid=${propertyId}`)
    }
  }, []);

  return (
    <div>
      <Main
      showUserNavbar={!props?.showUserNavbar}
      showUser={!props?.showUser}
      >
        <div className="fee-container">
          <div className="platform-fee-container">
          <div className="editorWrappers">
                <CKEditor
                  editor={ClassicEditor}
                  className="editor"
                />

              </div>
            <Button variant="primary" type="submit" className="fee-btn" sx={{bgcolor:'var(--darkBlue)'}}>
             Approve
            </Button>
          </div>
        </div>
      </Main>
    </div>
  );
};
export default EditMou;
