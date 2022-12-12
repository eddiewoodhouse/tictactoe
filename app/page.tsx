"use client";
import Grid from "../components/grid";
import Controls from "../components/controls";
import { useEffect, useState } from "react";
import "../styles/globals.css";

export default function HomePage() {
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [player, setPlayer] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  let tiles: any;
  const getStartingTiles = () => {
    tiles = [];
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const [value, setValue] = useState("");
        while (!tiles[row]) tiles.push([]);
        tiles[row][column] = {
          row,
          column,
          value,
          setValue,
        };
      }
    }
  };
  const resetTiles = () => {
    for (let r = 0; r < tiles.length; r++) {
      for (let c = 0; c < tiles[0].length; c++) {
        tiles[r][c].setValue("");
      }
    }
  };
  getStartingTiles();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return (
    <section className="game">
      <h1>Tic Tac Toe</h1>
      <table className="scoreboard">
        <tbody>
          <tr>
            <td>
              <h2>Score for X</h2>
            </td>
            <td>
              <h2>Score for O</h2>
            </td>
          </tr>
          <tr>
            <td>
              <p>{scoreX}</p>
            </td>
            <td>
              <p>{scoreO}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <Grid
        {...{
          player,
          tiles,
          resetTiles,
          setPlayer,
          setScoreX,
          setScoreO,
          scoreX,
          scoreO,
        }}
      />
      <Controls {...{ resetTiles, player, setPlayer }} />
    </section>
  );
}
