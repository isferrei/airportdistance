// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function Airports(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const options = {
    url: "https://aerodatabox.p.rapidapi.com/airports/search/term",
    params: { q: "schiphol", limit: "10" },
    headers: {
      "X-RapidAPI-Key": "5a4f29f7c5mshf05a11c02c835b8p1c47a3jsnc8898d976ea1",
      "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
    },
  };

  const url = "https://aerodatabox.p.rapidapi.com/airports/search/term";
  const key = "5a4f29f7c5mshf05a11c02c835b8p1c47a3jsnc8898d976ea1";

  const {
    data: { data },
    status,
  } = await axios.get(url + `?q=${req.body}`, {
    headers: { "x-rapidapi-key": key },
  });

  return res.status(status).json(data);
}
