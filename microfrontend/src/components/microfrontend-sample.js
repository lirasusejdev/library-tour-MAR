import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MicrofrontendContext } from "../microfrontend-context";
import ImageWithHost from './image-with-host';

import GBTechGray from '../assets/images/gb-tech-gray.png';

const smallScreen = `@media(max-width: 1080px)`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  ${smallScreen} {
    flex-direction: column;
    align-items: center;
  }
`;

const TextColumn = styled.section`
  width: 50%;
  flex-direction: column;
  ${smallScreen} {
    width: 100%;
  }
`;

const ImageColumn = styled.section`
  width: 50%;
  ${smallScreen} {
    order: -1;
  }
`;

const Figure = styled.figure`
  margin: 0;
`;

const Img = styled(ImageWithHost)`
  width: 400px;
  max-width: 100%;
  margin-bottom: 10px;
`;

const Caption = styled.figcaption`
  width: 500px;
  max-width: 100%;
  font-size: 30px;
`;

class MicrofrontendSample extends React.Component {
  render() {
    return <div>
      <h2>A Microfront End Sample</h2>
      <Container>
        <TextColumn>
          This is a microfrontend sample implementation.<br />
          <Link to={`${this.context.path}/child-microfrontend`}>Click here</Link> to
      navigate to a child microfrontend.
    </TextColumn>
        <ImageColumn>
          <Figure>
            <Img src={GBTechGray} alt="Microfrontend piece" />
            <Caption>"Frontend as a piece"</Caption>
          </Figure>
        </ImageColumn>
      </Container>
    </div>;
  }
}
MicrofrontendSample.contextType = MicrofrontendContext;

export default MicrofrontendSample;
