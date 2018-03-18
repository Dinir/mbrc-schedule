/* eslint-disable no-undef */
var b = new Bracket(
  [ ['A', 'B', 'C', 'D'], [] ],
  [ ['UB-A', 'UB-B'], ['LB A/B', 'LB C/D'] ],
  [ [], ['LB-A', 'LB-B'] ],
  [ ['UBF'], ['LBF'] ],
  [ [], ['LBGF'] ],
  [ ['GF'], [] ],
);

b.m(1,1,1).setDate('2018-03-18 12:15');
b.m(1,1,2).setDate('2018-03-18 13:00');
b.m(1,1,3).setDate('2018-03-18 17:00');
b.m(1,1,4).setDate('2018-03-18 17:45');
b.m(2,1,1).setDate('2018-03-18 14:45');
b.m(2,1,2).setDate('2018-03-18 19:30');
b.m(2,0,1).setDate('2018-03-18 14:00');
b.m(2,0,2).setDate('2018-03-18 18:45');
b.m(3,0,1).setDate('2018-03-19 13:45');
b.m(3,0,2).setDate('2018-03-19 14:30');
b.m(4,1,1).setDate('2018-03-19 16:15');
b.m(4,0,1).setDate('2018-03-19 15:30');
b.m(5,0,1).setDate('2018-03-19 17:15');
b.m(6,1,1).setDate('2018-03-19 18:15');

b.m(1,1,1).updatePlayers(participants.A);
b.m(1,1,2).updatePlayers(participants.B);
b.m(1,1,3).updatePlayers(participants.C);
b.m(1,1,4).updatePlayers(participants.D);

//// Round 1
// A
b.updateResult({
  match: [1,1,1],
  result: matchResults['A'],
  next: [ [2,1,1], [2,0,1] ]
});
// B
b.updateResult({
  match: [1,1,2],
  result: matchResults['B'],
  next: [ [2,1,1], [2,0,1] ]
});

//// Round 2
// LB A/B
b.updateResult({
  match: [2,0,1],
  result: matchResults['LB A/B'],
  next: [ [3,0,1], null ]
});
// UB-A
b.updateResult({
  match: [2,1,1],
  result: matchResults['UB-A'],
  next: [ [4,1,1], [3,0,2] ]
});

//// Round 1
// C
b.updateResult({
  match: [1,1,3],
  result: matchResults['C'],
  next: [ [2,1,2], [2,0,2] ]
});
// D
b.updateResult({
  match: [1,1,4],
  result: matchResults['D'],
  next: [ [2,1,2], [2,0,2] ]
});

//// Round 2
// LB C/D
b.updateResult({
  match: [2,0,2],
  result: matchResults['LB C/D'],
  next: [ [3,0,2], null ]
});
// UB-B
b.updateResult({
  match: [2,1,2],
  result: matchResults['UB-B'],
  next: [ [4,1,1], [3,0,1] ]
});

//// Round 3
// LB-A
b.updateResult({
  match: [3,0,1],
  result: matchResults['LB-A'],
  next: [ [4,0,1], null ]
});
// LB-B
b.updateResult({
  match: [3,0,2],
  result: matchResults['LB-B'],
  next: [ [4,0,1], null ]
});

//// Round 4
// LBSF
b.updateResult({
  match: [4,0,1],
  result: matchResults['LBSF'],
  next: [ [5,0,1], null ]
});
// UBSF
b.updateResult({
  match: [4,1,1],
  result: matchResults['UBSF'],
  next: [ [6,1,1], [5,0,1] ]
});

//// Round 5
b.updateResult({
  match: [5,0,1],
  result: matchResults['LBGF'],
  next: [ [6,1,1], null ]
});

//// Round 6
b.updateResult({
  match: [6,1,1],
  result: matchResults['GF'],
  next: [ 'WON', null ]
});
