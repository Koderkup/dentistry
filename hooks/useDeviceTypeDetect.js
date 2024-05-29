import { useState, useEffect } from "react";
const useDeviceTypeDetect = () => {
  const [deviceType, setDeviceType] = useState(()=>{
    return {
      isMobile: false,
      isSmallTablet: false,
      isTablet: false,
      isDesktop: false,
    };
  })
  useEffect(() => {
    const handleResize = () => {
      setDeviceType({
        isMobile: window.innerWidth <= 661,
        isSmallTablet: window.innerWidth <= 741 && window.innerWidth >= 661,
        isTablet: window.innerWidth >= 741 && window.innerWidth <= 1280,
        isDesktop: window.innerWidth >= 1280,
      });
      };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return deviceType;
};

export default useDeviceTypeDetect;
