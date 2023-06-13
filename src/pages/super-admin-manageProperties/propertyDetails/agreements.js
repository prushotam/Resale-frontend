import React,{ useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Navigation, Pagination, A11y } from "swiper";
SwiperCore.use([FreeMode, Navigation, Pagination, A11y]);

const AgreementsData = () => {
    const swiperRefAgreement = useRef(null);
    return (
        <div>
            <div className="property-doc">
                <h4>
                    Agreements
                </h4>
            </div>
            <div className="template-addProp">
                <div className="property-button">
                </div>
                <Swiper
                    freeMode={true}
                    spaceBetween={50}
                    slidesPerView={4}
                    modules={[FreeMode, Navigation, Pagination, A11y]}
                    onSwiper={(swiper) => {
                        swiperRefAgreement.current = swiper;
                    }}
                >
                    <SwiperSlide>
                        <div className="templateItems">
                            <img src="/imgs/mou 2.png" />
                            <h4>Offer Letter</h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="templateItems">
                            <img src="/imgs/saleAg.png" />
                            <h3>MOU</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="templateItems">
                            <img src="/imgs/saleDe.png" />
                            <h2>Sale Agreement</h2>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="templateItems">
                            <img src="/imgs/undrawreg.png" />
                            <h5>Sale Deed</h5>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>


    )

}
export default AgreementsData;