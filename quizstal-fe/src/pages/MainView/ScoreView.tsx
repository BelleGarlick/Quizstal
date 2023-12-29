import {State, getRoot} from "../../api";
import {RANDOM_JIGGLE_TIMES} from "../../utils/random-jiggle-times.ts";


export function ScoreView({state}: {state: State}) {
    return <div className='player-scores'>
        {state.users.sort((a, b) => b.points - a.points).map((user, idx) => (
            <div
                key={user.id}
                style={{
                    backgroundImage: `url(${getRoot()}/${user.image})`,
                    animation: `jiggle ${RANDOM_JIGGLE_TIMES[idx]}s ease-in-out infinite`
                }}>
                <span>
                    <span>{user.name}</span>
                </span>
                <span>
                    <span>{user.points}</span>
                </span>
            </div>
        ))}
    </div>
}

