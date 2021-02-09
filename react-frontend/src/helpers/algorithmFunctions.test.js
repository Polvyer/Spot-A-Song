import { sortByPopularity, combineLists, removeDuplicates, counter, flip, alternate } from './algorithmFunctions';

describe('Sort by popularity', () => {
  test('returns empty list if list empty', () => {
    expect(sortByPopularity([])).toHaveLength(0);
  });
  
  test('sorts list by popularity in ascending order', () => {
    const list = [{ popularity: 98 }, { popularity: 75 }, { popularity: 36 }];
    const list2 = [{ popularity: 33 }, { popularity: 74 }, { popularity: 35 }];
    expect(sortByPopularity(list)).toHaveLength(3);
    expect(sortByPopularity(list2)).toHaveLength(3);
    expect(sortByPopularity(list)).toEqual([{ popularity: 36 }, { popularity: 75 }, { popularity: 98 }]);
    expect(sortByPopularity(list2)).toEqual([{ popularity: 33 }, { popularity: 35 }, { popularity: 74 }]);
  });

  test('sorts uniform list', () => {
    const list = [{ popularity: 1 }, { popularity: 1 }, { popularity: 1 }];
    expect(sortByPopularity(list)).toHaveLength(3);
    expect(sortByPopularity(list)).toEqual([{ popularity: 1 }, { popularity: 1 }, { popularity: 1 }]);
  });

  test('sorts list with one element', () => {
    const list = [{ popularity: 1 }];
    expect(sortByPopularity(list)).toHaveLength(1);
    expect(sortByPopularity(list)).toEqual([{ popularity: 1 }]);
  });
});

describe('Combines list', () => {
  test('combines multiple lists', () => {
    const list = [ [1], [2, 3], [4, 5, 6]];
    expect(combineLists(list)).toHaveLength(6);
  });

  test('empty list returns empty list', () => {
    expect(combineLists([])).toHaveLength(0);
  });

  test('single list returns just those items in the list', () => {
    expect(combineLists([1])).toHaveLength(1);
    expect(combineLists([1])).toEqual([1]);
    expect(combineLists([1])).toContain(1);
  });
});

describe('remove duplicates', () => {
  test('empty list returns empty list', () => {
    expect(removeDuplicates([])).toHaveLength(0);
  });

  test('list with multiple duplicates', () => {
    const list = [{ id: '1' }, { id: '1' }, { id: '1' }, { id: '2' }, { id: '2' }, { id: '3' }];
    const list2 = [{ id: '1' }, { id: '1' }, { id: '1' }];
    const list3 = [{ id: '1' }, { id: '3' }, { id: '1' }, { id: '3' }, { id: '2' }, { id: '3' }];
    expect(removeDuplicates(list)).toHaveLength(3);
    expect(removeDuplicates(list2)).toHaveLength(1);
    expect(removeDuplicates(list3)).toHaveLength(3);
  });

  test('list with single item', () => {
    const list = [{ id: '1' }];
    expect(removeDuplicates(list)).toHaveLength(1);
    expect(removeDuplicates(list)).toEqual([{ id: '1' }]);
  });
});

describe('creates dictionary using counter', () => {
  test('empty list returns empty dictionary', () => {
    expect(counter([])).toEqual({});
  });

  test('one item list to return just the item', () => {
    const track = { artists: [{ id: '1' }] };
    const tracks = [track];
    const output = counter(tracks);
    expect(output).toHaveProperty("1");
    expect(output['1']).toHaveProperty('occurrences');
    expect(output['1']).toHaveProperty('tracks');
    expect(output['1']['occurrences']).toBe(1);
    expect(output['1']['tracks']).toMatchObject([track]);
  }); 

  test('list with multiple items returns appropriate dictionary', () => {
    const track1 = { artists: [{ id: '1' }] };
    const track2 = { artists: [{ id: '2' }] };
    const track3 = { artists: [{ id: '2' }] };
    const track4 = { artists: [{ id: '3' }] };
    const track5 = { artists: [{ id: '3' }] };
    const track6 = { artists: [{ id: '3' }] };
    const track7 = { artists: [{ id: '4' }] };
    const tracks = [track1, track2, track3, track4, track5, track6, track7];
    const output = counter(tracks);
    expect(Object.keys(output).length).toBe(4)
    expect(output).toHaveProperty("3");
    expect(output['1']['occurrences']).toBe(1);
    expect(output['2']['occurrences']).toBe(2);
    expect(output['3']['occurrences']).toBe(3);
    expect(output['4']['occurrences']).toBe(1);
    expect(output['2']['tracks']).toMatchObject([track2, track3]);
    expect(output['4']['tracks']).toMatchObject([track7]);
  });
});

describe('restructures dictionary using flip', () => {
  test('empty dictionary returns empty dictionary', () => {
    expect(flip({})).toEqual([]);
    expect(flip({})).toHaveLength(0);
  });
});

describe('shuffles list', () => {
  test('list with multiple items', () => {
    const track1 = { artists: [{ id: '1' }] };
    const track2 = { artists: [{ id: '2' }] };
    const track3 = { artists: [{ id: '2' }] };
    const track4 = { artists: [{ id: '3' }] };
    const track5 = { artists: [{ id: '3' }] };
    const track6 = { artists: [{ id: '3' }] };
    const track7 = { artists: [{ id: '4' }] };
    const tracks = [track1, track2, track3, track4, track5, track6, track7];
    const output = alternate(tracks);
    expect(output).toHaveLength(7);
    expect(output).toContain(track1);
    expect(output[0].artists[0].id).not.toBe(output[1].artists[0].id);
    expect(output[1].artists[0].id).not.toBe(output[2].artists[0].id);
    expect(output[2].artists[0].id).not.toBe(output[3].artists[0].id);
    expect(output[3].artists[0].id).not.toBe(output[4].artists[0].id);
    expect(output[4].artists[0].id).not.toBe(output[5].artists[0].id);
    expect(output[5].artists[0].id).not.toBe(output[6].artists[0].id);
  });

  test('list with multiple items with similar artist ids', () => {
    const track1 = { artists: [{ id: '1' }] };
    const track2 = { artists: [{ id: '1' }] };
    const track3 = { artists: [{ id: '1' }] };
    const track4 = { artists: [{ id: '1' }] };
    const track5 = { artists: [{ id: '3' }] };
    const track6 = { artists: [{ id: '3' }] };
    const track7 = { artists: [{ id: '3' }] };
    const tracks = [track1, track2, track3, track4, track5, track6, track7];
    const output = alternate(tracks);
    expect(output).toHaveLength(7);
    expect(output).toContain(track1);
    expect(output[0].artists[0].id).not.toBe(output[1].artists[0].id);
    expect(output[1].artists[0].id).not.toBe(output[2].artists[0].id);
    expect(output[2].artists[0].id).not.toBe(output[3].artists[0].id);
    expect(output[3].artists[0].id).not.toBe(output[4].artists[0].id);
    expect(output[4].artists[0].id).not.toBe(output[5].artists[0].id);
    expect(output[5].artists[0].id).not.toBe(output[6].artists[0].id);
  });
});