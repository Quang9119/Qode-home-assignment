'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPhotos } from "@/redux/photosSlice";
import Photo from './Photo';

export default function PhotoGrid({ favorites = false }) {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photos.items);
    const photoStatus = useSelector((state) => state.photos.status);
    const error = useSelector((state) => state.photos.error);

    useEffect(() => {
        if (photoStatus === 'idle') {
            dispatch(fetchPhotos());
        }
    }, [photoStatus, dispatch]);

    const displayedPhotos = favorites
        ? photos.filter(photo => photo.isFavorited)
        : photos;
    console.log("asdasasdasdasdas", displayedPhotos);
    if (photoStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (photoStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {displayedPhotos.map((photo) => (
                <div key={photo.id} className="flex flex-col items-center">
                    <Photo
                        id={photo.id}
                        src={photo.url}
                        alt={`Photo ${photo.comment || 'Untitled'}`}
                        width={200}
                        height={200}
                        photoName={photo.comment}
                        isFavorited={photo.isFavorited}
                    />
                    <div className="mt-2">
                        {photo.comment?.length > 0 ? (
                            <ul className="space-y-1">
                                {photo.comment}
                            </ul>
                        ) : (
                            <p className="text-gray-400">No comments yet.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}