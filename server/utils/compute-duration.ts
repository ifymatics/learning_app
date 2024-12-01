export const computeDuration = (): number => {
    const timeInMonth = Math.ceil(Date.now() / 1000);
    return timeInMonth
}