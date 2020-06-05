import React, { createContext, useCallback, useState, useContext } from "react";
import baseApi from "../config/baseApi";

export interface Month {
  dataReferencia: string;
  valor: string;
  quantidadeBeneficiados: string;
}

interface Consult {
  year: string;
  city: string;
}

interface ChartContext {
  searchMonths(data: Consult): Promise<void>;
  error: boolean;
  loading: boolean;
  months: Month[];
}

const ChartContext = createContext<ChartContext>({} as ChartContext);

export const ChartProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [months, setMonths] = useState<Month[]>([]);

  const searchMonths = useCallback(
    async ({ year, city }: Consult) => {
      setLoading(true);

      const urls = [
        fetch(`${baseApi}?mesAno=${year}01&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}02&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}03&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}04&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}05&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}06&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}07&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}08&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}09&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}10&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}11&codigoIbge=${city}`),
        fetch(`${baseApi}?mesAno=${year}12&codigoIbge=${city}`),
      ];

      await Promise.all(urls)
        .then((responses) => {
          setMonths(() =>
            responses.map(({ body }) => {
              const {
                dataReferencia,
                quantidadeBeneficiados,
                valor,
              } = (body as unknown) as Month;

              return { dataReferencia, quantidadeBeneficiados, valor };
            })
          );

          setLoading(false);
          setError(false);
        })
        .catch(() => {
          setError(true);
        });
    },
    [setMonths]
  );

  return (
    <ChartContext.Provider value={{ searchMonths, loading, error, months }}>
      {children}
    </ChartContext.Provider>
  );
};

export function useChart(): ChartContext {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a ChartProvider");
  }

  return context;
}
