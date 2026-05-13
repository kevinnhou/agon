import { v } from "convex/values";
import { mutation } from "./_generated/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const join = mutation({
	args: {
		email: v.string(),
		name: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const email = args.email.trim().toLowerCase();
		if (!(email && EMAIL_PATTERN.test(email))) {
			throw new Error("Please enter a valid email.");
		}

		const existing = await ctx.db
			.query("waitlist")
			.withIndex("by_email", (q) => q.eq("email", email))
			.unique();

		if (existing) {
			return;
		}

		const trimmedName = args.name?.trim();
		await ctx.db.insert("waitlist", {
			createdAt: Date.now(),
			email,
			...(trimmedName ? { name: trimmedName } : {}),
		});
	},
});
