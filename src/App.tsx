import { ModalManager, ToastBarManager } from './design-index';
import './styles/index.css';

const App = () => {
  return (
    <>
      <ToastBarManager />
      <div className='App' style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ModalManager></ModalManager>
      </div>
    </>
  );
};

export default App;
