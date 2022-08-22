import styled from "@emotion/styled";

export const Navbar = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  margin: 0 auto;
  gap: 50px;
  align-items: center;
  justify-content: center;
  transition: all 1s;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 165px;
    gap: 10px;
    align-items: center;
    transition: all 1s;
  }
`;

export const Container = styled.div`
  @keyframes go-back {
    from {
      transform: translateY(100px);
    }
    to {
      transform: translateY(0);
    }
  }
  display: flex;
  animation: go-back 1s;
`;
