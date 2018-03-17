var b = new Bracket(
  [ ['A','B','C','D'], []                   ],
  [ ['UB-A', 'UB-B'],  ['LB A/B', 'LB C/D'] ],
  [ [],                ['LB-A', 'LB-C']     ],
  [ ['UBF'],           ['LBF']              ],
  [ [],                ['LBGF']             ],
  [ ['GF'],            []                   ]
);

b.m(1, 1, 1).setDate('Sunday 21:15').updatePlayers({
  1: {i: 'DinirNertan'},
  2: {i: 'Macaw45'},
  3: {i: 'Morricane'},
  4: {i: 'Ingvarz'},
});
b.m(1, 1, 2).setDate('Sunday 22:00').updatePlayers({
  1: {i: 'Goati'},
  2: {i: 'Kale'},
  3: {i: 'bk202'},
  4: {i: 'Icarus'},
});
b.m(1, 1, 3).setDate('Monday 02:00').updatePlayers({
  1: {i: 'SoltyD'},
  2: {i: 'Hanasu'},
  3: {i: 'Dan'},
  4: {i: 'Olemars'},
});
b.m(1, 1, 4).setDate('Monday 02:45').updatePlayers({
  1: {i: '@@@@@@@@'},
  2: {i: 'Megagoat'},
  3: {i: 'Neo_Antwon'},
  4: {i: 'Nasty_Wolverine'},
});

b.m(1, 1, 1).updateResult(
  [1, 0, 0, 1], ['UB-A', 'LB A/B']
);
b.m(2, 1, 1).updatePlayers({
  1: {f: 'A', i: 'DinirNertan'},
  2: {f: 'A', i: 'Ingvarz'},
});
b.m(2, 0, 1).updatePlayers({
  1: {f: 'A', i: 'Macaw45'},
  2: {f: 'A', i: 'Morricane'},
});

b.m(1, 1, 2).updateResult(
  [0, 1, 1, 0], ['UB-A', 'LB A/B']
);
b.m(2, 1, 1).updatePlayers({
  3: {f: 'B', i: 'Kale'},
  4: {f: 'B', i: 'bk202'}
});
b.m(2, 0, 1).updatePlayers({
  3: {f: 'B', i: 'Goati'},
  4: {f: 'B', i: 'Icarus'}
});

b.m(1, 1, 3).updateResult(
  [1, 0, 1, 0], ['UB-B', 'LB C/D']
);
b.m(2, 1, 2).updatePlayers({
  1: {f: 'C', i: 'SoltyD'},
  2: {f: 'C', i: 'Dan'}
});
b.m(2, 0, 2).updatePlayers({
  1: {f: 'C', i: 'Hanasu'},
  2: {f: 'C', i: 'Olemars'}
});

b.m(1, 1, 4).updateResult(
  [0, 0, 1, 1], ['UB-B', 'LB C/D']
);
b.m(2, 1, 2).updatePlayers({
  3: {f: 'D', i: 'Neo_Antwon'},
  4: {f: 'D', i: 'Nasty_Wolverine'}
});
b.m(2, 0, 2).updatePlayers({
  3: {f: 'D', i: '@@@@@@@@'},
  4: {f: 'D', i: 'Megagoat'}
});