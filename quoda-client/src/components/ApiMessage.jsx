import { useEffect, useState } from "react";
import { getHello } from "../services/api";

function ApiMessage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getHello();
      setData(result.message);
    }
    fetchData();
  }, []);

  return <div>{data || "Carregando..."}</div>;
}

export default ApiMessage;
