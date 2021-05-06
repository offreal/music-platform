import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Button, Grid, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';

import { ITrack } from '../../types/tracks';
import MainLayout from '../../layouts/MainLayout';
import { useInput } from '../../hooks/useInput';

function TrackPage({ serverTrack }) {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/tracks/comment',
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        }
      );

      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MainLayout
      title={`Музыкальная площадка - ${track.name} - ${track.artist}`}
    >
      <Button
        variant="outlined"
        style={{ fontSize: 15 }}
        onClick={() => router.push('/tracks')}
      >
        К списку
      </Button>

      <Grid container style={{ margin: '20px 0' }}>
        <img
          src={'http://localhost:5000/' + track.picture}
          width={200}
          height={200}
        />
        <div style={{ margin: '30px' }}>
          <h1>Название трека - {track.name}</h1>
          <h1> Исполнитель - {track.artist}</h1>
          <h1>Прослушиваний - {track.listens}</h1>
        </div>
      </Grid>

      <h1>Слова к треку</h1>
      <p>{track.text}</p>

      <h1>Комментарии</h1>

      <Grid container>
        <TextField {...username} label="Ваше имя" fullWidth />
        <TextField {...text} label="Комментарий" fullWidth multiline rows={4} />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>

      <div>
        {track.comments.map((comment) => (
          <div key={comment._id}>
            <div>Автор - {comment.username}</div>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get('http://localhost:5000/tracks/' + params.id);

  return {
    props: {
      serverTrack: response.data,
    },
  };
};
