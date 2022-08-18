import styled from "@emotion/styled";

export const Navbar = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 50px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 165px;
    gap: 10px;
    align-items: center;
  }
`;
