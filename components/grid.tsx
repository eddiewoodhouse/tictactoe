"use client";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { togglePlayer } from "./controls";
function Tile({ tile, player, setPlayer }: any) {
  return (
    <td
      onClick={() => {
        if (player && !tile.value) {
          tile.setValue(player);
          togglePlayer({ player, setPlayer });
        }
      }}
    >
      {tile.value}
    </td>
  );
}
function getWinner({ tiles, setWinner }: any): any {
  let set = new Set();
  let checkSet = () => {
    if (set.size === 1) {
      let iterator = set.values();
      let winnerValue = iterator.next().value;
      setWinner(winnerValue);
    }
  };
  //diagonals
  let r = 0;
  let c = 0;

  for (r = 0; r < 3; r++) {
    if (tiles[r][r].value) set.add(tiles[r][r].value);
    else break;
  }
  if (r === 3) checkSet();
  set.clear();
  for (r = 0; r < 3; r++) {
    if (tiles[r][2 - r].value) set.add(tiles[r][2 - r].value);
    else break;
  }
  if (r === 3) checkSet();
  set.clear();
  //rows
  for (r = 0; r < 3; r++) {
    for (c = 0; c < 3; c++) {
      if (tiles[r][c].value) set.add(tiles[r][c].value);
      else break;
    }
    if (c === 3) checkSet();
    set.clear();
  }
  //columns
  for (c = 0; c < 3; c++) {
    for (r = 0; r < 3; r++) {
      if (tiles[r][c].value) set.add(tiles[r][c].value);
      else break;
    }
    if (r === 3) checkSet();
    set.clear();
  }
}
export default function Grid({
  player,
  tiles,
  resetTiles,
  setPlayer,
  setScoreX,
  setScoreO,
  scoreX,
  scoreO,
}: any) {
  const [winner, setWinner] = useState("");
  let render = (
    <table className="grid-table">
      <tbody>
        {tiles.map((row: any) => {
          return (
            <tr key={`row${row[0].row}`}>
              {row.map((tile: any) => {
                return (
                  <Tile
                    key={`row${tile.row}column${tile.column}`}
                    {...{ tile, player, setPlayer }}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
  useEffect(() => {
    getWinner({ tiles, setWinner });
  }, [player]);
  useEffect(() => {
    resetTiles();
    switch (winner) {
      case "X":
        setScoreX(scoreX + 1);
        break;
      case "O":
        setScoreO(scoreO + 1);
        break;
      default:
        break;
    }
    setWinner("");
  }, [winner]);
  return render;
}
