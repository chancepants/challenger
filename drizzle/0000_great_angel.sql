CREATE TYPE "public"."tournament_status" AS ENUM('Not Started', 'In Progress', 'Complete');--> statement-breakpoint
CREATE TABLE "tournaments" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar,
	"size" integer,
	"start_time" timestamp,
	"status" "tournament_status",
	"owner" varchar,
	"description" varchar,
	"logo" varchar
);
