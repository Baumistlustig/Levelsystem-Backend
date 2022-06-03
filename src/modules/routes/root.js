export async function root(req, res) {
    console.log(`Root request by ${req.ip}\n`);

    res.json(
        {
            "github": "https://github.com/Baumistlustig/Levelsystem-Backend",
            "routes": {
                "/": {
                    "description": "displays this page"
                },
                "/api": {
                    "/user": {
                        "arguments": {
                            "author_id": {
                                "example-value": "849153342236000266",
                                "description": "The discord id of the user you want to get"
                            }
                        },
                        "description": "Get the experience of a specific user",
                    },
                    "/message": {
                        "arguments": {
                            "token": {
                                "example-value": "<access-token>",
                                "description": "The access-token for restricted parts of the api"
                            },
                            "author_id": {
                                "example-value": "849153342236000266",
                                "description": "The discord id of the user you want the message from",
                            },
                            "author": {
                                "example-value": "bob1",
                                "description": "The name of the user the message is from",
                            },
                        },
                        "description": "A restricted route for the sending of a message"
                    },
                    "/leaderboard": {
                        "description": "Returns a json tree with the 5 highest experiences",
                        "example-response": {
                            "first": {
                                "user_id": "809832052022706178",
                                "username": "baumistlustig",
                                "experience": 11
                            },
                            "second": {
                                "user_id": "634856429538508801",
                                "username": "herr professor",
                                "experience": 8
                            },
                            "third": {
                                "user_id": "849153342236000266",
                                "username": "mensch",
                                "experience": 6
                            },
                            "fourth": {
                                "user_id": "661602770448809984",
                                "username": "janis",
                                "experience": 1
                            },
                            "fifth": {
                                "user_id": "854005061193302056",
                                "username": "bob2",
                                "experience": 1
                            }
                        }
                    },
                    "/link": {
                        "arguments": {
                            "token": {
                                "example-value": "<access-token>",
                                "description": "The access-token for restricted parts of the api"
                            },
                            "author_id": {
                                "example-value": "849153342236000266",
                                "description": "The discord id of the user you want the message from",
                            },
                            "minecraft_name": {
                                "example-value": "Baumistlustig",
                                "description": "The name of the user you want to link"
                            },
                        },
                        "description": "links the discord id with a minecraft id of a provided username in the database",
                        "example-response": {
                            "existing": true,
                        }
                    },
                    "/getdiscord": {
                        "arguments": {
                            "minecraft_id": {
                                "example-value": "<minecraft_id>",
                                "description": "The id of the minecraft user, whose discord id you want to get"
                            },
                        },
                        "example-response": "849153342236000266",
                        "description": "returns the discord if of a minecraft id from the database"
                    },
                }
            }
        }
    );
}