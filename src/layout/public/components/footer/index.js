const Footer = () => {
  return (
    <>
      <footer className="w-full p-4 footer bg-slate-700 ">
        <div className="container flex items-center justify-between">
          <div>
            <p className="text-white text-sm">
              <span className="text-white">
              کلیه حقوق این وبسایت متعلق به شرکت ایده نگار ماهان است
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <i className="fa-brands fa-instagram text-slate-300 text-lg"></i>
            <i className="fa-brands fa-telegram text-slate-300 text-lg mr-10"></i>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
