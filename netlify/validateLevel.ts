export const validateLevel = (
    unvalidatedLevel: string | undefined
): Level | undefined => {
    const validLevels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    const level = validLevels.find((item) => item === unvalidatedLevel)
    return level
}
