import './PredicateButtons.css';

import { FC, useState } from 'react';

type Props = {
  onChange: (next: number) => void;
  active?: number;
};

type PredicateButtonProps = {
  id: number;
  selected: number;
  label: string;
  onClick: (next: number) => void;
};

const PredicateButton: FC<PredicateButtonProps> = ({ id, selected, label, onClick }) => (
  <button className={selected === id ? 'active' : undefined} onClick={() => onClick(id)}>
    {label}
  </button>
);

const PredicateButtons: FC<Props> = ({ onChange, active = 1 }) => {
  const [selected, setSelected] = useState(active);

  const handleChange = (next: number) => {
    setSelected(next);
    onChange(next);
  };

  return (
    <div className="btn-group">
      <PredicateButton id={1} selected={selected} onClick={handleChange} label="Aktuální" />
      <PredicateButton id={2} selected={selected} onClick={handleChange} label="+ 1 den" />
      <PredicateButton id={3} selected={selected} onClick={handleChange} label="+ 2 dny" />
      <PredicateButton id={4} selected={selected} onClick={handleChange} label="+ 3 dny" />
    </div>
  );
};

export default PredicateButtons;
