import styled from '@emotion/styled';
import { BiSearch } from 'react-icons/bi';

export const TextField = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: ${({ width }) => width};
  height: 40px;

  & input {
    height: 100%;
    width: 100%;
    padding: 0 15px 0 30px;

    background-color: white;
    border-radius: 10px;
    border: 1px solid gray;
  }
`;

export const Icon = styled(BiSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  width: 80%;
  height: 80%;
  color: gray;
  transform: translateY(-50%);
`;
