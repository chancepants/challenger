export type bNode = {
  id: string;
  userA?: string;
  userB?: string;
  //elapsedTime: number
  score?: number;
  parent?: bNode;
  leftChild?: bNode;
  rightChild?: bNode;
};

export function genBracket(users: Array<string>): bNode {
  const targetDepth = Math.ceil(Math.log2(Math.ceil(users.length / 2)));
  const root: bNode = {
    id: crypto.randomUUID(),
  };
  bracketLevelGen(root, 1, targetDepth);
  placeUsers(users, root);
  return root;
}

function bracketLevelGen(
  parent: bNode,
  depth: number,
  targetDepth: number
): void {
  if (depth > targetDepth) {
    return;
  }
  parent.leftChild = { id: crypto.randomUUID() };
  parent.rightChild = { id: crypto.randomUUID() };
  bracketLevelGen(parent.leftChild, depth + 1, targetDepth);
  bracketLevelGen(parent.rightChild, depth + 1, targetDepth);
}

function placeUsers(users: Array<string>, root?: bNode): void {
  console.log(users);
  if (root == undefined) {
    return;
  } else if (root.leftChild == undefined && root.rightChild == undefined) {
    if (users.length < 1 || users.length > 2) {
      throw Error(
        `Invalid state: expected users.length to be 1 or 2 at leaf but received ${users.length}`
      );
    }
    root.userA = users[0];
    root.userB = users.length > 1 ? users[1] : undefined;
    return;
  } else {
    placeUsers(users.slice(0, Math.ceil(users.length / 2)), root.leftChild);
    placeUsers(
      users.slice(Math.ceil(users.length / 2), users.length),
      root.rightChild
    );
  }
}

//function splitIntoGroups(arr: any[], groupSize: number = 2): any[][] {
//  return arr.reduce((result, _, index) => {
//    if (index % groupSize === 0) {
//      result.push(arr.slice(index, index + groupSize));
//    }
//    return result;
//  }, [] as any[][]);
//}
//
//// users should be a complex object with attributes to determine seeding
//function generateBracket(users: Array<string>): Bracket {
//  // deal with odd
//  const leaves = users.reduce((result, _, i) => {
//    if (i % 2 == 0) {
//      result.push({
//        id: i,
//        userA: users[i],
//        userB: users[i+1],
//        elapsedTime: 10
//      });
//    }
//    return result;
//  }, [] as bNode[]);
//
//  // take nodes (leaves) in groups of 2 and create nextNode and ref it and do this recursively
//  getNextNodes(leaves);
//}
//
//
//function getNextNodes(nodes: Array<bNode>): void {
//  if (nodes.length == 1) {
//    return;
//  }
//  const nxtNodes = nodes.reduce((res, _, i) => {
//    if (i % 2 == 0) {
//      const nxtNode: bNode = {
//        id: i,
//        elapsedTime: 10
//      }
//      nodes[i].parent = nxtNode;
//      nodes[i+1].parent = nxtNode;
//      nxtNode.children = [nodes[i], nodes[i+1]];
//      res.push(nxtNode);
//    }
//    return res;
//
//  }, [] as bNode[]);
//  getNextNodes(nxtNodes);
//}
