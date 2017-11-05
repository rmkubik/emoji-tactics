export class FiniteStateMachine {
    constructor(defaultState, states) {
        this.currentState = defaultState;
        this.states = states;
    }

    handleInput(input, origin, target, map) {
        if (this.isInputValidTransition(input)) {
            // execute leaving state function  
            
            let transitionSucceeded = true;
            if (this.states[this.currentState][input].validationFunction !== undefined) {
                transitionSucceeded = this.states[this.currentState][input].validationFunction
                    .call(this.states[this.currentState][input].transitionContext, origin, target, map);
            }
            if (transitionSucceeded) {
                if (this.states[this.currentState][input].transitionFunction !== undefined) {
                    this.states[this.currentState][input].transitionFunction
                        .call(this.states[this.currentState][input].transitionContext, origin, target, map);
                }
                this.currentState = this.getNewState(input);
            }

            // execute entering state function
            // this.states[this.currentState].onEnter.call(this.states[this.currentState].onEnterContext, origin, target, map);
        }
    }

    isInputValidTransition(input) {
        const state = this.currentState;
        return this.states[state][input] !== undefined;
    }

    getNewState(input) {
        return this.states[this.currentState][input].newState;
    }
}