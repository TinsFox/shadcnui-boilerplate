import { dbClient } from "./client.node";
import {
	generateRandomAlbum,
	generateRandomTask,
	generateRandomTeamUser,
} from "./utils";

import { type NewAlbumType, albumsTableSchema } from "@/db/schema/album.schema";
import { type NewTask, tasks } from "@/db/schema/tasks.schema";

export async function seedTasks(input: { count: number }) {
	const count = input.count ?? 100;

	try {
		const allTasks: NewTask[] = [];

		for (let i = 0; i < count; i++) {
			allTasks.push(generateRandomTask());
		}

		await dbClient.delete(tasks);

		console.log("📝 Inserting tasks", allTasks.length);

		await dbClient.insert(tasks).values(allTasks).onConflictDoNothing();
	} catch (err) {
		console.error(err);
	}
}

export async function seedAlbums(input: { count: number }) {
	const count = input.count ?? 100;

	try {
		const allAlbums: NewAlbumType[] = [];

		for (let i = 0; i < count; i++) {
			allAlbums.push(generateRandomAlbum());
		}

		await dbClient.delete(albumsTableSchema);

		console.log("📝 Inserting albums", allAlbums.length);

		await dbClient
			.insert(albumsTableSchema)
			.values(allAlbums)
			.onConflictDoNothing();
	} catch (err) {
		console.error(err);
	}
}
