export const RANDOM_JIGGLE_TIMES = [];
for (let i = 0; i < 50; i++)
    RANDOM_JIGGLE_TIMES.push(Math.random() * 2 + 1.5)


export const RANDOM_SCREEN_POSITIONS: {x: number, y: number}[] = [];
for (let i = 0; i < 50; i++) {
    const upperLower = [0.25, 0.75][Math.floor(Math.random() * 2)]
    RANDOM_SCREEN_POSITIONS.push({x: Math.random() * 0.8 + 0.1, y: upperLower + Math.random() * 0.3 - 0.15})
}

export const RANDOM_ROTATIONS: string[] = []
for (let i = 0; i < 50; i++)
    RANDOM_ROTATIONS.push(`${Math.floor(Math.random() * 80 - 40)}deg`)


export function getRandomScreenPos(idx: number): {x: number, y: number} {
    return RANDOM_SCREEN_POSITIONS[idx % RANDOM_SCREEN_POSITIONS.length];
}

export function getRandomRotation(idx: number): string {
    return RANDOM_ROTATIONS[idx % RANDOM_ROTATIONS.length];
}