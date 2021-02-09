import '@babel/polyfill';
import { heapify, heappop, heappush } from '@aureooms/js-heapq';

// Used by sortByPopularity to sort the tracks by popularity
const sortCompare = (a, b) => {
  return a.popularity - b.popularity; 
};
  
// Sorts tracks by popularity (from least popular to most popular)
export const sortByPopularity = (listOfTracks) => {
  return listOfTracks.sort(sortCompare)
};

// Removes duplicate tracks (tracks with the same id)
export const removeDuplicates = (listOfTracks) => {
  return listOfTracks.reduce((accum, track) => {

    if (!(track.id in accum)) {
      accum[track.id] = 1;
      accum.list.push(track);
    }

    return accum;
  }, { list: [] }).list
};

// Concatenates a list of lists
export const combineLists = (listOfLists) => {
  return listOfLists.reduce((accum, list) => accum.concat(list), []);
};

// Creates a dictionary with keys as artist id's and values as an array of # of occurrences and an array of tracks
export const counter = (lst) => {
  let artist_id;
  return lst.reduce((accum, track) => {
      artist_id = track.artists[0].id;
    if (!(artist_id in accum)) {
      accum[artist_id] = { 'occurrences': 1, 'tracks': [track] };
    } else {
      accum[artist_id]['occurrences']++;
      accum[artist_id]['tracks'].push(track);
    }
    return accum;
  }, {});
};

// Restructures dictionary into a list with index 0 as # of occurrences, index 1 as artist_id and index 2 as an array of tracks
export const flip = (counts) => {
  const heap_list = [];
  for (const count in counts) {
    heap_list.push([-counts[count]['occurrences'], count, counts[count]['tracks']])
  }
  return heap_list;
};

// Used by heapify to figure out the ordering when building the heap
const heapCompare = (a, b) => {
  return a[0] - b[0];
};

// Shuffle tracks so that no two tracks with the same artist are adjacent to one another
export const alternate = (lst) => {
  const counts = counter(lst);
  const heap_list = flip(counts);
  const heap = heapify(heapCompare, heap_list);
  const output = [];
  let last = null;
  let track = null;
  let minuscount1, key1, tracks1, minuscount2, key2, tracks2;
  while (heap.data.length > 0) {
    [minuscount1, key1, tracks1] = heappop(heap);
    if ((key1 !== last) || !(heap.data.length > 0)) {
      last = key1;
      track = tracks1.pop();
      minuscount1 += 1;
    } else {
      [minuscount2, key2, tracks2] = heappop(heap);
      last = key2;
      track = tracks2.pop();
      minuscount2 += 1;
      if (minuscount2 !== 0) {
        heappush(heap, [minuscount2, key2, tracks2]);
      }
    }
    output.push(track);
    if (minuscount1 !== 0) {
      heappush(heap, [minuscount1, key1, tracks1]);
    }
  }
  return output;
};