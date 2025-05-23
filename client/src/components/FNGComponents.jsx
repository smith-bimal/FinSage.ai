import { useEffect, useState } from "react";

export const FNGSvg = ({ savingsPercentage = 0, savingsAmount = 0, formatter }) => {
    // Ensure savingsPercentage is within 0-100
    const clampedPercentage = Math.min(100, Math.max(0, savingsPercentage));
    
    // Set up the angle mapping:
    // 0% -> 245 degrees (left)
    // 50% -> 0 degrees (or 360 degrees) (top/middle)
    // 100% -> 120 degrees (right)
    
    let finalAngle;
    
    // For percentages from 0 to 50, go from 245 to 360 (or 0)
    if (clampedPercentage <= 50) {
        // Linear interpolation: 0% -> 245deg, 50% -> 360deg
        finalAngle = 245 - ((clampedPercentage / 50) * (245 - 360));
        
        // Normalize angle to stay within 0-360 range
        if (finalAngle >= 360) finalAngle -= 360;
    } 
    // For percentages from 50 to 100, go from 0 to 120
    else {
        // Linear interpolation: 50% -> 0deg, 100% -> 120deg
        finalAngle = ((clampedPercentage - 50) / 50) * 120;
    }
    
    // Position the indicator based on percentage
    const [borderColor, setBorderColor] = useState("border-[#F3D42F]");
    const [fngStatus, setFngStatus] = useState("Neutral");
    useEffect(() => {
        if (savingsPercentage < 20) {
            setBorderColor("border-[#DF1C41]");
            setFngStatus("Needs Attention");
        }
        else if (savingsPercentage >= 20 && savingsPercentage < 40) {
            setBorderColor("border-[#E59100]");
            setFngStatus("Low");
        }
        else if (savingsPercentage >= 40 && savingsPercentage < 60) {
            setBorderColor("border-[#F3D42F]");
            setFngStatus("Neutral");
        }
        else if (savingsPercentage >= 60 && savingsPercentage < 80) {
            setBorderColor("border-[#93D900]");
            setFngStatus("Good");
        }
        else if (savingsPercentage >= 80) {
            setBorderColor("border-[#16C784]");
            setFngStatus("Excellent");
        }
    }, [savingsPercentage]);

    return (
        <div className="w-fit mx-auto max-h-72 relative">
            <div
                style={{
                    transform: `rotate(${finalAngle}deg)`,
                    transformOrigin: '14px 131px',
                }}
                className={`h-6 w-6 bg-white rounded-full border-[5px] ${borderColor} absolute left-[140px] top-[5px]`}
            ></div>
            <svg className="w-full h-full max-h-68 min-w-[19rem]" viewBox="0 0 720 731" fill="none">
                <path d="M650.266 502.855C650.727 501.851 650.288 500.663 649.284 500.202C648.28 499.741 647.093 500.181 646.632 501.184C639.065 517.647 630.136 533.427 619.941 548.356C619.318 549.268 619.552 550.512 620.464 551.135C621.376 551.758 622.621 551.524 623.244 550.612C633.567 535.497 642.606 519.521 650.266 502.855ZM94.4845 547.241C95.096 548.16 96.3374 548.41 97.2572 547.799C98.1771 547.187 98.4271 545.946 97.8155 545.026C87.8055 529.969 79.0724 514.075 71.7108 497.518C71.262 496.508 70.08 496.054 69.0707 496.503C68.0614 496.951 67.607 498.133 68.0557 499.143C75.5084 515.905 84.3498 531.996 94.4845 547.241ZM101.069 237.003C100.591 237.999 101.012 239.194 102.008 239.671C103.004 240.149 104.198 239.728 104.676 238.732C109.113 229.477 114.033 220.47 119.415 211.75C119.995 210.81 119.703 209.578 118.763 208.998C117.823 208.417 116.591 208.709 116.011 209.649C110.555 218.49 105.567 227.621 101.069 237.003ZM606.937 516.469C607.499 515.518 607.183 514.291 606.232 513.73C605.281 513.168 604.055 513.484 603.493 514.435C598.28 523.26 592.608 531.796 586.5 540.006C585.841 540.892 586.025 542.145 586.911 542.804C587.797 543.463 589.05 543.28 589.709 542.393C595.901 534.07 601.652 525.416 606.937 516.469ZM73.0038 391.048C73.0984 392.148 74.0673 392.964 75.1678 392.869C76.2683 392.774 77.0837 391.806 76.9891 390.705C76.1067 380.445 75.7637 370.145 75.9616 359.847C75.9828 358.743 75.1048 357.83 74.0004 357.809C72.896 357.788 71.9836 358.666 71.9623 359.77C71.7617 370.208 72.1094 380.648 73.0038 391.048ZM126.936 537.791C127.578 538.69 128.827 538.898 129.726 538.256C130.625 537.615 130.833 536.365 130.191 535.467C124.242 527.137 118.735 518.49 113.692 509.562C113.149 508.6 111.929 508.261 110.967 508.804C110.005 509.347 109.666 510.567 110.209 511.529C115.321 520.58 120.905 529.347 126.936 537.791ZM648.049 370.616C648.068 369.511 647.188 368.601 646.083 368.582C644.979 368.563 644.068 369.443 644.049 370.547C643.873 380.845 643.155 391.125 641.901 401.345C641.766 402.441 642.546 403.439 643.642 403.574C644.738 403.709 645.736 402.929 645.871 401.833C647.143 391.474 647.87 381.053 648.049 370.616ZM609.489 218.939C608.944 217.978 607.724 217.641 606.763 218.187C605.802 218.732 605.465 219.953 606.011 220.913C611.072 229.83 615.661 239.017 619.759 248.433C620.199 249.446 621.378 249.909 622.391 249.469C623.403 249.028 623.867 247.85 623.426 246.837C619.272 237.291 614.62 227.979 609.489 218.939ZM499.659 109.142C498.697 108.6 497.477 108.94 496.935 109.902C496.392 110.864 496.732 112.084 497.695 112.626C506.543 117.616 515.123 123.083 523.398 129.004C524.297 129.646 525.546 129.439 526.189 128.541C526.831 127.643 526.624 126.393 525.726 125.751C517.334 119.746 508.633 114.202 499.659 109.142ZM203.105 119.678C202.183 120.287 201.929 121.527 202.538 122.449C203.147 123.37 204.388 123.624 205.309 123.015C213.794 117.41 222.567 112.27 231.59 107.617C232.572 107.111 232.957 105.904 232.451 104.923C231.945 103.941 230.739 103.555 229.757 104.062C220.606 108.78 211.709 113.993 203.105 119.678ZM354.973 72.4437C353.868 72.4633 352.989 73.3745 353.008 74.4789C353.028 75.5833 353.939 76.4626 355.044 76.443C365.156 76.2635 375.271 76.6336 385.344 77.5518C386.444 77.652 387.417 76.8416 387.518 75.7416C387.618 74.6416 386.807 73.6686 385.707 73.5683C375.489 72.6369 365.23 72.2615 354.973 72.4437ZM718 365.5C718 566.284 557.689 729 360 729C162.311 729 2 566.284 2 365.5C2 164.716 162.311 2 360 2C557.689 2 718 164.716 718 365.5Z" stroke="white" strokeOpacity="0.15" strokeWidth="4" strokeLinecap="round" />
                <path d="M83.2402 525.229C75.21 529.96 64.8253 527.303 60.5023 519.046C41.771 483.27 29.5907 444.38 24.588 404.215C19.5853 364.051 21.8534 323.361 31.2362 284.083C33.4017 275.019 42.8173 269.895 51.7625 272.511C60.7077 275.127 65.7901 284.491 63.6751 293.568C55.5564 328.409 53.6465 364.456 58.0792 400.044C62.5119 435.632 73.206 470.109 89.6235 501.894C93.9004 510.175 91.2704 520.499 83.2402 525.229Z" fill="#DF1C41" />
                <path d="M54.5675 263.421C45.7039 260.541 40.8128 251.003 44.1321 242.295C58.5151 204.56 79.5712 169.668 106.337 139.308C133.103 108.947 165.081 83.684 200.716 64.685C208.94 60.3003 219.016 63.9573 222.984 72.3901C226.952 80.8229 223.307 90.8342 215.107 95.2646C183.633 112.271 155.37 134.726 131.654 161.627C107.937 188.528 89.2015 219.382 76.2744 252.74C72.9067 261.43 63.4312 266.301 54.5675 263.421Z" fill="#E59100" />
                <path d="M231.651 68.4676C227.935 59.9208 231.838 49.9373 240.56 46.6529C278.352 32.4211 318.437 25.0712 358.911 25.0005C399.385 24.9299 439.496 32.1399 477.337 46.2396C486.071 49.4936 490.008 59.4634 486.322 68.0232C482.635 76.5829 472.722 80.4863 463.971 77.2808C430.378 64.9766 394.833 58.6879 358.97 58.7505C323.107 58.8131 287.584 65.2258 254.035 77.6472C245.295 80.8832 235.367 77.0144 231.651 68.4676Z" fill="#F3D42F" />
                <path d="M495.002 71.9151C498.941 63.4685 509.004 59.7763 517.243 64.1322C552.944 83.0068 585.01 108.158 611.882 138.425C638.754 168.692 659.932 203.51 674.446 241.194C677.796 249.891 672.938 259.447 664.085 262.358C655.231 265.268 645.739 260.43 642.341 251.752C629.297 218.44 610.454 187.651 586.644 160.832C562.833 134.014 534.492 111.658 502.959 94.7619C494.744 90.3603 491.063 80.3617 495.002 71.9151Z" fill="#93D900" />
                <path d="M666.922 271.438C675.858 268.791 685.291 273.881 687.488 282.938C697.008 322.183 699.418 362.865 694.556 403.046C689.693 443.228 677.649 482.16 659.042 518.001C654.748 526.273 644.373 528.966 636.326 524.264C628.279 519.562 625.613 509.247 629.861 500.951C646.168 469.109 656.742 434.595 661.05 398.992C665.359 363.388 663.323 327.348 655.083 292.536C652.936 283.466 657.986 274.085 666.922 271.438Z" fill="#16C784" />
            </svg>

            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500">Savings Rate</p>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className={clampedPercentage > 0 ? "text-[#68dd96] font-medium" : "text-[#f74545] font-medium"}>
                    {clampedPercentage > 0 ? <i className="ri-arrow-right-up-line"></i> : <i className="ri-arrow-right-down-line"></i>}
                    <span>{clampedPercentage.toFixed(2)}%</span>
                </p>
                <h1 className="text-2xl font-bold my-2">
                    {formatter ? formatter.format(savingsAmount) : savingsAmount}
                </h1>
                <p>{fngStatus}</p>
            </div>
        </div>
    );
};

export const FNGLabels = () => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 font-light mt-4 text-xs">
            <div className="flex items-center gap-2">
                <div className="w-1 h-3 rounded-sm bg-[#DF1C41]"></div>
                <span className="font-semibold whitespace-nowrap">Worst</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-1 h-3 rounded-sm bg-[#E59100]"></div>
                <span className="font-semibold whitespace-nowrap">Low</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-1 h-3 rounded-sm bg-[#F3D42F]"></div>
                <span className="font-semibold whitespace-nowrap">Neutral</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-1 h-3 rounded-sm bg-[#93D900]"></div>
                <span className="font-semibold whitespace-nowrap">Good</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-1 h-3 rounded-sm bg-[#16C784]"></div>
                <span className="font-semibold whitespace-nowrap">Excellent</span>
            </div>
        </div>
    );
};
