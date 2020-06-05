import React from "react";
import { ChartProvider, useChart } from "./hooks/useChart";
import Form from "./components/Form";
import Chart from "./components/Chart";

const App: React.FC = () => {
  const { loading, error } = useChart();

  return (
    <ChartProvider>
      <h1>Consultar as parcelas do Bolsa Família em um ano por município</h1>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ibge.gov.br/explica/codigos-dos-municipios.php"
        >
          Verifique o código IBGE da cidade aqui.
        </a>
      </p>

      <Form />
      <Chart />
      {loading && <p>Carregando</p>}
      {error && <p>Sistema indisponível</p>}
    </ChartProvider>
  );
};

export default App;
