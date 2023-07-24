import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("todos", function (table) {
		table.increments("id");
		table.integer("user_id").notNullable();
		table.string("title", 255).notNullable();
		table.string("username", 255).notNullable();
		table.string("email", 255).notNullable();
		table.boolean("done").notNullable().defaultTo(false);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("todos");
}
