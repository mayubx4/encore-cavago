import { useCallback, useState } from 'react';

interface useToggleProps {
  initialValue?: boolean;
}

const useToggle: (props?: useToggleProps) => [boolean, () => void] = (props = {}) => {
  const { initialValue = false } = props;

  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
};

export default useToggle;
