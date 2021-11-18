import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';const ScrollToTop = () => {
    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisiblity] = useState(false);

    useEffect(() => {
        if (pageYOffset < 200) {
            setVisiblity(true);
        } else {
            setVisiblity(false);
        }
    }, [pageYOffset]);

    const scrollToTop = () => window.scrollTo({ bottom: 0, behavior: "smooth" });

    if (!visible) {
        return false;
    }

    return (
        <div
            className="scroll-to-top cursor-pointer text-center"
           
        >
            <div className="icon"><p style={{color:'white'}}>scroll down</p><ArrowDownwardOutlinedIcon style={{ fontSize: 20 }} /></div>
           
        </div>
    );
};

export default ScrollToTop;