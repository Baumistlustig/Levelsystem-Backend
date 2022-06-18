export function userTemplate(discord_id, discord_name) {
  return {
    id: `${discord_id}`,
    experience: 1,
    discord_name: `${discord_name}`,
    discord_id: `${discord_id}`,
    minecraft_name: ``,
    minecraft_id: ``,
  }
}