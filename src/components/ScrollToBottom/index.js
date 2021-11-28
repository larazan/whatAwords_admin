import React, { useEffect, useState } from "react";

const ScrollToBottom = () => {
  const [isViable, setIsViable] = useState(true);
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleViability = () => {
      if (window.pageYOffset > 500) {
        setIsViable(false);
      } else {
        setIsViable(true);
      }
    };

    window.addEventListener("scroll", toggleViability);

    return () => window.removeEventListener("scroll", toggleViability);
  }, []);

  return (
    <>
      <div className="fixed bg-pink bottom-3 right-3  cursor-pointer">
        {isViable && (
          <div
            onClick={scrollToBottom}
            className="fixed p-2 opacity-50 rounded-lg bg-blue-200 bottom-3 right-3 hover:bg-blue-300 lg:bottom-5 lg:right-5 cursor-pointer"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
};

export default ScrollToBottom;
