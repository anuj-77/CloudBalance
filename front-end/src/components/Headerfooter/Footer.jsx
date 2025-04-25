import React from 'react'
import '../styles/Footer.css';

function Footer() {


  return (
    <div>
      <footer className="footer-container">
        <div className="footer-text">
          Have Questions?{' '}
          <a href="mailto:admin@cloudbalance.com" className="footer-link">
            Talk to our team
          </a>
        </div>

        <div className="footer-right">
          CloudBalance 2025 | All Rights Reserved
        </div>
      </footer>
    </div>
  )
}

export default Footer
