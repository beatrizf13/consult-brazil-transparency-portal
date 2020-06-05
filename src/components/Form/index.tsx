import React, { useState } from "react";
import { useChart } from "../../hooks/useChart";

const Form: React.FC = () => {
  const { searchMonths } = useChart();

  const [city, setCity] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await searchMonths({ city, year });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Código IBGE da cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        placeholder="Ano"
        min="2000"
        max="2019"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button type="submit">Buscar</button>
    </form>
  );
};

export default Form;
