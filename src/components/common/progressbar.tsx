import React, { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
};

function ProgressBar({ progress, setProgress }: Props) {
  // Simulating a data fetch request
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const simulateProgress = () => {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(timer);
            return 90; // Ensure it stops at 100%
          }
          return prevProgress + 8; // Increment by 10%
        });
      }, 2000); // Every 100ms, increase by 10%
    };

    simulateProgress();

    // Cleanup timer
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 ">Progress title</h3>
        <span className="text-sm text-gray-800 ">{progress}%</span>
      </div>
      <div
        className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden "
        role="progressbar"
      >
        <div
          className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 "
          style={{
            width: `${progress}%`,
            transition: "width 1s ease-in-out",
          }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
