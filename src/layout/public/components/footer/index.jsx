import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full p-4 footer bg-slate-700 ">
        <div className="container flex items-center justify-center">
          <div>
            <p className="text-white text-sm">
              <span className="text-white">
              کلیه حقوق این وبسایت متعلق به <Link><span className="text-sky-500">Tseshow</span></Link> است
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
