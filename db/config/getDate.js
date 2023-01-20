export const handlerGetFirstMonth = () => {
    const d = new Date();
    d.setMonth(d.getMonth() - 3);
    const lastMonth = d.getMonth() + 1;
    if (lastMonth < 10) {
        return `0${lastMonth}/${d.getFullYear()}`
    } else {
        return `${lastMonth}/${d.getFullYear()}`
    }
}

export const handlerGetSecondMonth = () => {
    const d = new Date();
    d.setMonth(d.getMonth() - 2);
    const lastMonth = d.getMonth() + 1;
    if (lastMonth < 10) {
        return `0${lastMonth}/${d.getFullYear()}`
    } else {
        return `${lastMonth}/${d.getFullYear()}`
    }
}

export const handlerGetThirdMonth = () => {
    const d = new Date();
    d.setMonth(d.getMonth() - 2);
    const lastMonth = d.getMonth() + 1;
    if (lastMonth < 10) {
        return `0${lastMonth}/${d.getFullYear()}`
    } else {
        return `${lastMonth}/${d.getFullYear()}`
    }
}