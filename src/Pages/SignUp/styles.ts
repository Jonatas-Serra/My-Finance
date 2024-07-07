import styled from 'styled-components'
import background from '../../assets/Background.png'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
`

export const Content = styled.div`
  width: 70%;
  height: 80%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 25px 35px 75px 1px rgba(0, 0, 0, 0.85);
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 90%;
    height: 90%;
  }

  @media (max-width: 768px) {
    width: 90%;

    p {
      padding: 0 5px;
      text-align: center;
    }
  }

  @media (max-height: 700px) and (orientation: landscape) {
    height: 100%;
    max-height: 400px;
  }
`

export const Info = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: var(--primary);
  color: var(--white);

  h1 {
    font-size: 40px;
    margin-bottom: 20px;
  }

  p {
    font-size: 15px;
  }

  img {
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 500px;
    margin-bottom: 40px;
  }

  @media (max-height: 700px) and (orientation: landscape) {
    display: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export const TopLogin = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row !important;
  justify-content: center !important;
  background-color: var(--white);
  margin-bottom: 10px;

  h1 {
    font-size: 40px;
    color: var(--primary);
  }
  img {
    width: 20%;
  }
`

export const Login = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`

export const Button = styled.button`
  width: 50%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: var(--primary);
  color: var(--white);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 35px;
`
