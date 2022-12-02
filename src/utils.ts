export const calculateRemainder = (cnb: number, move: number, predicate: number): number => {
    let totalRemainder = 0;

    for (let i = 1; i <= predicate; i++) {
        isPositive(move)
            ? totalRemainder += (((cnb + totalRemainder) / 100) * move)
            : totalRemainder -= (((cnb - totalRemainder) / 100) * move);
    }

    return totalRemainder;
}

export const calculatePrediction = (cnb: number, move: number, totalRemainder: number) => isPositive(move) ? cnb + totalRemainder : cnb - totalRemainder;

export const isPositive = (n: number) => n > 0;