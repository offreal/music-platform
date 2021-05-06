import React from 'react';
import { Card, Grid, IconButton } from '@material-ui/core';
import { Delete, Pause, PlayArrow } from '@material-ui/icons';

import { useRouter } from 'next/router';
import { useActions } from '../hooks/useAction';
import axios from 'axios';

import styles from '../styles/TrackItem.module.scss';
import { ITrack } from '../types/tracks';
import { PlayerState } from '../types/player';

interface TrackItemProps {
  track: ITrack;
  playerInfo?: PlayerState;
}

function TrackItem({ track, playerInfo = null }: TrackItemProps) {
  const { playTrack, setActive } = useActions();
  const router = useRouter();

  const play = (e) => {
    e.stopPropagation();
    setActive(track);
    playTrack();
  };

  const removeTrack = (e) => {
    e.stopPropagation();

    axios.delete('http://localhost:5000/tracks/' + track._id).then(() => {
      router.push('/tracks');
    });
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push('/tracks/' + track._id)}
    >
      <IconButton onClick={play}>
        {playerInfo ? <Pause /> : <PlayArrow />}
      </IconButton>

      <img
        className={styles.trackImage}
        src={'http://localhost:5000/' + track.picture}
      />

      <Grid container direction="column" className={styles.trackDescription}>
        <div>{track.name}</div>
        <div className={styles.nameArtist}>{track.artist}</div>
      </Grid>

      {playerInfo && (
        <div style={{ width: 80 }}>
          {playerInfo.currentTime} / {playerInfo.duration}
        </div>
      )}

      <IconButton className={styles.deleteButton} onClick={removeTrack}>
        <Delete />
      </IconButton>
    </Card>
  );
}

export default TrackItem;
