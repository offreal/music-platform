import React from 'react';

interface TrackProgressProps {
  left: number;
  right: number;
  onChange: (e) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  left,
  right,
  onChange,
}) => {
  return (
    <div style={{ display: 'flex' }}>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div style={{ width: '80px', textAlign: 'center'}}>
        {left} / {right}
      </div>
    </div>
  );
};

export default TrackProgress;
