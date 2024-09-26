const Footer = () => {
    return <footer className=" ml-[6%] p-4 ">
        <div className="flex items-center justify-between p-4">
            <div>
                <h1 className="text-white  font-bold">Company</h1>
                <ul className="text-text-theme cursor-pointer ">
                    <li>About Us</li>
                    <li>Careers</li>
                </ul>

            </div>
            <div>
                <h1 className="text-white font-bold">View Website in</h1>
                <ul className="text-text-theme cursor-pointer ">
                    <li>English</li>
                </ul>

            </div>
            <div>
                <h1 className="text-white font-bold">Need Help ?</h1>
                <ul className="text-text-theme cursor-pointer">
                    <li>Visit Help Center</li>
                    <li>Share Feedback</li>
                </ul>

            </div>
            <div>
                <h1 className="text-white font-bold">Connect with us</h1>
                <ul className="text-text-theme cursor-pointer">
                    <li>About Us</li>
                    <li>Careers</li>
                </ul>

            </div>
        </div>
        <div className="p-4">
            <div className="text-text-theme cursor-pointer">
                <div>
                    <div>@STAR all copyrights are reserved </div>
                    <div> <span>Terms of use</span> <span>Privacy Policy</span> <span>FAQ</span> </div>
                </div>

            </div>

        </div>
    </footer>
}


export default Footer;
