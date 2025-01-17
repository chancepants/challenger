import { bNode, genBracket } from '../lib/bracket';

export default function Bracket() {
  let users: string[] = [];
  for (let i = 0; i <= 31; i++) {
    users.push(i.toString());
  }

  const root = genBracket(users);
  return (
    <div className="relative w-screen h-screen">
      <Tree root={root} l={0} r={2560} y={0} />
    </div>
  );
}

type TreeProps = {
  root: bNode;
  l: number;
  r: number;
  y: number;
};

type NodeProps = {
  root: bNode;
};

function Tree({ root, l, r, y }: TreeProps) {
  console.log(root.userA, root.userB, l, r, y);
  let cssClass = `w-screen h-screen`;
  return (
    <div>
      <TreeNode root={root} />
      {root.leftChild && (
        <div className="float-left w-1/2 h-screen my-24">
          <Tree root={root.leftChild} l={l} r={(l + r) / 2} y={y - 200} />
        </div>
      )}
      {root.rightChild && (
        <div className="float-right w-1/2 h-screen my-24">
          <Tree root={root.rightChild} l={(l + r) / 2} r={r} y={y - 200} />
        </div>
      )}
    </div>
  );
}

function TreeNode({ root }: NodeProps) {
  return (
    <div className="flex-col items-center justify-center border border-gray-300 bg-backgroung bg-slate-400 text-slate-900 mx-auto w-32 h-16">
      <div className="mb-2">{root.userA || '-'} </div>
      <div className="mt-2">{root.userB || '-'} </div>
    </div>
  );
}
