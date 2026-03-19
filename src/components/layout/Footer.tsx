
'use client'
import logo from "@/assets/LogoISSS.png"
import footer from "@/assets/footer.webp"
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-overlay" />

      <div className="footer-container">

        {/* Column 1 — Company */}
        <div className="footer-col">
          {/* <h3 className="footer-logo">IRONSHIELD</h3> */}
          <img src={logo.src} alt=""  style={{width:"150px", borderRadius:"100px"}}/>
          <p>
            Professional private security and close protection services
            operating globally with elite operators and strategic planning.
          </p>

          <div className="footer-social">
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>

        {/* Column 2 — Services */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Close Protection</a></li>
            <li><a href="#">VIP Security</a></li>
            <li><a href="#">Event Security</a></li>
            <li><a href="#">Residential Security</a></li>
            <li><a href="#">Secure Chauffeur</a></li>
          </ul>
        </div>

        {/* Column 3 — Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/About">About</a></li>
            <li><a href="#">Operations</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div className="footer-col">
          <h4>Contact</h4>

          <p>24/7 Operations Center</p>

          <p>
            📞 +1 (631) 336-7291
          </p>

          <p>
            ✉ info@statementsecurity.com
          </p>

          <p>
            New York · London · Dubai · Abu Dhabi · Italy · Traina 
          </p>

        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} International Statement Secuity Services. All rights reserved.
      </div>

      <style jsx>{`

        .site-footer{
          position: relative;
          background: #000;
          color: #cce8f4;
          padding: 80px 30px 90px;
          background-image: url(${footer.src}); /* CHANGE IMAGE HERE */
          background-size: 100% 100%;
          background-position: cover;
          background-repeat: no-repeat;
        }

        .footer-overlay{
          position:absolute;
          inset:0;
          background:rgba(16, 5, 5, 0.47);
        }

        .footer-container{
          position:relative;
          max-width:1200px;
          margin:auto;
          display:grid;
          grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
          gap:40px;
          z-index:2;
        }

        .footer-col h4{
          margin-bottom:18px;
          font-size:16px;
          letter-spacing:1px;
          color: #ff0d00;
        }

        .footer-logo{
          font-size:22px;
          margin-bottom:14px;
          letter-spacing:2px;
        }

        .footer-col p{
          font-size:14px;
          line-height:1.6;
          color:#b9d4df;
        }

        .footer-col ul{
          list-style:none;
          padding:0;
          margin:0;
          color:"#ff0d00";
        }

        .footer-col li{
          margin-bottom:10px;
        }

        .footer-col a{
          text-decoration:none;
          color:#b9d4df;
          font-size:14px;
          transition:color .2s;
        }

        .footer-col a:hover{
          color:#00d4ff;
        }

        .footer-social{
          margin-top:18px;
          display:flex;
          gap:16px;
        }

        .footer-newsletter{
          margin-top:16px;
          display:flex;
          gap:8px;
        }

        .footer-newsletter input{
          flex:1;
          padding:10px;
          background:#000;
          border:1px solid #ff0d00;
          color: #ffffff;
        }

        .footer-newsletter button{
          padding:10px 14px;
          border:1px solid #ff0d00;
          background:transparent;
          color: #ffffff;
          cursor:pointer;
        }

        .footer-bottom{
          position:relative;
          margin-top:60px;
          text-align:center;
          font-size:13px;
          color:#8fa9b4;
          z-index:2;
        }

      `}</style>
    </footer>
  )
}