import {BreadthFirstSearch} from './BreadthFirstSearch.js'
import {FiniteStateMachine} from './FiniteStateMachince.js'

export class Unit {
    constructor(icon, health, moves, range, damage, owner) {
        this.icon = icon;
        this.health = health;
        this.moves = moves;
        this.range = range;
        this.damage = damage;
        this.owner = owner;
        this.fsm = new FiniteStateMachine('unmoved', {
            'unmoved': {
                move: {
                    newState: 'moved',
                    validationFunction: this.isMoveValid,
                    transitionFunction: this.move,
                    transitionContext: this   
                },
                skip: {
                    newState: 'moved'
                },
                die: {
                    newState: 'dead'
                }
            },
            'moved': {
                takeAction: {
                    newState: 'tookAction',
                    validationFunction: this.isActionValid,
                    transitionFunction: this.takeAction,
                    transitionContext: this
                },
                skip: {
                    newState: 'tookAction'
                },
                die: {
                    newState: 'dead'
                }
            },
            'tookAction': {
                reset: {
                    newState: 'unmoved'
                },
                die: {
                    newState: 'dead'
                }
            },
            'dead': {
                revive: {
                    newState: 'unmoved'
                }
            }
        });
    }

    isInputValid(input, origin, target, map) {
        return this.fsm.isInputValid(input, origin, target, map);
    }

    handleInput(input, origin, target, map) {
        this.fsm.handleInput(input, origin, target, map);
    }

    isMoveValid(origin, target, map) {
        let bfs = new BreadthFirstSearch(map);
        return !map[target.y][target.x] && bfs.isTileReachable(target, origin, this.moves);
    }

    move(origin, target, map) {
        map[target.y][target.x] = map[origin.y][origin.x];
        map[origin.y][origin.x] = null;
    }

    isActionValid(origin, target, map) {
        let bfs = new BreadthFirstSearch(map);
        return map[target.y][target.x] && bfs.isTileReachable(target, origin, this.range)
    }

    takeAction(origin, target, map) {
        // target area for cast point
        
        // shape of action
        map[target.y][target.x].takeDamage(this.damage);
    }

    resetState() {
        this.state = {
            moved: false,
            tookAction: false
        }
    }

    takeDamage(damageAmount) {
        this.health -= damageAmount;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.icon = '\u2620';
        this.fsm.handleInput('die');
    }
}

