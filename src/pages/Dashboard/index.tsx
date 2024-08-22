import { Wrapper } from './style';

import KanbanBoard from './components/KanbanBoradSection';
import Meta from 'components/common/Meta';

const Dashboard = () => {
  return (
    <Wrapper>
      <Meta title="Demo App - Home" />
      <KanbanBoard />
    </Wrapper>
  );
};

export default Dashboard;
