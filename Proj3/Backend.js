import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory data storage based on the Swagger schemas
let devs = [
    { devId: "1", name: "Nintendo", headquarters: "Kyoto, Japan", website: "https://nintendo.com" },
    { devId: "2", name: "Valve", headquarters: "Bellevue, Washington", website: "https://valvesoftware.com" },
    { devId: 3, name: "Epic Games", headquarters: "Cary, North Carolina", website: "https://EpicGames.com" },
];

let games = [
    { gameId: "1", entryId: "G-001", title: "The Legend of Zelda", genre: "Adventure", devId: "1" },
    { gameId: "2", entryId: "G-002", title: "Half-Life", genre: "FPS", devId: "2" },
    { gameId: "3", entryId: "G-003", title: "Fortnite", genre: "Third Person Shooter and Battle Royale", devId: "3" },
];

// Helper functions for linking/unlinking
const linkGameAndDev = (devId, gameId) => {
    const dev = devs.find(d => d.devId === devId);
    const game = games.find(g => g.gameId === gameId);

    if (!dev || !game) return null;
    game.devId = devId;
    return { dev, game };
};

const unlinkGameAndDev = (devId, gameId) => {
    const dev = devs.find(d => d.devId === devId);
    const game = games.find(g => g.gameId === gameId);

    if (!dev || !game) return null;
    if (game.devId === devId) {
        game.devId = null;
    }
    return { dev, game };
};

// ==========================================
// DEVS ENDPOINTS
// ==========================================

// GET /devs/count - Count Devs
app.get('/devs/count', (req, res) => {
    res.json({ count: devs.length });
});

// GET /devs/is-registered - Check if Dev website is registered
app.get('/devs/is-registered', (req, res) => {
    const { website } = req.query;
    const exists = devs.some(dev => dev.website === website);
    res.json({ registered: exists });
});

// POST /devs - Add a new Dev
app.post('/devs', (req, res) => {
    const { name, headquarters, website } = req.body;
    const newDev = {
        devId: (devs.length + 1).toString(),
        name,
        headquarters,
        website
    };
    devs.push(newDev);
    res.status(201).json(newDev);
});

// GET /devs - Get all Devs ordered by name
app.get('/devs', (req, res) => {
    const sortedDevs = [...devs].sort((a, b) => a.name.localeCompare(b.name));
    res.json(sortedDevs);
});

// PUT /devs/:devId - Update an existing Dev
app.put('/devs/:devId', (req, res) => {
    const { devId } = req.params;
    const index = devs.findIndex(d => d.devId === devId);

    if (index === -1) {
        return res.status(404).json({ error: "Dev not found" });
    }

    devs[index] = { ...devs[index], ...req.body, devId };
    res.json(devs[index]);
});

// DELETE /devs/:devId - Delete a Dev
app.delete('/devs/:devId', (req, res) => {
    const { devId } = req.params;
    const index = devs.findIndex(d => d.devId === devId);

    if (index === -1) {
        return res.status(404).json({ error: "Dev not found" });
    }

    const deletedDev = devs.splice(index, 1)[0];
    res.json({ message: "Dev deleted successfully", dev: deletedDev });
});

// GET /devs/:devId - Get a Dev by ID (includes their games)
app.get('/devs/:devId', (req, res) => {
    const { devId } = req.params;
    const dev = devs.find(d => d.devId === devId);

    if (!dev) {
        return res.status(404).json({ error: "Dev not found" });
    }

    const devGames = games.filter(g => g.devId === devId);
    res.json({ ...dev, games: devGames });
});

// ==========================================
// GAMES ENDPOINTS
// ==========================================

// GET /games/count - Count Games
app.get('/games/count', (req, res) => {
    res.json({ count: games.length });
});

// GET /games/is-existing - Check if Game entryId exists
app.get('/games/is-existing', (req, res) => {
    const { entryId } = req.query;
    const exists = games.some(game => game.entryId === entryId);
    res.json({ exists });
});

// POST /games - Add a new Game
app.post('/games', (req, res) => {
    const { entryId, title, genre, devId } = req.body;
    const newGame = {
        gameId: (games.length + 101).toString(),
        entryId,
        title,
        genre,
        devId
    };
    games.push(newGame);
    res.status(201).json(newGame);
});

// GET /games - Get all Games ordered by title
app.get('/games', (req, res) => {
    const sortedGames = [...games].sort((a, b) => a.title.localeCompare(b.title));
    res.json(sortedGames);
});

// PUT /games/:gameId - Update an existing Game
app.put('/games/:gameId', (req, res) => {
    const { gameId } = req.params;
    const index = games.findIndex(g => g.gameId === gameId);

    if (index === -1) {
        return res.status(404).json({ error: "Game not found" });
    }

    games[index] = { ...games[index], ...req.body, gameId };
    res.json(games[index]);
});

// DELETE /games/:gameId - Delete a Game
app.delete('/games/:gameId', (req, res) => {
    const { gameId } = req.params;
    const index = games.findIndex(g => g.gameId === gameId);

    if (index === -1) {
        return res.status(404).json({ error: "Game not found" });
    }

    const deletedGame = games.splice(index, 1)[0];
    res.json({ message: "Game deleted successfully", game: deletedGame });
});

// GET /games/:gameId - Get a Game by ID (includes its devs)
app.get('/games/:gameId', (req, res) => {
    const { gameId } = req.params;
    const game = games.find(g => g.gameId === gameId);

    if (!game) {
        return res.status(404).json({ error: "Game not found" });
    }

    const dev = devs.find(d => d.devId === game.devId);
    res.json({ ...game, dev: dev || null });
});

// ==========================================
// LINKS ENDPOINTS
// ==========================================

// PUT /devs/:devId/games/:gameId - Link Game to Dev
app.put('/devs/:devId/games/:gameId', (req, res) => {
    const result = linkGameAndDev(req.params.devId, req.params.gameId);
    if (!result) {
        return res.status(404).json({ error: "Dev or Game not found" });
    }
    res.json({ message: "Game linked to Dev successfully", ...result });
});

// DELETE /devs/:devId/games/:gameId - Unlink Game from Dev
app.delete('/devs/:devId/games/:gameId', (req, res) => {
    const result = unlinkGameAndDev(req.params.devId, req.params.gameId);
    if (!result) {
        return res.status(404).json({ error: "Dev or Game not found" });
    }
    res.json({ message: "Game unlinked from Dev successfully", ...result });
});

// PUT /games/:gameId/devs/:devId - Link Dev to Game
app.put('/games/:gameId/devs/:devId', (req, res) => {
    const result = linkGameAndDev(req.params.devId, req.params.gameId);
    if (!result) {
        return res.status(404).json({ error: "Dev or Game not found" });
    }
    res.json({ message: "Dev linked to Game successfully", ...result });
});

// DELETE /games/:gameId/devs/:devId - Unlink Dev from Game
app.delete('/games/:gameId/devs/:devId', (req, res) => {
    const result = unlinkGameAndDev(req.params.devId, req.params.gameId);
    if (!result) {
        return res.status(404).json({ error: "Dev or Game not found" });
    }
    res.json({ message: "Dev unlinked from Game successfully", ...result });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});