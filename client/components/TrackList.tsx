import React from 'react';
import { Box, Grid } from '@material-ui/core';

import TrackItem from './TrackItem';
import { ITrack } from '../types/tracks';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface TrackListProps {
  tracks: ITrack[];
}

function TrackList({ tracks }: TrackListProps) {
  const player = useTypedSelector((state) => state.player);

  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.length <= 0 && <p>Каталог треков отсутствует</p>}

        {tracks.map((track) => (
          <TrackItem
            key={track._id}
            track={track}
            playerInfo={player.active?._id === track._id && player}
          />
        ))}
      </Box>
    </Grid>
  );
}

export default TrackList;
