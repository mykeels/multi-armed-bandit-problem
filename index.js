/**
 * Run a small experiment on solving a Bernoulli bandit with K slot machines,
    each with a randomly initialized reward probability.

    Args:
        K (int): number of slot machiens.
        N (int): number of time steps to try.
 */

const plotGraph = require('./plot-graph')
const BanditProblem = require('./bandit-problem')
const EGreedy = require('./solvers/e-greedy')
const UCB1 = require('./solvers/ucb1')
const ThompsonSampling = require('./solvers/thompson-sampling')

const problem = new BanditProblem(10)

console.log('Randomly generated Bernoulli bandit has reward probabilities:\n', problem.probabilities)
console.log(`The best machine has index: ${problem.probabilities.indexOf(Math.max(...problem.probabilities))} and probability: ${Math.max(...problem.probabilities)}`)

const eGreedy = new EGreedy(problem, 0.01)
const ucb1 = new UCB1(problem)
const thompson = new ThompsonSampling(problem, 1, 1)

// eGreedy.run(5000)
// console.log(eGreedy.counts)
// plotGraph(eGreedy, 'eGreedy')

// ucb1.run(5000)
// console.log(ucb1.counts)
// plotGraph(ucb1, 'ucb1')

thompson.run(5000)
console.log(thompson.counts)
plotGraph(thompson, 'thompon sampling')
