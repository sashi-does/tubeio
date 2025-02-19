import React, { useContext } from 'react';
import Context from '../context/Context';
import SavedVideoItem from './SavedVideoItem';
import Heading from './Heading';

const SavedVideos = () => {
  const { savedVideos } = useContext(Context);

  return (
    <div className="p-4">
      <Heading name="saved" />
      <ul className="flex flex-col space-y-4">
        {savedVideos.map((item) => (
          <SavedVideoItem key={item.id} details={item} params="saved-videos" />
        ))}
      </ul>
    </div>
  );
};

export default SavedVideos;