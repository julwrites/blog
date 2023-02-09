declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"2021_11_03_GLS_2021.md": {
  id: "2021_11_03_GLS_2021.md",
  slug: "2021_11_03_gls_2021",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2023_01_31_Fatherhood_Begins.md": {
  id: "2023_01_31_Fatherhood_Begins.md",
  slug: "2023_01_31_fatherhood_begins",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},
"projects": {
"2020_04_26_Markdown_Blog.md": {
  id: "2020_04_26_Markdown_Blog.md",
  slug: "2020_04_26_markdown_blog",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2020_06_19_Golang_Bot.md": {
  id: "2020_06_19_Golang_Bot.md",
  slug: "2020_06_19_golang_bot",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2020_08_07_Fedora_Server.md": {
  id: "2020_08_07_Fedora_Server.md",
  slug: "2020_08_07_fedora_server",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2020_08_15_Code_Server.md": {
  id: "2020_08_15_Code_Server.md",
  slug: "2020_08_15_code_server",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2020_08_16_Nginx_Server.md": {
  id: "2020_08_16_Nginx_Server.md",
  slug: "2020_08_16_nginx_server",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2020_08_18_Code_Server_Extra.md": {
  id: "2020_08_18_Code_Server_Extra.md",
  slug: "2020_08_18_code_server_extra",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2021_03_29_React_Website.md": {
  id: "2021_03_29_React_Website.md",
  slug: "2021_03_29_react_website",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2022_01_07_Golang_Bot_Cloud_Run.md": {
  id: "2022_01_07_Golang_Bot_Cloud_Run.md",
  slug: "2022_01_07_golang_bot_cloud_run",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2022_01_17_Redox_Keyboard_Builds.md": {
  id: "2022_01_17_Redox_Keyboard_Builds.md",
  slug: "2022_01_17_redox_keyboard_builds",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2022_02_02_Elm_Website.md": {
  id: "2022_02_02_Elm_Website.md",
  slug: "2022_02_02_elm_website",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2022_02_12_Flutter_Setup.md": {
  id: "2022_02_12_Flutter_Setup.md",
  slug: "2022_02_12_flutter_setup",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
"2023_02_09_Multi_Page_Application_Elm_Astro.md": {
  id: "2023_02_09_Multi_Page_Application_Elm_Astro.md",
  slug: "2023_02_09_multi_page_application_elm_astro",
  body: string,
  collection: "projects",
  data: InferEntrySchema<"projects">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
