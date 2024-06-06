import styled from "styled-components";

export const ComButton = styled.button`
  width: 24px;
  height: 24px;
  background: ${({theme}) => theme.colors.white};
  border: 0px;
  cursor: pointer;
`;

export const Typography = styled.p`
  color: ${({theme}) => theme.colors.color};
  font-size: 1rem;
  line-height: 150%;
`;
