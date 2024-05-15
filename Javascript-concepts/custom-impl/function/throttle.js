const throttle = (fn, delay) => {
    let isTimerActive = false;
    return (...args) => {
        if (!isTimerActive) {
            isTimerActive = true;
            fn.apply(this, args);

            setTimeout(() => {
                isTimerActive = false;
            }, delay);
        }
    }
}