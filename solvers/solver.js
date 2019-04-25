const BanditProblem = require('../bandit-problem')

/**
 * 
 * @param {BanditProblem} problem 
 */
function Solver(problem) {
    this.problem = problem
    this.counts = new Array(problem.n).fill(0)
    this.actions = [] // A list of machine ids, 0 to problem[n - 1]
    this.regret = 0 // Cumulative regret
    this.regrets = [0]

    this.updateRegret = i => {
        // i is index of the selected machine
        this.regret += this.problem.bestProbability - this.problem.probabilities[i]
        this.regrets.push(this.regret)
    }

    this.run = numSteps => {
        for(let i = 0; i < numSteps; i++) {
            const value = this.step()
            this.counts[value] += 1
            this.actions.push(value)
            this.updateRegret(value)
        }
    }
}

module.exports = Solver
module.exports.Solver = Solver