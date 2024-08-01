// import React from 'react';
import img1 from '../../assets/mathStoryImgs/2_1.png'
import img2 from '../../assets/mathStoryImgs/2_2.png'
import img3 from '../../assets/mathStoryImgs/2_3.png'
import img4 from '../../assets/mathStoryImgs/2_4.png'
import img5 from '../../assets/mathStoryImgs/2_5.png'
import img6 from '../../assets/mathStoryImgs/2_6.png'
import img7 from '../../assets/mathStoryImgs/2_7.png'
import img8 from '../../assets/mathStoryImgs/2_8.png'
import img9 from '../../assets/mathStoryImgs/2_9.png'
import img10 from '../../assets/mathStoryImgs/2_10.png'

import './mindfusiongame.css';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

function MindFusionGame() {
    return (
        <>
            <div className="sidebar">
                <h2>Assignment</h2>
                <h3>Pending Assignment</h3>
                <ul>
                    <li>Math</li>
                    
                </ul>

                <h3>Completed Assignment</h3>
                <ul>
                    <li>Science</li>
                </ul>
            </div>

            <div className="main-content" style={{ border: '2px solid red' }}>
                <div class="card-help-game">
                    <div style={{ width: '100%', height: '100%', display: 'flex', borderRadius: '2rem' }}>
                        <Swiper
                            pagination={{
                                type: 'fraction',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            <SwiperSlide> <img src={img1} alt="" srcset="" /> </SwiperSlide>
                            <SwiperSlide> <img src={img2} alt="" srcset="" /> </SwiperSlide>
                            <SwiperSlide> <img src={img3} alt="" srcset="" /> </SwiperSlide>
                            <SwiperSlide> <img src={img4} alt="" srcset="" /> </SwiperSlide>
                            <SwiperSlide> <img src={img5} alt="" srcset="" /> </SwiperSlide>
                            <SwiperSlide> <img src={img6} alt="" srcset="" /> </SwiperSlide>
                            <SwiperSlide> <img src={img7} alt="" srcset="" /> </SwiperSlide>
                            <SwiperSlide> <img src={img8} alt="" srcset="" /> </SwiperSlide>
                            <SwiperSlide> <img src={img9} alt="" srcset="" /> </SwiperSlide>
                            <SwiperSlide> <img src={img10} alt="" srcset="" /> </SwiperSlide>

                        </Swiper>
                    </div>

                </div>

            </div>
        </>

    );
}

export default MindFusionGame;
