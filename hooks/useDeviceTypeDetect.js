import { useState, useEffect } from "react";
const useDeviceTypeDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmallTablet, setIsSmallTablet] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
      setIsTablet(window.innerWidth >= 661 && window.innerWidth <= 1280);
      setIsSmallTablet(window.innerWidth <= 741 && window.innerWidth >= 661);
      setIsMobile(window.innerWidth <= 661);
      };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return { isMobile, isSmallTablet, isTablet, isDesktop };
};

export default useDeviceTypeDetect;
