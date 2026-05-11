const express = require("express");
const axios = require("axios");

const app = express();

app.get("/outfits/:userid", async (req, res) => {

    const userId = req.params.userid;

    try {

        const response = await axios.get(
            `https://avatar.roblox.com/v1/users/${userId}/outfits?itemsPerPage=30`
        );

        res.json(response.data);

    } catch (err) {

        res.status(500).json({
            error: "Erreur Roblox API"
        });

    }

});

app.listen(3000, () => {

    console.log("API lancée sur le port 3000");

});