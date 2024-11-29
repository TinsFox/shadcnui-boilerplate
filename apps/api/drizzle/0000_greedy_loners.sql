CREATE TYPE "public"."task_label" AS ENUM('BUG', 'FEATURE', 'IMPROVEMENT', 'DOCUMENTATION');--> statement-breakpoint
CREATE TYPE "public"."task_priority" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"artist" varchar(255) NOT NULL,
	"description" text,
	"cover_url" varchar(255),
	"release_date" timestamp,
	"genre" varchar(100),
	"label" varchar(255),
	"total_tracks" integer DEFAULT 0,
	"play_count" integer DEFAULT 0,
	"like_count" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"status" "task_status" DEFAULT 'TODO' NOT NULL,
	"label" "task_label" DEFAULT 'BUG' NOT NULL,
	"priority" "task_priority" DEFAULT 'LOW' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"username" text,
	"name" text,
	"avatar" text,
	"birthdate" text,
	"bio" text,
	"password" text NOT NULL,
	"registered_at" timestamp DEFAULT now() NOT NULL,
	"status" text NOT NULL,
	"role" text NOT NULL,
	"amount" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
