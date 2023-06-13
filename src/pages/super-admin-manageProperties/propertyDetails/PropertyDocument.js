import React, { useRef,useState } from "react";
import Button from "react-bootstrap/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import RightArrow from "../../../assets/right-arrow.svg";
import LeftArrow from "../../../assets/left-arrow.svg";
import SwiperCore, { FreeMode, Navigation, Pagination, A11y } from "swiper";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import PropertyDocument from "../../../layout/PropertyModal/PropertyDocumentModal/propertyDocument";
SwiperCore.use([FreeMode, Navigation, Pagination, A11y]);

const PropertyDocumentData = () => {
  const [propertyDocumentModal, setPropertyDocumentModal] = useState(false);
  const [addModal, setAddModal] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [title, setTitle] = useState({});
  const [value, setValue] = useState();
  const swiperRef = useRef(null);
  const checkListTypeData = useSelector(
    (state) => state.superAdminProperties?.checkListData
  );
  const handlePrevClick = () => {
    if (swiperRef.current !== null && activeIndex > 0) {
      swiperRef.current.slidePrev();
      setActiveIndex(activeIndex - 1);
    }
  };
  const handleNextClick = () => {
    if (swiperRef.current !== null && activeIndex < checkListTypeData?.length - 3) {
      swiperRef.current.slideNext();
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div>
      <div className="property-doc fw-bold">
        <h4>Property Documents</h4>
      </div>
      <div className="template-addProp">
        <div className="property-button">
          <Button
            variant="transparent"
            className="arrow"
            onClick={handlePrevClick}
            disabled={activeIndex === 0}
          >
            <img src={LeftArrow} />
          </Button>
          <Button
            variant="transparent"
            className="arrow"
            onClick={handleNextClick}
            disabled={activeIndex === checkListTypeData?.length - 3}
          >
            <img src={RightArrow} />
          </Button>
        </div>
        <Swiper
          freeMode={true}
          spaceBetween={50}
          slidesPerView={4}
          modules={[FreeMode, Navigation, Pagination, A11y]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {checkListTypeData?.map((propertyData) => (
            <SwiperSlide>
              <div className="position-relative" onClick={() => {
                setPropertyDocumentModal(!propertyDocumentModal);
                setAddModal(false);
                setTitle(propertyData);
              }}>
                <div className="position-absolute end-0">
                  <AddIcon style={{ color: "#0062AE", cursor:'pointer' }} />
                </div>
                <div className="template-items" >
                  <img src="/imgs/document.png" />
                  <p>{propertyData.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div
              className="plus-template"
              onClick={() =>{
                setPropertyDocumentModal(!propertyDocumentModal);
                setAddModal(true);}
              }
            >
              <img src="/imgs/+.svg" className="plus" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <PropertyDocument
        setIsPropertyModal={() => setPropertyDocumentModal(!propertyDocumentModal)}
        isPropertyModal={propertyDocumentModal}
        openModal={addModal}
        modalInitial = {setAddModal}
        title={title}
        setTitle={setTitle}
      />
    </div>
  );
};

export default PropertyDocumentData;
