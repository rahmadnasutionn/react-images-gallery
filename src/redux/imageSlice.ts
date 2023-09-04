import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PexelResponse, PexelsImage } from "../interfaces";

interface InitialState {
  per_page: number;
  photos: PexelsImage[];
  next_page: string | null;
  query: string;
  isLoading: boolean;
}

const initialState: InitialState = {
  per_page: 8,
  photos: [],
  next_page: null,
  query: 'bali',
  isLoading: false,
};

const image = createSlice({
  name: 'image',
  initialState,
  reducers: {
    getInitialImage(state, { payload }: PayloadAction<PexelResponse>) {
      state.photos = payload.photos;
      state.next_page = payload.next_page;
      state.isLoading = false;
    },

    loadMoreImage(state, { payload }: PayloadAction<PexelResponse>) {
      state.photos = [...state.photos, ...payload.photos]
      state.next_page = payload.next_page;
      state.isLoading = false;
    },
    setLoading(state) {
      state.isLoading = true;
    },
    updateQuery(state, { payload }: PayloadAction<string>) {
      state.query = payload;
      state.photos = [];
      state.isLoading = false;
      state.next_page = null;
    },
  }
});

export const {
  getInitialImage,
  setLoading,
  updateQuery,
  loadMoreImage,
} = image.actions;

export default image.reducer;