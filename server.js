const express = require("express");
const axios = require("axios");

const app = express();

app.get("/outfits/:userid", async (req, res) => {

    const userId = req.params.userid;

    try {

        const outfitsResponse = await axios.get(
            `https://avatar.roblox.com/v1/users/${userId}/outfits?itemsPerPage=30`
        );

        const outfits = outfitsResponse.data.data;

        let fullOutfits = [];

        for (const outfit of outfits) {

            try {

                const details = await axios.get(
                    `https://avatar.roblox.com/v1/outfits/${outfit.id}/details`
                );

                fullOutfits.push(details.data);

            } catch (e) {}

        }

        res.json(fullOutfits);

    } catch (err) {

        res.status(500).json({
            error: "Erreur Roblox API"
        });

    }

});

app.listen(3000, () => {

    console.log("API lancée sur le port 3000");

});