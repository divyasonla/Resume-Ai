drop extension if exists "pg_net";

drop trigger if exists "update_profiles_updated_at" on "public"."profiles";

drop trigger if exists "update_resumes_updated_at" on "public"."resumes";

drop policy "Users can insert their own profile" on "public"."profiles";

drop policy "Users can update their own profile" on "public"."profiles";

drop policy "Users can view their own profile" on "public"."profiles";

drop policy "Users can create their own resumes" on "public"."resumes";

drop policy "Users can delete their own resumes" on "public"."resumes";

drop policy "Users can update their own resumes" on "public"."resumes";

drop policy "Users can view their own resumes" on "public"."resumes";

revoke delete on table "public"."profiles" from "anon";

revoke insert on table "public"."profiles" from "anon";

revoke references on table "public"."profiles" from "anon";

revoke select on table "public"."profiles" from "anon";

revoke trigger on table "public"."profiles" from "anon";

revoke truncate on table "public"."profiles" from "anon";

revoke update on table "public"."profiles" from "anon";

revoke delete on table "public"."profiles" from "authenticated";

revoke insert on table "public"."profiles" from "authenticated";

revoke references on table "public"."profiles" from "authenticated";

revoke select on table "public"."profiles" from "authenticated";

revoke trigger on table "public"."profiles" from "authenticated";

revoke truncate on table "public"."profiles" from "authenticated";

revoke update on table "public"."profiles" from "authenticated";

revoke delete on table "public"."profiles" from "service_role";

revoke insert on table "public"."profiles" from "service_role";

revoke references on table "public"."profiles" from "service_role";

revoke select on table "public"."profiles" from "service_role";

revoke trigger on table "public"."profiles" from "service_role";

revoke truncate on table "public"."profiles" from "service_role";

revoke update on table "public"."profiles" from "service_role";

revoke delete on table "public"."resumes" from "anon";

revoke insert on table "public"."resumes" from "anon";

revoke references on table "public"."resumes" from "anon";

revoke select on table "public"."resumes" from "anon";

revoke trigger on table "public"."resumes" from "anon";

revoke truncate on table "public"."resumes" from "anon";

revoke update on table "public"."resumes" from "anon";

revoke delete on table "public"."resumes" from "authenticated";

revoke insert on table "public"."resumes" from "authenticated";

revoke references on table "public"."resumes" from "authenticated";

revoke select on table "public"."resumes" from "authenticated";

revoke trigger on table "public"."resumes" from "authenticated";

revoke truncate on table "public"."resumes" from "authenticated";

revoke update on table "public"."resumes" from "authenticated";

revoke delete on table "public"."resumes" from "service_role";

revoke insert on table "public"."resumes" from "service_role";

revoke references on table "public"."resumes" from "service_role";

revoke select on table "public"."resumes" from "service_role";

revoke trigger on table "public"."resumes" from "service_role";

revoke truncate on table "public"."resumes" from "service_role";

revoke update on table "public"."resumes" from "service_role";

alter table "public"."profiles" drop constraint "profiles_user_id_fkey";

alter table "public"."profiles" drop constraint "profiles_user_id_key";

alter table "public"."resumes" drop constraint "resumes_user_id_fkey";

drop function if exists "public"."handle_new_user"();

drop function if exists "public"."update_updated_at_column"();

alter table "public"."profiles" drop constraint "profiles_pkey";

alter table "public"."resumes" drop constraint "resumes_pkey";

drop index if exists "public"."profiles_pkey";

drop index if exists "public"."profiles_user_id_key";

drop index if exists "public"."resumes_pkey";

drop table "public"."profiles";

drop table "public"."resumes";

drop trigger if exists "on_auth_user_created" on "auth"."users";


