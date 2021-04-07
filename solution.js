function solvePuzzle(pieces) {
  let firstPiece = pieces[0];
  let newPieces = [];
  
  while (firstPiece.edges.left || firstPiece.edges.top)
    firstPiece = rotatePiece(firstPiece);
  
  newPieces.push(firstPiece);
  pieces = pieces.filter(item => item.id != firstPiece.id);

  while(newPieces.length < 10) {
    console.log(`Processing element ${newPieces.length}`);
    let result = pieces.find(element => {
      let currentPiece = comparePieces(newPieces[newPieces.length - 1], element);
      if (currentPiece)
        newPieces.push(currentPiece);
      return currentPiece;
    });
    if (result) {
        pieces = pieces.filter(item => item.id != newPieces[newPieces.length - 1].id);
        console.log(`success on ${newPieces[newPieces.length - 1].id},`);
      }
  }
  
  return [pieces[0].id];
}

function findFirstinRow(topPiece, bottomPiece) {
  for (i = 0; i < 4; i++) {
    if (topPiece.edges.bottom && bottomPiece.edges.top) {
      if (topPiece.edges.bottom.edgeTypeId == bottomPiece.edges.top.edgeTypeId &&
        topPiece.edges.bottom.type != bottomPiece.edges.top.type
      ) {
        console.log(`Success!`);
        return bottomPiece;
      }
    }
    bottomPiece = rotatePiece(bottomPiece);
  }
  return false;
}

function comparePieces(leftPiece, rightPiece) {
  for (i = 0; i < 4; i++) {
    // console.log(
    //   `..compare piece ${leftPiece.id} and ${rightPiece.id}, rotated ${
    //     90 * i
    //   } degrees`
    // );
    if (leftPiece.edges.right && rightPiece.edges.left) {
      // console.log(
      //   `left typeId ${leftPiece.edges.right.edgeTypeId} and right typeID ${rightPiece.edges.left.edgeTypeId}`
      // );
      // console.log(
      //   `left type ${leftPiece.edges.right.type} and right type ${rightPiece.edges.left.type}`
      // );
      if (
        leftPiece.edges.right.edgeTypeId === rightPiece.edges.left.edgeTypeId &&
        leftPiece.edges.right.type != rightPiece.edges.left.type
      ) {
        console.log(`Success!`);
        return rightPiece;
      }
    }
    rightPiece = rotatePiece(rightPiece);
  }
  return false;
}

function rotatePiece(piece) {
  // console.log(`rotating piece ${piece.id} 90 degrees clockwise`);
  let newPiece = {
    id: piece.id,
    edges: {
      top: piece.edges.left
        ? {
            edgeTypeId: piece.edges.left.edgeTypeId,
            type: piece.edges.left.type,
          }
        : null,
      right: piece.edges.top
        ? {
            edgeTypeId: piece.edges.top.edgeTypeId,
            type: piece.edges.top.type,
          }
        : null,
      bottom: piece.edges.right
        ? {
            edgeTypeId: piece.edges.right.edgeTypeId,
            type: piece.edges.right.type,
          }
        : null,
      left: piece.edges.bottom
        ? {
            edgeTypeId: piece.edges.bottom.edgeTypeId,
            type: piece.edges.bottom.type,
          }
        : null,
    },
  };
  return newPiece;
}

// function tryPiece(piece, restOfPieces) {
//   console.log(
//     `...trying piece ${piece.id} and array of ${restOfPieces.length} elements`
//   );
//   let successFlag = false;
//   restOfPieces.forEach((element, idx) => {
//     let currentPiece = comparePieces(piece, element);

//     if (currentPiece) {
//       successFlag = true;
//       console.log(
//         `compare piece ${piece.id} and ${element.id} sucessful on ${idx} step, go deeper`
//       );
//       return tryPiece(
//         currentPiece,
//         restOfPieces.filter((item) => item.id != element.id)
//       );
//     }
//   });
//   if (successFlag) {
//     return true;
//   } else {
//     console.log(`End of array reached and unsuccesfull`);
//     return false;
//   }
// }

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;
