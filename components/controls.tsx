"use client";
import { useEffect, useState } from "react";

import "../styles/globals.css";

const players = ["X", "O"];
export function togglePlayer({ player, setPlayer }: any) {
  const index = players.indexOf(player) + 1;
  index === players.length ? setPlayer(players[0]) : setPlayer(players[index]);
}
export default function Controls({ resetTiles, player, setPlayer }: any) {
  useEffect(() => {
    if (player) {
      document.title = `Playing as ${player}`;
      let button = document.getElementById(`${player}-button`);
      button?.classList.toggle("selected-button", true);
      let lastPlayer = players.filter((p) => p != player)[0];
      button = document.getElementById(`${lastPlayer}-button`);
      button?.classList.toggle("selected-button", false);
    } else {
      document.title = `Choose a player`;
      players.map((p) => {
        let button: any = document.getElementById(`${p}-button`);
        button.classList.toggle("selected-button", false);
      });
    }
  });
  useEffect(() => {
    setPlayer(players[0]);
  }, []);

  return (
    <section className="set-player-controls">
      <h5>Set your player: </h5>
      {players.map((player) => {
        return (
          <button
            key={`player${player}`}
            onClick={() => setPlayer(player)}
            id={`${player}-button`}
          >
            {player}
          </button>
        );
      })}
      <button onClick={() => resetTiles()}>Reset Game</button>
    </section>
  );
}
