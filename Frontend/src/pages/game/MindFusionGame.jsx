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

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';


function MindFusionGame() {

    const [story, setStory] = useState([]);
    const [storyTitle, setStoryTitle] = useState('Ancient');
    const [loading, setLoading] = useState(true);

    let imgArray = story.images;
    let audioArray = story.audio;
    // imgArray.forEach(element => {
    //     console.log(element);

    // });
    console.log(imgArray);
    console.log(audioArray);




    const handlerLiClick = (title) => {
        // const clickedTitle = event.target.innerText;
        setStoryTitle(title);
        // setLoading(false)
    };

    useEffect(() => {

        let api = "http://localhost:8000/story/?title=" + storyTitle;

        fetch(api)
            .then(response => response.json())
            .then(data => setStory(data.story))
            .catch(error => console.error(error));

        setLoading(true)
    }, [storyTitle]);

    return (
        <>
            <div className="sidebar card">
                <h2>Assignment</h2>
                <h3>Pending Assignment</h3>
                <ul>
                    <li onClick={() => (handlerLiClick("Ancient"))}>Science</li>
                    <li onClick={() => (handlerLiClick("Env"))}>General Science</li>

                </ul>

                <h3>Completed Assignment</h3>
                <ul>
                    <li onClick={() => (handlerLiClick("English"))}>English</li>

                </ul>
            </div>

            <div className="main-content">
                <div className="card-help-game" style={{ height: '80vh' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', borderRadius: '2rem' }}>
                        {loading ?
                            <Swiper
                                pagination={{
                                    type: 'fraction',
                                }}
                                navigation={true}
                                modules={[
                                    Navigation]}
                                className="mySwiper"
                            >
                                {imgArray && imgArray.map((element, index) => (

                                    <SwiperSlide key={index}> <img src={element} />
                                        <div>

                                            <p style={{ zIndex: '1', position: 'absolute', bottom: '3rem', backgroundColor: 'black' }}>
                                                {story.text[index]}
                                            </p>
                                            <audio controls key={index} style={{ position: 'absolute', bottom: '0', right: '35%' }}>
                                                <source src={audioArray[index]} type="audio/mp3" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>

                                    </SwiperSlide>

                                ))}
                            </Swiper> : <h2 style={{ zIndex: '4' }}>Loading</h2>}


                    </div>
                </div>
            </div>
        </>

    );
}

export default MindFusionGame;
