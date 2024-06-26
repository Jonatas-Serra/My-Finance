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
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 25px 35px 75px 1px rgba(0, 0, 0, 0.85);

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 90%;

    p {
      padding: 0 5px;
      text-align: center;
    }
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      align-items: center;
      background-color: var(--white);
      padding: 0 10px;
    }

    a {
      font-size: 14px;
      color: var(--primary);
      text-decoration: none;
      margin-bottom: 15px;
    }

    @media (max-width: 768px) {
      padding-top: 40px;
      padding-bottom: 40px;

      div {
        h1 {
          font-size: 40px;
        }

        img {
          width: 30%;
        }
      }
    }

    @media (max-width: 520px) {
      padding-top: 30px;
      padding-bottom: 30px;

      div {
        h1 {
          font-size: 40px;
        }

        img {
          width: 25%;
        }
      }
    }

    @media (max-width: 480px) {
      padding-top: 20px;
      padding-bottom: 20px;

      div {
        h1 {
          font-size: 30px;
        }

        img {
          width: 25%;
        }
      }
    }
  }
`

export const Info = styled.div`
  width: 100%;
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
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    display: none;
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

export const LoginForm = styled.div`
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
