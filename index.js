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
          partialResult.position[1] += commandsMap[partialResult.direction][command]
          break
        case 'E':
        case 'W':
          partialResult.position[0] += commandsMap[partialResult.direction][command]
          break
      }
    }
  })
}

const moveRover = instructions => {
  const result = {}
  instructions.forEach((instruction, index) => {
    if (index === 0) {
      result.position = instruction.startingPosition
    }
    followInstruction(instruction, result)
  })
  return result
}

module.exports = {
  moveRover,
}
