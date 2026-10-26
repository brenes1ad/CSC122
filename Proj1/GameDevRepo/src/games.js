//games.js
import { ref } from 'vue';

export const games = ref([
    { gameId: 1, entryId: '2301.00001', title: 'Assassins Creed Unity', genre: 'RPG' },
    { gameId: 2, entryId: '2301.00002', title: 'Fortnite', genre: 'Battle Royale' },
    { gameId: 3, entryId: '2301.00003', title: 'Rainbow Six Siege', genre: 'Competitive FPS' },
]);

let nextId = 4;

export function getGame(gameId) {
    return games.value.find((p) => p.gameId === Number(gameId));
}

export function addGame(game) {
    games.value.push({ ...game, gameId: nextId++ });
}

export function updateGameById(game) {
    const index = games.value.findIndex((p) => p.gameId === Number(game.gameId));
    if (index === -1) throw new Error('Could not find that game.');
    games.value[index] = { ...game };
}

export function deleteGameById(gameId) {
    games.value = games.value.filter((p) => p.gameId !== Number(gameId));
}


