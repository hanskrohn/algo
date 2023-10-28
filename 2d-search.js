function checkIsThisSectionValid(workingLocationsStack, currPos, currLength, widgetWidth){
    if(workingLocationsStack.length === 0) {
        return true;
    }

    for(let i = workingLocationsStack.length - 1; i >= 0; i--){
        if(workingLocationsStack[i][0] + workingLocationsStack[i][1] - currPos < widgetWidth || currPos + currLength - workingLocationsStack[i][0] < widgetWidth){
            return false
        }
    }
    return true;
}

function dfsSearchThisArea(validLocations,row, col, widgetWidth, workingLocationsStack, depth){
    if(depth === 0 ){
        // Found Valid Path
        return true
    }
    if(col >= validLocations[row].length) {
        return false
    }

    const isSectionValid = checkIsThisSectionValid(workingLocationsStack, validLocations[row][col][0], validLocations[row][col][1], widgetWidth)

    let areaIsValid = false
    if(!isSectionValid){
        areaIsValid = dfsSearchThisArea(validLocations,row, col + 1, widgetWidth, workingLocationsStack, depth)
    }else {
        workingLocationsStack.push(validLocations[row][col])
        areaIsValid = dfsSearchThisArea(validLocations, row + 1, 0,widgetWidth, workingLocationsStack, depth - 1)
    }


    return areaIsValid
}

function findRow (validLocations, widgetWidth, widgetHeight) {

    for(let row = 0; row < Object.keys(validLocations).length; row ++){
        for(let col = 0; col < validLocations[row].length; col++){
            const workingLocationsStack = []
            const foundValidPath = dfsSearchThisArea(validLocations,row, col, widgetWidth, workingLocationsStack, widgetHeight);
            if(foundValidPath){
                return {
                    row,
                    workingLocationsStack
                }
            }
        }
    }
    return -1
}

const leftSideWorks = {
    0: [[0,6], [7,14]],
    1: [[0,3]],
    2: [[0,20]],
    3: [[0,20]],
    4: [],
    5: [],
    6: [],
    7: [],
}


const rightSide = {
    0: [[0,6], [7,14]],
    1: [[0,6], [7,14]],
    2: [[0,6], [7,14]],
    3: [[3,17]],
    4: [[7,14]],
    5: [],
    6: [],
    7: [],
}

console.log(findRow(rightSide, 4, 6))

const empty = {
    0: [[0,20]],
    1: [[0,20]],
    2: [[0,20]],
    3: [[0,20]],
    4: [[0,20]],
    5: [[0,20]],
    6: [[0,20]],
    7: [[0,20]],
}

console.log(findRow(empty, 4, 5))

const rowsTaken = {
    0: [],
    1: [],
    2: [],
    3: [[0,20]],
    4: [[0,20]],
    5: [[0,20]],
    6: [[0,20]],
    7: [[0,20]],
}

console.log(findRow(rowsTaken, 4, 5))