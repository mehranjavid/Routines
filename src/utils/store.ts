import {create} from 'zustand';
import {RoutineDataType} from '../shared/Types';

interface DataState {
  data: RoutineDataType[];
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
  setData: (docs: RoutineDataType[]) => unknown;
  setPages: (
    totalPages: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: number,
    nextPage: number,
  ) => unknown;
}

export const useData = create<DataState>(set => ({
  data: [],
  totalPages: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: 0,
  nextPage: 0,
  setData: (newData: RoutineDataType[]) => set(() => ({data: newData})),
  setPages: (
    totalPages: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: number,
    nextPage: number,
  ) =>
    set(() => ({
      totalPages: totalPages,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
      prevPage: prevPage,
      nextPage: nextPage,
    })),
}));
