import { Container, Header, Content, MainContent } from './styles';
import { Summary } from '../../components/Summary';
import { Chart } from '../../components/Chart';

import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import 'react-chartjs-2';

export default function Resume() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Entradas',
        data: [1000, 1200, 800, 1500, 2000, 1700, 1300, 1800, 1600, 2200, 1900, 2500],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
      {
        label: 'Saídas',
        data: [500, 700, 400, 800, 1200, 900, 600, 1000, 700, 1100, 800, 1400],
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.4)',
      },
    ],
  };

  return (
    <Container>
      <MainContent>
        <Header>
          <h1>Resumo</h1>
        </Header>
        <Content>
          <Summary />
          <Chart data={chartData} />
        </Content>
        
      </MainContent>
    </Container>
  );
}
