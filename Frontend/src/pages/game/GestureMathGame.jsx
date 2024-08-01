function GestureMathGame() {
    return (
        <>
            {/* <!-- Section 1 --> */}
            <div>
                <div style="padding: 0 0rem; display: flex; height: 100vh; justify-content: space-evenly; align-items: center;">

                    {/* <!-- box 1 --> */}
                    <div class="card-help-game">
                        <div style=" width: 100%; height: 100%;">
                            <div style=" height: 40%; display: flex;">
                                <div style="width: 40%; display: flex; justify-content: center;"><img id="number1" src=""
                                    alt="" /></div>
                                <div style="width: 30%; display: flex; justify-content: center;"><img id="operator" src=""
                                    alt="" /></div>
                                <div style=" width: 40%; display: flex; justify-content: center;"><img id="number2" src=""
                                    alt="" /></div>
                            </div>
                            <div style=" height: 60%; display: flex; justify-content: flex-end; align-items: center;">
                                <div
                                    style=" width: 40%; height: 100%; display: flex; align-items: center; justify-content: center;">
                                    <p style="font-weight: bolder; font-size: 6rem;" id="count"></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- box 2 --> */}
                    <div class="card-help-game">
                        <div style="width: 100%; height: 100%; border-radius: 20px; overflow: hidden;">

                            <img style=" border-radius: 20px; scale: 1.33;" id="video_feed"
                                src="{{ url_for('main.video_feed') }}" height="100%" width="100%" />

                        </div>
                    </div>

                    {/* <!-- Modal for correct answer pop-up --> */}
                    <div id="correctPopUp" class="modal-overlay">
                        <div style="background-image: radial-gradient(circle, rgba(13, 162, 33, 0.682), rgba(53, 216, 94, 0.796)); padding: 3rem 5rem;"
                            class="modal-content">
                            <p> Correct Answer </p>
                            <a href="/game/gesturemath" class="button-home w-button close">Restart The Game</a>
                        </div>
                    </div>

                    {/* <!-- Modal for  Incorrect pop-up --> */}
                    <div id="inCorrectPopUp" class="modal-overlay">
                        <div class="modal-content">
                            <p> Good Try... Good Luck For Next Game! </p>
                            <a href="/game/gesturemath" class="button-home w-button close">Restart The Game</a>
                        </div>
                    </div>

                </div>
                <img src="https://assets-global.website-files.com/62443d15248af30a21e60133/62568b2d90c44730e9365e5c_sphere.png"
                    loading="lazy" width="73.5" alt="" class="image-help-3" />
                <img src="https://assets-global.website-files.com/62443d15248af30a21e60133/62568b2d90c44730e9365e5c_sphere.png"
                    loading="lazy" width="73.5" alt="" class="image-help-1" />
            </div>


        </>

    )
}

export default GestureMathGame;