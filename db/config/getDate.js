

export const handlerGetFirstMonth = () => {
    const d = new Date();
    const m = d.getMonth() + 1;
    const y = d.getFullYear();
    if (m < 10) {
        return `0${m}/${y}`;
    } else {
        return `${m}/${y}`;
    }
}

export const handlerGetSecondMonth = () => {
    const d = new Date();
    d.setMonth(-1);
    const m = d.getMonth() + 1;
    const y = d.getFullYear();
    if (m < 10) {
        return `0${m}/${y}`;
    } else {
        return `${m}/${y}`;
    }
}

export const handlerGetThirdMonth = () => {
    const d = new Date();
    d.setMonth(-2);
    const m = d.getMonth() + 1;
    const y = d.getFullYear();
    if (m < 10) {
        return `0${m}/${y}`;
    } else {
        return `${m}/${y}`;
    }
}