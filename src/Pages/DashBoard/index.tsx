import React from 'react';
import { Outlet } from 'react-router-dom';

import { NavSide } from "../../components/NavSide";
import { Container, Content } from './styles';

const DashBoard: React.FC = () => {
  return (
    <Container>
      <NavSide />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}

export default DashBoard;