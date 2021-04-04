function solvePuzzle(pieces) {




  return [pieces[0].id];
}

function comparePieces(leftPiece, rightPiece) {
  for (i = 0; i < 4; i++) {
    if(rightPiece.edges.left)
      if ( leftPiece.edges.right.edgeTypeId === rightPiece.edges.left.edgeTypeId
        && leftPiece.edges.right.type != leftPiece.edges.left.type)
        return true;
    rightPiece = rotatePiece(rightPiece);
  }
  return false;
}

function rotatePiece(piece) {
  let newPiece = {
    id: piece.id,
    edges: {
      top: piece.edges.left,
      right: piece.edges.top,
      bottom: piece.edges.right,
      left: piece.edges.bottom,
    },
  };
  return newPiece;
}

function tryPiece(piece,restOfPieces) {
  restOfPieces.forEach((element) => {
    if (comparePieces(piece, element))
      let next = tryPieces(element, pieces.filter(item => item.id === element.id));
  });
  return next.unshift(element);
}

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;

