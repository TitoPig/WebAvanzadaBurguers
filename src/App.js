import './App.css';
import { Header } from './components/header';
import { Categorias, Productos } from './components/listaproductos';

function App() {
  return (
    <>
      <Header/>
      <Categorias/>
      <Productos/>
    </>
  );
}

export default App;
