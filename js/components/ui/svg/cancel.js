export const CancelSVG = (size = 25) => {
    return `
        <svg width=${size + "px"} height=${size + "px"} viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M397 715C293.333 715 138.564 716.14 111.243 688.818C80.0001 657.573 80 607.285 80 506.709L80 293.354C80 192.779 80 142.491 111.243 111.246C142.485 80.0001 192.768 80 293.333 80L506.667 80C607.233 80 657.516 80.0001 688.758 111.246C720 142.491 720 192.779 720 293.354L720 506.709C720 607.285 720 657.573 688.758 688.817C661.438 716.14 506.667 715 397 715Z" stroke="#1C274C" stroke-width="50"/>
            <path d="M500 300L300.001 500M300 300L500 500" stroke="#1C274C" stroke-width="50" stroke-linecap="round"/>
        </svg>
    `;
};
