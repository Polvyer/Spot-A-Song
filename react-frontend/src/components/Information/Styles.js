import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  flex-basis: 330px;
  padding: 20px;

  @media screen and (max-width: 1029px) {
    background-color: #f6f6f9;
  }

  .info-title {
    color: #88899f;
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 30px;
    margin-top: 20px;
    line-height: 1.5em;
  }

  .info-input-title {
    padding: 15px 10px 15px 20px;
    width: 100%;
    font-size: 1rem;
    border: 1px solid #f3f3f5;
    line-height: 1.2rem;  
    
    :hover, :focus {
      outline: none;
      background-color: #73c9b9;
      color: white;
    }
  }

  .info-status {
    color: #88899f;
    font-size: 1.2rem;
    font-weight: 500;
    margin: 30px 0;
  }

  .info-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #257bba;
    color: #fff;
    padding: 17px 30px;
    width: 100%;
    margin: 5px;
    margin-top: 60px;
    border: 1px solid #257bba;
    cursor: pointer;
    font-weight: 400;
    text-align: center;
    font-size: 1rem;
    border-radius: 4px;
    outline: none;

    .spotify-logo {
      width: 1em;
      margin-right: 5px;
    }
  }

  .info-footer {
    margin-top: 20px;
    line-height: 1.3;
    border-top: 1px solid #f3f3f5;
    padding: 15px 0;

    .info-footer-text {
      display: block;
      font-style: italic;
      color: #88899f;
      font-size: 0.7rem;
      font-weight: 500;
      margin: 5px 0;
      text-align: center;
      width: 100%;
      line-height: 1.42857143;
    }
  }
`;

const Radios = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export {
  Container,
  Radios,
}