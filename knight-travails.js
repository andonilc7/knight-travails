class Node {
  constructor(x, y) {
    this.xPosition = x;
    this.yPosition = y;
    this.distance = null;
    this.parent = null;
  }
}

class Graph {
  constructor(x) {
    this.width = x;
    this.board = Array(this.width).fill().map(()=>Array(this.width).fill());

  }

  buildGraph() {
    for (let i = 0; i<this.width; i++) {
      for (let j=0; j<this.width; j++) {
        this.board[i][j] = new Node(i,j)
      }
    }
  }

  findPossibleMoves(x, y) {
    const unfilteredPossibleMoves = [
      [x + 1, y + 2], 
      [x + 2, y + 1], 
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 1, y - 2],
      [x - 2, y - 1],
      [x - 2, y + 1],
      [x - 1, y + 2]
    ]

    const possibleMoves = 
      unfilteredPossibleMoves.filter((move) => {
        return (move[0] >= 0 && move[0]<=7 && move[1] >= 0 && move[1]<=7)
      });

    return possibleMoves;
    
  }

  knightMoves(startingNode = [null, null], endingNode = [null, null]) {
    //start with empty graph first so it clears everytime you run this with new values
    this.buildGraph();
    const startingX = startingNode[0];
    const startingY = startingNode[1];
    const endingX = endingNode[0];
    const endingY = endingNode[1];
    const queue = [];
    const visitedNodes = [];
    this.board[startingX][startingY].distance = 0;
    queue.push(this.board[startingX][startingY])
    let currNode = null;

      while (queue.length > 0 && !(visitedNodes.includes(this.board[endingX][endingY]))) {
        for (let i=0; i<queue.length; i++) {
           currNode = queue.shift();
          visitedNodes.push(currNode);
          if (currNode.parent != null) {
            currNode.distance = currNode.parent.distance + 1;
          }
          if (currNode.xPosition == endingX && currNode.yPosition == endingY) {
            break;
          }

          //have to filter possible moves to take out visited nodes, so only incldue if distance is null
          const possibleMoves = this.findPossibleMoves(currNode.xPosition, currNode.yPosition).filter((move) => {
            if (this.board[move[0]][move[1]].distance == null) {
              return move
            }
          })
          possibleMoves.forEach((move) => {
            this.board[move[0]][move[1]].parent = currNode;
            queue.push(this.board[move[0]][move[1]]);
          });
        }
      }

      const nodePathArray = [];
      nodePathArray.push(currNode);
      while(currNode.distance != null) {
        currNode = currNode.parent
        nodePathArray.unshift(currNode);

        if (currNode.distance == 0) {
          break;
        }
      }

      const pathArray = [];
      nodePathArray.forEach(node => {
        pathArray.push([node.xPosition, node.yPosition])
      })



      let message = `=> You made it in ${pathArray.length} moves! Here's your path:`
      console.log(message)
      pathArray.forEach(spot => {
        console.log(spot)
      })
      
      
      
    
    return pathArray;
  }

 
}

let graph = new Graph(8);
graph.knightMoves([0,0], [3,3])

graph.knightMoves([3,3],[0,0])
graph.knightMoves([0,0],[7,7])
