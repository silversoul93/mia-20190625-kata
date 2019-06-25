'use strict'

const tap = require('tap')

const { moveRover } = require('../index')

const useCasesOne = []
const useCasesTwo = []

for(let i = 1; i < 9; i++) {
  useCasesOne.push(require(`../usecase1/${i}.json`))
  useCasesTwo.push(require(`../usecase2/${i}.json`))
}

const transformResult = result => {
  return [
    result.position,
    result.direction
  ]
}


tap.test('Use case 1 test', assert => {
  useCasesOne.forEach(useCase => {
    const instructions = {...useCase[0]}
    delete instructions.solution
    const result = moveRover([instructions])
    assert.strictSame(transformResult(result), useCase[0].solution)
  })
  assert.end()
})

tap.test('Use case 2 test', assert => {
  useCasesTwo.forEach(useCase => {
    const instructions = {...useCase[0]}
    delete instructions.solution
    const result = moveRover([instructions])
    assert.strictSame(transformResult(result), useCase[0].solution)
  })
  assert.end()
})