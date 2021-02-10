import '@babel/polyfill';
import { heapify, heappop, heappush } from '@aureooms/js-heapq';

export const algorithm = (lstOfLsts, track) => {

  const closest = function(list, x, cant) {
    let final_list = [];
    let final_cant = list.length > cant ? cant : list.length;
  
    const search_closest = function(x) {
      return list.sort((prev, next) => Math.abs(x - prev.popularity) - Math.abs(x - next.popularity)).splice(0, 1)[0];
    };
  
    const get = function() {
      if (final_list.length !== final_cant) {
        final_list.push(search_closest(x));
        return get();
      } else {
        return final_list;
      }
    };
    return get();
  };

  // Used by sortByPopularity to sort the tracks by popularity
  const sortCompare = (a, b) => {
    return a.popularity - b.popularity; 
  };
    
  // Sorts tracks by popularity (from least popular to most popular)
  const sortByPopularity = (lst) => {
    return lst.sort(sortCompare)
  };

  // Removes duplicate tracks (tracks with the same id)
  const removeDuplicates = (lst) => {
    return lst.reduce((accum, track) => {
      if (!(track.id in accum)) {
        accum[track.id] = 1;
        accum.list.push(track);
      }
      return accum;
    }, { list: [] }).list
  };

  // Concatenates a list of lists
  const combineLists = (lstOfLsts) => {
    return lstOfLsts.reduce((accum, list) => accum.concat(list), []);
  };

  // Create dictionary with keys as artist id's and values as # of occurrences
  const counter = (lst) => {
    let artist_id;
    return lst.reduce((accum, track) => {
       artist_id = track.artists[0].id;
      if (!(artist_id in accum)) {
        accum[artist_id] = { 'occurrences': 1, 'tracks': [track] };
      } else {
        accum[artist_id]['occurrences']++;
        accum[artist_id]['tracks'].push(track);
        //accum[artist_id]['tracks'] = [...accum[artist_id]['tracks'], track];
      }
      return accum;
    }, {});
  };

  // Restructure dictionary into list with index 0 as # of occurrences and index 1 as key
  const flip = (counts) => {
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
  const alternate = (lst) => {
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

  // Creates the final playlist
  const createPlaylist = () => {
    // Run list through a series of functions
    const newPlaylist = alternate(sortByPopularity(closest(alternate(sortByPopularity(removeDuplicates(combineLists(lstOfLsts)))), track.popularity, 30)));

    // Insert main track into the beginning of the playlist
    newPlaylist.unshift(track);

    // Remove duplicates and return
    return removeDuplicates(newPlaylist);
  };

  return createPlaylist(); // Return playlist
};