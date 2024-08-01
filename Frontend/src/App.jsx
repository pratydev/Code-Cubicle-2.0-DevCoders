import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
// import './App.css'

function App() {

  return (
    <>

      <main className="main">
        <Outlet />
      </main>

      {/* <!-- Footer --> */}
      {/* <footer className="footer">
        <div className="wrapper-menu--footer">
          <div className="footer-contain">
            <div className="footer-contain--left">
              <div className="brand-logo-footer w-embed" style={{cursor: 'pointer'}}>
                <h2>DevCoders</h2>
              </div>
            </div>
          </div>
          <div className="subfooter-contain">
            <div className="copyright">
              <p className="paragraph-2">Copyright © 2024 by DevCoders. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer> */}

      <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=62443d15248af30a21e60133"
        type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossOrigin="anonymous"></script>
      <script src="https://assets-global.website-files.com/62443d15248af30a21e60133/js/webflow.02891b92f.js"
        type="text/javascript"></script>
    </>

  )
}

export default App
