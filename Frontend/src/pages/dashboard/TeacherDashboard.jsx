import './teacherDashboard.css';
import { Link } from 'react-router-dom';

function TeacherDashboard() {
    return (
        <>
            <div className="dashboard">
                <div className=" welcome-section">
                    {/* <!-- welcome section --> */}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <img src="https://assets-global.website-files.com/62443d15248af30a21e60133/62568b2d90c44730e9365e5c_sphere.png"
                            loading="lazy" alt="" width="122" class="image-case-study-1" />

                        <div class="wrapper wrapper--case-study">
                            <div data-w-id="3071ae50-a55f-5d80-357a-fe02f6e8afe7" class="case-study-container">

                                <h3 class="title-case-tudy">Welcome Back, Siesta</h3>
                                <p class="paragraph-case-study"> </p>
                            </div>
                            <img class="image"
                                src="https://assets-global.website-files.com/62443d15248af30a21e60133/624c17e520e315d7c8b82e32_icon-sucess-case-study.png"
                                width="330" height="330" alt="" sizes="(max-width: 991px) 100vw, (max-width: 1439px) 33vw, 330px"
                                data-w-id="fb6cde94-0e5c-a44e-3b0c-b1c806504c29" loading="lazy"
                                srcset="https://assets-global.website-files.com/62443d15248af30a21e60133/624c17e520e315d7c8b82e32_icon-sucess-case-study-p-500.png 500w, https://assets-global.website-files.com/62443d15248af30a21e60133/624c17e520e315d7c8b82e32_icon-sucess-case-study.png 802w" />
                        </div>
                        <div class="lines-bg"></div>
                        <div class="balles-bg"></div>
                        <img src="https://assets-global.website-files.com/62443d15248af30a21e60133/627d555bbea9a45b851d1bbd_balls.png"
                            loading="lazy" sizes="(max-width: 1439px) 100vw, 1140px"
                            srcset="https://assets-global.website-files.com/62443d15248af30a21e60133/627d555bbea9a45b851d1bbd_balls-p-500.png 500w, https://assets-global.website-files.com/62443d15248af30a21e60133/627d555bbea9a45b851d1bbd_balls-p-800.png 800w, https://assets-global.website-files.com/62443d15248af30a21e60133/627d555bbea9a45b851d1bbd_balls-p-1080.png 1080w, https://assets-global.website-files.com/62443d15248af30a21e60133/627d555bbea9a45b851d1bbd_balls-p-1600.png 1600w, https://assets-global.website-files.com/62443d15248af30a21e60133/627d555bbea9a45b851d1bbd_balls-p-2000.png 2000w, https://assets-global.website-files.com/62443d15248af30a21e60133/627d555bbea9a45b851d1bbd_balls.png 2291w"
                            alt="" class="balles-img" /><img
                            src="https://assets-global.website-files.com/62443d15248af30a21e60133/627d555b733aa5db90daec57_No%20balls.png"
                            loading="lazy" sizes="(max-width: 1439px) 100vw, 1140px"
                            srcset="https://assets-global.website-files.com/62443d15248af30a21e60133/627d555b733aa5db90daec57_No%20balls-p-500.png 500w, https://assets-global.website-files.com/62443d15248af30a21e60133/627d555b733aa5db90daec57_No%20balls-p-800.png 800w, https://assets-global.website-files.com/62443d15248af30a21e60133/627d555b733aa5db90daec57_No%20balls-p-1080.png 1080w, https://assets-global.website-files.com/62443d15248af30a21e60133/627d555b733aa5db90daec57_No%20balls-p-1600.png 1600w, https://assets-global.website-files.com/62443d15248af30a21e60133/627d555b733aa5db90daec57_No%20balls-p-2000.png 2000w, https://assets-global.website-files.com/62443d15248af30a21e60133/627d555b733aa5db90daec57_No%20balls.png 2291w"
                            alt="" class="lines-img" />
                    </div>
                </div>
                <div className="option ">
                    <Link to="/studentsStatus" className="card-help" style={{ width: '33%', height: '1rem', textDecoration: 'none', color: "white", }}>
                        Post new Assignment
                    </Link>
                    <Link to="/studentsStatus" className="card-help" style={{ width: '33%', height: '1rem', textDecoration: 'none', color: "white" }}>
                        Previous Assignments
                    </Link>
                    <Link to="/studentsStatus" className="card-help" style={{ width: '33%', height: '1rem', textDecoration: 'none', color: "white" }}>
                        Check Students Stats
                    </Link>
                </div>
            </div>
        </>
    );
}

export default TeacherDashboard;