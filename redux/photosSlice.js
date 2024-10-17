import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch photos (if not already created)
export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
    const response = await fetch('/api/get-photos', {
        method: 'GET',
        cache: 'no-store',  // Prevents caching of the request
        revalidate: 5, // 1 hour
    });
    const data = await response.json();
    return data;
});

// Thunk to update photo comment
export const updatePhotoComment = createAsyncThunk(
    'photos/updateComment',
    async ({ photoId, comment }) => {
        const response = await fetch('/api/comment-photo', {
            revalidate: 5,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ photoId, comment }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update comment');
        }
        return { photoId, comment }; // Return the updated photo data
    }
);

const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(updatePhotoComment.fulfilled, (state, action) => {
                const { photoId, comment } = action.payload;
                // Find the photo by ID and update the comment
                const existingPhoto = state.items.find(photo => photo.id === photoId);
                if (existingPhoto) {
                    existingPhoto.comment = comment;
                }
            })
            .addCase(updatePhotoComment.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export default photosSlice.reducer;
