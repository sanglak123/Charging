export const formatDateTime = (time) => {
    const date = new Date(time);
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    if (d < 10) {
        if (m < 10) {
            return `0${d}/0${m + 1}/${y}`
        } else {
            return `0${d}/${m + 1}/${y}`
        }

    } else {
        if (m < 10) {
            return `${d}/0${m + 1}/${y}`
        } else {
            return `${d}/${m + 1}/${y}`
        }

    }

}