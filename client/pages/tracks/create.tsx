import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import axios from 'axios';

import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';

function Create() {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const router = useRouter();

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();

      formData.append('name', name.value);
      formData.append('text', text.value);
      formData.append('artist', artist.value);
      formData.append('picture', picture);
      formData.append('audio', audio);

      axios
        .post('http://localhost:5000/tracks', formData)
        .then(() => router.push('/tracks'))
        .catch((e) => console.error(e));
    }
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: 20 }}
              label="Название трека"
            />
            <TextField
              {...artist}
              style={{ marginTop: 20 }}
              label="Имя автора"
            />
            <TextField
              {...text}
              style={{ marginTop: 20 }}
              label="Текст песни"
              multiline
              rows={3}
            />
          </Grid>
        )}

        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить обложку</Button>
          </FileUpload>
        )}

        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить аудио</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justify="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Назад
        </Button>
        <Button disabled={activeStep > 2} onClick={next}>
          Вперед
        </Button>
      </Grid>
    </MainLayout>
  );
}

export default Create;
