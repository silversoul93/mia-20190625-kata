const commandsMap = {
  N: {
    f: 1,
    b: -1
  },
  S: {
    f: -1,
    b: 1
  },
  E: {
    f: 1,
    b: -1
  },
  W: {
    f: -1,
    b: 1
  }
}

const directionsChangesMap = {
  N: {
    l: 'W',
    r: 'E',
  },
  S: {
    l: 'E',
    r: 'W',
  },
  W: {
    l: 'S',
    r: 'N'
  },
  E: {
    l: 'N',
    r: 'S'
  }
}

const followInstruction = (instruction, partialResult) => {
  partialResult.direction = instruction.startingDirection
  instruction.commands.forEach(command => {
    if (command === 'l' || command === 'r') {
      partialResult.direction = directionsChangesMap[partialResult.direction][command]
    } else {
      switch (partialResult.direction) {
        case 'N':
        case 'S':
          if (instruction.grid) {
            const coordinate = partialResult.position[1] + commandsMap[partialResult.direction][command]
            partialResult.position[1] = Math.abs(coordinate) > instruction.grid[1]
              ? partialResult.position[1] *= -1
              : partialResult.position[1] = coordinate
          } else {
            partialResult.position[1] += commandsMap[partialResult.direction][command]
          }
          break
        case 'E':
        case 'W':
          if (instruction.grid) {
            const coordinate = partialResult.position[0] + commandsMap[partialResult.direction][command]
            partialResult.position[0] = Math.abs(coordinate) > instruction.grid[0]
              ? partialResult.position[0] *= -1
              : partialResult.position[0] = coordinate
          } else {
            partialResult.position[0] += commandsMap[partialResult.direction][command]
          }
          break
      }
    }
  })
}

const moveRover = instructions => {
  const result = {}
  instructions.forEach((instruction, index) => {
    result.position = instruction.startingPosition
    followInstruction(instruction, result)
  })
  return result
}

const instructions = require('./usecase3/1.json')
moveRover(instructions)

module.exports = {
  moveRover,
}
